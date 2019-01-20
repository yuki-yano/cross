import React from "react"
import { connect } from "react-redux"

import { AppState } from "../store"
import { getRequest } from "../services/api"

type User = {
  uid: string
  realName: string
  displayName: string
  phone: string
  imageUrl: string
}

type Props = ReturnType<typeof mapStateToProps>

type State = Readonly<{ users: User[] }>

const initialState: State = {
  users: []
}

class Users extends React.Component<Props, State> {
  readonly state: State = initialState

  async componentDidMount() {
    this.setState({ ...this.state, users: await getRequest("/users", {}, this.props.signin.accessToken) })
  }

  render() {
    return (
      <>
        <h1 className="title">Users</h1>
        <table className="table is-bordered is-striped">
          <thead>
            <tr>
              <th>アイコン</th>
              <th>本名</th>
              <th>表示名</th>
              <th>電話番号</th>
            </tr>
          </thead>
          <tbody>
            {this.state.users.map(user => {
              return (
                <tr key={user.realName}>
                  <td>
                    <img src={user.imageUrl} height="64" width="64" />
                  </td>
                  <td>{user.realName}</td>
                  <td>{user.displayName}</td>
                  <td>{user.phone}</td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </>
    )
  }
}

const mapStateToProps = (state: AppState) => ({
  ...state
})

export default connect(mapStateToProps)(Users)
