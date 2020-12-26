import jwt from "jsonwebtoken";
import store from "store";
import _ from "lodash";

import query, { getErrorMessage } from "api"
import { showToast } from "utils"

export const deepVerify = () => {
    return new Promise((resolve, reject)=>{
        console.log("deepVerify");
        let user = store.get('user');
        if(!user || !user.token || !user.key) {
            resolve(false)
        }

        query({
            url: "/auth/verify",
        }).then(res=>{
            console.log(res)
            resolve(res.verify)
        }).catch(error=>{
            resolve(false);
        })
    })
}

export const verify = () => {
    console.log("verify")
    try {
        let user = store.get('user');
        if(!!user && !!user.token && !!user.key) {
            let result = jwt.verify(user.token, user.key);

            navigator.serviceWorker.controller.postMessage({
                type: 'SEND_TOKEN',
                token: user.token,
            });

            return true;
        } else {
            // 토큰이나 키가 없을 때

            // 토큰이 없을때는 refresh_token도 없다고 가정한다.
            // 2020-12-26 hw.kim
            return false;
        }
    } catch (error) {
        // 검증 실패했을 때

        if(error.name == "TokenExpiredError") {
            // 토큰 만료 오류일때는 갱신한다.
            let result = (async () => await refresh() )();
            if(result) {
                return true;
            }
        }

        showToast(getErrorMessage(error.name), "red");
        store.clearAll();
        return false;
    }
}

export const refresh = () => {
    return new Promise((resolve, reject) => {
        console.log("refresh run")

        let user = store.get('user');
        let refreshToken = user.refreshToken;
        if(!refreshToken) {
            resolve(false);
        }
        
        query({
            url: "/auth/refresh",
            method: "PUT",
            data: {
                refreshToken: refreshToken,
            }
        })
        .then((res) => {
            jwt.verify(res.token, res.publicKey, (error, tokenData)=>{
                if (error && error.stack) {
                    // it's an error, probably
                    console.log("token verify error");
                    showToast(getErrorMessage(error.name), "red");
                    resolve(false);
                    return false;
                }

                let data = _.pick(tokenData, ["info"]);

                store.set("user", {
                    ...data,
                    token: res.token,
                    key: res.publicKey,
                    // 간이 검증시 저장된 키를, 완전 검증시 서버에서 불러온 키를 사용할 것.
                    refreshToken: data.info.refreshToken,
                    refreshExpireDate: data.info.refreshExpireDate,
                });

                navigator.serviceWorker.controller.postMessage({
                    type: 'SEND_TOKEN',
                    token: res.token,
                });

                resolve(true);
            });
        })
        .catch(error=>{
            resolve(false);
        })
    })
    
}

export default {
    verify,
    deepVerify,
    refresh,
}