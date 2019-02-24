import React, { useEffect } from "react"
import { connect } from "react-redux"
import { ThunkDispatch } from "redux-thunk"

import { State } from "../../store"
import { State as UsersState, Actions, fetchUsersStarted, getUsers } from "../../modules/users"
import { Users as UsersComponent } from "../../components/Users"

type Props = ReturnType<typeof mapStateToProps> & ReturnType<typeof mapDispatchToProps>

const mapStateToProps = (state: State) => ({
  users: getUsers(state)
})

const mapDispatchToProps = (dispatch: ThunkDispatch<UsersState, undefined, Actions>) => ({
  async onFetchUsers() {
    try {
      await dispatch(fetchUsersStarted())
    } catch (e) {
      console.error(e)
    }
  }
})

const UsersContainer: React.FC<Props> = props => {
  useEffect(() => {
    props.onFetchUsers()
  }, [])
  return <UsersComponent users={props.users.items} />
}

export const Users = connect(
  mapStateToProps,
  mapDispatchToProps
)(UsersContainer)
