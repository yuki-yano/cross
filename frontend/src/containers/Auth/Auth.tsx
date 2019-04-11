import React from "react"
import { connect } from "react-redux"
import { Redirect } from "react-router-dom"

import { Auth as AuthComponent } from "../../components/Auth"
import { State } from "../../store"
import { getIsLogin } from "../../modules/signin"

export type Props = ReturnType<typeof mapStateToProps>

const mapStateToProps = (state: State) => getIsLogin(state.signin)

const AuthContainer: React.FC<Props> = ({ isLogin, children }) =>
  isLogin ? <AuthComponent>{children}</AuthComponent> : <Redirect to="/login" />

export const Auth = connect(mapStateToProps)(AuthContainer)
