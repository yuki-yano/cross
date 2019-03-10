import React from "react"

type Props = { children: JSX.Element | Array<JSX.Element> }

export const Container: React.FC<Props> = ({ children }) => <div className="container">{children}</div>
