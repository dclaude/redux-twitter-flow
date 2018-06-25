// @flow
import { RECEIVE, ADD, LIKE } from '../actions/tweets'
import type { ActionReceive, ActionLike, ActionAdd } from '../actions/tweets'
import type { UserId } from './users'

export type TweetId = string

export type ReplyingTo = (TweetId | null)

export type Tweet = {
  id: TweetId,
  text: string,
  author: UserId,
  timestamp: number,
  likes: UserId[],
  replies: TweetId[],
  replyingTo: ReplyingTo,
}

export type Tweets = {
  [TweetId]: Tweet,
}

type Action = ActionReceive | ActionAdd | ActionLike

export default function tweets(state: Tweets = {}, action: Action) {
  switch (action.type) {
    case RECEIVE: {
      return {
        ...state,
        ...action.tweets,
      }
    }
    case ADD: {
      const { tweet } = action
      let replyingTo = {}
      if (tweet.replyingTo) {
        const parent = state[tweet.replyingTo]
        replyingTo = {
          [parent.id]: {
            ...parent,
            replies: [ ...parent.replies, tweet.id ],
          }
        }
      }
      return {
        ...state,
        [tweet.id]: tweet,
        ...replyingTo, // it is an empty object if there is no parent tweet
      }
    }
    case LIKE: {
      const { id, hasLiked, authedUser } = action
      const tweet = state[id]
      return {
        ...state,
        [tweet.id]: {
          ...tweet,
          likes: hasLiked ? // here 'hasLiked' is the new state we want to have in the store
            [ ...tweet.likes, authedUser ]
            : tweet.likes.filter(user => user !== authedUser),
        },
      }
    }
    default:
      return state
  }
}

