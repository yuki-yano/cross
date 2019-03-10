import React from "react"
import { Provider } from "react-redux"
import { PersistGate } from "redux-persist/integration/react"
import { Router, Route, Switch } from "react-router-dom"
import { hot } from "react-hot-loader/root"

import { configureStore, history } from "./store"
import { NavRouter } from "./routes"
import { Navbar } from "./containers/Navbar"
import { Auth } from "./containers/Auth"
import { SignIn } from "./containers/SignIn"
import { Callback } from "./containers/Callback"

import { Container } from "./components/common/Container"

const { store, persistor } = configureStore()

const AppComponent = hot(() => (
  <Router history={history}>
    <Switch>
      <Route path="/login" component={SignIn} />
      <Route path="/callback" component={Callback} />

      <Auth>
        <Navbar />
        <Container>
          <NavRouter />
        </Container>
      </Auth>
    </Switch>
  </Router>
))

export const App = () => (
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <AppComponent />
    </PersistGate>
  </Provider>
)
