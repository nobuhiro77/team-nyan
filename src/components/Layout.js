import React from 'react'
import { Helmet } from 'react-helmet'
import Footer from '../components/Footer'
import Navbar from '../components/Navbar'
import './all.sass'
import useSiteMetadata from './SiteMetadata'
import { withPrefix } from "gatsby"
import { ThemeProvider } from '@material-ui/styles'
import theme from '../../src/theme'
import { Keyframes, animated } from 'react-spring/renderprops'
import MenuPage from './MenuPage';

const TemplateWrapper = ({ children }) => {
  const { title, description } = useSiteMetadata()
  return (
    <div className='layout'>
      <Helmet>
        <html lang="en" />
        <title>{title}</title>
        <meta name="description" content={description} />

        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href={`${withPrefix("/")}img/apple-touch-icon.png`}
        />
        <link
          rel="icon"
          type="image/png"
          href={`${withPrefix("/")}img/favicon-32x32.png`}
          sizes="32x32"
        />
        <link
          rel="icon"
          type="image/png"
          href={`${withPrefix("/")}img/favicon-16x16.png`}
          sizes="16x16"
        />

        <meta name="theme-color" content="#fff" />

        <meta property="og:type" content="business.business" />
        <meta property="og:title" content={title} />
        <meta property="og:url" content="/" />
        <meta property="og:image" content={`${withPrefix("/")}img/og-image.jpg`} />
        <script>{`
          (function(d) {
            var config = {
              kitId: 'ucl5exi',
              scriptTimeout: 3000,
              async: true
            },
            h=d.documentElement,t=setTimeout(function(){h.className=h.className.replace(/\bwf-loading\b/g,"")+" wf-inactive";},config.scriptTimeout),tk=d.createElement("script"),f=false,s=d.getElementsByTagName("script")[0],a;h.className+=" wf-loading";tk.src='https://use.typekit.net/'+config.kitId+'.js';tk.async=true;tk.onload=tk.onreadystatechange=function(){a=this.readyState;if(f||a&&a!="complete"&&a!="loaded")return;f=true;clearTimeout(t);try{Typekit.load(config)}catch(e){}};s.parentNode.insertBefore(tk,s)
          })(document);
        `}
        </script>
      </Helmet>
      <PageContent>
        {children}
      </PageContent>
    </div>
  )
}

const MenuBarAnimation = Keyframes.Spring({
  open: { delay: 0, x: 100 },
  close: { delay: 0, x: 0 },
})

class PageContent extends React.Component {
  state = {
    menubar: false
  }

  handleClickNavbar = () => {
    this.setState({ menubar: !this.state.menubar })
  }

  render () {
    const { menubar } = this.state
    const state = menubar === true ? 'open' : 'close'
    console.dir(state)
    return (
      <ThemeProvider theme={theme}>
        <MenuBarAnimation native state={state}>
          {({ x }) => (
            <React.Fragment>
              <animated.div
                style={{
                  position: 'relative',
                  right: x.interpolate(x => `calc(${x / 2}vw)`),
                }}
              >
                <Navbar onClick={this.handleClickNavbar}/>
                <div className='content'>{this.props.children}</div>
                <Footer />
              </animated.div>
              <animated.div
                className='menu-page'
                style={{
                  right: x.interpolate(x => `calc(-100vw + ${x}vw)`),
                }}
              >
                <MenuPage onClick={this.handleClickNavbar}/>
              </animated.div>
            </React.Fragment>
          )}
        </MenuBarAnimation>
      </ThemeProvider>
    )
  }
}

export default TemplateWrapper
