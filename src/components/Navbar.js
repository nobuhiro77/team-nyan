import React from 'react'
import { Link } from 'gatsby'
import logo from '../img/logo.svg'
import { Typography, IconButton } from '@material-ui/core'
import { Menu } from '@material-ui/icons'
import { menuItems } from '../constants'
import { connect } from "react-redux"
import { types } from '../constants/ActionTypes'


const mapStateToProps = (state, ownProps) => {
  const { open } = state.menupage
  return ({
    open
  })
}

const mapDispatchToProps = dispatch => {
  return {
    handleClick: () => {
      dispatch({ type: types.menupage.OPEN })
    }
  }
}

const Navbar = class extends React.Component {

  render() {
    const { handleClick } = this.props
    return (
      <nav className='navbar'>
        <div className='content'>
          <Link to='/'>
            <img 
              className='logo'
              src={logo}
            />
          </Link>
          <div className='menu-items'>
            {menuItems.map(menuItem => 
              <Link className='menu-item' to={menuItem.url} key={menuItem.url}>
                <Typography>{menuItem.label}</Typography>
              </Link>
            )}
          </div>
          <div className='burger-menu'>
            <IconButton onClick={handleClick}>
              <Menu/>
            </IconButton>
          </div>
        </div>
      </nav>
    )
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Navbar)