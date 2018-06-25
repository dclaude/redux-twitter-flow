// @flow
import React from 'react'
import { connect } from 'react-redux'
import Tweet from '../Tweet'
import { render, wait, getByAttribute } from '../__mocks__/helpers'
import type { TweetId } from '../../reducers/tweets'
import type { State } from '../../reducers'

const tweetId = 'fap8sdxppna8oabnxljzcv'

const tweets = {
  [tweetId]: {
    'id': tweetId,
    'author': 'tylermcginnis',
    'text': "I agree. I'm always really impressed when I see someone giving a talk in a language that's not their own.",
    'timestamp': 1518122677860,
    'likes': [
      'sarah_edo'
    ],
    'replyingTo': null,
    'replies': []
  },
}

const users = {
  sarah_edo: {
    'id': 'sarah_edo',
    'name': 'Sarah Drasner',
    'avatarURL': 'https://tylermcginnis.com/would-you-rather/sarah.jpg',
    'tweets': []
  },
  tylermcginnis: {
    'id': 'tylermcginnis',
    'name': 'Tyler McGinnis',
    'avatarURL': 'https://tylermcginnis.com/would-you-rather/tyler.jpg',
    'tweets': [
      tweetId,
    ]
  },
}

const init = () => {
  return {
    tweets, 
    users,
    authedUser: 'tylermcginnis',
    loadingBar: undefined,
  }
}

type ReduxMappedProps = {
  loaded: boolean,
}

type OwnProps = {
  id: TweetId,
}

type Props = OwnProps & ReduxMappedProps

const LoadedTweet = ({ id, loaded }: Props) => {
  if (!loaded)
    return null
  return <Tweet id={id} />
}

const ConnectedLoadedTweet = connect(({ authedUser }: State): ReduxMappedProps => ({
  loaded: authedUser !== null
}))(LoadedTweet)

test('it renders a tweet', () => {
  const initialState = init()
  const { container } = render(<ConnectedLoadedTweet id={tweetId} />, { initialState })
  expect(container.innerHTML).toMatch(tweets[tweetId].text)
})

test('it renders a tweet after a like', () => {
  const initialState = init()
  const { container } = render(<ConnectedLoadedTweet id={tweetId} />, { initialState })
  //
  const getLikes = () => getByAttribute(container, 'data-testid', 'tweet-likes').textContent
  expect(getLikes()).toBe('1')
  const event = new MouseEvent('click', {
    bubbles: true, // click events must bubble for React to see it
    cancelable: true
  })
  getByAttribute(container, 'data-testid', 'tweet-likes-icon').dispatchEvent(event)
  expect(getLikes()).toBe('2')
})

