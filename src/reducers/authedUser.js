// @flow
import { SET_USER } from '../actions/authedUser'
import type { ActionSetUser } from '../actions/authedUser'
import type { UserId } from './users'

export type AuthedUser = UserId | null
type Action = ActionSetUser

// our state is just a string if we are authent or null if we are not authent yet
export default function authedUser(state: AuthedUser = null, action: Action): AuthedUser {
  switch (action.type) {
    case SET_USER:
      return action.id
    default:
      return state
  }
}


