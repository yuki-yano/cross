import { Dispatch } from "redux"
import actionCreatorFactory from "typescript-fsa"
import { reducerWithInitialState } from "typescript-fsa-reducers"
import { asyncFactory } from "typescript-fsa-redux-thunk"
import Cookies from "js-cookie"

import { fetchAuth } from "../services/api"

export type UserState = {
  accessToken: string
  loggingIn: boolean
  loginError?: { params: SigninStartedPayload } & { error: Error }
}

const initialState: UserState = {
  accessToken: "",
  loggingIn: false
}

export type SigninStartedPayload = {
  code: string
  state: string
}

export type SigninDonePayload = {
  accessToken: string
}

const actionCreator = actionCreatorFactory("SIGNIN")
const asyncActionCreator = asyncFactory<UserState>(actionCreator)

export const signin = asyncActionCreator<SigninStartedPayload, SigninDonePayload>(
  "SIGNIN",
  async (payload: SigninStartedPayload, _dispatch: Dispatch) => {
    if (Cookies.get("SigninState") !== payload.state) {
      throw new Error("Stateが一致しません")
    }

    try {
      return await fetchAuth(payload.code)
    } catch (error) {
      error.message = "認証に失敗しました"
      throw error
    }
  }
)

export const userReducer = reducerWithInitialState(initialState)
  .case(signin.async.started, state => {
    window.localStorage.setItem("AccessToken", "")
    return {
      ...state,
      loggingIn: true
    }
  })
  .case(signin.async.done, (state, { result: { accessToken } }) => {
    window.localStorage.setItem("AccessToken", accessToken)
    return {
      ...state,
      accessToken,
      loggingIn: false
    }
  })
  .case(signin.async.failed, (state, error) => ({
    ...state,
    loggingIn: false,
    loginError: error
  }))
