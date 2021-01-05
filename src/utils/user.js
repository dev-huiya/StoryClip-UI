import query from "../api";
import _ from "lodash";
import store from "store";

import reducer from "common/reducer"
import { setUser } from "common/reducer/user";

const userKeys = [
    'email',
    'penName',
    'profile',
]

export const loadUser = () => {
    let token = store.get('token');

    if(!token || !token.token || !token.key) {
        console.log("loadUser token is empty");
        reducer.dispatch(setUser(null));
        return false;
    }

    query({
        url: "/account/info"
    })
    .then(res=>{
        console.log(res);

        let user = _.pick(res, userKeys);
        reducer.dispatch(setUser(user));
    })
    .catch(err=>{
        console.log(err);
        reducer.dispatch(setUser(null));
    })
}