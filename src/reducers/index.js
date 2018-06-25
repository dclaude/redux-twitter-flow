// @flow
import { combineReducers } from 'redux'
import { loadingBarReducer } from 'react-redux-loading'
import users from './users'
import tweets from './tweets'
import authedUser from './authedUser'
import type { Users } from './users'
import type { Tweets } from './tweets'
import type { AuthedUser } from './authedUser'

export type State = {
  users: Users,
  tweets: Tweets,
  authedUser: AuthedUser,
  loadingBar: any,
}

export default combineReducers({
  users,
  tweets,
  authedUser,
  loadingBar: loadingBarReducer,
})

