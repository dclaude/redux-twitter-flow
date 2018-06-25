// @flow
import React from 'react'
import PropTypes from 'prop-types'
import { css } from 'glamor'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import { formatDate } from '../utils/helpers'
import { handleLikeTweet } from '../actions/tweets'
import { formatTweet } from '../utils/helpers'
import type { ReduxProps, RouterProps } from '../utils/flowTypes'
import type { FormattedTweet } from '../utils/helpers'
import type { State } from '../reducers'
import type { TweetId } from '../reducers/tweets'
//
// use of 'Typicons icons' from https://gorangajic.github.io/react-icons/ti.html
import TiArrowBackOutline from 'react-icons/lib/ti/arrow-back-outline'
import TiHeartOutline from 'react-icons/lib/ti/heart-outline'
import TiHeartFullOutline from 'react-icons/lib/ti/heart-full-outline'

const blueColor = '#00b5d6'

const styles = css({
  display: 'flex',
  flexDirection: 'row',
  maxWidth: '590px',
  border: '1px solid #dad7d7',
  padding: '10px',
  margin: '0 auto',
  '& .avatar': {
    height: '50px',
    borderRadius: '50%', // round the edges to a circle with border radius 1/2 container size
    margin: '10px',
  },
  '& .grey-text': {
    color: '#969696',
    fontSize: '15px',
  },
  '& .parent-btn': {
    border: 'none',
    background: 'transparent',
    margin: 0,
    padding: 0,
    cursor: 'pointer',
  },
  '& .info': {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    '& > span:first-child': { fontWeight: 'bold' },
    '& > p': {
      fontSize: '18px',
      margin: '10px 0',
    },
    '& .icons': {
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center',
      '& .icon-span': {
        marginLeft: '5px',
        marginRight: '15px',
      },
      '& .icon-svg': {
        fontSize: '27px',
        color: '#697784',
      },
      '& .replies': {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        '& .replies-icon': {
          ':hover': {
            fill: blueColor,
            cursor: 'pointer',
          },
        },
      },
      '& .likes': {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        '& .likes-icon': {
          ':hover': {
            fill: blueColor,
            cursor: 'pointer',
          },
        },
        '& .likes-full-icon': {
          fill: 'rgb(224, 36, 94)',
          ':hover': {
            cursor: 'pointer',
          },
        },
      },
    },
  },
})

type ReduxMappedProps = {
  tweet: FormattedTweet,
}

type OwnProps = {
  id: TweetId,
}

type Props = OwnProps & ReduxMappedProps & ReduxProps & RouterProps

class Tweet extends React.Component<Props> {
  static propTypes = {
    id: PropTypes.string.isRequired,
  }
  handleButtonClick = (e: SyntheticEvent<>) => {
    const { history, tweet } = this.props
    const { parent } = tweet
    if (!parent)
      return
    /*
    the call to e.preventDefault() is needed to prevent the event to bubble to the <Link> component 
    the <Link> component has another click event handler which routes to another url
    Rq: calling e.stopPropagation() does not work
    */
    e.preventDefault()
    history.push(`/tweet/${parent.id}`)
  }
  handleLikeClick = (e: SyntheticEvent<>) => {
    const { dispatch, tweet } = this.props
    const { id, hasLiked } = tweet
    e.preventDefault() // to not bubble up to the <Link> around the tweet
    dispatch(handleLikeTweet({ id, hasLiked: !hasLiked }))
  }
  render() {
    //console.log(JSON.stringify(this.props, null, 2)
    const { tweet } = this.props
    const {
      name,
      /*id,*/
      timestamp,
      text,
      avatar,
      likes,
      replies,
      hasLiked,
      parent,
    } = tweet
    return (
      <div className={styles}>
        <img className='avatar' src={avatar} alt={`avatar for user ${name}`} />
        <div className='info'> 
          <span>{name}</span>
          <div className='grey-text'>{formatDate(timestamp)}</div>
          {parent &&
              <button
                className='parent-btn grey-text'
                onClick={this.handleButtonClick}
              >
                Replying to @{parent.author}
              </button>
          }
          <p data-testid='tweet-text'>{text}</p>
          <div className='icons'>
            <div className='replies'>
              <TiArrowBackOutline className='replies-icon icon-svg' />
              <span className='icon-span' data-testid='tweet-replies'>{replies > 0 ? replies : ''}</span>
            </div>
            <div className='likes'>
              {hasLiked ?
                <TiHeartFullOutline
                  className='likes-full-icon icon-svg'
                  onClick={this.handleLikeClick}
                  data-testid='tweet-likes-icon'
                /> :
                <TiHeartOutline
                  className='likes-icon icon-svg'
                  onClick={this.handleLikeClick}
                  data-testid='tweet-likes-icon'
                />
              }
              <span className='icon-span' data-testid='tweet-likes'>{likes > 0 ? likes : ''}</span>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

function mapStateToProps({ tweets, users, authedUser }: State, { id }: OwnProps): ReduxMappedProps {
  const tweet = tweets[id]
  const formattedTweet = formatTweet(tweet, users[tweet.author], authedUser, tweet.replyingTo ? tweets[tweet.replyingTo] : null)
  return {
    tweet: formattedTweet,
  }
}

export default withRouter(connect(mapStateToProps)(Tweet))

