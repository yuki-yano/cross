import React, { useEffect } from "react"
import { Redirect } from "react-router-dom"
import { Action } from "redux"
import { connect } from "react-redux"
import { ThunkDispatch } from "redux-thunk"
import queryString from "query-string"

import { Callback as CallbackComponent } from "../../components/Callback"
import { State } from "../../store"
import { signin, signinFailed, getLoginState, State as SigninState } from "../../modules/signin"

export type Props = ReturnType<typeof mapStateToProps> & ReturnType<typeof mapDispatchToProps>

const mapStateToProps = (state: State) => {
  return getLoginState(state.signin)
}

const mapDispatchToProps = (dispatch: ThunkDispatch<SigninState, undefined, Action>) => ({
  onSignin(payload: { code: string; stateCode: string }) {
    try {
      dispatch(signin(payload))
    } catch (e) {
      console.error(e)
    }
  },
  onSigninFailed(payload: { error: Error }) {
    dispatch(signinFailed(payload))
  }
})

const CallbackContainer: React.FC<Props> = ({
  stateCode,
  isLogin,
  isLoading,
  loginError,
  onSignin,
  onSigninFailed
}) => {
  useEffect(() => {
    const parsed = queryString.parse(location.search)
    const { code, state } = parsed

    if (!isLogin && typeof code === "string" && typeof state === "string") {
      if (state === stateCode) {
        onSignin({ code, stateCode })
      } else {
        onSigninFailed({ error: new Error("Stateが一致しません") })
      }
    } else {
      onSigninFailed({ error: new Error("URLが不正です") })
    }
  }, [])

  let message: string = ""

  if (isLoading) {
    message = "ログイン処理中です"
  } else if (loginError) {
    message = loginError.message
  }

  return isLogin ? <Redirect to="/" /> : <CallbackComponent message={message} />
}

export const Callback = connect(
  mapStateToProps,
  mapDispatchToProps
)(CallbackContainer)
