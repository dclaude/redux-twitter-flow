// @flow
import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter as Router } from 'react-router-dom'
import { css } from 'glamor'
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import App from './components/App'
import middleware from './middleware'
import reducer from './reducers'

// CSS global rule
css.global('body', {
  margin: 0,
  padding: 0,
  fontFamily: 'sans-serif',
  color: '#252525',
})

const store = createStore(reducer, middleware)
const rootEl = document.getElementById('root')

if (rootEl) {
  /*
  <BrowserRouter> is used in index.js and not in <App>
  this allows to use <App> with a fake router in App.test.js
  */
  ReactDOM.render(
    <Provider store={store}>
      <Router>
        <App />
      </Router>
    </Provider>,
    rootEl)
}
else {
  console.error("document.getElementById('root') failure")
}

