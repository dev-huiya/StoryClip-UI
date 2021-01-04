import React, { useState, useEffect, useReducer, useCallback, useRef } from "react";
import { Link, Redirect, useHistory } from "react-router-dom";
import store from "store";
import { ReCaptcha, loadReCaptcha } from 'react-recaptcha-v3'

import { version, description } from "../../package.json";

import LoginArea from "./parts/LoginArea";
import JoinArea from "./parts/JoinArea";

let interval = null
function Page({ ...props }) {
    let history = useHistory();

    // 리캡챠 코드
    const recaptcha = useRef(null);
    const [ recaptchaToken, setRecaptchaToken ] = useState("");

    useEffect(() => {
        loadReCaptcha(process.env.REACT_APP_RECAPTCHA_SITE_KEY, (e) => { });

        interval = window.setInterval(updateToken, 100 * 1000);
        return () => {
            window.clearInterval(interval);

            // 로그인 페이지를 이탈할때 리캡챠 UI와 스크립트 제거
            const nodeBadge = document.querySelector('.grecaptcha-badge');
            if (nodeBadge) {
                document.body.removeChild(nodeBadge.parentNode);
            }

            const scriptSelector = 'script[src^=\'https://www.recaptcha.net/recaptcha/api.js\']';
            const script = document.querySelector(scriptSelector);
            if (script) {
                script.remove();
            }
        }
    }, []);

    const verifyCallback = useCallback((recaptchaToken) => {
        // Here you will get the final recaptchaToken!!!
        // console.log(recaptchaToken, "<= your recaptcha token");
        setRecaptchaToken(recaptchaToken);
    }, []);

    const updateToken = useCallback(() => {
        // you will get a new token in verifyCallback
        recaptcha.current.execute();
    }, [recaptcha]);
    // 리캡챠 코드 종료

    useEffect(()=>{
        // TODO: useEffect가 느려서 잘보면 로그인 UI가 힐긋 보인다.
        let user = store.get('user');
        if(!!user && !!user.token && !!user.key) {
            history.push("/");
            // 로그인이 되어있을 경우 메인으로 이동
        }
    }, [])

    return (
        <React.Fragment>
            <div className="flex flex-center w-full h-full" >
                <div className="flex">
                    <div style={{width:"300px"}}>
                        <LoginArea 
                            recaptchaToken={recaptchaToken}
                            updateToken={updateToken}
                        />
                    </div>
                    <div style={{width:"300px", marginLeft:"20px"}}>
                        <JoinArea 
                            recaptchaToken={recaptchaToken}
                            updateToken={updateToken}
                        />
                    </div>
                    <ReCaptcha 
                        ref={recaptcha} 
                        sitekey={process.env.REACT_APP_RECAPTCHA_SITE_KEY}
                        action="join" 
                        verifyCallback={verifyCallback} 
                    />
                </div>
            </div>
            
            
        </React.Fragment>
    );
}

export default Page;
