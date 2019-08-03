import React from 'react'
import { navigate } from 'gatsby-link'
import Layout from '../../components/Layout'
import { Typography, Button } from '@material-ui/core';

function encode(data) {
  return Object.keys(data)
    .map(key => encodeURIComponent(key) + '=' + encodeURIComponent(data[key]))
    .join('&')
}

export default class Index extends React.Component {
  constructor(props) {
    super(props)
    this.state = { isValidated: false }
  }

  handleChange = e => {
    this.setState({ [e.target.name]: e.target.value })
  }

  handleSubmit = e => {
    e.preventDefault()
    const form = e.target
    fetch('/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: encode({
        'form-name': form.getAttribute('name'),
        ...this.state,
      }),
    })
      .then(() => navigate(form.getAttribute('action')))
      .catch(error => alert(error))
  }

  render() {
    return (
      <Layout>
        <div className="contact-page">
          <div className='section-title'>
            <Typography variant='h4' align='center'>お問い合わせ</Typography>
          </div>
          <form
            name="contact"
            method="post"
            action="/contact/thanks/"
            data-netlify="true"
            data-netlify-honeypot="bot-field"
            onSubmit={this.handleSubmit}
          >
            {/* The `form-name` hidden field is required to support form submissions without JavaScript */}
            <input type="hidden" name="form-name" value="contact" />
            <div hidden>
              <label>
                Don’t fill this out:{' '}
                <input name="bot-field" onChange={this.handleChange} />
              </label>
            </div>
            <div className="field">
              <label className="label" htmlFor={'name'}>
                お名前
              </label>
              <div className="control">
                <input
                  className="input"
                  type={'text'}
                  name={'name'}
                  onChange={this.handleChange}
                  id={'name'}
                  required={true}
                />
              </div>
            </div>
            <div className="field">
              <label className="label" htmlFor={'email'}>
                メールアドレス
              </label>
              <div className="control">
                <input
                  className="input"
                  type={'email'}
                  name={'email'}
                  onChange={this.handleChange}
                  id={'email'}
                  required={true}
                />
              </div>
            </div>
            <div className="field">
              <label className="label" htmlFor={'message'}>
                内容
              </label>
              <div className="control">
                <textarea
                  className="textarea"
                  rows="5"
                  name={'message'}
                  onChange={this.handleChange}
                  id={'message'}
                  required={true}
                />
              </div>
            </div>
            <div className="field">
              <Button type='submit'>
                送信
              </Button>
            </div>
          </form>
        </div>
      </Layout>
    )
  }
}
