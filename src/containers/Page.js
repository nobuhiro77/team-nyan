import { connect } from "react-redux"
import Page from '../components/Page'
import { types } from '../constants/ActionTypes'

const mapStateToProps = (state, ownProps) => {
  const { open } = state.menupage
  return ({
    open
  })
}

const mapDispatchToProps = dispatch => {
  return ({
    handleResize: () => {
      dispatch({ type: types.window.RESIZE })
    },
    handleClickOpen: () => {
      dispatch({ type: types.menupage.OPEN })
    },
    handleClickClose: () => {
      dispatch({ type: types.menupage.CLOSE })
    }
  })
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Page)
