import { createStore as reduxCreateStore, combineReducers } from "redux"
import menupage from './menupage'

const createStore = () => reduxCreateStore(
  combineReducers({
    menupage
  })
)
export default createStore