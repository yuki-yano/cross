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

export const Users: React.FC<Props> = ({ users }) => (
  <>
    <h2>Users</h2>
    <table className="table">
      <thead>
        <tr>
          <th>アイコン</th>
          <th>本名</th>
          <th>表示名</th>
          <th>電話番号</th>
        </tr>
      </thead>
      <tbody>
        {users.map(({ uid, imageUrl, realName, displayName, phone }) => (
          <tr key={uid}>
            <td>
              <img src={imageUrl} height="64" width="64" />
            </td>
            <td>{realName}</td>
            <td>{displayName}</td>
            <td>{phone}</td>
          </tr>
        ))}
      </tbody>
    </table>
  </>
)
