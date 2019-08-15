import { createStore as reduxCreateStore, combineReducers } from "redux"
import menupage from './menupage'
import webfonts from './webfonts'

const createStore = () => reduxCreateStore(
  combineReducers({
    menupage,
    webfonts
  })
)
export default createStore