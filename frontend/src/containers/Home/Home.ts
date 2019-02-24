import { connect } from "react-redux"
import { State } from "../../store"
import { Home as HomeComponent } from "../../components/Home"

const mapStateToProps = (_state: State) => ({})

export const Home = connect(mapStateToProps)(HomeComponent)
