import { connect } from "react-redux"

import { State } from "../../store"
import { Header as HeaderComponent } from "../../components/Header"

const mapStateToProps = (state: State) => ({
  ...state.signin
})

export const Header = connect(mapStateToProps)(HeaderComponent)
