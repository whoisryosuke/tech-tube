import React, { Component } from "react";
import PropTypes from 'prop-types';
import { Flex, Box } from '@rebass/grid/emotion'
import { graphql, Link } from "gatsby";
import Img from "gatsby-image";
import styled from 'react-emotion'
import kebabCase from 'lodash/kebabCase'
import nicetime from '../utils/nicetime';
import Layout from '../components/Layout'

import VideoEmbed from '../components/VideoEmbed/VideoEmbed'
import VideoTime from '../components/VideoTime/VideoTime'
import Tags from '../components/Tags/Tags'
import Playlist from '../components/Playlist/Playlist'

const Wrapper = styled(Flex)`
  max-width: ${props => props.theme.breakpoint.l};
  margin:auto;
`

const VideoTitle = styled.h2`
  
`;

const Speaker = styled.h3`
  color:#CCC;
`;

const StyledTags = styled(Tags)`
  margin-top:1em;
`

class VideoPost extends Component {

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
            <Wrapper>
              <Box width={3/4}>
                <Speaker>{video.speaker.name}</Speaker>
                <VideoTitle>{video.name}</VideoTitle>

                {video.description}

                <StyledTags tags={video.tags} />
              </Box>
              <Box width={1/4}>
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
        name
        video
        service
        description
        speaker {
            name
            website
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