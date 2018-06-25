// @flow
import { showLoading, hideLoading } from 'react-redux-loading'
import { saveTweet, saveLikeToggle } from '../utils/api'
import type { TweetId, Tweet, Tweets, ReplyingTo } from '../reducers/tweets'
import type { UserId } from '../reducers/users'
import type { GetState, Dispatch } from 'redux'

export const RECEIVE: 'tweets/RECEIVE' = 'tweets/RECEIVE'
export const ADD: 'tweets/ADD' = 'tweets/ADD'
export const LIKE: 'tweets/LIKE' = 'tweets/LIKE'

export type ActionReceive = {
  type: typeof RECEIVE,
  tweets: Tweets,
}

export type ActionAdd = {
  type: typeof ADD,
  tweet: Tweet,
}

export type ActionLike = {
  type: typeof LIKE,
  id: string,
  hasLiked: boolean,
  authedUser: UserId,
}

export function receiveTweets(tweets: Tweets): ActionReceive {
  //console.log(JSON.stringify(tweets, null, 2))
  return {
    type: RECEIVE,
    tweets,
  }
}

function addTweet(tweet: Tweet): ActionAdd {
  return {
    type: ADD,
    tweet,
  }
}

export function handleAddTweet({ text, replyingTo }: { text: string, replyingTo: ReplyingTo }) {
  return (dispatch: Dispatch, getState: GetState) => {
    const { authedUser: author } = getState()
    dispatch(showLoading())
    return saveTweet({ text, author, replyingTo })
      .then(tweet => dispatch(addTweet(tweet)))
      .then(() => dispatch(hideLoading()))
  }
}

function likeTweet(id: TweetId, hasLiked: boolean, authedUser: UserId): ActionLike {
  return {
    type: LIKE,
    id,
    hasLiked,
    authedUser,
  }
}

export function handleLikeTweet({ id, hasLiked }: { id: TweetId, hasLiked: boolean }) {
  return (dispatch: Dispatch, getState: GetState) => {
    const { authedUser } = getState()
    dispatch(likeTweet(id, hasLiked, authedUser)) // optimistic redux store update
    return saveLikeToggle({ id, hasLiked, authedUser })
      .catch(e => {
        console.warn('Error in handleToggleTweet: ', e)
        dispatch(likeTweet(id, !hasLiked, authedUser)) // revert the optimistic update
        alert('The was an error liking the tweet. Try again.')
      })
  }
}

