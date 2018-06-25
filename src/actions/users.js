// @flow
import type { Users } from '../reducers/users'

export const RECEIVE = 'users/RECEIVE'

export type ActionReceive = {
  type: typeof RECEIVE,
  users: Users,
}

export function receiveUsers(users: Users): ActionReceive {
  //console.log(JSON.stringify(users, null, 2))
  return {
    type: RECEIVE,
    users,
  }
}

