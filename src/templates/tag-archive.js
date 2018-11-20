import React, { Component } from "react";
import PropTypes from 'prop-types';
import { Flex, Box } from '@rebass/grid/emotion'
import { graphql, Link } from "gatsby";
import Img from "gatsby-image";
import styled from 'react-emotion'
import kebabCase from 'lodash/kebabCase'
import nicetime from '../utils/nicetime';
import Layout from '../components/Layout'

import VideoCard from '../components/VideoCard/VideoCard'

const Wrapper = styled.section`
  max-width: ${props => props.theme.breakpoint.l};
  margin:auto;
`

const VideoTitle = styled.h2`
  
`;

const Speaker = styled.h3`
  color:#CCC;
`;

class VideoPost extends Component {

  render() {
    console.log(this.props);

    const { videos } = this.props.data;
    
    const loop = videos.edges.map(video => <VideoCard video={video} />)

    return <Layout>
        <Wrapper>
          <h1>#{this.props.pageContext.tag}</h1>
          <Flex>{loop}</Flex>
        </Wrapper>
      </Layout>
  }
};

VideoPost.propTypes = {
  classes: PropTypes.object.isRequired,
};

export const query = graphql`
  query TagArchiveQuery($tag: [String]) {
    videos: allDatabaseJson(filter: { tags: { in: $tag } }) {
      totalCount
      edges {
        node {
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
          fields {
            slug
          }
        }
      }
    },
  }
`

export default VideoPost