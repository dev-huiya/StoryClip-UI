import React, { useCallback, useEffect, useState } from "react";
import _ from "lodash";
import store from "store";

import query from "api";
import Button from "Components/Button"
import Image from "Components/Image"
import { Link } from "react-router-dom";
import Auth from "Auth";

const animationOptions = {
    appear: true,
    mountOnEnter: true,
    unmountOnExit: true,
}

function Page({ ...props }) {
    const [ info, setInfo ] = useState({
        profile: "",
        email: "",
        penName: "",
        refreshToken: "",
    })

    const setInfomation = useCallback(()=>{
        setInfo(store.get('user').info);
    }, [setInfo])

    useEffect(()=>{
        setInfomation();
    }, [])

    return (
        <React.Fragment>
            <div className="flex flex-center w-full h-full" >
                <div className="flex">
                    <div style={{width:"600px"}}>
                        <h2>Main page</h2>
                        <div style={{marginTop: "20px"}}>
                            <div className="flex">
                                <div>profile: </div>
                                <div
                                    style={{
                                        wordBreak: "break-all",
                                        marginLeft: "20px",
                                    }}
                                >
                                    <Image 
                                        width="200px"
                                        height="200px"
                                        src={store.get('user').info.profile} 
                                    />
                                </div>
                            </div>
                            <div className="flex">
                                <div>email: </div>
                                <div
                                    style={{
                                        wordBreak: "break-all",
                                        marginLeft: "20px",
                                    }}
                                >{info.email}</div>
                            </div>
                            <div className="flex">
                                <div>pen name: </div>
                                <div
                                    style={{
                                        wordBreak: "break-all",
                                        marginLeft: "20px",
                                    }}
                                >{info.penName}</div>
                            </div>
                            <div className="flex">
                                <div>refresh_token: </div>
                                <div
                                    style={{
                                        wordBreak: "break-all",
                                        marginLeft: "20px",
                                    }}
                                >{info.refreshToken}</div>
                            </div>
                            <div>
                                <Button
                                    label={"테스트 페이지"}
                                    onClick={()=>{ props.history.push('/test'); }}
                                    color="blue-gradient" 
                                    type="button" 
                                />
                                <Link to="/test" >테스트 페이지 2</Link>
                                <Button
                                    label={"토큰 갱신"}
                                    onClick={async () => {
                                        await Auth.refresh();
                                        setInfomation();
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
