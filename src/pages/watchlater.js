import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'gatsby';
import styled from 'react-emotion';
import { Flex, Box } from '@rebass/grid/emotion'
import Layout from '../components/Layout';
import VideoCard from '../components/VideoCard/VideoCard'
import VideoEmbed from '../components/VideoEmbed/VideoEmbed'
import LastVideo from '../components/LastVideo/LastVideo'

import deleteVideo from '../utils/deleteVideo'

const Wrapper = styled(Box)`
  padding: 1em;
  margin-top: 48px;
  min-height: calc(100vh);
  margin:auto;
`

const WatchLaterPage = () => {

  let videos
  // Grab cache
  const videoCache = localStorage.getItem('techtube-watch-later')

  if (videoCache) {
    // Parse cache, if it's valid array, map into VideoCards
    videos = JSON.parse(videoCache)
    if(videos && Array.isArray(videos)) {
      videos = videos.map((video) => 
         <VideoCard 
          edit={(() => deleteVideo(video.slug))}
          video={{
          node: {
            name: video.name,
            fields: {
              slug: video.slug
            },
            service: video.service,
            video: video.video
          }
        }} />
      )
    }
  } else {
    videos = 'Add some videos to your watch later by clicking the Watch Later button on the video page, or hovering over video thumbnails and clicking the plus sign'
  }

  return <Layout>
      <Wrapper width={(6 / 6, 5 / 6, 7 / 8)}>
        <h2>Watch Later:</h2>
        <Flex>{videos}</Flex>
      </Wrapper>
      <LastVideo />
    </Layout>};

export default WatchLaterPage