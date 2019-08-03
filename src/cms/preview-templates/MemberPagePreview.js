import React from 'react'
import PropTypes from 'prop-types'
import { MemberPageTemplate } from '../../templates/member-page'

const MemberPagePreview = ({ entry, widgetFor }) => (
  <MemberPageTemplate
    content={widgetFor('body')}
    description={entry.getIn(['data', 'description'])}
    tags={entry.getIn(['data', 'tags'])}
    title={entry.getIn(['data', 'title'])}
  />
)

MemberPagePreview.propTypes = {
  entry: PropTypes.shape({
    getIn: PropTypes.func,
  }),
  widgetFor: PropTypes.func,
}

export default MemberPagePreview
