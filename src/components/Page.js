import React from 'react'
import Footer from '../components/Footer'
import Navbar from '../components/Navbar'
import MenuPage from './MenuPage'
import { Fade } from '@material-ui/core';

class Page extends React.Component {

  state = {
    load: false
  }

  componentDidMount() {
    window.onresize = () => {
      this.props.handleResize()
    }
    const target = document.getElementsByTagName('html')

    const observer = new MutationObserver((mutations) => {
      mutations.forEach(() => {
        if (target[0].classList.contains('wf-active')) {
          this.props.handleWebFontsActive()
        }
      })
    })

    const config = {
      attributes: true,
      attributeFilter: ["class"],
    }

    observer.observe(target[0], config);

  }

  render () {
    const { open, handleClickOpen, handleClickClose } = this.props
    return (
      <div className={'page'}>
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