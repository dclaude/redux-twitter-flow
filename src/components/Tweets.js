// @flow
import React from 'react'
import { Link } from 'react-router-dom'
import { css } from 'glamor'
import Tweet from './Tweet'
import PropTypes from 'prop-types'
import type { TweetId } from '../reducers/tweets'

const styles = css({
  '& .header': {
    textAlign: 'center',
  },
  '& .list': {
    listStyle: 'none',
    paddingLeft: 0,
  },
  '& .item': {
    padding: '10px',
  },
  '& .item-link': {
    textDecoration: 'none',
    color: '#252525',
  },
})

type Props = {
  tweetIds: TweetId[],
  header: string,
}

class Tweets extends React.Component<Props> {
  static propTypes = {
    tweetIds: PropTypes.array.isRequired,
    header: PropTypes.string.isRequired,
  }
  render() {
    const { tweetIds, header } = this.props
    return (
      <div className={styles}>
        <h3 className='header'>{header}</h3>
        <ul className='list'>
          {tweetIds.map(id => {
            return (
              <li className='item' key={id}>
                <Link className='item-link' to={`/tweet/${id}`}>
                  <Tweet id={id} />
                </Link>
              </li>
            )
          })}
        </ul>
      </div>
    )
  }
}

export default Tweets

