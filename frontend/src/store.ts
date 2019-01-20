import { createStore, applyMiddleware } from "redux"
import logger from "redux-logger"
import createSagaMiddleware from "redux-saga"

import reducer from "./reducers"
import sagas from "./sagas"

import { SigninState } from "./modules/signin/types"

export type AppState = {
  signin: SigninState
}

export default function configureStore(initialState = {}) {
  const sagaMiddleware = createSagaMiddleware()
  const middleware = [logger, sagaMiddleware]
  const store = createStore(reducer, initialState, applyMiddleware(...middleware))
  sagaMiddleware.run(sagas)

  return store
}
