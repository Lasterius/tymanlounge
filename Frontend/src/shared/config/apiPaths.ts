export const HomePageRoute = (lang: string) => {
  return `/home-page?locale=${lang}&populate[blocks][on][shared.main-item][populate][picture][fields][0]=url&populate[mainPicture][fields][0]=url`;
};

export const GlobalDataRoute = () => {
  return `/global-data?populate=*`;
};

export const AffichePageRoute = (lang: string) => {
  return `/affiche?locale=${lang}&populate[blocks][on][shared.affiche-item][populate][picture][fields][0]=url`;
};

export const GalleryPageRoute = () => {
  return `/gallery-page?populate[Pictures][sort]=id:desc&populate[Pictures][populate][files][fields][0]=url`;
};

export const TeamPageRoute = (lang: string) => {
  return `/team-page?locale=${lang}&populate[colleagues][populate][photo][fields][0]=url`;
};
