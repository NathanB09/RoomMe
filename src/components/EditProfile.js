import React, { Component } from 'react';
import { withAuthorization } from '../session';
import * as ROUTES from '../constants/routes'
import '../css/EditProfile.css'

const INITIAL_STATE = {
  fileSelect: null,
  fileName: '',
  metadata: {},
  budgetMin: '',
  budgetMax: '',
  drink: '-',
  profession: '-',
  smoke: '-',
  profile_img: '',
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
        snapshot.val().profession &&
        snapshot.val().smoke &&
        snapshot.val().profile_img &&
        this.setState({
          budgetMin: snapshot.val().budgetMin,
          budgetMax: snapshot.val().budgetMax,
          drink: snapshot.val().drink,
          profession: snapshot.val().profession,
          smoke: snapshot.val().smoke,
          profile_img: snapshot.val().profile_img
        }))
  }

  componentWillUnmount() {
    const user = this.props.firebase.auth.currentUser
    user && this.props.firebase.user(user.uid).off()
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

  handlePreferenceChange = async (e) => {
    await this.setState({ [e.target.name]: e.target.value })
  }

  handleSubmit = async (e) => {
    e.preventDefault()

    if (parseInt(this.state.budgetMin) > parseInt(this.state.budgetMax)) {
      await this.setState({
        budgetMax: this.state.budgetMin,
        budgetMin: this.state.budgetMax
      })
    }

    const user = this.props.firebase.auth.currentUser
    const {
      fileSelect,
      fileName,
      metadata,
      budgetMax,
      budgetMin,
      drink,
      profession,
      smoke } = this.state

    if (fileName) {
      this.props.firebase.upload(fileSelect, fileName, metadata)
        .then(snapshot => snapshot.ref.getDownloadURL())
        .then(profile_img => {
          this.props.firebase
            .user(user.uid)
            .update({ budgetMin, budgetMax, drink, profession, smoke, profile_img })
        })
        .then(() => {
          this.setState({ ...INITIAL_STATE })
          this.props.history.push(ROUTES.USER_PROFILE)
        })
        .catch(error => this.setState({ error }))
    } else {
      this.props.firebase
        .user(user.uid)
        .update({ budgetMin, budgetMax, drink, profession, smoke })
        .then(() => {
          this.setState({ ...INITIAL_STATE })
          this.props.history.push(ROUTES.USER_PROFILE)
        })
        .catch(error => this.setState({ error }))
    }
  }

  render() {
    const { fileName, budgetMin, budgetMax, drink, profession, smoke, profile_img, error } = this.state
    // const userId = this.props.firebase.auth.currentUser.uid
    return (
      <div className='edit_form'>
        <form onSubmit={this.handleSubmit}>
          <div className="edit_form_left">
            <div className="preview_img_wrapper">
              {fileName
                ? <img id="preview" src="#" alt="profile pic preview" />
                : (profile_img
                  ? <img src={profile_img} alt="profile pic preview" />
                  : <i className="fas fa-user"></i>)
              }
            </div>
            <div className="upload_image_wrapper">
              <input
                onChange={this.handleImageChange}
                type="file"
                accept="image/*" />
              <button><i className="fas fa-upload"></i> Picture</button>
            </div>
          </div>
          <div className="edit_form_right">
            <div className="budget_wrapper">
              <p>Budget:</p>
              <div className="budget_input_wrapper">
                <input
                  onChange={this.handlePreferenceChange}
                  type="text"
                  name="budgetMin"
                  placeholder="Min"
                  value={budgetMin} />
                <input
                  onChange={this.handlePreferenceChange}
                  type="text"
                  name="budgetMax"
                  placeholder="Max"
                  value={budgetMax} />
              </div>
            </div>
            <div className="preference_wrapper">
              <p>Drink:</p>
              <select onChange={this.handlePreferenceChange} name="drink">
                <option defaultValue>{drink}</option>
                <option value="No">No</option>
                <option value="Socially">Socially</option>
                <option value="Often">Often</option>
              </select>
            </div>
            <div className="preference_wrapper">
              <p>Profession:</p>
              <select onChange={this.handlePreferenceChange} name="profession">
                <option defaultValue>{profession}</option>
                <option value="Professional">Professional</option>
                <option value="Student">Student</option>
                <option value="Unemployed">Unemployed</option>
              </select>
            </div>
            <div className="preference_wrapper">
              <p>Smoke:</p>
              <select onChange={this.handlePreferenceChange} name="smoke">
                <option defaultValue>{smoke}</option>
                <option value="No">No</option>
                <option value="Sometimes">Sometimes</option>
                <option value="Often">Often</option>
              </select>
            </div>
            <button className="save_btn" type="submit">Save</button>
          </div>
          {error && <p>{error.message}</p>}
        </form >
      </div>
    );
  }
};

const condition = authUser => !!authUser

export default withAuthorization(condition)(EditProfile);