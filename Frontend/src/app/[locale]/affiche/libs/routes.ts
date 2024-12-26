export const AffichePageRoute = (lang: string) => {
  return `/affiche?locale=${lang}&populate[blocks][on][shared.affiche-item][populate][picture][fields][0]=url`;
};
