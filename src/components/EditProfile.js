import React, { Component } from 'react';
import { withAuthorization } from '../session';
import * as ROUTES from '../constants/routes'

const INITIAL_STATE = {
  fileSelect: null,
  fileName: '',
  metadata: {},
  budgetMin: '',
  budgetMax: '',
  drink: '-',
  drugs: '-',
  smoke: '-',
  error: null
}

class EditProfile extends Component {

  state = {
    ...INITIAL_STATE
  }

  componentDidMount() {
    const user = this.props.firebase.auth.currentUser
    this.props.firebase.user(user.uid)
      .on('value', snapshot =>
        snapshot.val().budgetMin &&
        snapshot.val().budgetMax &&
        snapshot.val().drink &&
        snapshot.val().drugs &&
        snapshot.val().smoke &&
        this.setState({
          budgetMin: snapshot.val().budgetMin,
          budgetMax: snapshot.val().budgetMax,
          drink: snapshot.val().drink,
          drugs: snapshot.val().drugs,
          smoke: snapshot.val().smoke
        }))
  }

  componentWillUnmount() {
    const user = this.props.firebase.auth.currentUser
    this.props.firebase.user(user.uid).off()
  }

  handleImageChange = (e) => {
    const file = e.target.files[0]
    if (file) {
      this.setState({
        fileSelect: file,
        fileName: file.name,
        metadata: { contentType: file.type }
      })
      const reader = new FileReader()
      reader.onload = e => document.querySelector('#preview').src = e.target.result
      reader.readAsDataURL(file)
    }
  }

  handlePreferenceChange = (e) => {
    this.setState({ [e.target.name]: e.target.value })
  }

  handleSubmit = (e) => {
    e.preventDefault()
    const {
      fileSelect,
      fileName,
      metadata,
      budgetMax,
      budgetMin,
      drink,
      drugs,
      smoke } = this.state
    const user = this.props.firebase.auth.currentUser

    if (fileName) {
      this.props.firebase.upload(fileSelect, fileName, metadata)
        .then(snapshot => snapshot.ref.getDownloadURL())
        .then(profile_img => {
          this.props.firebase
            .user(user.uid)
            .update({ budgetMin, budgetMax, drink, drugs, smoke, profile_img })
        })
        .then(() => {
          this.setState({ ...INITIAL_STATE })
          this.props.history.push(ROUTES.PROFILE)
        })
        .catch(error => this.setState({ error }))
    } else {
      this.props.firebase
        .user(user.uid)
        .update({ budgetMin, budgetMax, drink, drugs, smoke })
        .then(() => {
          this.setState({ ...INITIAL_STATE })
          this.props.history.push(ROUTES.PROFILE)
        })
        .catch(error => this.setState({ error }))
    }
  }

  render() {
    const { fileName, budgetMin, budgetMax, drink, drugs, smoke, error } = this.state
    // const userId = this.props.firebase.auth.currentUser.uid
    return (
      <form onSubmit={this.handleSubmit}>
        {fileName && <img id="preview" src="#" alt="your preview" />}
        <input
          onChange={this.handleImageChange}
          type="file"
          accept="image/*" />
        <input
          onChange={this.handlePreferenceChange}
          type="text"
          name="budgetMin"
          placeholder="Budget min"
          value={budgetMin} />
        <input
          onChange={this.handlePreferenceChange}
          type="text"
          name="budgetMax"
          placeholder="Budget max"
          value={budgetMax} />
        <select onChange={this.handlePreferenceChange} name="drink">
          <option defaultValue>{drink}</option>
          <option value="no">No</option>
          <option value="socially">Socially</option>
        </select>
        <select onChange={this.handlePreferenceChange} name="drugs">
          <option defaultValue>{drugs}</option>
          <option value="no">No</option>
          <option value="sometimes">Sometimes</option>
          <option value="often">Often</option>
        </select>
        <select onChange={this.handlePreferenceChange} name="smoke">
          <option defaultValue>{smoke}</option>
          <option value="no">No</option>
          <option value="sometimes">Sometimes</option>
          <option value="often">Often</option>
        </select>
        <input type="submit" value="Save" />
        {error && <p>{error.message}</p>}
      </form >
    );
  }
};

const condition = authUser => !!authUser

export default withAuthorization(condition)(EditProfile);