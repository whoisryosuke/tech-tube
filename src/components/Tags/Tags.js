import React from 'react'
import Link from 'gatsby-link'
import PropTypes from 'prop-types'
import styled from 'react-emotion'


const styles = theme => ({
  chip: {
    margin: theme.spacing.unit,
  },
  link: {
    textDecoration: 'none'
  }
})


const Tags = ({ className, tags }) => {

  const loop = tags.map(tag =>
    <Link to={`tag/${tag}`}>
      {tag}
    </Link>)

  return (
    <nav className={className}>
      <h4>Categories: </h4> 
      { loop }
    </nav>
  )
}

Tags.propTypes = {
  tag: PropTypes.array.isRequried
}

const StyledTags = styled(Tags)`
  h4, a {
    margin-right: 1em;
    display: inline-block;
  }
`

export default StyledTags