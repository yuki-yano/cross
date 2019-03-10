import React, { useEffect } from "react"
import { Dispatch } from "redux"
import { connect } from "react-redux"
import uuid from "uuid/v4"

import { State } from "../../store"
import { readySignin, getStateCode } from "../../modules/signin"
import { SignIn as SignInComponent } from "../../components/SignIn"

type Props = ReturnType<typeof mapStateToProps> & ReturnType<typeof mapDispatchToProps>

const mapStateToProps = (state: State) => getStateCode(state.signin)

const mapDispatchToProps = (dispatch: Dispatch) => ({
  onReadySignin() {
    dispatch(readySignin({ stateCode: uuid() }))
  }
})

const SignInContainer: React.FC<Props> = ({ onReadySignin, stateCode }) => {
  useEffect(() => {
    onReadySignin()
  }, [])

  const signinUrl = `https://slack.com/oauth/authorize?client_id=${process.env.SLACK_USER_CLIENT_ID}&scope=${
    process.env.SLACK_SCOPES
  }&state=${stateCode}`

  return <SignInComponent signInUrl={signinUrl} />
}

export const SignIn = connect(
  mapStateToProps,
  mapDispatchToProps
)(SignInContainer)
