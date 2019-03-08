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
    newProperty.id = newPropertyId

    this.props.firebase.user(userId).on('value', snapshot => {
      let newProperties = {}
      if (snapshot.val().savedProperties) {
        newProperties = snapshot.val().savedProperties
        if (!(Object.keys(newProperties).includes(newPropertyId))) {
          this.updateProperties(newProperties, newProperty, userId)
        }
      } else {
        this.updateProperties(newProperties, newProperty, userId)
      }
    })
  }

  updateProperties = (properties, listing, userId) => {
    properties[listing.id] = listing
    this.props.firebase.user(userId).update({ savedProperties: properties })
    const popupCard = document.querySelector('.notification_card').classList
    if (!popupCard.value.includes('show')) {
      popupCard.add('show')
      this.popup()
    }
  }

  popup = () => {
    const popupCard = document.querySelector('.notification_card').classList
    if (popupCard.value.includes('show')) {
      setTimeout(() => {
        popupCard.remove('show')
      }, 2500)
    }
  }

  deleteProperty = (e) => {
    e.preventDefault()
    const userId = this.props.firebase.auth.currentUser.uid
    this.props.firebase.user(userId).child('savedProperties').child(this.props.listing.id).remove()
    this.props.updatePropertyList(this.props.listing.id)
  }

  hashedString = (s) => {
    return s.split("").reduce((a, b) => {
      a = ((a << 5) - a) + b.charCodeAt(0)
      return a & a
    }, 0);
  }

  componentWillUnmount() {
    const user = this.props.firebase.auth.currentUser
    user && this.props.firebase.user(user.uid).off()
  }


  render() {
    const { listing, saveDelete } = this.props
    return (
      <div className={"property_card_wrapper"}>
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
              {saveDelete === 'Save'
                ? <button onClick={this.saveProperty}>Save</button>
                : <button onClick={this.deleteProperty}>Delete</button>
              }
            </div>
          </div>
        </a>
      </div>
    );
  }
};

export default Property;