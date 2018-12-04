import React from 'react'
import { Link } from 'gatsby'
import PropTypes from 'prop-types'
import { Flex, Box } from '@rebass/grid/emotion'
import styled from 'react-emotion'
import watchLater from '../../utils/watchLater'

import VideoTime from '../VideoTime/VideoTime'
import Tags from '../Tags/Tags'


const Card = styled.article`
  max-width: 340px;
  margin:1em;
  transition:opacity 400ms linear;

  &.delete {
    opacity:0;
  }
`

const Speaker = styled.p`
  margin-bottom:0;
  font-size:0.8em;
  color:#999;
`

const Year = styled.p`
  text-align: right;
  margin-bottom: 0;
  font-size: 0.8em;
  color: #999;
`

const VideoImage = styled.figure`
  position: relative;

  button {
    border-radius: 0.5em;
    padding: 0.1em;
    border: 2px solid #999;

    position: absolute;
    bottom: 1em;
    right: 1em;

    opacity: 0;
    transition: opacity 400ms linear, transform 200ms linear;
  }
  button svg {
    display: block;
  }

  :hover button:hover {
    transform:translateY(-20%);
  }

  :hover button {
    opacity: 1;
    transform:translateY(-10%);
  }
`

const VideoTitle = styled.h3`
  margin-bottom:0.5em;
  font-size:0.9em;
  font-weight:bold;
  a {
    color:#333;
  }
`

class VideoCard extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      fadeCard: false,
      watchLater: false
    }
  }

  deleteCard = edit => {
    this.setState({
      fadeCard: true,
    })
    edit()
  }

  addToWatchLater = (slug, name, video, service) => {
    this.setState({
      watchLater: true
    })
    watchLater(slug, name, video, service)
  }

  render() {
    const { edit, video } = this.props
    const { fadeCard, watchLater } = this.state
    let postDate = new Date(video.node.date)
    return (
      <Card className={fadeCard && 'delete'}>
        <VideoImage>
          <Link to={`/v/${video.node.fields.slug}`}>
            <img src={`https://img.youtube.com/vi/${video.node.video}/0.jpg`} />
          </Link>
          {edit ? (
            <button
              className="DeleteVideo"
              onClick={() => this.deleteCard(edit)}
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="none" d="M0 0h24v24H0V0z"/><path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zm2.46-7.12l1.41-1.41L12 12.59l2.12-2.12 1.41 1.41L13.41 14l2.12 2.12-1.41 1.41L12 15.41l-2.12 2.12-1.41-1.41L10.59 14l-2.13-2.12zM15.5 4l-1-1h-5l-1 1H5v2h14V4z"/><path fill="none" d="M0 0h24v24H0z"/></svg>
            </button>
          ) : (
            <button
              className="WatchLater"
              onClick={() =>
                this.addToWatchLater(
                  video.node.fields.slug,
                  video.node.name,
                  video.node.video,
                  video.node.service
                )
              }
            >
              { !watchLater ? 
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
              >
                <path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z" />
                <path d="M0 0h24v24H0z" fill="none" />
              </svg>
              : 
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M0 0h24v24H0z" fill="none" /><path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" /></svg>
              }
            </button>
          )}
        </VideoImage>

        <VideoTitle>
          <Link to={`/v/${video.node.fields.slug}`}>{video.node.name}</Link>
        </VideoTitle>
        {video.node.speaker && (
          <Flex>
            <Box width={1 / 2}>
              <Speaker>{video.node.speaker.name}</Speaker>
            </Box>
            <Box width={1 / 2}>
              <Year>
                <span className="date">{postDate.getFullYear()}</span>
              </Year>
            </Box>
          </Flex>
        )}

        {/* <VideoTime length={video.node.length} /> */}

        {/* <Tags tags={video.node.tags} /> */}
      </Card>
    )
  }
}

VideoCard.propTypes = {
}

export default VideoCard