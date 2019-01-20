import { fork, put, call, takeEvery } from "redux-saga/effects"

import { fetchAuth, AuthResponse } from "../../services/api"
import { signinStarted, signinDone, signinFailed, SIGNIN_STARTED } from "./actions"

function* authorize(action: ReturnType<typeof signinStarted>) {
  const accessToken = localStorage.getItem("AccessToken")
  if (accessToken) {
    yield put(signinDone({ accessToken }))
    return
  }

  const { code, state } = action.payload
  const { resolve, reject }: AuthResponse = yield call(fetchAuth, code, state)

  if (localStorage.getItem("StateCode") !== state) {
    yield put(signinFailed({ error: new Error("Stateが一致しません") }))
    return
  }

  if (resolve) {
    yield put(signinDone({ accessToken: resolve.accessToken }))
    localStorage.setItem("AccessToken", resolve.accessToken)
  } else if (reject) {
    reject.error.message = reject.message
    yield put(signinFailed({ error: reject.error }))
  }
}

function* loadAuthorization() {
  const accessToken = localStorage.getItem("AccessToken")

  if (accessToken) {
    yield put(signinDone({ accessToken }))
  }
}

export default function* root() {
  yield fork(loadAuthorization)
  yield takeEvery(SIGNIN_STARTED, authorize)
}
