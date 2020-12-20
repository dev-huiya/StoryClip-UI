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
    const initState = {
        email: "",
        password: "",
        password_confirm: "",
        penName: "",
        profile: "",
        recaptchaToken: "",
    }
    const [state, dispatch] = useReducer(reducer, initState);
    let history = useHistory();

    const form = useRef(null);
    const resetState = useCallback(()=>{
        form.current.reset();
        Object.keys(initState).forEach(key=>{
            dispatch({
                type: "ChangeInput",
                name: key,
                value: "",
            })
        })
    }, [form, initState])

    // 리캡챠 코드
    const recaptcha = useRef(null);

    useEffect(() => {
        loadReCaptcha(process.env.REACT_APP_RECAPTCHA_SITE_KEY, (e) => { });

        interval = window.setInterval(updateToken, 100 * 1000);
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
        setLoading(true);

        // TODO: 가입시 validation 추가 바람

        if (!state.email || !state.password) {
            showToast("이메일 혹은 비밀번호가 입력되지 않았습니다.", "red");
            return false;
        }

        const formData = new FormData();
        formData.append('email', state.email);
        formData.append('password', state.password);
        formData.append('penName', state.penName);
        formData.append('profile', state.profile);
        formData.append('recaptchaToken', state.recaptchaToken);
        
        query({
            url: "/account/signup",
            method: "POST",
            data: formData,
        })
        .then((res) => {
            console.log(res);

            if(res.join == true) {
                showToast("가입에 성공했습니다.", "green");
                resetState();
            } else {
                showToast("가입에 실패했습니다.", "red");
            }
        })
        .catch((e) => {
            console.log(e)
        })
        .finally(()=>{
            setLoading(false);
            updateToken();
        })
    }, [state, history]);

    return (
        <React.Fragment>
            <h2>회원가입</h2>
            <form
                ref={form}
            >
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
                    value={state.penName} 
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
            </form>
            
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