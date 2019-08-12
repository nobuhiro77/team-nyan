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
      <div className='page'>
        <div
          className={`page_content ${open === undefined ? '' : open === true ? 'page_content-open' : 'page_content-close' }`}
        >
          <Navbar onClick={handleClickOpen}/>
          <div className='page_content'>{this.props.children}</div>
          <Footer />
        </div>
        <div
          className={`page_menu-page ${open === undefined ? '' : open === true ? 'page_menu-page-open' : 'page_menu-page-close' }`}
        >
          <MenuPage onClick={handleClickClose}/>
        </div>
      </div>
    )
  }
}

export default Page