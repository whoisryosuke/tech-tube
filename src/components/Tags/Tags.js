import React from 'react'
import Link from 'gatsby-link'
import PropTypes from 'prop-types'


const styles = theme => ({
  chip: {
    margin: theme.spacing.unit,
  },
  link: {
    textDecoration: 'none'
  }
})

const Tags = ({ tags }) => {

  const loop = tags.map(tag =>
    <Link to={`tag/${tag}`}>
      {tag}
    </Link>)

  return (
    <nav className="Tags">
      { loop }
    </nav>
  )
}

Tags.propTypes = {
  tag: PropTypes.array.isRequried
}

export default Tags