import React, { Component } from 'react';
import query from "api"

import jwt from "jsonwebtoken";

class Page extends Component {
    
    constructor(props){
        super(props);
        this.state = {
            response: "",
        }
    }
      
    componentDidMount() {
        // this.apiCall();
    }

    apiCall = (method) => {
        query({
            url: "/books",
            method,
            data: {
                "page" : 2,
            }
        }).then(res=>{
            console.log("TEST Component then")
            console.log(res);
            this.setState({
                response: JSON.stringify(res),
            })

        }).catch(error=>{
            console.log("TEST Component error")
            console.log(error);

            this.setState({
                response: JSON.stringify(error),
            })
        })
    }

    render() {
        return (
            <React.Fragment>
                <div>Test</div>

                {["GET"].map((method,i)=>(
                    <button
                        key={i}
                        onClick={()=>{
                            this.apiCall(method)
                        }}
                    >로그인 버튼</button>
                ))}
                

                <div>{this.state.response}</div>
            </React.Fragment>
            

        );
    }
}

export default Page;