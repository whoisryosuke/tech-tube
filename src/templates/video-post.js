import React, { Component } from "react";
import PropTypes from 'prop-types';
import { Flex, Box } from '@rebass/grid/emotion'
import { graphql, Link, navigate } from "gatsby";
import Img from "gatsby-image";
import styled from 'react-emotion'
import kebabCase from 'lodash/kebabCase'
import nicetime from '../utils/nicetime';
import Layout from '../components/Layout'
import watchLater from '../utils/watchLater'

import VideoEmbed from '../components/VideoEmbed/VideoEmbed'
import VideoTime from '../components/VideoTime/VideoTime'
import Tags from '../components/Tags/Tags'
import Playlist from '../components/Playlist/Playlist'

const Wrapper = styled(Flex)`
  max-width: ${props => props.theme.breakpoint.l};
  margin:auto;
`
const PaddedBox = styled(Box)`
  padding:1em;
`

const WatchLaterButton = styled.button`
  padding:1em;
  border-radius:1em;
  display:block;
  margin:1em 0;
`

const VideoTitle = styled.h2`
  
`;

const Speaker = styled.h3`
  color:#CCC;
`;

const StyledTags = styled(Tags)`
  margin-top:1em;
`

const addToWatchLater = (slug, name, video, service) => {
    watchLater(slug, name, video, service)
    navigate('/watchlater')
  }

class VideoPost extends Component {

    componentDidMount() {
      const { video } = this.props.data

      if(video) {
        const videoCache = {
          slug: video.fields.slug,
          name: video.name,
          video: video.video,
          service: video.service
        }
        localStorage.setItem('techtube-last-video', JSON.stringify(videoCache))
      }
    }

    render() {

        const { video, playlist } = this.props.data;
        const currentDate = new Date();

        const tags = video.tags.map((tag) => (
            <li key={tag}><Link to={'/tags/' + kebabCase(tag)}>#{tag}</Link></li>
        ));

        const embed = <VideoEmbed video={video.video} service={video.service} />

        let postDate = new Date(video.date);
      return <Layout>
            {embed}
            <Wrapper flexWrap="wrap">
              <PaddedBox width={[1, 1, 1, 3/5]}>
                <Speaker>{video.speaker.name}</Speaker>
                <VideoTitle>{video.name}</VideoTitle>

                {video.description}

                <StyledTags tags={video.tags} />

                <WatchLaterButton
                  onClick={() =>
                    addToWatchLater(
                      video.fields.slug,
                      video.name,
                      video.video,
                      video.service
                    )
                  }
                >Watch Later</WatchLaterButton>
              </PaddedBox>
              <Box width={[1, 1, 1, 2/5]}>
                <Playlist playlist={playlist} />
              </Box>
            </Wrapper>
          </Layout>
    }
};

VideoPost.propTypes = {
    classes: PropTypes.object.isRequired,
};

export const query = graphql`
  query VideoPostQuery($slug: String!) {
    video: databaseJson(fields: { slug: { eq: $slug } }) {
        id
        name
        video
        service
        description
        speaker {
            name
            website
        }
        fields {
          slug
        }
        tags
        date
    },
    playlist: allDatabaseJson(
      sort: {fields: [date], order: DESC}, 
      limit: 6
    ) {
      totalCount
      edges {
        node {
          name
          service
          video
          speaker{
            name
            website
          }
          date
          fields {
            slug
          }
        }
      }
    }
  },
`

export default VideoPost