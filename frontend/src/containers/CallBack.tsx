import React from "react"
import { Dispatch } from "redux"
import { connect } from "react-redux"
import { compose, lifecycle } from "recompose"

import { AppState } from "../store"
import { SigninState, SigninAction } from "../modules/signin/types"
import { signinStarted } from "../modules/signin/actions"

type Props = ReturnType<typeof mapStateToProps> & ReturnType<typeof mapDispatchToProps>

const Callback: React.FC<Props> = (props: Props) => {
  let message = ""
  if (props.loggingIn) {
    message = "ログイン処理中です"
  } else if (!props.loginError) {
    message = "ログインに成功しました"
  } else {
    message = "ログインに失敗しました"
  }

  return (
    <>
      <div>{message}</div>
    </>
  )
}

const mapStateToProps = (state: AppState): SigninState => ({
  ...state.signin
})

const mapDispatchToProps = (dispatch: Dispatch<SigninAction>) => ({
  onSignin(payload: { code: string; state: string }) {
    dispatch(signinStarted(payload))
  }
})

const enhancer = compose<Props, {}>(
  connect(
    mapStateToProps,
    mapDispatchToProps
  ),
  lifecycle<Props, {}>({
    componentDidMount() {
      const url = new URL(document.URL)
      const code = url.searchParams.get("code") || ""
      const state = url.searchParams.get("state") || ""
      this.props.onSignin({ code, state })
    }
  })
)

export default enhancer(Callback)
