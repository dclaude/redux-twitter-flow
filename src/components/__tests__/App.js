// @flow
import React from 'react'
import ReactDOM from 'react-dom'
import App from '../App'
import * as Api from '../../utils/api'
import { render, wait } from '../__mocks__/helpers'

const tweet = {
  id: '5c9qojr2d1738zlx09afby',
  text: 'I hope one day the propTypes pendulum swings back. Such a simple yet effective API. Was one of my favorite parts of React.',
  author: 'tylermcginnis',
  timestamp: 1518043995650,
  likes: [
    /*
    'sarah_edo',
    'dan_abramov',
    */
  ],
  replies: [
    /*
    'njv20mq7jsxa6bgsqc97',
    */
  ],
  replyingTo: null // or tweet.id (e.g. '2mb6re13q842wu8n106bhk')
}

const before = () => {
  const users = {
    tylermcginnis: {
      id: 'tylermcginnis',
      name: 'Tyler McGinnis',
      avatarURL: 'https://tylermcginnis.com/would-you-rather/tyler.jpg',
      tweets: [
        '5c9qojr2d1738zlx09afby',
      ]
    },
  }
  const tweets = {
    [tweet.id]: tweet,
  }
  const spy = jest.spyOn(Api, 'getInitialData') // mock Api.getInitialData() implementation
  spy.mockReturnValueOnce(Promise.resolve({ users, tweets }))
  return spy
}

const after = spy => {
  spy.mockRestore() // restore original Api.getInitialData() implementation
}

test('it renders the home route and fetches the initial data', async () => {
  const spy = before()
  const { container } = render(<App />)
  await wait(() => expect(container.innerHTML).toMatch('Your Timeline')
    && expect(container.innerHTML).toMatch(tweet.text))
  //
  after(spy)
})

test('it renders the /new route', async () => {
  const spy = before()
  const { container } = render(<App />, {}, { route: '/new' })
  await wait(() => expect(container.innerHTML).toMatch('Compose new Tweet'))
  //
  after(spy)
})

test('it renders "not found" when the route is not matched', async () => {
  const spy = before()
  const { container } = render(<App />, {}, { route: '/xyz' })
  await wait(() => expect(container.innerHTML).toMatch('Not Found'))
  //
  after(spy)
})

