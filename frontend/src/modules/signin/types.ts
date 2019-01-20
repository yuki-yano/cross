import { signinStarted, signinDone, signinFailed } from "./actions"

export type SigninState = {
  accessToken: string
  loggingIn: boolean
  loginError?: Error
}

export type SigninAction = ReturnType<typeof signinStarted | typeof signinDone | typeof signinFailed>
