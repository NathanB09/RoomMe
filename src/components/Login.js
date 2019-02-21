import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { SIGNUP } from '../constants/routes'

const LoginPage = () => (
  <div>
    <h1>Login</h1>
    <LoginForm />
    <div>
      <p>Don't have an account? <Link to={SIGNUP}>Sign Up</Link></p>
    </div>
  </div >
)

const INITIAL_STATE = {
  email: '',
  password: '',
  error: ''
}

class LoginForm extends Component {

  state = {
    ...INITIAL_STATE
  }

  handleSubmit = (e) => {

  }

  handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value })
  }

  render() {
    const { email, password } = this.state

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
        <button type='submit'>Login</button>
      </form >
    )
  }
}

export default LoginPage;