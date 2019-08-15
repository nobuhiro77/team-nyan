import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'gatsby'
import PreviewCompatibleImage from './PreviewCompatibleImage'
import { Grid, Button, Typography, IconButton, CardMedia, Card, CardContent, CardActions, CardHeader } from '@material-ui/core';
import { ChevronLeft, ChevronRight } from '@material-ui/icons'

class BlogCardRoll extends React.Component {
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
      <div className='blog-card-roll'>
        <div className='blog-card-roll_scroll-list'>
          {posts &&
            posts.map(({ node: post }, index) => (
            <Card className='blog-card-roll_card'>
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
              <CardHeader
                title={post.frontmatter.title}
              />
              <CardContent>
                  {post.excerpt}
              </CardContent>
              <CardActions>
                <Button component={Link} to={post.fields.slug}>{'More'}</Button>
              </CardActions>
            </Card>
          ))}
        </div>
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

BlogCardRoll.propTypes = {
  posts: PropTypes.array,
}

export default BlogCardRoll