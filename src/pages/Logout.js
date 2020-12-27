import React, { useState, useEffect, useReducer, useCallback } from "react";
import { Link } from "react-router-dom";
import jwt from "jsonwebtoken";
import store from "store";
import _ from "lodash";

import query from "api";
import Auth from "Auth";

function Page({ ...props }) {

    useEffect(()=>{
        let user = store.get('user');
        if(!!user && !!user.token && !!user.key) {
            // 토큰이 있을때만 토큰 만료 처리
            query({
                url: "/auth/signout",
                method: "DELETE",
            })
            .then((res) => {
                console.log(res);
            })
            .finally((e)=>{
                Auth.clearToken();

                console.log("logout component: logout success");
                props.history.push('/login');
            })
        } else {
            props.history.push('/login');
        }
        
    }, [])
    
    return null;
}

export default Page;
