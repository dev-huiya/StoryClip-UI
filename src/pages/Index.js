import React, { useCallback, useEffect, useState } from "react";
import _ from "lodash";
import store from "store";

import query from "api";
import Button from "Components/Button"

const animationOptions = {
    appear: true,
    mountOnEnter: true,
    unmountOnExit: true,
}

function Page({ ...props }) {

    return (
        <React.Fragment>
            <div className="flex flex-center w-full h-full" >
                <div className="flex">
                    <div style={{width:"600px"}}>
                        <h2>Main page</h2>
                        <div style={{marginTop: "20px"}}>
                            <div className="flex">
                                <div>token: </div>
                                <div
                                    style={{
                                        wordBreak: "break-all",
                                        marginLeft: "20px",
                                    }}
                                >{store.get('user').token}</div>
                            </div>
                            <div className="flex">
                                <div>refresh_token: </div>
                                <div
                                    style={{
                                        wordBreak: "break-all",
                                        marginLeft: "20px",
                                    }}
                                >{store.get('user').refreshToken}</div>
                            </div>
                            <div>
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
