// @flow
import React from 'react'
import { connect } from 'react-redux'
import Tweet from './Tweet'
import NewTweet from './NewTweet'
import Tweets from './Tweets'
import type { State } from '../reducers'
import type { RouterProps } from '../utils/flowTypes'

type ReduxMappedProps = {
  id: string,
  replyIds?: string[],
};

type OwnProps = RouterProps
type Props = ReduxMappedProps & OwnProps

const TweetDetails = ({ id, replyIds }: Props) => {
  if (!id)
    return <h3>Not found</h3>
  return (
    <div>
      <Tweet id={id} />
      <NewTweet replyingTo={id} />
      {replyIds && replyIds.length > 0 && <Tweets tweetIds={replyIds} header='Replies' />}
    </div>
  )
}

function mapStateToProps({ tweets }: State, { match }: OwnProps): ReduxMappedProps {
  const tweet = match.params.tweetId ? tweets[match.params.tweetId] : null
  if (!tweet) 
    return { id: '' }
  const replyIds = tweet.replies
    .map(tweetId => tweets[tweetId])
    .sort((a, b) => b.timestamp - a.timestamp)
    .map(tweet => tweet.id)
  return {
    id: tweet.id,
    replyIds,
  }
}

export default connect(mapStateToProps)(TweetDetails)

