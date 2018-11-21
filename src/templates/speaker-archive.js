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

const SpeakerName = styled.h1`
  margin-bottom: 0.15em;
  margin-right: 1em;
  display: inline-block;
`
const SpeakerWebsite = styled.h3`
  display:inline-block;
`

const Speaker = styled.h3`
  color:#CCC;
`;

class SpeakerArchive extends Component {
  render() {
    const { videos } = this.props.data

    const loop = videos.edges.map(video => <VideoCard video={video} />)

    return <Layout>
        <Wrapper>
          <SpeakerName>{this.props.pageContext.speaker}</SpeakerName>
          <SpeakerWebsite>
            <Link to={videos.edges[0].node.speaker.website}>Website</Link>
          </SpeakerWebsite>
          <Flex>{loop}</Flex>
        </Wrapper>
      </Layout>
  }
};

SpeakerArchive.propTypes = {
  classes: PropTypes.object.isRequired,
  pageContext: PropTypes.shape({
    speaker: PropTypes.string.isRequired,
  }),
}

export const query = graphql`
  query SpeakerArchiveQuery($speaker: String!) {
    videos: allDatabaseJson(filter: { speaker: { name: { eq: $speaker } } }) {
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

export default SpeakerArchive