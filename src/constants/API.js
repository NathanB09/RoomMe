class API {
  static init() {
    const apiKey = process.env.REACT_APP_ZOOPLA_API_KEY
    const baseURL = `http://api.zoopla.co.uk/api/v1/property_listings.json?api_key=${apiKey}&area=London&listing_status=rent&maximum_price=200&minimum_beds=2`
  }
}

API.init()

export default API