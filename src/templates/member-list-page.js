import React from 'react'

import Layout from '../components/Layout'

import { graphql } from 'gatsby'
import MemberRoll from '../components/MemberRoll';
import { Typography } from '@material-ui/core';

const MemberListPage = ({ data, count, pageContext }) => {
  const { edges: posts } = data.allMarkdownRemark
  const { numPages, currentPage } = pageContext
  return (
    <Layout>
      <div className='member-list-page'>
        <div className='section-title'>
          <Typography variant='h4' align='center'>メンバー</Typography>
        </div>
        <MemberRoll
          posts={posts}
          numPages={numPages}
          currentPage={currentPage}
        />
      </div>
    </Layout>
  )
}

export default MemberListPage

export const memberListPageQuery = graphql`
      query MemberListPageQuery($skip: Int!, $limit: Int!) {
        allMarkdownRemark(
          sort: { order: DESC, fields: [frontmatter___date] }
          filter: { frontmatter: { templateKey: { eq: "member-page" } } }
          limit: $limit
          skip: $skip
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
                name
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