import React, { useState, useEffect, useReducer, useCallback, useRef } from "react";
import { Link, Redirect, useHistory } from "react-router-dom";
import jwt from "jsonwebtoken";
import store from "store";
import _ from "lodash";
import { ReCaptcha, loadReCaptcha } from "react-recaptcha-v3";

import reducer from "utils/reducer";
import { Input, Button } from "Components";
import query, { getErrorMessage } from "api";

import { showToast } from "utils";

let interval = null
function Page({ ...props }) {
    const [isLoading, setLoading] = useState(false);
    const [isDoJoin, setJoin] = useState(false);
    const [state, dispatch] = useReducer(reducer, {
        email: "",
        password: "",
        password_confirm: "",
        penName: "",
        profile: "",
        recaptchaToken: "",
    });
    let history = useHistory();

    // 리캡챠 코드
    const recaptcha = useRef(null);

    useEffect(() => {
        loadReCaptcha(process.env.REACT_APP_RECAPTCHA_SITE_KEY, (e) => { });

        window.setInterval(updateToken, 100 * 1000);
        return () => {
            window.clearInterval(interval);
        }
    }, []);

    const verifyCallback = useCallback((recaptchaToken) => {
        // Here you will get the final recaptchaToken!!!
        // console.log(recaptchaToken, "<= your recaptcha token");
        dispatch({
            type: "ChangeInput",
            name: "recaptchaToken",
            value: recaptchaToken,
        });
    }, []);

    const updateToken = useCallback(() => {
        // you will get a new token in verifyCallback
        recaptcha.current.execute();
    }, [recaptcha]);
    // 리캡챠 코드 종료

    const onEnterKey = useCallback((e) => {
        if (e.keyCode == 13) {
            doJoin();
        }
    }, [state]);

    const doJoin = useCallback(() => {
        console.log("do join")
        console.log(state);
    }, [state, history]);

    useEffect(()=>{
        console.log(state.recaptchaToken)

    }, [state])

    return (
        <React.Fragment>
            <h2>회원가입</h2>
            <Input 
                type="file" 
                label="프로필" 
                name="profile" 
                onChange={dispatch} 
            />
            <Input 
                name="email" 
                value={state.email} 
                onChange={dispatch} 
                className="w-full" 
                label="이메일" 
                required 
            />
            <Input 
                name="penName" 
                value={state.pen_name} 
                onChange={dispatch} 
                className="w-full" 
                label="필명" 
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
            <Input 
                name="password_confirm" 
                value={state.password_confirm} 
                type="password" 
                onChange={dispatch} 
                onKeyDown={onEnterKey} 
                className="w-full" 
                label="비밀번호 확인" 
                required 
            />
            <Button 
                label="회원가입" 
                className="w-full" 
                color="blue-gradient" 
                type="button" 
                onClick={doJoin} 
                isLoading={isLoading} 
            />
            <ReCaptcha 
                ref={recaptcha} 
                sitekey={process.env.REACT_APP_RECAPTCHA_SITE_KEY}
                action="join" 
                verifyCallback={verifyCallback} 
            />
        </React.Fragment>
    );
}

export default Page;
