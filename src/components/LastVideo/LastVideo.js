import React from 'react'
import { Link } from 'gatsby'
import styled, { keyframes } from 'react-emotion'


const fadeUp = keyframes`
  0% {
    opacity:0;
    transform:translateY(100%);
  }
  100% {
    opacity:1;
    transform:translateY(0);
  }
`

const StyledLastVideo = styled(LastVideo)`
  width: 250px;
  padding: 1em;
  background: #fff;
  border: 1px solid #ccc;
  font-size: 0.8em;

  position: fixed;
  bottom: -1px;
  right: 1em;

  animation: ${fadeUp} 1s ease;
  animation-iteration-count: 1;
  transform-origin: center bottom;

  figure {
    margin-bottom: 0;
  }
  h4 {
    font-size: 1em;
    margin-bottom: 1em;
  }
`

function LastVideo({ className }) {
  // Grab last video played from cache (serialized JSON object)
  const video = localStorage.getItem('techtube-last-video')

  if(video) {
    let parsedVideo
    
    // Use a try/catch to ensure JSON parse doesn't crash React
    try {
      parsedVideo = JSON.parse(video)
    } catch(e) {
      console.log(e)
    }

    // If we got a parsed video, let's display it
    if (parsedVideo) {
      const { slug, name, video, service } = parsedVideo

      return <div className={className}>
        <h4>Keep watching:</h4>
        <figure>
          <Link to={`/v/${slug}`}>
            <img
              src={`https://img.youtube.com/vi/${video}/0.jpg`}
            />
          </Link>
        </figure>

        <Link to={`/v/${slug}`}>
          {name}
        </Link>
      </div>
    }
  }
  return (<div></div>)
}

export default StyledLastVideo