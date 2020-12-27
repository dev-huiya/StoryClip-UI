import React, { useState, useReducer, useCallback } from "react";
import { useHistory } from "react-router-dom";
import jwt from "jsonwebtoken";
import store from "store";
import _ from "lodash";

import reducer from "utils/reducer";
import { Input, Button } from "Components";
import query, { getErrorMessage } from "api";
import { showToast } from "utils";
import Auth from "Auth";

function Page({ recaptchaToken, updateToken, ...props }) {
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
                url: "/auth/signin",
                method: "POST",
                data: {
                    email: state.email,
                    password: state.password,
                    recaptchaToken: recaptchaToken,
                },
            })
            .then((res) => {
                setLoading(false);

                Auth.setToken(res.token, res.publicKey)
                .then(()=>{
                    console.log("login component: login success");

                    window.setTimeout(()=>{
                        history.push(_.get(props.location, "state.from", "/"));
                    }, 500);
                })
                .catch((error)=>{
                    console.log("token verify error");
                    showToast(getErrorMessage(error.name), "red");
                })
            })
            .catch((error) => {
                setLoading(false);
                updateToken();
            });
        },
        [state, history, recaptchaToken, updateToken]
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
