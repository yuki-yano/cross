import { createStore, applyMiddleware, compose } from "redux"
import logger from "redux-logger"
import thunk from "redux-thunk"
import { persistReducer, persistStore, Persistor } from "redux-persist"
import storage from "redux-persist/lib/storage"

import { accessToken } from "./middlewares/accessToken"

import { rootReducer } from "./reducers"

import { State as SigninState } from "./modules/signin"
import { State as UsersState } from "./modules/users"

export type State = {
  signin: SigninState
  users: UsersState
}

export type Store = ReturnType<typeof configureStore>["store"]

const persistConfig = {
  key: "cross",
  storage,
  whitelist: ["signin"]
}

let persistor: Persistor

const createEnhancer = () => {
  const middleware = [accessToken, thunk, logger]

  const composeEnhancers =
    process.env.NODE_ENV !== "production" && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
      ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({})
      : compose

  return composeEnhancers(applyMiddleware(...middleware))
}

export const configureStore = (initialState = {}) => {
  const enhancer = createEnhancer()
  const persistedReducer = persistReducer(persistConfig, rootReducer)
  const store = createStore(persistedReducer, initialState, enhancer)
  persistor = persistStore(store)

  return { store, persistor }
}

export const cleanPersistor = () => {
  if (persistor) {
    persistor.purge()
  }
}
