import React from 'react';

class Property extends React.Component {

  state = {
    savedProperties: {}
  }

  convertTitle = () => {
    const { listing } = this.props
    if (listing.title.includes('<![CDATA[')) {
      return listing.title.replace('<![CDATA[', '').replace(']]', '')
    } else {
      return listing.title
    }
  }

  saveProperty = (e) => {
    e.preventDefault()
    const userId = this.props.firebase.auth.currentUser.uid
    const newProperty = this.props.listing
    const newPropertyId = this.hashedString(newProperty.lister_url)

    this.props.firebase.user(userId).on('value', snapshot => {
      let newProperties = {}
      if (snapshot.val().savedProperties) {
        newProperties = snapshot.val().savedProperties
        if (!(Object.keys(newProperties).includes(newPropertyId))) {
          newProperties[newPropertyId] = newProperty
          this.props.firebase.user(userId).update({ savedProperties: newProperties })
        }
      } else {
        newProperties[newPropertyId] = newProperty
        this.props.firebase.user(userId).update({ savedProperties: newProperties })
      }
    })
  }

  hashedString = (s) => {
    return s.split("").reduce((a, b) => {
      a = ((a << 5) - a) + b.charCodeAt(0)
      return a & a
    }, 0);
  }

  componentWillUnmount() {
    const userId = this.props.firebase.auth.currentUser.uid
    this.props.firebase.user(userId).off()
  }


  render() {
    const { listing } = this.props
    return (
      <a className="property_card" href={listing.lister_url} target='blank'>
        <div className='card_img'>
          <img src={listing.img_url} alt="property thumbnail" />
          <p>£{listing.price * 4}</p>
        </div>
        <div className="property_card_details">
          <div className="property_bed_bath">
            <p><i className="fas fa-bed"></i> {listing.bedroom_number} Bedrooms</p>
            <p><i className="fas fa-bath"></i> {listing.bathroom_number} Bathrooms</p>
          </div>
          <div className="property_address">
            <p><i className="fas fa-map-marker-alt"></i> {this.convertTitle()}</p>
          </div>
          <div className="property_btn_wrapper">
            <button onClick={this.saveProperty}>Save</button>
          </div>
        </div>
      </a>
    );
  }
};

export default Property;