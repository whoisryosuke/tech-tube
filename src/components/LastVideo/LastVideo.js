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

class LastVideo extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      hide: false
    }
  }

  hideWindow = (e) => {
    console.log('window hidden')
    this.setState({ hide:true })
  }

  render() {
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
        const { className } = this.props
        const { hide } = this.state
        const classes = hide ? `hide ${className}` : className

        return <div className={classes}>
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
          <button onClick={this.hideWindow}>
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/><path d="M0 0h24v24H0z" fill="none"/></svg>
          </button>
        </div>
      }
    }
    return (<div></div>)
  }
}

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

  transition: transform 400ms linear, opacity 400ms linear;

  figure {
    margin-bottom: 0;
  }
  h4 {
    font-size: 1em;
    margin-bottom: 1em;
  }

  &.hide {
    opacity:0;
    transform:translateY(100%);
  }
  
  button {
    background:none;
    border:0;
    position:absolute;
    top:0.5em;
    right:0.5em;
  }

  button:hover {
    cursor:pointer;
  }
`

export default StyledLastVideo