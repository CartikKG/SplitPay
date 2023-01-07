
import {legacy_createStore,combineReducers,applyMiddleware} from "redux"
import thunk from "redux-thunk"
import Reducer from "../Reducers/Reducer"

const Store=legacy_createStore(Reducer,applyMiddleware(thunk))
export default Store;