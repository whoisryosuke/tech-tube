/**
 * Deletes video from "watch later" cache
 * Filters array from localStorage by the video slug
 * to remove any items matching slug
 * And refreshes cache with filtered array
 * 
 * @param {string} videoSlug 
 */
const deleteVideo = videoSlug => {
  console.log('deleting')
  const videoCache = localStorage.getItem('techtube-watch-later')
  let videos
  if (videoCache) {
    videos = JSON.parse(videoCache)
    if (videos && Array.isArray(videos)) {
      videos = videos.filter((value, index, arr) => {
        return value.slug !== videoSlug
      })
    }
    localStorage.setItem('techtube-watch-later', JSON.stringify(videos))
  }
}

export default deleteVideo