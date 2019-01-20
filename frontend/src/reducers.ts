import { combineReducers } from "redux"

import { AppState } from "./store"
import signinReducer from "./modules/signin/reducers"

export default combineReducers<AppState>({
  signin: signinReducer
})
