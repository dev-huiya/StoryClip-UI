import query from "../api";
import _ from "lodash";
import store from "store";

import reducer from "common/reducer"
import { setUser } from "common/reducer/user";
import jwt from "jsonwebtoken";

export const loadUser = () => {
    let token = store.get('token');

    if(!token || !token.token || !token.key) {
        console.log("loadUser token is empty");
        reducer.dispatch(setUser(null));
        return false;
    }

    try {
        let result = jwt.verify(token.token, token.key);
        reducer.dispatch(setUser(result.info));
    } catch (e) {
        reducer.dispatch(setUser(null));
    }
}