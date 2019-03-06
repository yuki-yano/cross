import { Dispatch, Reducer } from "redux"
import { createSelector } from "reselect"
import produce from "immer"

import { State as RootState } from "../store"
import { getRequest } from "../services/api"

type User = {
  uid: string
  realName: string
  displayName: string
  phone: string
  imageUrl: string
}

export type State = {
  items: Array<User>
  error: Error | null
}

type FetchUsersAction = {
  type: typeof FETCH_USERS
}

export type Actions =
  | FetchUsersAction
  | ReturnType<typeof fetchUsersStarted | typeof fetchUserDone | typeof fetchUserFailed>

const initialState: State = {
  items: [],
  error: null
}

const FETCH_USERS = "FETCH_USERS"
const FETCH_USERS_STARTED = "FETCH_USERS_STARTED"
const FETCH_USERS_DONE = "FETCH_USERS_DONE"
const FETCH_USERS_FAILED = "FETCH_USERS_FAILED"

export const fetchUsers = () => async (dispatch: Dispatch) => {
  dispatch(fetchUsersStarted())

  const token = localStorage.getItem("AccessToken") || ""
  try {
    const users: Array<User> = await getRequest("/users", {}, token)
    dispatch(fetchUserDone({ users }))
  } catch (error) {
    dispatch(fetchUserFailed({ error }))
  }
  return
}

const fetchUsersStarted = () => ({
  type: FETCH_USERS_STARTED as typeof FETCH_USERS_STARTED
})

const fetchUserDone = (payload: { users: Array<User> }) => ({
  type: FETCH_USERS_DONE as typeof FETCH_USERS_DONE,
  payload
})

const fetchUserFailed = (payload: { error: Error }) => ({
  type: FETCH_USERS_FAILED as typeof FETCH_USERS_FAILED,
  payload
})

export const reducer: Reducer<State, Actions> = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_USERS: {
      return state
    }
    case FETCH_USERS_STARTED: {
      return state
    }
    case FETCH_USERS_DONE: {
      return produce(state, draft => {
        draft.items = action.payload.users
      })
    }
    case FETCH_USERS_FAILED: {
      return produce(state, draft => {
        draft.items = []
        draft.error = action.payload.error
      })
    }
    default: {
      const _: never = action
      const none = (_: any) => _
      none(_)

      return state
    }
  }
}

export const getUsers = createSelector(
  (state: RootState) => state.users,
  users => users
)
