// @flow
import { showLoading, hideLoading } from 'react-redux-loading'
import { getInitialData } from '../utils/api'
import { receiveUsers } from './users'
import { receiveTweets } from './tweets'
import { setAuthedUser } from './authedUser'
import type { Dispatch } from 'redux'

const AUTHED_ID = 'tylermcginnis' // must be one of the 3 users defined in utils/_DATA.js

export function handleInitialData() {
  return (dispatch: Dispatch) => {
    dispatch(showLoading())
    return getInitialData()
      .then(({ users, tweets }) => {
        dispatch(receiveUsers(users))
        dispatch(receiveTweets(tweets))
        /*
        fake an authentication to our database/server
        (we do as if we did an authent and the server answered with an 'authentificated user id')
        */
        dispatch(setAuthedUser(AUTHED_ID))
      })
      .then(() => dispatch(hideLoading()))
  }
}

