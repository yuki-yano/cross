import { combineReducers } from "redux"

import { AppState } from "./store"
import { userReducer } from "./modules/user"

export default combineReducers<AppState>({
  user: userReducer
})
