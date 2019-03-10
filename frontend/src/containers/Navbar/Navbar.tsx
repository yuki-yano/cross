import React, { useState, useCallback } from "react"

import { history } from "../../store"
import { Navbar as NavbarComponent } from "../../components/Navbar"

export const Navbar: React.FC<{}> = () => {
  const [path, setPath] = useState(history.location.pathname)
  const onClick = useCallback((e: React.MouseEvent<HTMLAnchorElement>) => {
    const href = e.currentTarget.getAttribute("href")
    if (href) {
      setPath(href)
    }
  }, [])

  const links = [{ label: "Home", to: "/" }, { label: "User", to: "/users" }, { label: "Logout", to: "/logout" }]

  return <NavbarComponent path={path} links={links} onClick={onClick} />
}
