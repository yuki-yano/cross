import React from "react"
import { BrowserRouter as Router, Route, Switch } from "react-router-dom"
import { hot } from "react-hot-loader/root"

import { NavRouter } from "./routes"
import { Auth } from "./containers/Auth"
import { SignIn } from "./containers/SignIn"
import { Callback } from "./containers/Callback"

import { Header } from "./containers/Header"

function AppComponent() {
  return (
    <Router>
      <Switch>
        <Route path="/login" component={SignIn} />
        <Route path="/callback" component={Callback} />

        <Auth>
          <Header />
          <section className="section">
            <div className="container">
              <NavRouter />
            </div>
          </section>
        </Auth>
      </Switch>
    </Router>
  )
}

export const App = hot(AppComponent)
