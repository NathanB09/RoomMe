import React from 'react';
import { withAuthorization } from '../session';
import API from '../constants/API';
import Property from './Property'

class PropertyList extends React.Component {

  state = {
    properties: null,
    pageNo: 1
  }

  componentDidMount() {
    API.testCall(this.state.pageNo).then(data => this.setState({ properties: data }))
  }

  nextPage = async () => {
    await this.setState({ pageNo: this.state.pageNo + 1 })
    API.testCall(this.state.pageNo).then(data => this.setState({ properties: data }))
  }

  prevPage = async () => {
    await this.setState({ pageNo: this.state.pageNo - 1 })
    API.testCall(this.state.pageNo).then(data => this.setState({ properties: data }))
  }

  render() {
    const { properties } = this.state
    return (
      <div>
        <div>
          <button onClick={this.prevPage}>prev page</button>
          <button onClick={this.nextPage}>next page</button>
          {properties && <p>Page {properties.response.page} of {properties.response.total_pages}</p>}
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