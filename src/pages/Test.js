import React, {Component} from 'react';
import query from "api"

import jwt from "jsonwebtoken";
import {Button} from 'Components';
import Header from "./parts/Header";
import Dialog from "../Components/Dialog";
import Auth from "../Auth";

class Page extends Component {
    constructor(props) {
        super(props);
        this.state = {
            dialogOpen: false
        }
    }

    openDialog = () => {
        this.setState({
            dialogOpen: true
        })
    }

    closeDialog = () => {
        this.setState({
            dialogOpen: false
        })
    }

    render() {
        const {dialogOpen} = this.state
        return (
            <React.Fragment>
                <Header />
                <div className="flex flex-center w-full h-full">
                    <div className="flex">
                        <div style={{width: "600px"}}>
                            <h2>Test page</h2>
                            <div style={{marginTop: "20px"}}>
                                <div>
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
                                    <Dialog
                                        trigger={
                                            <img src="/favicon.ico" alt="buttonLogo"/>
                                        }
                                        afterOpen={this.openDialog}
                                        onOpen={this.state.dialogOpen}
                                        width={"1000px"}
                                        height={"500px"}
                                        disabled={false}
                                        title={'다이얼로그 명'}
                                        body={
                                            <React.Fragment>
                                                <div> Hello World </div>
                                            </React.Fragment>
                                        }
                                        submit={
                                            <React.Fragment>
                                                <Button label={"확인"} color="blue-gradient" type="button"
                                                        onClick={this.closeDialog}/>
                                                <Button label={"취소"} color="blue-gradient" type="button"
                                                        onClick={this.closeDialog}/>
                                            </React.Fragment>
                                        }
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </React.Fragment>
        )
    }
}

export default Page;