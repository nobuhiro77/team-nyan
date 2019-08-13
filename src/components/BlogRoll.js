import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'gatsby'
import PreviewCompatibleImage from './PreviewCompatibleImage'
import { Grid, Button, Typography, IconButton } from '@material-ui/core';
import { ChevronLeft, ChevronRight } from '@material-ui/icons'

class BlogRoll extends React.Component {
  render() {
    const { posts, numPages, currentPage } = this.props
    var maxPages = 4
    var min
    var max
    if (currentPage < numPages - currentPage) {
      if (maxPages / 2 > currentPage - 1) {
        min = currentPage - 1
        max = numPages - currentPage > maxPages ? maxPages - min : numPages - currentPage
      }
      else {
        min = maxPages / 2
        max = maxPages / 2 > numPages - currentPage ? numPages - currentPage : maxPages / 2
      }
    }
    else {
      if (maxPages / 2 > numPages - currentPage) {
        max = numPages - currentPage
        min = currentPage > maxPages ? maxPages - max : currentPage - 1
      }
      else {
        max = maxPages / 2
        min = maxPages / 2 > currentPage ? currentPage - 1 : maxPages / 2
      }
    }

    return (
      <div className='blog-roll'>
        <Grid container spacing={2}>
          {posts &&
            posts.map(({ node: post }, index) => (
            <React.Fragment key={index}>
              <Grid item xs={4}>
                <div className='thumbnail'>
                  {post.frontmatter.featuredimage ? (
                    <Link to={post.fields.slug}>
                      <PreviewCompatibleImage
                        imageInfo={{
                          image: post.frontmatter.featuredimage,
                          alt: `featured image thumbnail for post ${
                            post.title
                          }`,
                        }}
                      />
                    </Link>
                  ) : null}
                </div>
              </Grid>
              <Grid item xs={8}>
                <div>
                <Typography variant='h6'>{post.frontmatter.title}</Typography>
                {post.excerpt}
                </div>
                <Button component={Link} to={post.fields.slug}>{'More'}</Button>
              </Grid>
            </React.Fragment>
          ))}
        </Grid>
        {numPages && currentPage && (
          <div className="pagination">
            <IconButton
              component={Link}
              to={`/blog${currentPage - 1 === 1 ? '' : `/${currentPage - 1}`}`}
              disabled={currentPage === 1}
            >
              <ChevronLeft/>
            </IconButton>
            {Array.from({length: min}).map((n, i) => {
              return currentPage - min + i
            }).map(n => 
              <Button
                className="page-number-button"
                component={Link}
                to={`/blog/${n}`}
                key={n}
              >
                {n}
              </Button>
            )}
            <Button 
              className="page-number-button"
              disabled
            >
              {currentPage}
            </Button>
            {Array.from({length: max}).map((n, i) => currentPage + i + 1).map(n => 
              <Button
                className="page-number-button"
                component={Link}
                to={`/blog/${n}`}
                key={n}
              >
                {n}
              </Button>
            )}
            <IconButton
              component={Link}
              to={`/blog/${currentPage + 1}`}
              disabled={currentPage === numPages}
            >
              <ChevronRight/>
            </IconButton>
          </div>
        )}
      </div>
    )
  }
}

BlogRoll.propTypes = {
  posts: PropTypes.array,
}

export default BlogRoll