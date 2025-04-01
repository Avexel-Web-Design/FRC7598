/**
 * Helper function to get the correct path for static assets when deployed to GitHub Pages
 * @param {string} path - The relative path to the asset
 * @returns {string} The correct path for the asset
 */
export function getAssetPath(path) {
  // Remove any leading slash to avoid double slashes
  const cleanPath = path.startsWith('/') ? path.substring(1) : path;
  
  // In development, use the path as is
  // In production, prefix with the base path
  return import.meta.env.DEV 
    ? `/${cleanPath}`
    : `${import.meta.env.BASE_URL}${cleanPath}`;
}
