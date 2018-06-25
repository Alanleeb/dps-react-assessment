import React from 'react'
import axios from 'axios'
import { connect } from 'react-redux'
import {setFlash} from '../actions/flash'
import styled from 'styled-components'
import {
  Segment,
  Header,
  Card,
  Image,
  Divider,
} from 'semantic-ui-react'

import SearchBeers from './SearchBeers'

const beerImage = 'http://icons.iconarchive.com/icons/flat-icons.com/flat/128/Beer-icon.png'

const StyledCard = styled(Card)`
  height: 250px;
`

//CLASS STARTS
class Beers extends React.Component {
  state = { beers: [], search: '' }

  componentDidMount() {
    this.getBeers(this.props)
  }

  getBeers = ( props ) => {
    const { dispatch } = this.props
    const url = `/api/all_beers/`
    axios.get(url)
      .then(res => {
        const data  = res.data
            this.setState({ beers: [...this.state.beers, ...data.entries] }) 
           
          })
        .catch(error => {
          dispatch(setFlash('But why is all the Rum gone!'))
        })
      }
        
  search = (term) => {
      axios.get(`/api/search_beers?query=${term}`)
        .then(res => {
          this.setState({beers: res.data.entries})
        })
      }

  beerName = (beer) => {
    return (
      beer.name ? <Card.Header>{beer.name}</Card.Header> : <Card.Header>No Name</Card.Header>
    )}
  
  beerLabel = (beer) => {
    return (
      beer.labels ? <Image centered size='tiny' src={beer.labels.medium} /> : <Image centered size='tiny' src={beerImage} />
    )}

  beerStyle = (beer) => {
    const style = beer.style
    if (typeof style === "undefined")
      return <Card.Meta> No style at all </Card.Meta>
    else
    return (
      style.name ? <Card.Meta> {style.name} </Card.Meta> : <Card.Meta> Beer </Card.Meta> 
    )}

  displayBeers = () => {
    const { beers } = this.state;
    return beers.map( (beer, i) => {
      return (
        <StyledCard key={i}>
          { this.beerLabel(beer) }
          <Card.Content>
            { this.beerName(beer) }
            { this.beerStyle(beer)}
          </Card.Content>
        </StyledCard>
      );
    });
  }

  render() {
    return (
      <Segment inverted>
        <Divider />
          <Header as="h1" textAlign="center" color="green">A Variety of Beers</Header>
          <SearchBeers onSearch={this.search} />
          <Divider />
          <Card.Group itemsPerRow={5}>
            { this.displayBeers() }
          </Card.Group>
      </Segment>
    )
  }
}

export default connect()(Beers)


            
        