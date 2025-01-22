export const GalleryPageRoute = () => {
  return `/gallery-page?populate[Pictures][sort]=id:desc&populate[Pictures][populate][files][fields][0]=url`;
};
