import React from "react"
import styled from "styled-components"
import { Flex } from "@rebass/grid"

import { NavbarLink } from "./NavbarLink"
import { Container } from "../common/Container"

type Props = {
  path: string
  links: Array<{ label: string; to: string }>
  onClick: (e: React.MouseEvent<HTMLAnchorElement>) => void
}

export const Navbar: React.FC<Props> = ({ path, links, onClick }) => (
  <Nav>
    <Container>
      <Flex>
        {links.map(({ label, to }) => (
          <NavbarLink
            key={to}
            label={label}
            width={1 / links.length}
            to={to}
            isActive={path === to}
            onClick={onClick}
          />
        ))}
      </Flex>
    </Container>
  </Nav>
)

const Nav = styled.nav`
  background-color: #eeeeee;
`
