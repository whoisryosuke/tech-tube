# Tech Tube

A video directory for developer and design talks using GatsbyJS, ReactJS, EmotionJS.

## Contributing Videos

Fork this repo and send a pull request with your video added to `database.json`. 

- If the video contains more than one speaker, the speaker name is "Various" and website is "#".

> Make sure to follow the formatting exactly (e.g. `04/20/2020` date format is strict).

## Development

### Quick Start

1. `git clone <this repo>`
1. Navigate to directory: `cd /<repoDirectory>`
1. `npm i`
1. `npm run dev

### App Structure

This app is built on top of Gatsby v2, React 16, and Emotion 9.2.

Videos are stored in a JSON file, which Gatsby parses into a GraphQL endpoint for use in development. Video pages, archives, etc are all created in `gatsby-node.js` which uses templates like `templates/video-post.js` to make dynamically generated pages.

Static pages are stored in `/pages/`.

## Categories

* cloud
* devops
* javascript
* oop

## Todo

### High Priority

- [] Make Speakers an array in `database.json` (allowing for multiple speakers).
- [] Fill in website with more content

### Low Priority