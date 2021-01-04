import React, { useCallback, useEffect } from 'react';
import { Route, Redirect, useHistory } from "react-router-dom";

import Auth from "Auth"

function AuthRoute({ component: Component, render, withoutLogin = false, ...rest }) {

    // let history = useHistory();

    // useEffect(()=>{
    //     (async function doDeepVerify() {
    //         let result = await Auth.deepVerify();
    //         console.log("AuthRoute doDeepVerify:", result);
    //         if(result == false) {
    //             history.push("/logout")
    //         }
    //     })();
        
    // }, [history])
    
    return (
        <Route
            {...rest}
            render={props => {
                if(Auth.verify() === false) {
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