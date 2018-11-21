import React from 'react'
import { Link } from 'gatsby'
import PropTypes from 'prop-types'
import { Flex, Box } from '@rebass/grid/emotion'
import styled from 'react-emotion'

import VideoTime from '../VideoTime/VideoTime'
import Tags from '../Tags/Tags'

const Card = styled.article`
  max-width: 340px;
  margin:1em;
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

const VideoTitle = styled.h3`
  margin-bottom:0.5em;
  font-size:0.9em;
  font-weight:bold;
  a {
    color:#333;
  }
`

const VideoCard = ({ video }) => {
  let postDate = new Date(video.node.date);
  return <Card>
    <figure>
      <Link to={`/v/${video.node.fields.slug}`}>
        <img
          src={`https://img.youtube.com/vi/${video.node.video}/0.jpg`}
        />
      </Link>
    </figure>

        <VideoTitle>
          <Link to={`/v/${video.node.fields.slug}`}>
            {video.node.name}
          </Link>
        </VideoTitle>

        <Flex>
          <Box width={1/2}>
            <Speaker>
              {video.node.speaker.name}
            </Speaker>
          </Box>
          <Box width={1/2}>
            <Year>
              <span className="date">{postDate.getFullYear()}</span>
            </Year>
          </Box>
        </Flex>

        {/* <VideoTime length={video.node.length} /> */}

        {/* <Tags tags={video.node.tags} /> */}
    </Card>
}

VideoCard.propTypes = {
}

export default VideoCard