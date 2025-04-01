/**
 * Helper function to get the correct path for static assets when deployed to GitHub Pages
 * @param {string} path - The relative path to the asset
 * @returns {string} The correct path for the asset
 */
export function getAssetPath(path) {
  // Remove any leading slash to avoid double slashes
  const cleanPath = path.startsWith('/') ? path.substring(1) : path;
  
  // In development, check if the image exists in assets directory first, otherwise try public
  if (import.meta.env.DEV) {
    try {
      // First try to find the image in the assets directory
      return new URL(`../assets/images/${cleanPath}`, import.meta.url).href;
    } catch (e) {
      // If not found in assets, try public directory
      return `/${cleanPath}`;
    }
  } else {
    // In production, prefix with the base path
    return `${import.meta.env.BASE_URL}${cleanPath}`;
  }
}
