import React, { Component } from 'react';

import { FirebaseContext } from '../firebase'

const INITIAL_STATE = {
  username: '',
  email: '',
  passwordOne: '',
  passwordTwo: '',
  error: ''
}

const SignUpPage = () => (
  <div>
    <h1>Sign Up</h1>
    <FirebaseContext.Consumer>
      {firebase => <SignUpForm firebase={firebase} />}
    </FirebaseContext.Consumer>
  </div>
)

class SignUpForm extends Component {

  state = {
    ...INITIAL_STATE
  }

  handleSubmit = (e) => {
    e.preventDefault()

    const { username, email, passwordOne } = this.state


  }

  handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value })
  }

  render() {
    const {
      username,
      email,
      passwordOne,
      passwordTwo,
      error
    } = this.state

    const isInvalid =
      passwordOne !== passwordTwo ||
      passwordOne === '' ||
      email === '' ||
      username === ''

    return (
      <form onSubmit={this.handleSubmit}>
        <input
          onChange={this.handleChange}
          type="text"
          name="username"
          placeholder="Username"
          value={username}
        />
        <input
          onChange={this.handleChange}
          type="text"
          name="email"
          placeholder="Email"
          value={email}
        />
        <input
          onChange={this.handleChange}
          type="password"
          name="passwordOne"
          placeholder="Password"
          value={passwordOne}
        />
        <input
          onChange={this.handleChange}
          type="password"
          name="passwordTwo"
          placeholder="Confirm Password"
          value={passwordTwo}
        />
        <button disabled={isInvalid} type='submit'>Sign Up</button>

        {error && <p>{error.message}</p>}
      </form>
    );
  }
};

export default SignUpPage;