import React from 'react';
import axios from 'axios';
import {
  Grid,
  Segment,
  Divider,
  Header,
  Image,
  Container,
} from 'semantic-ui-react';


const beerImage = 'http://icons.iconarchive.com/icons/flat-icons.com/flat/128/Beer-icon.png'


class BeerView extends React.Component {
  state = { beer: {} }

  componentDidMount() {
    const {id} = this.props.match.params
    axios.get(`/api/beer/${id}`)
      .then(res => {
        this.setState({beer: res.data.entries[0]})
      })
  }

  beerName = (beer) => {
    return (
      beer.name ? <Header textAlign='center' as="h2" >{beer.name}</Header> : <Header textAlign='center' as="h2" color='yellow'>Beer Name Unavailable</Header>
    )}
  
  beerLabel = (beer) => {
    return (
      beer.labels ? <Image centered size='large' src={beer.labels.large} /> : <Image centered size='large' src={beerImage} />
    )}

  beerStyle = (beer) => {
    const style = beer.style
    if (typeof style === "undefined")
      return  <p> No style at all </p>
    else
    return (
      style.name ?  <Header  as="h3" textAlign='right' color='yellow'> {style.name} </Header>  :   <Header as="h3" color='yellow'> 'Beer' </Header> 
    )}

  beerDescription = (beer) => {
    return(
      beer.description ? <p> {beer.description} </p> : <p> No description available </p>
    )
  }

      render() {
      const { beer }  = this.state
      return (
        <Container>
          <Divider />
            <Segment>
              <Grid>
                <Grid.Row>
                  <Grid.Column width={8}>
                    { this.beerName(beer) }
                    { this.beerDescription(beer)}
                    { this.beerStyle(beer) }
                  </Grid.Column>
                  <Grid.Column width={8}>
                    { this.beerLabel(beer) }
                  </Grid.Column>
                </Grid.Row>
              </Grid>
            </Segment>
        </Container>
      )
  }
}

export default BeerView