import React from 'react'
import { Link } from 'gatsby'
import logo from '../img/logo.svg'
import { Typography, IconButton } from '@material-ui/core'
import { Menu } from '@material-ui/icons'
import { menuItems } from '../constants'

const Navbar = class extends React.Component {

  render() {
    const { onClick } = this.props
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
            <IconButton onClick={onClick}>
              <Menu/>
            </IconButton>
          </div>
        </div>
      </nav>
    )
  }
}

export default Navbar
