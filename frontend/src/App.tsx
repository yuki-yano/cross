import React from "react"
import { BrowserRouter as Router, Route } from "react-router-dom"
import { hot } from "react-hot-loader"

import Home from "./containers/Home"
import SignIn from "./containers/SignIn"
import Callback from "./containers/Callback"
import Users from "./containers/Users"

import NavBar from "./components/NavBar"

function App() {
  return (
    <Router>
      <div>
        <NavBar />

        <section className="section">
          <div className="container">
            <Route exact={true} path="/" component={Home} />
            <Route path="/signin" component={SignIn} />
            <Route path="/callback" component={Callback} />
            <Route path="/users" component={Users} />
          </div>
        </section>
      </div>
    </Router>
  )
}

export default hot(module)(App)
