import React from "react"

type Props = {
  users: Array<{
    uid: string
    realName: string
    imageUrl: string
    displayName: string
    phone: string
  }>
}

export const Users: React.FC<Props> = props => {
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
          {props.users.map(user => {
            return (
              <tr key={user.uid}>
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
