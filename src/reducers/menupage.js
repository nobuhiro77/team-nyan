import { types } from '../constants/ActionTypes'

const initialState = {
  open: undefined,
}

const menupage = (state = initialState, action) => {
  switch (action.type) {
    case types.window.RESIZE:
      return { ...state, open: undefined }
    case types.menupage.OPEN:
      return { ...state, open: true }
    case types.menupage.CLOSE:
      return { ...state, open: false }
    case types.menupage.RESET:
      return { ...state, open: undefined }
    default:
      return state
  }
}

export default menupage