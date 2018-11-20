import React from 'react';
import { Link } from 'gatsby'
import PropTypes from 'prop-types';
import { Flex, Box } from '@rebass/grid/emotion'
import styled from 'react-emotion'
// import HeaderMenu from './HeaderMenu'

const AppBar = styled.div`
  width:100%;
  height:3em;
  position:fixed;
  top:0;
  left:0;
  padding:0.75em;
  display:flex;
  justify-content:space-between;
`

const Logo = styled.h1`
  font-size: 1em;

  a {
    color: #000;
  }

  a:hover {
    color: #cc2029;
  }
`

const Menu = styled.nav`
  a {
    font-size:0.8em;
    margin-right:1em;
  }
`

class Header extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      open: false
    }
  }
  static propTypes = {
  }

  toggleDrawer = (openState) => () => {
    this.setState({
      open: openState
    });
  };

  render() {
    const { categories } = this.props;
    const { open } = this.state
    return (
      <React.Fragment>
        <AppBar>
          <Logo>
            <Link to="/">Tech Tube</Link>
          </Logo>
          <Menu>
            <Link to="/categories">Categories</Link>
            <Link to="/speakers">Speakers</Link>
          </Menu>
        </AppBar>
        {/* <HeaderMenu open={open} onClose={this.toggleDrawer} categories={categories} /> */}
      </React.Fragment>
    )
  }
}

export default Header;