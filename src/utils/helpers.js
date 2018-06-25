//@flow
import type { TweetId, Tweet } from '../reducers/tweets'
import type { UserId, User } from '../reducers/users'
import type { AuthedUser } from '../reducers/authedUser'

export function formatDate(timestamp: number): string {
  const d = new Date(timestamp)
  const time = d.toLocaleTimeString('en-US')
  return time.substr(0, 5) + time.slice(-2) + ' | ' + d.toLocaleDateString()
}

type ParentTweet = {
  id: TweetId,
  author: UserId,
}

export type FormattedTweet = {
  name: string,
  id: TweetId,
  timestamp: number,
  text: string,
  avatar: string,
  likes: number,
  replies: number,
  hasLiked: boolean,
  parent: (ParentTweet | null),
}

export function formatTweet(tweet: Tweet, author: User, authedUser: AuthedUser, parentTweet: ?Tweet): FormattedTweet {
  const { id, likes, replies, text, timestamp } = tweet
  const { name, avatarURL } = author
  return {
    name,
    id,
    timestamp,
    text,
    avatar: avatarURL,
    likes: likes.length,
    replies: replies.length,
    hasLiked: likes.includes(authedUser),
    parent: !parentTweet ? null : {
      author: parentTweet.author,
      id: parentTweet.id,
    }
  }
}
