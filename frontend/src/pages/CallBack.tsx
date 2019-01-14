import React from "react"
import { Action } from "redux"
import { connect } from "react-redux"
import { ThunkDispatch } from "redux-thunk"

import { signin, UserState, SigninStartedPayload } from "../modules/user"
import { AppState } from "../store"

type Props = ReturnType<typeof mapStateToProps> & ReturnType<typeof mapDispatchToProps>

class Callback extends React.PureComponent<Props, {}> {
  componentDidMount() {
    const url = new URL(document.URL)
    const code = url.searchParams.get("code") || ""
    const state = url.searchParams.get("state") || ""
    this.props.onSignin({ code, state })
  }

  render() {
    let message = ""
    if (this.props.loggingIn) {
      message = "ログイン処理中です"
    } else if (!this.props.loginError) {
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
}

const mapStateToProps = (state: AppState) => ({
  ...state.user
})

const mapDispatchToProps = (dispatch: ThunkDispatch<UserState, void, Action>) => ({
  async onSignin(payload: SigninStartedPayload) {
    try {
      await dispatch(signin.action(payload))
    } catch (error) {
      console.error(error)
    }
  }
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Callback)
