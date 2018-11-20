import React from 'react'
import PropTypes from 'prop-types'

const VideoEmbed = ({ video, service }) => {
  
  let embed
  switch(service)
  {
    case 'youtube':
      embed = <iframe width="100%" height="646" src={`https://www.youtube.com/embed/${video}`} frameBorder="0" allow="autoplay; encrypted-media" allowFullScreen />
      break;
    default:
      embed = 'Service Not Found'
  }
  return embed
}

VideoEmbed.propTypes = {
  video: PropTypes.string.isRequired,
  service: PropTypes.string.isRequired
}

export default VideoEmbed