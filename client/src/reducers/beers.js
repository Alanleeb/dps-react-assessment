const GET_BEERS = 'GET_BEERS'

export default (state = [], action) => {
  switch(action.type) {
    case GET_BEERS:
      return action.beers
    default:
      return state
  }
}
