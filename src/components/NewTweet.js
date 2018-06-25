// @flow
import React from 'react'
import { css } from 'glamor'
import { handleAddTweet } from '../actions/tweets'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import PropTypes from 'prop-types'
import type { Dispatch } from 'redux'
import type { ReplyingTo } from '../reducers/tweets'

const styles = css({
  '& .header': {
    textAlign: 'center',
  },
  '& .form': { 
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    width: '100%',
    maxWidth: '590px',
    margin: '0 auto', // zero top/bottom margin and auto margin to horizontally center
    '& .textarea': {
      maxLength: '280', // twitter only allows for 280 characters long messages
      height: '100px',
      border: '1px solid #dad7d7',
      borderRadius: '4px',
      fontSize: '15px',
      width: '100%',
      padding: '10px',
    },
    '& .submit-btn': {
      textTransform: 'uppercase',
      margin: '35px auto',
      padding: '10px',
      cursor: 'pointer',
      background: '#fff',
      fontSize: '16px',
      width: '250px',
      border: '1px solid rgba(0,0,0,.29)',
    },
  },
})

type State = {
  text: string,
  submitted: boolean,
}

type Props = {
  dispatch: Dispatch,
  replyingTo: ReplyingTo,
}

class NewTweet extends React.Component<Props, State> {
  static defaultProps = {
    replyingTo: null,
  }
  static propTypes = {
    replyingTo: PropTypes.string,
  }
  state: State = {
    text: '',
    submitted: false,
  }
  handleTextArea = e => {
    const text = e.target.value
    this.setState(() => ({ text }))
  }
  handleSubmit = e => {
    const { text } = this.state
    const { dispatch, replyingTo } = this.props
    e.preventDefault()
    dispatch(handleAddTweet({
      text,
      replyingTo,
    }))
    //
    this.setState(() => ({ text: '' }))
    if (!replyingTo) { // if we are in the /new route
      // to be "declarative" use of <Redirect> instead of history.push()
      this.setState(() => ({ submitted: true }))
    }
  }
  render() {
    const { text, submitted } = this.state
    if (submitted)
      return <Redirect to='/' />
    //
    return (
      <div className={styles}>
        <h3 className='header'>Compose new Tweet</h3>
        <form
          className='form'
          onSubmit={this.handleSubmit}
        >
          <textarea
            className='textarea'
            placeholder="What's happening?"
            value={text}
            onChange={this.handleTextArea}
          >
          </textarea>
          <button className='submit-btn' disabled={!text}>
            submit
          </button>
        </form>
      </div>
    )
  }
}

export default connect()(NewTweet)

