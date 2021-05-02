import { combineReducers } from 'redux'
import { rootReducer } from './documentReducer'

export default combineReducers({
  docs: rootReducer
})