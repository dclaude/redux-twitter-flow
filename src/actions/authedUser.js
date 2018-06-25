// @flow
import type { UserId } from '../reducers/users'

export const SET_USER = 'authedUser/SET_USER'

export type ActionSetUser = {
  type: typeof SET_USER,
  id: UserId,
}

export function setAuthedUser(id: UserId): ActionSetUser {
  return {
    type: SET_USER,
    id,
  }
}

