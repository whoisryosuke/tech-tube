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
  margin:auto;
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

const Menu = styled.nav`
  
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
      <h2>Categories:</h2>
          <ul>
            {tags.group.map(tag => <li key={tag.fieldValue}>
              <Link to={`/tag/${kebabCase(tag.fieldValue)}/`}>
                {tag.fieldValue} ({tag.totalCount})
                        </Link>
            </li>)}
          </ul>
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