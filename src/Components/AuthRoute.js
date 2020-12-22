import React, { useCallback } from 'react';
import { Route, Redirect } from "react-router-dom";
import jwt from "jsonwebtoken";
import store from "store";

import { getErrorMessage } from "api"
import { showToast } from "utils"

function AuthRoute({ component: Component, render, withoutLogin = false, ...rest }) {

    const isLogin = useCallback(() => {
        try {
            let user = store.get('user');
            if(!!user && !!user.token && !!user.key) {
                let result = jwt.verify(user.token, user.key);
                console.log(result);
                console.log("token is verified", rest.location.pathname)
                return true;
            } else {
                console.log("no token", rest.location)
                // 토큰이나 키가 없을 때
                return false;
            }
        } catch (error) {
            // 검증 실패했을 때
            // TODO: 검증 실패시 refresh_token으로 다시 JWT 요청해야함.
            showToast(getErrorMessage(error.name), "red");
            console.error(error, rest.location.pathname);
            store.clearAll();
            return false;
        }
    }, []);
    
    return (
        <Route
            {...rest}
            render={props => {
                if(isLogin() === false) {
                    return (
                        <Redirect
                            to={{ 
                                pathname: '/login', 
                                state: { from: props.location.pathname }, 
                                // ↑ 로그인 후 원래 위치로 이동하기 위함
                            }}
                        />
                    )
                } else {
                    return render ? render(props) : <Component {...props} />
                }
            }}
        />
    );
}

export default AuthRoute;