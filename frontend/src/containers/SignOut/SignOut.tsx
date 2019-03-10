import React, { useEffect } from "react"
import { Dispatch } from "redux"
import { connect } from "react-redux"

import { SIGN_IN_URL } from "../../consts"
import { signout } from "../../modules/signin"
import { SignOut as SignOutComponent } from "../../components/SignOut"

type Props = ReturnType<typeof mapDispatchToProps>

const mapDispatchToProps = (dispatch: Dispatch) => ({
  onSignOut() {
    dispatch(signout())
  }
})

const SignOutContainer: React.FC<Props> = ({ onSignOut }) => {
  useEffect(() => {
    onSignOut()
  }, [])

  return <SignOutComponent redirectUrl={SIGN_IN_URL} />
}

export const SignOut = connect(
  () => ({}),
  mapDispatchToProps
)(SignOutContainer)
