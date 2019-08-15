import { connect } from "react-redux"
import Page from '../components/Page'
import { types } from '../constants/ActionTypes'

const mapStateToProps = (state, ownProps) => {
  const { open } = state.menupage
  const { webfonts } = state
  return ({
    open,
    webfonts
  })
}

const mapDispatchToProps = dispatch => {
  return ({
    handleResize: () => {
      dispatch({ type: types.window.RESIZE })
    },
    handleWebFontsActive: () => {
      dispatch({ type: types.webfonts.ACTIVE })
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
