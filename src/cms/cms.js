import CMS from 'netlify-cms-app'
import uploadcare from 'netlify-cms-media-library-uploadcare'
import cloudinary from 'netlify-cms-media-library-cloudinary'

import AboutPagePreview from './preview-templates/AboutPagePreview'
import BlogPostPreview from './preview-templates/BlogPostPreview'
import IndexPagePreview from './preview-templates/IndexPagePreview'
import MemberPagePreview from './preview-templates/MemberPagePreview'
import { netlifyCmsGMapsControl, netlifyCmsGMapsPreview } from 'netlify-cms-widget-gmaps'

CMS.registerMediaLibrary(uploadcare);
CMS.registerMediaLibrary(cloudinary);

CMS.registerPreviewTemplate('index', IndexPagePreview)
CMS.registerPreviewTemplate('about', AboutPagePreview)
CMS.registerPreviewTemplate('blog', BlogPostPreview)
CMS.registerPreviewTemplate('member', MemberPagePreview)

CMS.registerWidget('gmaps', netlifyCmsGMapsControl, netlifyCmsGMapsPreview)