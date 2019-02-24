import React, { useEffect } from "react"
import { Redirect } from "react-router-dom"
import { Action } from "redux"
import { connect } from "react-redux"
import { ThunkDispatch } from "redux-thunk"
import queryString from "query-string"

import { State } from "../../store"
import { signinStarted, State as SigninState } from "../../modules/signin"

export type Props = ReturnType<typeof mapStateToProps> & ReturnType<typeof mapDispatchToProps>

const mapStateToProps = (state: State): SigninState => ({
  ...state.signin
})

const mapDispatchToProps = (dispatch: ThunkDispatch<SigninState, undefined, Action>) => ({
  onSignin(payload: { code: string; stateCode: string }) {
    try {
      dispatch(signinStarted(payload))
    } catch (e) {
      console.error(e)
    }
  }
})

const CallbackContainer: React.FC<Props> = props => {
  let message = ""

  useEffect(() => {
    const parsed = queryString.parse(location.search)
    const { code, state: stateCode } = parsed

    if (typeof code === "string" && typeof stateCode === "string") {
      props.onSignin({ code, stateCode })
    } else {
      message = "URLが不正です"
    }
  }, [])

  if (props.isLoading) {
    message = "ログイン処理中です"
  } else if (props.loginError) {
    message = "ログインに失敗しました"
  }

  return props.isLogin ? <Redirect to="/" /> : <>{message}</>
}

export const Callback = connect(
  mapStateToProps,
  mapDispatchToProps
)(CallbackContainer)
