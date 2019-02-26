import React from 'react';
import { withAuthorization } from '../session';
import API from '../constants/API';
import Property from './Property'

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
        <div>
          {properties &&
            <button
              onClick={this.prevPage}
              disabled={pageNo === 1 ? true : false}>
              prev page
            </button>}
          {properties &&
            <button
              onClick={this.nextPage}
              disabled={pageNo === properties.response.total_pages ? true : false}>
              next page
            </button>}
          {properties &&
            <p>Page {properties.response.page} of {properties.response.total_pages}</p>
          }
        </div>
        <div>
          {properties && properties.response.listings.map(listing => <Property key={listing.lister_url} listing={listing} />)}
        </div>
      </div>
    );
  }
};

const condition = authUser => !!authUser

export default withAuthorization(condition)(PropertyList);