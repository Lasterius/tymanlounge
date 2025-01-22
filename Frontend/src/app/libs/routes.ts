export const HomePageRoute = (lang: string) => {
  return `/home-page?locale=${lang}&populate[blocks][on][shared.main-item][populate][picture][fields][0]=url&populate[mainPicture][fields][0]=url`;
};

export const GlobalDataRoute = () => {
  return `/global-data?populate=*`;
};
