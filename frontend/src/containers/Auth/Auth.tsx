import React from "react"
import { connect } from "react-redux"
import { Redirect } from "react-router-dom"

import { State } from "../../store"
import { State as SigninState } from "../../modules/signin"

type OwnProps = { children: Array<JSX.Element> }

export type Props = OwnProps & ReturnType<typeof mapStateToProps>

const mapStateToProps = (state: State): SigninState => ({
  ...state.signin
})

const AuthContainer: React.FC<Props> = props => (props.isLogin ? <>{props.children}</> : <Redirect to="/login" />)

export const Auth = connect(mapStateToProps)(AuthContainer)
