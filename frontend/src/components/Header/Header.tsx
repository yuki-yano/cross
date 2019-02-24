import React from "react"
import { Link } from "react-router-dom"

import { State as SigninState } from "../../modules/signin"

export type Props = SigninState

export const Header: React.FC<Props> = ({ userName }) => {
  return (
    <nav className="navbar is-spaced has-shadow" role="navigation" aria-label="main navigation">
      <div className="container">
        <div className="navbar-menu">
          <div className="navbar-start">
            <Link to="/" className="navbar-item">
              Home
            </Link>
            <Link to="/users" className="navbar-item">
              Users
            </Link>
            <Link to="/logout" className="navbar-item">
              Logout
            </Link>
          </div>
        </div>
        <div className="navbar-end">
          <div className="navbar-item">
            <div className="buttons">
              <span className="button is-light">{userName}</span>
            </div>
          </div>
        </div>
      </div>
    </nav>
  )
}
