// @flow
import React from 'react'
import { connect } from 'react-redux'
import { Switch, Route, withRouter } from 'react-router-dom'
import { css } from 'glamor'
import LoadingBar from 'react-redux-loading'
import { handleInitialData } from '../actions/shared'
import Nav from './Nav'
import Dashboard from './Dashboard'
import NewTweet from './NewTweet'
import TweetDetails from './TweetDetails'
import type { State } from '../reducers'
import type { ReduxProps } from '../utils/flowTypes'

const styles = css({
  padding: 10,
})

type ReduxMappedProps = {
  loaded: boolean,
}

type Props = ReduxMappedProps & ReduxProps

class App extends React.Component<Props> {
  componentDidMount() {
    // <NewTweet> needs the users/tweet to be loaded for api.saveTweet() to work correctly
    const { dispatch } = this.props
    dispatch(handleInitialData())
  }
  render() {
    const { loaded } = this.props
    return (
      <React.Fragment>
        <LoadingBar />
        <div className={styles}>
          <Nav />
          {loaded && // only render routes once data is loaded, so that it is not needed to check if data is loaded in components rendered in routes
            <Switch>
              <Route exact path='/' component={Dashboard} />
              <Route path='/new' component={NewTweet} />
              <Route path='/tweet/:tweetId' component={TweetDetails} />
              <Route render={() => <p>Not Found</p>}/>
            </Switch>
          }
        </div>
      </React.Fragment>
    )
  }
}

function mapStateToProps({ authedUser }: State): ReduxMappedProps {
  return {
    loaded: Boolean(authedUser !== null),
  }
}

/*
use of react-router with redux in the same component:
need to use withRouter() HOC on the component returned by connect()
for the child routes and the navbar to correctly update
cf https://github.com/ReactTraining/react-router/blob/master/packages/react-router/docs/guides/redux.md
*/
export default withRouter(connect(mapStateToProps)(App))

