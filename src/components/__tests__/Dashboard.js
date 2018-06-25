// @flow
import React from 'react'
import Dashboard from '../Dashboard'
import { render, wait } from '../__mocks__/helpers'

test('it renders the dashboard', async () => {
  const tweet = {
    id: '5c9qojr2d1738zlx09afby',
    text: 'I hope one day the propTypes pendulum swings back. Such a simple yet effective API. Was one of my favorite parts of React.',
    author: 'tylermcginnis',
    timestamp: 1518043995650,
    likes: [],
    replies: [],
    replyingTo: null,
  }
  const initialState = {
    users: {
      tylermcginnis: {
        id: 'tylermcginnis',
        name: 'Tyler McGinnis',
        avatarURL: 'https://tylermcginnis.com/would-you-rather/tyler.jpg',
        tweets: [ tweet.id ]
      },
    },
    tweets: {
      [tweet.id]: tweet,
    },
    authedUser: 'tylermcginnis',
    loadingBar: undefined,
  }   
  const { container } = render(<Dashboard />, { initialState })
  await wait(() => expect(container.innerHTML).toMatch(tweet.text))
})

