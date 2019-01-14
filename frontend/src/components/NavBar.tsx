import React from "react"
import { Link } from "react-router-dom"

export default function NavBar() {
  return (
    <nav className="navbar is-spaced has-shadow" role="navigation" aria-label="main navigation">
      <div className="container">
        <div className="navbar-menu">
          <div className="navbar-start">
            <Link to="/" className="navbar-item">
              Home
            </Link>
            <Link to="/signin" className="navbar-item">
              SignIn
            </Link>
            <Link to="/users" className="navbar-item">
              Users
            </Link>
          </div>
        </div>
      </div>
    </nav>
  )
}
