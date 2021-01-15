import React, { Component } from "react";

import query from "api";
import { Link } from "react-router-dom";
import Header from "./parts/Header";
import _ from "lodash";

class Page extends Component {
    constructor(props) {
        super(props);
        this.state = {
            projectId: null,
            info: {},
        }
    }

    componentDidMount() {
        console.log(this.props)
        this.setState({
            projectId: this.props.match.params.projectId,
        }, ()=> {
            this.loadProject(this.state.projectId);
        })
        // this.loadProject();
    }

    loadProject = (projectId) => {
        query({
            url: `/project/${projectId}`,
            method: "GET"
        }).then(res=>{
            console.log(res);
            this.setState({
                info: res,
            })
        })
    }

    render() {
        return (
            <React.Fragment>
                <Header/>
                <div className="flex flex-center w-full h-full">
                    <div className="flex">
                        <div style={{width: "600px"}}>
                            <h2>프로젝트 상세 페이지</h2>
                            <div
                                style={{marginTop: "20px"}}
                                className="flex flex-wrap"
                            >
                                <div
                                    style={{
                                        width: "200px",
                                        height: "100px",
                                        margin: "5px",
                                    }}
                                >
                                    <h3>{_.get(this.state, "info.title", "")}</h3>
                                    <p>{_.get(this.state, "info.description", "")}</p>
                                    <p style={{fontSize:"0.8em"}}>생성일: {_.get(this.state, "info.createDate", "")}</p>
                                    <p style={{fontSize:"0.8em"}}>작업일: {_.get(this.state, "info.modifyDate", "")}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </React.Fragment>
        );
    }
}

export default Page;
