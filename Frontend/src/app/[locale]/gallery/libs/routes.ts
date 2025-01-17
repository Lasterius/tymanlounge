export const GalleryPageRoute = () => {
  return `/gallery-page?populate[Pictures][populate][files][fields][0]=url`;
};
