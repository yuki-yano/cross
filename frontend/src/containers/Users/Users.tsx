import React, { useEffect } from "react"
import { connect } from "react-redux"
import { ThunkDispatch } from "redux-thunk"

import { State } from "../../store"
import { State as UsersState, Actions, fetchUsers, getUsers } from "../../modules/users"
import { Users as UsersComponent } from "../../components/Users"

type Props = ReturnType<typeof mapStateToProps> & ReturnType<typeof mapDispatchToProps>

const mapStateToProps = (state: State) => ({
  users: getUsers(state.users)
})

const mapDispatchToProps = (dispatch: ThunkDispatch<UsersState, undefined, Actions>) => ({
  async onFetchUsers() {
    try {
      await dispatch(fetchUsers())
    } catch (e) {
      console.error(e)
    }
  }
})

const UsersContainer: React.FC<Props> = ({ users, onFetchUsers }) => {
  useEffect(() => {
    onFetchUsers()
  }, [])
  return <UsersComponent users={users} />
}

export const Users = connect(
  mapStateToProps,
  mapDispatchToProps
)(UsersContainer)
