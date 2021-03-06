import React from 'react';
import { withAuthorization } from '../session';
import API from '../constants/API';
import Property from './Property'
import '../css/PropertyList.css'

class PropertyList extends React.Component {

  state = {
    currentUser: {},
    properties: null,
    pageNo: 1
  }

  componentDidMount() {
    const userId = this.props.firebase.auth.currentUser.uid
    this.props.firebase.users().on('value', snapshot => {
      this.setState({ currentUser: snapshot.val()[userId] })
      const { currentUser, pageNo } = this.state
      this.userProperties(currentUser, pageNo)
    })
  }

  componentWillUnmount() {
    this.props.firebase.users().off()
  }

  userProperties = async (user, pageNo) => {
    await API.getProperties(user.budgetMin, user.budgetMax, pageNo)
      .then(data => this.setState({ properties: data }))
  }

  nextPage = async () => {
    await this.setState({ pageNo: this.state.pageNo + 1 })
    const { currentUser, pageNo } = this.state
    this.userProperties(currentUser, pageNo)
  }

  prevPage = async () => {
    await this.setState({ pageNo: this.state.pageNo - 1 })
    const { currentUser, pageNo } = this.state
    this.userProperties(currentUser, pageNo)
  }

  render() {
    const { properties, pageNo } = this.state
    return (
      <div>
        <div className="save_notification_wrapper">
          <div className="notification_card">
            <p><i className="fas fa-home"></i> Property Saved!</p>
          </div>
        </div>
        <div className='property_banner_wrapper'>
          <img src={require('../images/roomme_logo.svg')} alt="roomie logo" />
        </div>
        <div className="property_page_heading">
          <h1>Properties</h1>
        </div>
        <div className="page_buttons">
          {properties &&
            <p>Page {properties.response.page} of {properties.response.total_pages}</p>
          }
          {properties &&
            <button
              onClick={this.prevPage}
              disabled={pageNo === 1 ? true : false}>
              <i className="fas fa-angle-left"></i>
            </button>
          }
          {properties &&
            <button
              onClick={this.nextPage}
              disabled={pageNo === properties.response.total_pages ? true : false}>
              <i className="fas fa-angle-right"></i>
            </button>
          }

        </div>
        <div className='properties_wrapper'>
          {properties && properties.response.listings.map(listing => <Property key={listing.lister_url} listing={listing} firebase={this.props.firebase} saveDelete={"Save"} />)}
        </div>
      </div>
    );
  }
};

const condition = authUser => !!authUser

export default withAuthorization(condition)(PropertyList);