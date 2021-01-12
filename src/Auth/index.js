import jwt from "jsonwebtoken";
import store from "store";
import _ from "lodash";

import query, { getErrorMessage } from "api"
import { showToast } from "utils"
import {loadUser} from "utils/user";

export const deepVerify = () => {
    return new Promise((resolve, reject)=>{
        console.log("deepVerify");
        let token = store.get('token');
        if(!token || !token.token || !token.key) {
            resolve(false)
            return false;
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
    let token = store.get('token');

    try {
        if(!!token && !!token.token && !!token.key) {
            let result = jwt.verify(token.token, token.key);

            sendToken(token.token);

            return true;
        } else {
            // 토큰이나 키가 없을 때

            // 토큰이 없을때는 refresh_token도 없다고 가정한다.
            // 2020-12-26 hw.kim
            return false;
        }
    } catch (error) {
        // 검증 실패했을 때

        if(error.name == "TokenExpiredError" && !!token.refreshToken) {
            // 토큰 만료 오류일때는 갱신한다.
            let result = (async () => await refresh() )();
            // await이 작동한다기보다는 일단 페이지 승인해주고 
            // 그 다음에 갱신된 정보 입력 받는거나 다름 없음.
            // 토큰 갱신에 실패한다면 문제 생길 것으로 판단됨.
            // 2020-12-28 00:43 hw.kim
            return true;
        }

        showToast(getErrorMessage(error.name), "red");
        store.clearAll();
        return false;
    }
}

export const refresh = () => {
    return new Promise((resolve, reject) => {
        console.log("refresh run")

        let token = store.get('token');
        let refreshToken = token.refreshToken;
        if(!refreshToken) {
            resolve(false);
            return false;
        }
        
        query({
            url: "/auth/refresh",
            method: "PUT",
            data: {
                refreshToken: refreshToken,
            }
        })
        .then((res) => {
            setToken(res.token, res.publicKey)
            .then(()=>{
                resolve(true);
            })
            .catch((error)=>{
                resolve(false);
            })
        })
        .catch(error=>{
            resolve(false);
        })
    })
}

/**
 * 서비스워커에 토큰을 전달한다.
 * 
 * @param {string} token 
 */
const sendToken = (token) => {
    try {
        navigator.serviceWorker.controller.postMessage instanceof Function && navigator.serviceWorker.controller.postMessage({
            type: 'SEND_TOKEN',
            token: token,
        });
    } catch (e) {
        console.log("%cservice worker send token fail", "font-weight:bold;");
        console.log(e);
    }
}

/**
 * 토큰을 저장한다.
 * 
 * @param {string} token 
 * @param {string} publicKey 
 */
export const setToken = (token, publicKey) => {
    return new Promise((resolve, reject) => {
        jwt.verify(token, publicKey, (error, tokenData)=>{
            if (error && error.stack) {
                // it's an error, probably
                throw error;
            }
    
            let data = _.pick(tokenData, ["info"]);
    
            store.set("token", {
                token: token,
                key: publicKey,
                // 간이 검증시 저장된 키를, 완전 검증시 서버에서 불러온 키를 사용할 것.
                refreshToken: data.info.refreshToken,
                refreshExpireDate: data.info.refreshExpireDate,
            });

            loadUser();
            sendToken(token);

            resolve(true);
        })
    })
    
}

/**
 * 저장된 토큰을 지운다.
 * 
 */
export const clearToken = () => {
    store.clearAll();
    sendToken("");
}

export { default as AuthRoute } from "./AuthRoute";

export default {
    verify,
    deepVerify,
    refresh,
    setToken,
    clearToken,
}