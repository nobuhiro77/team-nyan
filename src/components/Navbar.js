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
    },
    handleClickReset: () => {
      dispatch({ type: types.menupage.RESET })
    }
  }
}

const Navbar = class extends React.Component {

  render() {
    const { handleClick, handleClickReset } = this.props
    return (
      <nav className='navbar'>
        <div className='navbar_content'>
          <Link to='/' onClick={handleClickReset}>
            <img 
              className='navbar_logo'
              src={logo}
            />
          </Link>
          <div className='navbar_menu-items'>
            {menuItems.map(menuItem => 
              <Link className='navbar_menu-item' to={menuItem.url} key={menuItem.url}>
                <Typography align='center' className='navbar_label'>{menuItem.label}</Typography>
                <Typography align='center' className='navbar_en-label'>{menuItem.en_label}</Typography>
              </Link>
            )}
          </div>
          <div className='navbar_burger-menu'>
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