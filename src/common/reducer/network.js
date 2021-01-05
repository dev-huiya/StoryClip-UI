const SET_NETWORK_STATUS = 'network/SET'

export const setNetworkStatus = isLoading => ({ type: SET_NETWORK_STATUS, isLoading });

const initState = {
    isLoading: false,
}

export default function network(state= initState, action) {
    switch (action.type) {
        case SET_NETWORK_STATUS:
            return {
                ...state,
                isLoading: action.isLoading
            }
        default:
            return state;
    }
}