import { combineReducers } from "redux"

import { State } from "./store"
import { reducer as signinReducer } from "./modules/signin"
import { reducer as usersReducer } from "./modules/users"

export const rootReducer = combineReducers<State>({
  signin: signinReducer,
  users: usersReducer
})

export const none = (_: any) => _
