import React from 'react'
import Footer from '../components/Footer'
import Navbar from '../components/Navbar'
import MenuPage from './MenuPage'

class Page extends React.Component {

  componentDidMount() {
    window.onresize = () => {
      this.props.handleResize()
    }
  }

  handleClickNavbar = () => {
    this.setState({ menubar: !this.state.menubar })
  }

  render () {
    const { open, handleClickOpen, handleClickClose } = this.props
    return (
      <div className='component-page'>
        <div
          className={`content ${open === undefined ? '' : open === true ? 'content-open' : 'content-close' }`}
        >
          <Navbar onClick={handleClickOpen}/>
          <div className='content'>{this.props.children}</div>
          <Footer />
        </div>
        <div
          className={`menu-page ${open === undefined ? '' : open === true ? 'menu-page-open' : 'menu-page-close' }`}
        >
          <MenuPage onClick={handleClickClose}/>
        </div>
      </div>
    )
  }
}

export default Page