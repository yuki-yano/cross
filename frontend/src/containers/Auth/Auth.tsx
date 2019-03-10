import React from "react"
import { connect } from "react-redux"
import { Redirect } from "react-router-dom"

import { Auth as AuthComponent } from "../../components/Auth"
import { State } from "../../store"
import { getIsLogin } from "../../modules/signin"

type OwnProps = { children: JSX.Element | Array<JSX.Element> }

export type Props = OwnProps & ReturnType<typeof mapStateToProps>

const mapStateToProps = (state: State) => getIsLogin(state.signin)

const AuthContainer: React.FC<Props> = ({ isLogin, children }) =>
  isLogin ? <AuthComponent>{children}</AuthComponent> : <Redirect to="/login" />

export const Auth = connect(mapStateToProps)(AuthContainer)
