import React from "react"

type Props = {
  signInUrl: string
}

export const SignIn: React.FC<Props> = props => {
  return (
    <section className="section">
      <div className="container">
        <a href={props.signInUrl} className="button is-primary">
          Login with Slack
        </a>
      </div>
    </section>
  )
}
