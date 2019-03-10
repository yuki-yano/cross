import React from "react"
import { Link as RouteLink, LinkProps } from "react-router-dom"
import styled from "styled-components"
import { Box, BoxProps } from "@rebass/grid"

type NavbarLinkProps = {
  label: string
  width: number
  to: LinkProps["to"]
  isActive: boolean
  onClick: (event: React.MouseEvent<HTMLAnchorElement>) => void
}

export const NavbarLink: React.FC<NavbarLinkProps> = ({ to, width, label, isActive, onClick }) => (
  <NavBox active={String(isActive)} width={width} px={2}>
    <Link to={to} active={String(isActive)} onClick={onClick}>
      {label}
    </Link>
  </NavBox>
)

const NavBox = styled(Box)<BoxProps & { active: string }>`
  background-color: ${({ active }) => (active === "true" ? "#dddddd" : "#eeeeee")};
`

const Link = styled(RouteLink)<LinkProps & { active: string }>`
  display: block;
  padding: 0.5rem 1rem;
  color: ${({ active }) => (active === "true" ? "#333333" : "#888888")};
  text-align: center;

  &:hover {
    text-decoration: none;
  }
`
