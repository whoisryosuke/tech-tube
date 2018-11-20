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

const TagCloud = styled.ul`
  list-style: none;

  li {
    display: inline-block;
    margin: 0.5em;
  }
  li a {
    display: block;
    padding: 0.5em 1.25em;
    color: #333;
    background: #ddd;
    border-radius: 0.5em;
    border: 1px solid #c5c5c5;
  }
  li a:hover {
    background:#EEE;
    color:#CC2040;
  }
`


const Sidebar = styled(Box)`
  height: 100%;
  max-height: 100%;
  top: 48px;
  left: 0;
  margin: 0 !important;
  padding-top: 1em;
  background: #fff;
  -webkit-transform: translateX(0);
  transform: translateX(0);
  -webkit-transform-style: preserve-3d;
  transform-style: preserve-3d;
  will-change: transform;
  transition-duration: 0.2s;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
  transition-property: transform;
  transition-property: transform, -webkit-transform;
  z-index: 5;

  &.hidden {
    -webkit-transform: translateX(-250px);
    transform: translateX(-250px);
  }
`

const Menu = styled.ul`
  list-style:none;
  
  li {

  }
`

const CategoriesPage = ({
  data: {
    tags
  }
}) => {

  console.log(tags, 'tags')

  return <Layout>
    <Wrapper width={6 / 6, 5/6, 7/8}>

      <Menu>
        <li>Tags
                <ul>
            {tags.group.map(tag => <li key={tag.fieldValue}>
              <Link to={`/tag/${kebabCase(tag.fieldValue)}/`}>
                {tag.fieldValue} ({tag.totalCount})
                        </Link>
            </li>)}
          </ul>
        </li>
      </Menu>
        </Wrapper>
    </Layout >};

export default CategoriesPage;

CategoriesPage.propTypes = {
  data: PropTypes.shape({
    tags: PropTypes.shape({
      edges: PropTypes.array.isRequired,
    }),
  }).isRequired,
};

export const query = graphql`
  query CategoriesPageQuery {
    tags: allDatabaseJson(
      limit: 2000
    ) {
      group(field: tags) {
        fieldValue
        totalCount
      }
    }
  }
`