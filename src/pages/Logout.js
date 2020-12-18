import React, { useState, useEffect, useReducer, useCallback } from "react";
import { Link } from "react-router-dom";
import jwt from "jsonwebtoken";
import store from "store";
import _ from "lodash";

function Page({ ...props }) {

    useEffect(()=>{
        store.clearAll();
        console.log("logout component: logout success");
        props.history.push('/login');
    }, [])
    
    return null;
}

export default Page;
