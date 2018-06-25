import React, { Component } from 'react'
import { Menu } from 'semantic-ui-react'
import { Link } from 'react-router-dom'
import { withRouter } from 'react-router'

class NavBar extends Component {
  activeItem = (navPath) => {
    return navPath === this.props.location.pathname;
  }

  render() {
    return (
      <div>
        <Menu pointing>
          <Link to='/'>
            <Menu.Item name='home' color="green" active={this.activeItem('/')} />
          </Link>
            <Link to='/beers'>
              <Menu.Item color="green" name='See All Beers' />
            </Link>
            <Link to='/breweries'>
              <Menu.Item color="green" name='See All Breweries' />
            </Link>
        </Menu>
      </div>
    )
  }
}

export default withRouter(NavBar);