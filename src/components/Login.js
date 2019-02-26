import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import * as ROUTES from '../constants/routes'
import { withFirebase } from '../firebase';

const LoginPage = () => (
  <div>
    <h1>Login</h1>
    <LoginForm />
    <div>
      <p>Don't have an account? <Link to={ROUTES.SIGNUP}>Sign Up</Link></p>
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
        />
        <input
          onChange={this.handleChange}
          type="password"
          name='password'
          placeholder='Password'
          value={password}
        />
        <button disabled={isInvalid} type='submit'>Login</button>
        {error && <p>{error.message}</p>}
      </form >
    )
  }
}

const LoginForm = withRouter(withFirebase(LoginFormBase))

export default LoginPage;