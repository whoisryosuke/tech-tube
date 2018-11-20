import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Drawer from '@material-ui/core/Drawer'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListItemText from '@material-ui/core/ListItemText'
import Divider from '@material-ui/core/Divider'
import { withStyles } from '@material-ui/core/styles'
import ExpandLess from '@material-ui/icons/ExpandLess'
import ExpandMore from '@material-ui/icons/ExpandMore'
import Collapse from '@material-ui/core/Collapse'

const styles = theme => ({
  list: {
    width: 250,
  },
  fullList: {
    width: 'auto',
  },
  nested: {
    paddingLeft: theme.spacing.unit * 4,
  },
})

class HeaderMenu extends Component {

  constructor(props) {
    super(props)
    this.state = {
      open: false
    }
  }

  static propTypes = {
    open: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
  }

  handleClick = () => {
    this.setState(state => ({ open: !state.open }))
  }

  render() {
    const { categories, classes, onClose, open } = this.props
    console.log(categories)
    return (
      <Drawer open={open} onClose={onClose(false)}>
        <div
          tabIndex={0}
          role="button"
          onClick={onClose(true)}
          onKeyDown={onClose(false)}
        >
          <div className={classes.list}>
            <List component="nav">

              <ListItem button onClick={this.handleClick}>
                <ListItemText primary="Categories" />
                {this.state.open ? <ExpandLess /> : <ExpandMore />}
              </ListItem>
              <Collapse in={this.state.open} timeout="auto" unmountOnExit>
                <List component="div" disablePadding>
                  {
                    categories.group.map((category) =>
                      <ListItem
                        button
                        className={classes.nested}
                        component="a"
                        href={`/category/${category.fieldValue}`}
                      >
                        <ListItemText inset primary={ category.fieldValue } />
                      </ListItem>
                    )
                  }
                </List>
              </Collapse>
            </List>
            <Divider />
            <List component="nav">
              <ListItem button component="a" href="/about">
                <ListItemText primary="About" />
              </ListItem>
              <ListItem button component="a" href="/contribute">
                <ListItemText primary="Contribute" />
              </ListItem>
            </List>
          </div>
        </div>
      </Drawer>
    )
  }
}

export default withStyles(styles)(HeaderMenu);

