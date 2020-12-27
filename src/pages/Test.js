import React, { Component } from 'react';
import query from "api"

import jwt from "jsonwebtoken";
import { Button } from 'Components';


function Page({ ...props }) {

    return (
        <React.Fragment>
            <div className="flex flex-center w-full h-full" >
                <div className="flex">
                    <div style={{width:"600px"}}>
                        <h2>Test page</h2>
                        <div style={{marginTop: "20px"}}>
                            <div>
                                <Button
                                    label={"메인 페이지"}
                                    onClick={()=>{ props.history.push('/'); }}
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