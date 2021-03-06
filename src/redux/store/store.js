import {applyMiddleware, compose, createStore} from "redux";
import rootReducer from "../reducers/rootReducer";
import thunk from "redux-thunk";

const initialState = {
    filesUploading: [],
};
const middleware = [thunk];
const store = createStore(
    rootReducer,
    initialState,
    compose(
        applyMiddleware(...middleware),
        window.__REDUX_DEVTOOLS_EXTENSION__
            ? window.__REDUX_DEVTOOLS_EXTENSION__()
            : f => f
    ));
export default store;
