import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'gatsby'
import styled from 'react-emotion'

const styles = theme => ({
  root: {
    padding: theme.spacing.unit * 2,
  },
  header: {
    padding: theme.spacing.unit * 2,
    backgroundColor: '#222',
  },
  content: {
    backgroundColor: '#555',
  },
  row: {
    display: 'flex',
  },
  rowContent: {
    padding: theme.spacing.unit * 2,
    display: 'inline-block',
  },
  cover: {
    width: '150px',
    height: '75px',
    overflow: 'hidden',
    margin: theme.spacing.unit * 2,
    marginRight: '0',
    display: 'inline-block',
  },
  coverImage: {
    width: '100%',
  },
  link: {
    textDecoration: 'none',
    color: '#FFF',
  },
})

const Figure = styled.figure`
  margin-bottom:1em;
`
const PlaylistLink = styled(Link)`
  display:flex;
  
  figure {
    min-width:150px;
    margin-right:1em;
  }

  figure img {
    width:100%;
  }
`

const Playlist = ({ classes, playlist }) => {
  const videos = playlist.edges.map(video => (
    <PlaylistLink to={video.node.fields.slug}>
      <figure>
        <img
          src={`https://img.youtube.com/vi/${video.node.video}/1.jpg`}
        />
      </figure>
      <h4>{video.node.name}</h4>
    </PlaylistLink>
  ))
  return (
    <nav>
      <section>
        <h3>
          Playlist
        </h3>
      </section>
      <section>
        { videos }
      </section>
    </nav>
  )
}

Playlist.propTypes = {

}

export default Playlist