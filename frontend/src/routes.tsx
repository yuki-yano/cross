import React from "react"
import { Route, Switch } from "react-router-dom"

import { Home } from "./containers/Home"
import { Users } from "./containers/Users"
import { SignOut } from "./containers/SignOut"

export function NavRouter() {
  return (
    <Switch>
      <Route exact={true} path="/" component={Home} />
      <Route path="/users" component={Users} />
      <Route path="/logout" component={SignOut} />
    </Switch>
  )
}
