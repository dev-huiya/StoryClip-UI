const SET_USER = 'user/SET'

export const setUser = user => ({ type: SET_USER, user });

const initState = {

}

export default function user(state= initState, action) {
    switch (action.type) {
        case SET_USER:
            return {
                ...action.user
            }
        default:
            return state;
    }
}