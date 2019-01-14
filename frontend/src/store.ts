import { createStore, applyMiddleware } from "redux"
import logger from "redux-logger"
import thunk from "redux-thunk"

import reducer from "./reducer"

import { UserState } from "./modules/user"

export type AppState = {
  user: UserState
}

export default function configureStore(initialState = {}) {
  const middleware = [logger, thunk]
  const store = createStore(reducer, initialState, applyMiddleware(...middleware))

  return store
}
