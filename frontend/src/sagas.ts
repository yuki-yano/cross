import { all, fork } from "redux-saga/effects"

import signin from "./modules/signin/sagas"

function* root() {
  yield all([fork(signin)])
}

export default root
