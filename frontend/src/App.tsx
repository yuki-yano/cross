import React from "react"
import { BrowserRouter as Router, Route } from "react-router-dom"
import { hot } from "react-hot-loader"

import Home from "./pages/Home"
import NavBar from "./components/NavBar"
import SignIn from "./pages/SignIn"
import Callback from "./pages/Callback"
import Users from "./pages/Users"

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
