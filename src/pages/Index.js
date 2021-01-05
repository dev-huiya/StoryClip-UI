import React, { useCallback, useEffect, useState } from "react";

import query from "api";
import Button from "Components/Button"
import { Link } from "react-router-dom";
import Auth from "Auth";
import Header from "./parts/Header";

const animationOptions = {
    appear: true,
    mountOnEnter: true,
    unmountOnExit: true,
}

function Page({ ...props }) {

    return (
        <React.Fragment>
            <Header />
            <div className="flex flex-center w-full h-full" >
                <div className="flex">
                    <div style={{width:"600px"}}>
                        <h2>Main page</h2>
                        <div style={{marginTop: "20px"}}>
                            <div>
                                <Button
                                    label={"테스트 페이지"}
                                    onClick={()=>{ props.history.push('/test'); }}
                                    color="blue-gradient" 
                                    type="button" 
                                />
                                <Link to="/test" >테스트 페이지 2</Link>
                                <Button
                                    label={"api 토큰 만료 테스트"}
                                    onClick={() => {
                                        query({
                                            url: "/auth/key",
                                        }).then(res=>{
                                            console.log("then ", res);
                                        }).catch(err=>{
                                            console.log(err);
                                        })
                                    }}
                                    color="blue-gradient" 
                                    type="button" 
                                />
                                <Button
                                    label={"토큰 갱신"}
                                    onClick={async () => {
                                        await Auth.refresh();
                                    }}
                                    color="blue-gradient" 
                                    type="button" 
                                />
                                <Button
                                    label={"로그아웃"}
                                    onClick={()=>{ props.history.push('/logout'); }}
                                    color="blue-gradient" 
                                    type="button" 
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </React.Fragment>
    );
}

export default Page;
