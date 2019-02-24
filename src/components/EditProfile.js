import React, { Component } from 'react';
import { withAuthorization } from '../session';

class EditProfile extends Component {

  state = {
    fileSelect: null,
    fileName: '',
    metadata: {}
  }

  handleChange = (e) => {
    const file = e.target.files[0]
    this.setState({
      fileSelect: file,
      fileName: file.name,
      metadata: { contentType: file.type }
    })
    const reader = new FileReader()
    reader.onload = e => document.querySelector('#preview').src = e.target.result
    reader.readAsDataURL(file)
  }

  handleSubmit = (e) => {
    e.preventDefault()
    const { fileSelect, fileName, metadata } = this.state
    this.props.firebase.upload(fileSelect, fileName, metadata)
      .then(snapshot => console.log(snapshot.ref.getDownloadURL()))
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <img id="preview" src="#" alt="your preview" />
        <input onChange={this.handleChange} type="file" accept="image/*" />
        <input type="submit" />
      </form >
    );
  }
};

const condition = authUser => !!authUser

export default withAuthorization(condition)(EditProfile);