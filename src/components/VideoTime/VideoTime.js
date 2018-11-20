import React from 'react'
import PropTypes from 'prop-types'

const VideoTime = ({ length }) => {
  return (
    <span className="length">
      {/* Minutes = length / 60 : Seconds = Length - (Minutes * 60) */ }
      {/* https://stackoverflow.com/questions/3733227/javascript-seconds-to-minutes-and-seconds */ }
      {/* https://stackoverflow.com/questions/8513032/less-than-10-add-0-to-number */ }
      { Math.round(Number(length) / 60) }: { Number(length) - Math.round(Number(length) / 60) * 60 }
    </span>
  )
}

VideoTime.propTypes = {
  length: PropTypes.string.isRequired
}

export default VideoTime
