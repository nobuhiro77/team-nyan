import { types } from '../constants/ActionTypes'

const initialState = {
  active: false,
}

const webfonts = (state = initialState, action) => {
  switch (action.type) {
    case types.webfonts.ACTIVE:
      return { ...state, active: true }
    default:
      return state
  }
}

export default webfonts