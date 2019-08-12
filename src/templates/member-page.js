import React from 'react'
import PropTypes from 'prop-types'
import { kebabCase } from 'lodash'
import Helmet from 'react-helmet'
import { graphql, Link } from 'gatsby'
import Layout from '../components/Layout'
import Content, { HTMLContent } from '../components/Content'
import PreviewCompatibleImage from '../components/PreviewCompatibleImage';
import { Typography } from '@material-ui/core';

export const MemberPageTemplate = ({
  content,
  contentComponent,
  title,
  name,
  image,
  helmet,
}) => {
  const PostContent = contentComponent || Content

  return (
    <div className="member-page">
      {helmet || ''}
      <div className='profile'>
        <div className='avatar'>
          <PreviewCompatibleImage
            imageInfo={{
              image: image,
              alt: `featured image thumbnail for post ${title}`,
            }}
          />
        </div>
        <Typography variant='h4' align='center'>{name}</Typography>
      </div>
      <PostContent content={content} />
    </div>
  )
}

MemberPageTemplate.propTypes = {
  content: PropTypes.node.isRequired,
  contentComponent: PropTypes.func,
  title: PropTypes.string,
  helmet: PropTypes.object,
}

const MemberPage = ({ data }) => {
  const { markdownRemark: post } = data

  return (
    <Layout>
      <MemberPageTemplate
        content={post.html}
        contentComponent={HTMLContent}
        helmet={
          <Helmet titleTemplate="%s">
            <title>{`${post.frontmatter.title}`}</title>
          </Helmet>
        }
        title={post.frontmatter.title}
        name={post.frontmatter.name}
        image={post.frontmatter.featuredimage}
      />
    </Layout>
  )
}

MemberPage.propTypes = {
  data: PropTypes.shape({
    markdownRemark: PropTypes.object,
  }),
}

export default MemberPage

export const pageQuery = graphql`
  query MemberByID($id: String!) {
    markdownRemark(id: { eq: $id }) {
      id
      html
      frontmatter {
        date(formatString: "MMMM DD, YYYY")
        title
        name
        featuredpost
        featuredimage {
          childImageSharp {
            fluid(maxWidth: 500, quality: 100) {
              ...GatsbyImageSharpFluid
            }
          }
        }
      }
    }
  }
`
