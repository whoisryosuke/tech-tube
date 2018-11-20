import React from 'react';
import PropTypes from 'prop-types';
import { graphql, Link } from 'gatsby';
import styled from 'react-emotion';
import { Flex, Box } from '@rebass/grid/emotion'
import Layout from '../components/Layout';

import kebabCase from 'lodash/kebabCase'

const Wrapper = styled(Box)`
  padding: 1em;
  margin-top: 48px;
  min-height: calc(100vh);
  margin:auto;
`

const Menu = styled.nav`
  
  li {

  }
`

const SpeakersPage = ({ data: { tags } }) => {

  return (
    <Layout>
      <Wrapper width={(6 / 6, 5 / 6, 7 / 8)}>
        <Menu>
          <h2>Speakers:</h2>
          <ul>
            {tags.group.map(tag => (
              <li key={tag.fieldValue}>
                <Link to={`/tag/${kebabCase(tag.fieldValue)}/`}>
                  {tag.fieldValue} ({tag.totalCount})
                </Link>
              </li>
            ))}
          </ul>
        </Menu>
      </Wrapper>
    </Layout>
  )
}

export default SpeakersPage;

SpeakersPage.propTypes = {
  data: PropTypes.shape({
    tags: PropTypes.shape({
      edges: PropTypes.array.isRequired,
    }),
  }).isRequired,
}

export const query = graphql`
  query SpeakersPageQuery {
    tags: allDatabaseJson(
      limit: 2000
    ) {
      group(field: speaker___name) {
        fieldValue
        totalCount
      }
    }
  }
`