import React, { useEffect } from "react"
import { Dispatch } from "redux"
import { connect } from "react-redux"

import { SIGN_IN_URL } from "../../consts"
import { State } from "../../store"
import { signout } from "../../modules/signin"
import { SignOut as SignOutComponent } from "../../components/SignOut"

type Props = ReturnType<typeof mapStateToProps> & ReturnType<typeof mapDispatchToProps>

const mapStateToProps = (_state: State) => ({})

const mapDispatchToProps = (dispatch: Dispatch) => ({
  onSignOut() {
    dispatch(signout())
  }
})

const SignOutContainer: React.FC<Props> = props => {
  useEffect(() => {
    props.onSignOut()
  }, [])

  return <SignOutComponent redirectUrl={SIGN_IN_URL} />
}

export const SignOut = connect(
  mapStateToProps,
  mapDispatchToProps
)(SignOutContainer)
