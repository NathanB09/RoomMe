import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import * as ROUTES from '../constants/routes'
import { withFirebase } from '../firebase';
import '../css/LoginSignup.css'

const LoginPage = () => (
  <div className="page_wrapper">
    <div className="form">
      <h1>Login</h1>
      <LoginForm />
      <div>
        <p>Don't have an account? <Link to={ROUTES.SIGNUP}>Sign Up</Link></p>
      </div>
    </div>
    <div>
      <img src="./landing_logo.svg" alt="roomie logo" />
    </div>
  </div >
)

const INITIAL_STATE = {
  email: '',
  password: '',
  error: null
}

class LoginFormBase extends Component {

  state = {
    ...INITIAL_STATE
  }

  handleSubmit = (e) => {
    e.preventDefault()

    const { email, password } = this.state

    this.props.firebase.handleLogin(email, password)
      .then(() => {
        this.setState({ ...INITIAL_STATE })
        this.props.history.push(ROUTES.PROFILE)
      })
      .catch(error => this.setState({ error }))
  }

  handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value })
  }

  render() {
    const { email, password, error } = this.state

    const isInvalid = password === '' || email === ''

    return (
      <form onSubmit={this.handleSubmit} >
        <input
          onChange={this.handleChange}
          type="text"
          name='email'
          placeholder='Email' value={email}
        /><br />
        <input
          onChange={this.handleChange}
          type="password"
          name='password'
          placeholder='Password'
          value={password}
        /><br />
        <button disabled={isInvalid} type='submit'>Login</button>
        {error && <p>{error.message}</p>}
      </form >
    )
  }
}

const LoginForm = withRouter(withFirebase(LoginFormBase))

export default LoginPage;