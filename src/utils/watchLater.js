/**
 * Adds video to "watch later" cache
 * Uses localStorage to store stringified array
 * of objects with video values 
 * e.g. ([{ name: "Video Name"}, {name: "Video 2"}])
 *
 * @param {string} slug 
 * @param {string} name 
 * @param {string} video 
 * @param {string} service 
 */
const watchLater = (slug, name, video, service) => {
  // Grab the cache
  let videoCache = localStorage.getItem('techtube-watch-later')
  // If we got it, parse it
  if (videoCache) {
    videoCache = JSON.parse(videoCache)
  }
  // Check if it's an array, if not, create one
  if (videoCache == null || !Array.isArray(videoCache)) {
    videoCache = []
  }

  // Dupe check for video in array
  videoCache = videoCache.filter((value, index, arr) => {
    return value.slug !== slug
  })

  // @todo: max out array to minimize cache

  // Add video to top of array
  const savedVideo = {
    slug,
    name,
    video,
    service,
  }
  videoCache.unshift(savedVideo)

  // Update cache with new array
  localStorage.setItem('techtube-watch-later', JSON.stringify(videoCache))
}

export default watchLater