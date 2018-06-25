// @flow
import * as React from 'react'
import ReactDOM from 'react-dom'
import { createMemoryHistory } from 'history'
import { Router } from 'react-router-dom'
import waitForExpect from 'wait-for-expect'
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import reducer from '../../reducers'
import middleware from '../../middleware'
import type { MemoryHistory } from 'history'
import type { State } from '../../reducers'
import type { Store } from 'redux'

// inspired from the functions renderWithRouter() and renderWithRedux() coming from react/testing/react-testing-library.txt 
export function render(
  ui: React.Node,
  { initialState, store = createStore(reducer, initialState, middleware) }: { initialState?: State, store?: Store } = {},
  { route = '/', history = createMemoryHistory({ initialEntries: [ route ] }) }: { route: string, history?: MemoryHistory } = {},
) {
  if (!document.body) {
    throw new Error('render() no document.body')
  }
  /*
  React attaches an event handler on the document and handles some DOM events via event delegation (events bubbling up from a target to an ancestor). 
  Because of this, your node must be in the document.body for fireEvent to work with React
  */
  const container = document.body.appendChild(document.createElement('div'))
  ReactDOM.render(
    <Provider store={store}>
      <Router history={history}>{ui}</Router>
    </Provider>,
    container)
  return {
    container,
    history,
    store,
  }
}

type WaitCallback = () => (void | boolean)

// from react-testing-library (4500 is chosen because jest waits for 5s before stopping a test)
export function wait(callback: WaitCallback = () => {}, { timeout = 4500, interval = 50 }: { timeout: number, interval: number } = {}) {
  return waitForExpect(callback, timeout, interval)
}

export function getByAttribute(el: HTMLElement, attribute: string, value: string): HTMLElement {
  const res = Array.from(el.querySelectorAll(`[${attribute}]`))
    .find(node => node.getAttribute(attribute) === value)
  if (!res)
    throw new Error('getByAttribute() unable to find an element')
  return res
}

function getNodeText(node) {
  const res = Array.from(node.childNodes)
    .filter(
      child => child.nodeType === Node.TEXT_NODE && Boolean(child.textContent),
    )
    .map(c => c.textContent)
    .join(' ')
    .trim()
    .replace(/\s+/g, ' ')
  return res
}

export function getByText(el: HTMLElement, value: string) {
  const res = Array.from(el.querySelectorAll('*'))
    .find(node => getNodeText(node) === value)
  if (!res)
    throw new Error('getByText() unable to find an element')
  return res
}

