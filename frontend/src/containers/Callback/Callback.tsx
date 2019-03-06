import React, { useEffect } from "react"
import { Redirect } from "react-router-dom"
import { Action } from "redux"
import { connect } from "react-redux"
import { ThunkDispatch } from "redux-thunk"
import queryString from "query-string"

import { Callback as CallbackComponent } from "../../components/Callback"
import { State } from "../../store"
import { signin, signinFailed, State as SigninState } from "../../modules/signin"

export type Props = ReturnType<typeof mapStateToProps> & ReturnType<typeof mapDispatchToProps>

const mapStateToProps = (state: State): SigninState => ({
  ...state.signin
})

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

const CallbackContainer: React.FC<Props> = props => {
  useEffect(() => {
    const parsed = queryString.parse(location.search)
    const { code, state: stateCode } = parsed

    if (typeof code === "string" && typeof stateCode === "string") {
      if (stateCode === props.stateCode) {
        props.onSignin({ code, stateCode })
      } else {
        props.onSigninFailed({ error: new Error("Stateが一致しません") })
      }
    } else {
      props.onSigninFailed({ error: new Error("URLが不正です") })
    }
  }, [])

  let message: string = ""

  if (props.isLoading) {
    message = "ログイン処理中です"
  } else if (props.loginError) {
    message = props.loginError.message
  }

  return props.isLogin ? <Redirect to="/" /> : <CallbackComponent message={message} />
}

export const Callback = connect(
  mapStateToProps,
  mapDispatchToProps
)(CallbackContainer)
