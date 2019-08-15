import React from 'react'
import PropTypes from 'prop-types'
import { Link, graphql } from 'gatsby'

import Layout from '../components/Layout'
import BlogRoll from '../components/BlogRoll'
import { Typography, Button, Grid } from '@material-ui/core';
import { menuItems, MENU_ITEM_INDEX } from '../constants';
import nyanko from '../img/nyanko-line.svg'

export const IndexPageTemplate = ({
  image,
  posts,
  aboutus,
  activity
}) => (
  <div className='index-page'>
    <div
      className='index-page_header-image'
      style={{
        backgroundImage: `url(${
          !!image.childImageSharp ? image.childImageSharp.fluid.src : image
        })`
      }}
    >
      <div className='index-page_header-box'>
        <div className='index-page_header-title'>
          <Typography variant='h5' color='inherit'>にゃんこならべをひろめる会<br/>チームにゃん！</Typography>
        </div>
      </div> 
    </div>
    <section className='index-page_about-us-section'>
      <Grid className='index-page_grid' container>
        <Grid className='index-page_left-grid' item sm={6} xs={12}>
          <img
            className='index-page_photo'
            alt='index-page_photo'
            src={aboutus.blurbs.length > 0 && !!aboutus.blurbs[0].image.childImageSharp ? aboutus.blurbs[0].image.childImageSharp.fluid.src : aboutus.blurbs[0].image}
          />
        </Grid>
        <Grid className='index-page_right-grid' item sm={6} xs={12}>
          <div className='index-page_description-box'>
            <Typography className='index-page_en-label' variant='h5' color='primary'>{menuItems[MENU_ITEM_INDEX.ABOUT_US].en_label}</Typography>
            <Typography className='index-page_label' variant='subtitle1' color='primary'>{menuItems[MENU_ITEM_INDEX.ABOUT_US].label}</Typography>
            <Typography>{aboutus.description}</Typography>
            <Link className='index-page_more-button' to={menuItems[MENU_ITEM_INDEX.ABOUT_US].url}>
              <Typography color='inherit'>もっとみる</Typography>
            </Link>
          </div>
        </Grid>
      </Grid>
    </section>
    <section className='index-page_activity-section'>
      <Grid className='index-page_grid' container>
        <Grid className='index-page_title-grid' item xs={12}>
          <Typography className='index-page_en-label' variant='h5' color='primary' align='center'>ACTIVITY</Typography>
          <Typography className='index-page_label' variant='subtitle1' color='primary' align='center'>活動内容</Typography>
        </Grid>
        {activity.activities.map(activity => 
          <Grid
            className='index-page_activity-grid'
            item
            sm={4}
            xs={12}
            style={{
              backgroundImage: `url(${!!activity.image.childImageSharp ? activity.image.childImageSharp.fluid.src : activity.image})`
            }}
          >
            <div className='index-page_image-mask'>
              <img
                className='index-page_nyanko-line'
                alt='nyanko'
                src={nyanko}
              />
              <Typography className='index-page_title' variant='h6' color='inherit' align='center'>{activity.title}</Typography>
              <Typography className='index-page_description' color='inherit'>{activity.description}</Typography>
            </div>
          </Grid>
        )}
        <Grid className='index-page_action-grid' item xs={12}>
          <Link className='index-page_contact-button' to={menuItems[MENU_ITEM_INDEX.CONTACT].url}>
            <Typography color='inherit'>{menuItems[MENU_ITEM_INDEX.CONTACT].label}</Typography>
          </Link>
        </Grid>
      </Grid>
    </section>
    <section className='blog-section'>
      <div className='section-title'>
        <Typography variant='h4'>ブログ</Typography>
      </div>
      <BlogRoll posts={posts}/>
      <div className='section-action'>
        <Button component={Link} to='/blog'>もっとみる</Button>
      </div>
    </section>
  </div>
)

IndexPageTemplate.propTypes = {
  image: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
  title: PropTypes.string,
  heading: PropTypes.string,
  subheading: PropTypes.string,
  mainpitch: PropTypes.object,
  description: PropTypes.string,
  intro: PropTypes.shape({
    blurbs: PropTypes.array,
  }),
}

const IndexPage = ({ data }) => {
  const { frontmatter } = data.markdownRemark
  const { edges: posts } = data.allMarkdownRemark
  return (
    <Layout>
        <IndexPageTemplate
          image={frontmatter.image}
          aboutus={frontmatter.aboutus}
          activity={frontmatter.activity}
          posts={posts}
        />
    </Layout>
  )
}

IndexPage.propTypes = {
  data: PropTypes.shape({
    markdownRemark: PropTypes.shape({
      frontmatter: PropTypes.object,
    }),
  }),
}

export default IndexPage

export const pageQuery = graphql`
      query pageQuery {
        markdownRemark(frontmatter: { templateKey: { eq: "index-page" } }) {
          frontmatter {
            title
            image {
              childImageSharp {
                fluid(maxWidth: 2048, quality: 100) {
                  ...GatsbyImageSharpFluid
                }
              }
            }
            aboutus {
              description
              blurbs {
                image {
                  childImageSharp {
                    fluid(maxWidth: 400, quality: 100) {
                      ...GatsbyImageSharpFluid
                    }
                  }
                }
              }
            }
            activity {
              activities {
                title
                image {
                  childImageSharp {
                    fluid(maxWidth: 400, quality: 100) {
                      ...GatsbyImageSharpFluid
                    }
                  }
                }
                description
              }
            }
          }
        }
        allMarkdownRemark(
          sort: { order: DESC, fields: [frontmatter___date] }
          filter: { frontmatter: { templateKey: { eq: "blog-post" } } }
          limit: 3
        ) {
          edges {
            node {
              excerpt(pruneLength: 200)
              id
              fields {
                slug
              }
              frontmatter {
                title
                templateKey
                date(formatString: "MMMM DD, YYYY")
                featuredpost
                featuredimage {
                  childImageSharp {
                    fluid(maxWidth: 120, quality: 100) {
                      ...GatsbyImageSharpFluid
                    }
                  }
                }
              }
            }
          }
        }
      }
`
