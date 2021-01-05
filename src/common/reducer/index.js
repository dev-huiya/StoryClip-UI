import {combineReducers, createStore} from 'redux';
import network from "./network"
import user from "./user"

const rootReducer = () => {
    return combineReducers({
        network,
        user,
    })
}

const devTools =
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__();
const store = createStore(rootReducer(), devTools);

export default store;