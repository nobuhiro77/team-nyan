import React from 'react'
import { Link } from 'gatsby'
import { Close } from '@material-ui/icons'
import { IconButton, Typography } from '@material-ui/core'
import { menuItems } from '../constants';

class MenuPage extends React.Component {

  render () {
    const { onClick } = this.props

    return (
      <div className='menu-page'>
        <IconButton className='menu-page_close-button' onClick={onClick}>
          <Close/>
        </IconButton>
        <div className='menu-page_menu-items'>
          <div>
            {menuItems.map(item => 
              <Link to={item.url} className='menu-page_menu-item' onClick={onClick} key={item.url}>
                <Typography color='inherit' variant='h5'>{item.label}</Typography>
              </Link>
            )}
          </div>
        </div>
      </div>
    )
  }
}

export default MenuPage