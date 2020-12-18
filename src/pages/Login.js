import React, { useState, useEffect, useReducer, useCallback, useRef } from "react";
import { Link, Redirect, useHistory } from "react-router-dom";
import jwt from "jsonwebtoken";
import store from "store";
import _ from "lodash";
import { ReCaptcha, loadReCaptcha } from 'react-recaptcha-v3'

import reducer from "utils/reducer";
import { Input, Button } from "Components";
import query, { getErrorMessage } from "api";
import { showToast } from "utils";

import { version, description } from "../../package.json";

import LoginArea from "./LoginArea";
import JoinArea from "./JoinArea";

function Page({ ...props }) {
    let history = useHistory();

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
                        <LoginArea />
                    </div>
                    <div style={{width:"300px", marginLeft:"20px"}}>
                        <JoinArea />
                    </div>

                </div>
            </div>
            
            
        </React.Fragment>
    );
}

export default Page;
