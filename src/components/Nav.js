// @flow
import React from 'react'
import { NavLink } from 'react-router-dom'
import { css } from 'glamor'

const styles = css({
  '& .list': {
    display: 'flex',
    flexDirection: 'row',
    listStyle: 'none',
    paddingLeft: 0,
  },
  '& .item': {
    paddingRight: '10px',
    // CSS selector for <a> child element (<NavLink> is implemented with <a>)
    '& > a': {
      textDecoration: 'none',
      color: 'black',
    },
    // CSS selector for child element with className='active'
    '& .active': { fontWeight: 'bold' },
  },
})

export default () => {
  return (
    <nav className={styles}>
      <ul className='list'>
        <li className='item'>
          <NavLink exact activeClassName='active' to='/'>Home</NavLink>
        </li>
        <li className='item'>
          <NavLink activeClassName='active' to='/new'>New Tweet</NavLink>
        </li>
      </ul>
    </nav>
  )
}

