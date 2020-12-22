import React, { useState, useReducer, useCallback } from "react";
import { useHistory } from "react-router-dom";
import jwt from "jsonwebtoken";
import store from "store";
import _ from "lodash";

import reducer from "utils/reducer";
import { Input, Button } from "Components";
import query, { getErrorMessage } from "api";
import { showToast } from "utils";

function Page({ ...props }) {
    const [isLoading, setLoading] = useState(false);
    const [state, dispatch] = useReducer(reducer, {
        email: "",
        password: "",
    });
    let history = useHistory();

    const doLogin = useCallback(
        function () {
            if (!state.email || !state.password) {
                showToast("이메일 혹은 비밀번호가 입력되지 않았습니다.", "red");
                return false;
            }

            setLoading(true);
            query({
                url: "/account/signin",
                method: "POST",
                data: {
                    email: state.email,
                    password: state.password,
                },
            })
            .then((res) => {
                setLoading(false);

                jwt.verify(res.token, res.publicKey, (error, tokenData)=>{
                    if (error && error.stack) {
                        // it's an error, probably
                        console.log("token verify error");
                        showToast(getErrorMessage(error.name), "red");
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
    
                    console.log("login component: login success");

                    window.setTimeout(()=>{
                        history.push(_.get(props.location, "state.from", "/"));
                    }, 500);
                });
            })
            .catch((error) => {
                setLoading(false);
            });
        },
        [state, history]
    );

    const onEnterKey = useCallback((e)=>{
        if(e.keyCode == 13) {
            doLogin();
        }
    }, [state])

    return (
        <React.Fragment>
            <h2>로그인</h2>
            <Input 
                name="email" 
                value={state.email} 
                onChange={dispatch} 
                className="w-full" 
                label="이메일" 
                required
            />
            <Input 
                name="password" 
                value={state.password} 
                type="password" 
                onChange={dispatch}
                onKeyDown={onEnterKey}
                className="w-full" 
                label="비밀번호" 
                required
            />
            <Button 
                label="로그인" 
                className="w-full" 
                color="blue-gradient" 
                type="button" 
                onClick={doLogin} 
                isLoading={isLoading} 
            />
        </React.Fragment>
    );
}

export default Page;
