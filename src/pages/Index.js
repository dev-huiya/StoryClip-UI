import React, { Component } from "react";

import query from "api";
import { Link } from "react-router-dom";
import Header from "./parts/Header";

const animationOptions = {
    appear: true,
    mountOnEnter: true,
    unmountOnExit: true,
}

class Page extends Component {
    constructor(props) {
        super(props);
        this.state = {
            projects: [],
        }
    }

    componentDidMount() {
        this.loadProject();
    }

    loadProject = () => {
        query({
            url: "/project/list",
            method: "GET"
        }).then(res=>{
            console.log(res);
            this.setState({
                projects: res,
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
                            <h2>Main page</h2>
                            <div
                                style={{marginTop: "20px"}}
                                className="flex flex-wrap"
                            >
                                {this.state.projects.map((project,i)=>{
                                    return (
                                        <Link
                                            to={`/PJ${project.projectId}`}
                                            alt={`${project.title}로 이동`}
                                            key={i}
                                            style={{
                                                textDecoration: "none",
                                                color: "#333",
                                            }}
                                        >
                                            <div
                                                style={{
                                                    width: "200px",
                                                    height: "100px",
                                                    margin: "5px",
                                                }}
                                            >
                                                <h3>{project.title}</h3>
                                                <p>{project.description}</p>
                                                <p style={{fontSize:"0.8em"}}>생성일: {project.createDate}</p>
                                                <p style={{fontSize:"0.8em"}}>작업일: {project.modifyDate}</p>
                                            </div>
                                        </Link>
                                    )
                                })}
                            </div>
                        </div>
                    </div>
                </div>
            </React.Fragment>
        );
    }
}

export default Page;
