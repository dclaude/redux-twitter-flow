// @flow
import type { RouterHistory, Match, Location } from 'react-router'
import type { Dispatch } from 'redux'

export type ReduxProps = {
  dispatch: Dispatch,
}

export type RouterProps = {
  history: RouterHistory,
  match: Match,
  location: Location,
}

