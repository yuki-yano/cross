import React from "react"
import styled from "styled-components"

import { Container } from "../common/Container"

type Props = {
  signInUrl: string
}

export const SignIn: React.FC<Props> = ({ signInUrl }) => (
  <Container>
    <Button href={signInUrl}>Login with Slack</Button>
  </Container>
)

const Button = styled.a.attrs({
  className: "btn btn-primary btn-lg"
})`
  margin: 1rem 0;
`
