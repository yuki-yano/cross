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

type FetchUserStartedAction = {
  type: typeof FETCH_USER_STARTED
}

export type Actions = FetchUserStartedAction | ReturnType<typeof fetchUserDone | typeof fetchUserFailed>
const initialState: State = {
  items: [],
  error: null
}

const FETCH_USER_STARTED = "FETCH_USER_STARTED"
const FETCH_USER_DONE = "FETCH_USER_DONE"
const FETCH_USER_FAILED = "FETCH_USER_FAILED"

export const fetchUsersStarted = () => async (dispatch: Dispatch) => {
  const token = localStorage.getItem("AccessToken") || ""
  try {
    const users: Array<User> = await getRequest("/users", {}, token)
    dispatch(fetchUserDone({ users }))
  } catch (error) {
    dispatch(fetchUserFailed({ error }))
  }
  return
}

const fetchUserDone = (payload: { users: Array<User> }) => ({
  type: FETCH_USER_DONE as typeof FETCH_USER_DONE,
  payload
})

const fetchUserFailed = (payload: { error: Error }) => ({
  type: FETCH_USER_FAILED as typeof FETCH_USER_FAILED,
  payload
})

export const reducer: Reducer<State, Actions> = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_USER_STARTED: {
      return state
    }
    case FETCH_USER_DONE: {
      return produce(state, draft => {
        draft.items = action.payload.users
      })
    }
    case FETCH_USER_FAILED: {
      return produce(state, draft => {
        draft.items = []
        draft.error = action.payload.error
      })
    }
    default: {
      const _: never = action
      console.debug(_)

      return state
    }
  }
}

export const getUsers = createSelector(
  (state: RootState) => state.users,
  users => users
)
