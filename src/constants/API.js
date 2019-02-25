class API {
  static init() {
    const proxyurl = "https://cors-anywhere.herokuapp.com/"
    this.baseURL = proxyurl + 'https://api.nestoria.co.uk/api?encoding=json&action=search_listings&country=uk&listing_type=rent&place_name=london&bedroom_min=2&bathroom_min=1&number_of_results=10'
    this.budgetURL = (min, max) => `${this.baseURL}&price_min=${min}&price_max=${max}`
  }

  static testCall(num) {
    return fetch(this.budgetURL(600, 700) + `&page=${num}`)
      .then(resp => resp.json())
  }
}

API.init()

export default API