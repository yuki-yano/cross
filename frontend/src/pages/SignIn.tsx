import React from "react"
import Cookies from "js-cookie"
import uuid from "uuid/v4"

export default function SignIn() {
  return (
    <>
      <a href={signInUrl()} className="button is-primary">
        Login with Slack
      </a>
    </>
  )
}

function signinState() {
  const state = uuid()
  Cookies.set("SigninState", state)
  return state
}

function signInUrl() {
  return `https://slack.com/oauth/authorize?client_id=${process.env.SLACK_USER_CLIENT_ID}&scope=${
    process.env.SLACK_SCOPES
  }&state=${signinState()}`
}
