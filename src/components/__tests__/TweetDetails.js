// @flow
import React from 'react'
import { Route } from 'react-router-dom'
import TweetDetails from '../TweetDetails'
import { render, getByAttribute, getByText, wait } from '../__mocks__/helpers'
import { Simulate } from 'react-dom/test-utils'
import type { Tweet } from '../../reducers/tweets'

const tweetId = '8xf0y6ziyjabvozdd253nd'

const tweets = {
  [tweetId]: {
    'id': tweetId,
    'text': "Shoutout to all the speakers I know for whom English is not a first language, but can STILL explain a concept well. It's hard enough to give a good talk in your mother tongue!",
    'author': 'sarah_edo',
    'timestamp': 1518122597860,
    'likes': [
      'tylermcginnis'
    ],
    'replies': [
      'fap8sdxppna8oabnxljzcv',
      '3km0v4hf1ps92ajf4z2ytg'
    ],
    'replyingTo': null
  },
  'fap8sdxppna8oabnxljzcv': {
    'id': 'fap8sdxppna8oabnxljzcv',
    'author': 'tylermcginnis',
    'text': "I agree. I'm always really impressed when I see someone giving a talk in a language that's not their own.",
    'timestamp': 1518122677860,
    'likes': [
      'sarah_edo'
    ],
    'replyingTo': tweetId,
    'replies': []
  },
  '3km0v4hf1ps92ajf4z2ytg': {
    'id': '3km0v4hf1ps92ajf4z2ytg',
    'author': 'dan_abramov',
    'text': 'It can be difficult at times.',
    'timestamp': 1518122667860,
    'likes': [],
    'replyingTo': tweetId,
    'replies': []
  },
}

const users = {
  dan_abramov: {
    'id': 'dan_abramov',
    'name': 'Dan Abramov',
    'avatarURL': 'https://tylermcginnis.com/would-you-rather/dan.jpg',
    'tweets': [
      '3km0v4hf1ps92ajf4z2ytg',
    ]
  },
  sarah_edo: {
    'id': 'sarah_edo',
    'name': 'Sarah Drasner',
    'avatarURL': 'https://tylermcginnis.com/would-you-rather/sarah.jpg',
    'tweets': [
      tweetId,
    ]
  },
  tylermcginnis: {
    'id': 'tylermcginnis',
    'name': 'Tyler McGinnis',
    'avatarURL': 'https://tylermcginnis.com/would-you-rather/tyler.jpg',
    'tweets': [
      'fap8sdxppna8oabnxljzcv',
    ]
  },
}

const init = () => {
  const initialState = {
    tweets,
    users,
    authedUser: 'tylermcginnis',
    loadingBar: undefined,
  }
  const match = { params: { tweetId } }
  return {
    initialState,
    match,
  }
}

const RouteTweetDetails = () => <Route path='/tweet/:tweetId' component={TweetDetails} />

test('it renders correctly the details of a tweet', async () => {
  const { initialState, match } = init()
  const { container } = render(<RouteTweetDetails />, { initialState }, { route: `/tweet/${tweetId}` })
  await wait(() => {
    // $FlowFixMe Object.values() returns mixed[] when it should return Tweet[] https://github.com/facebook/flow/issues/2221
    const arr: Tweet[] = Object.values(tweets)
    return arr.reduce((result, tweet) => (
      result && expect(container.innerHTML).toMatch(tweet.text)
    ), true)
  })
})

test('it renders correctly the details of a tweet when a reply is added', async () => {
  const { initialState, match } = init()
  const { container } = render(<RouteTweetDetails />, { initialState }, { route: `/tweet/${tweetId}` })
  const replyText = 'my reply'
  //
  // simulate an input from the user / simulate a <textarea> change / simulate an <input> change
  Simulate.change(getByAttribute(container, 'placeholder', "What's happening?"), { target: { value: replyText } })
  await wait(() => expect(container.innerHTML).toMatch(replyText))
  //
  const event = new MouseEvent('click', {
    bubbles: true, // click events must bubble for React to see it
    cancelable: true
  })
  getByText(container, 'submit').dispatchEvent(event)
  const getTweets = () => Array.from(container.querySelectorAll('[data-testid="tweet-text"]'))
  await wait(() => expect(getTweets().length).toBe(4)) // 3 replies and 1 parent tweet
  expect(getTweets().filter(node => node.textContent === replyText).length).toBe(1)
  expect(getByAttribute(container, 'data-testid', 'tweet-replies').textContent).toBe('3')
})

