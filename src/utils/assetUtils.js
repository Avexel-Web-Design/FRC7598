/**
 * Helper function to get the correct path for static assets when deployed to GitHub Pages
 * @param {string} path - The relative path to the asset
 * @returns {string} The correct path for the asset
 */
export function getAssetPath(path) {
  try {
    // Remove any leading slash and normalize path
    const cleanPath = path.startsWith('/') ? path.substring(1) : path;
    
    // Use a direct URL import
    const imageUrl = new URL(`/src/assets/${cleanPath}`, import.meta.url).href;
    return imageUrl;
  } catch (error) {
    console.error('Error loading asset:', error);
    return '';
  }
}

/**
 * Function to get list of images for a gallery
 * @param {string} galleryId - The ID of the gallery
 * @returns {Promise<Array<{src: string, alt: string}>>} List of image objects with src and alt attributes
 */
export const getGalleryImages = async (galleryId) => {
  try {
    // Use Vite's glob import to get all images from the gallery folder
    const modules = import.meta.glob('/src/assets/images/*/*.{png,jpg,jpeg,gif,webp}', { eager: true });
    
    // Filter and map the images for this gallery
    const galleryImages = Object.entries(modules)
      .filter(([path]) => path.includes(`/images/${galleryId}/`))
      .map(([path, module]) => ({
        src: module.default, // Use the default export which contains the resolved URL
        alt: path.split('/').pop().split('.')[0] // Use filename as alt text
      }));

    return galleryImages;
  } catch (error) {
    console.error(`Error loading images for gallery ${galleryId}:`, error);
    // Return array with placeholder if no images found
    return [{
      src: new URL(`../assets/images/${galleryId}/placeholder.png`, import.meta.url).href,
      alt: 'Gallery Photo'
    }];
  }
};
