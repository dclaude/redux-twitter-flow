// @flow
import React from 'react'
import { connect } from 'react-redux'
import Tweets from './Tweets'
import type { TweetId, Tweet } from '../reducers/tweets'
import type { State } from '../reducers'

type ReduxMappedProps = {
  tweetIds: TweetId[],
}

type Props = ReduxMappedProps

class Dashboard extends React.Component<Props> {
  render() {
    const { tweetIds } = this.props
    return <Tweets tweetIds={tweetIds} header='Your Timeline' />
  }
}

function mapStateToProps({ tweets }: State): ReduxMappedProps {
  // $FlowFixMe Object.values() returns mixed[] when it should return Tweet[] https://github.com/facebook/flow/issues/2221
  const arr: Tweet[] = Object.values(tweets)
  const tweetIds = arr.sort((a, b) => b.timestamp - a.timestamp)
    .map((tweet) => tweet.id)
  return {
    tweetIds,
  }
}

export default connect(mapStateToProps)(Dashboard)

