// @flow
import { RECEIVE } from '../actions/users'
import { ADD as TWEETS_ADD } from '../actions/tweets'
import type { TweetId } from './tweets'
import type { ActionReceive } from '../actions/users'
import type { ActionAdd as TweetsActionAdd } from '../actions/tweets'

export type UserId = string

export type User = {
  id: UserId,
  name: string,
  avatarURL: string,
  tweets: TweetId[],
}

export type Users = {
  [UserId]: User,
}

type Action = ActionReceive | TweetsActionAdd

export default function users(state: Users = {}, action: Action): Users {
  switch (action.type) {
    case RECEIVE: {
      return {
        ...state,
        ...action.users,
      }
    }
    case TWEETS_ADD: {
      const tweet = action.tweet
      const user = state[tweet.author]
      return {
        ...state,
        [user.id]: {
          ...user,
          tweets: [ ...user.tweets, tweet.id ],
        }
      }
    }
    default:
      return state
  }
}

