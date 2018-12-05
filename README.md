# Tech Tube

A video directory for developer and design talks using GatsbyJS, ReactJS, EmotionJS.

## Contributing Videos

Fork this repo and send a pull request with your video added to `database.json`. 

- If the video contains more than one speaker, the speaker name is "Various" and website is "#".
- Git commits are prefixed with Github emoji (e.g. `:movie_camera: Adding videos`)

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
- [] Add link to contribute + guide on how to contribute
- [] Add link to Github + Github logo SVG
- [✅] Mobile friendly design

### Low Priority

- [] Search box (maybe using Algolia?)
- [] Add share links (Twitter, Facebook, etc)
- [] Make website SEO friendly (add meta tags to head)
- [] Link featured video title to single video page
- [] Add functionality for Vimeo video thumbnails in VideoCard and Embed components
- [] Add pagination to archive/category pages (gatsby-paginate)
- [✅] Watch Later functionality using localStorage cache
- [✅] Button to hide "Recently Watched" window