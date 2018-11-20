import React from 'react';
import PropTypes from 'prop-types';
import { graphql, Link } from 'gatsby';
import styled from 'react-emotion';
import { Flex, Box } from '@rebass/grid/emotion'
import Layout from '../components/Layout';
import VideoCard from '../components/VideoCard/VideoCard'
import VideoEmbed from '../components/VideoEmbed/VideoEmbed'

import kebabCase from 'lodash/kebabCase'

const Wrapper = styled(Box)`
  padding: 1em;
  margin-top: 48px;
  min-height: calc(100vh);
  background-color: #efefef;
  margin:auto;
`

const FeaturedPost = styled(Flex)`

`

const PaddedBox = styled(Box)`
  padding:1em;
`

const IndexPage = ({
  data: {
    videos
  }
}) => {

  const [featuredPost, ...latestPosts] = videos.edges;

  const featuredPostEmbed = <VideoEmbed video={featuredPost.node.video} service={featuredPost.node.service} />
  let featuredPostDescription = featuredPost.node.description.length > 250 ? `${featuredPost.node.description.substring(0, 250)}...` : featuredPost.node.description
  const loop = latestPosts.map(video => <VideoCard key={video.node.name} video={video} />)

  return <Layout>
        <Wrapper width={6/6, 5/6, 7/8}>
          <FeaturedPost>
            <Box width={3 / 4}>{featuredPostEmbed}</Box>
            <PaddedBox width={1 / 4}>
              <h2>{featuredPost.node.name}</h2>
              <p>{featuredPostDescription}</p>
              <p>
                <Link to={`/v/${featuredPost.node.fields.slug}`}>
                  Read more
                </Link>
              </p>
            </PaddedBox>
          </FeaturedPost>
          <hr />
          <h4>Latest talks</h4>
          <Flex>{loop}</Flex>
        </Wrapper>
    </Layout>};

export default IndexPage;

IndexPage.propTypes = {
  data: PropTypes.shape({
    caseStudies: PropTypes.shape({
      edges: PropTypes.array.isRequired,
    }),
  }).isRequired,
};

export const query = graphql`
  query IndexQuery {
    videos: allDatabaseJson(
      sort: {fields: [date], order: DESC}, 
      limit: 3
    ) {
      totalCount
      edges {
        node {
          name
          video
          service
          speaker{
            name
            website
          }
          tags
          date
          description
          fields {
            slug
          }
        }
      }
    }
  }
`