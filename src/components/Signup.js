import React, { Component } from 'react';
import { withRouter, Link } from 'react-router-dom'
import { withFirebase } from '../firebase'
import * as ROUTES from '../constants/routes'
import '../css/LoginSignup.css'

const SignUpPage = () => (
  <div className="page_wrapper">
    <div className="form">
      <h1>Sign Up</h1>
      <SignUpForm />
      <div>
        <p>Already have an account? <Link to={ROUTES.LOGIN}>Login</Link></p>
      </div>
    </div>
    <div className="logo_wrapper logo_signup">
      <img src={require("../images/landing_logo.svg")} alt="roomie logo" />
    </div>
  </div >
)

const INITIAL_STATE = {
  username: '',
  email: '',
  passwordOne: '',
  passwordTwo: '',
  error: null
}

class SignUpFormBase extends Component {

  state = {
    ...INITIAL_STATE
  }

  handleSubmit = (e) => {
    e.preventDefault()

    const { username, email, passwordOne } = this.state

    this.props.firebase.handleSignUp(email, passwordOne)
      .then(authUser => {
        return this.props.firebase
          .user(authUser.user.uid)
          .set({ username, email })
      })
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
        /><br/>
        <input
          onChange={this.handleChange}
          type="text"
          name="email"
          placeholder="Email"
          value={email}
        /><br/>
        <input
          onChange={this.handleChange}
          type="password"
          name="passwordOne"
          placeholder="Password"
          value={passwordOne}
        /><br/>
        <input
          onChange={this.handleChange}
          type="password"
          name="passwordTwo"
          placeholder="Confirm Password"
          value={passwordTwo}
        /><br/>
        <button disabled={isInvalid} type='submit'>Sign Up</button>

        {error && <p>{error.message}</p>}
      </form>
    );
  }
};

const SignUpForm = withRouter(withFirebase(SignUpFormBase))

export default SignUpPage;