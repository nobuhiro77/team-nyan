import React from 'react'
import { Link } from 'gatsby'
import { Close } from '@material-ui/icons'
import { IconButton, Typography } from '@material-ui/core'
import { menuItems } from '../constants';

class MenuPage extends React.Component {

  render () {
    const { onClick } = this.props

    return (
      <div>
        <IconButton className='close-button' onClick={onClick}>
          <Close/>
        </IconButton>
        <div className='menu-items'>
          <div>
            {menuItems.map(items => 
              <Link to={items.url} className='menu-item'>
                <Typography color='inherit' variant='h5'>{items.label}</Typography>
              </Link>
            )}
          </div>
        </div>
      </div>
    )
  }
}

export default MenuPage