import React from "react"
import ReactDOM from "react-dom"
import { Provider } from "react-redux"
import "bulma/css/bulma.css"

import App from "./App"
import configureStore from "./store"

const store = configureStore()

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.querySelector(".root")
)
