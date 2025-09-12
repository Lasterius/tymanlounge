import { strapiFetch } from "@/shared/services/utils/strapiFetch";
import {
  IAfficheDTO,
  IBaseResponse,
  IGalleryDTO,
  IGlobalDataDTO,
  IHomeDTO,
  IPointDTO,
  ITeamDTO,
} from "@/shared/services/types/dto.types";

// Основной тип данных точки
export interface PointData {
  home: IHomeDTO;
  gallery: IGalleryDTO;
  team: ITeamDTO;
  affiche: IAfficheDTO;
  global: IGlobalDataDTO;
}

// API routes для получения данных
export const getHomePageData = async (
  locale: string,
  pointSlug: string,
): Promise<IHomeDTO> => {
  // Сначала найдем точку по slug в нужной локализации
  const pointUrl = `/points?filters[Slug][$eq]=${pointSlug}&locale=${locale}`;
  const pointResponse: IBaseResponse<IPointDTO[]> = await strapiFetch(pointUrl);

  if (
    !pointResponse.data ||
    !Array.isArray(pointResponse.data) ||
    pointResponse.data.length === 0
  ) {
    throw new Error(
      `No point found with slug: ${pointSlug} in locale: ${locale}`,
    );
  }

  const pointId = pointResponse.data[0].id;

  // Теперь найдем home-collection по ID точки и локализации
  const url = `/home-collections?locale=${locale}&filters[point][id][$eq]=${pointId}&populate[point][fields][0]=Slug&populate[point][fields][1]=Name&populate[mainItem][populate][picture][fields][0]=url&populate[mainPicture][fields][0]=url`;
  const response: IBaseResponse<IHomeDTO[]> = await strapiFetch(url);

  // Strapi коллекции возвращают массив, берем первый элемент
  if (
    response.data &&
    Array.isArray(response.data) &&
    response.data.length > 0
  ) {
    return response.data[0];
  }

  throw new Error(
    `No home data found for point: ${pointSlug} in locale: ${locale}`,
  );
};

export const getGalleryPageData = async (
  pointSlug: string,
): Promise<IGalleryDTO> => {
  // Сначала найдем точку по slug в любой локализации
  const pointUrl = `/points?filters[Slug][$eq]=${pointSlug}&fields[0]=id`;
  const pointResponse: IBaseResponse<IPointDTO[]> = await strapiFetch(pointUrl);

  if (
    !pointResponse.data ||
    !Array.isArray(pointResponse.data) ||
    pointResponse.data.length === 0
  ) {
    throw new Error(`No point found with slug: ${pointSlug}`);
  }

  const pointId = pointResponse.data[0].id;

  // Теперь найдем gallery-collection по ID точки
  const url = `/gallery-collections?filters[points][id][$eq]=${pointId}&populate[points]=*&populate[Pictures][populate][files]=*`;
  const response: IBaseResponse<IGalleryDTO[]> = await strapiFetch(url);

  if (
    response.data &&
    Array.isArray(response.data) &&
    response.data.length > 0
  ) {
    return response.data[0];
  }

  throw new Error(`No gallery data found for point: ${pointSlug}`);
};

export const getTeamPageData = async (
  locale: string,
  pointSlug: string,
): Promise<ITeamDTO> => {
  // Сначала найдем точку по slug в нужной локализации
  const pointUrl = `/points?filters[Slug][$eq]=${pointSlug}&locale=${locale}`;
  const pointResponse: IBaseResponse<IPointDTO[]> = await strapiFetch(pointUrl);

  if (
    !pointResponse.data ||
    !Array.isArray(pointResponse.data) ||
    pointResponse.data.length === 0
  ) {
    throw new Error(
      `No point found with slug: ${pointSlug} in locale: ${locale}`,
    );
  }

  const pointId = pointResponse.data[0].id;

  // Теперь найдем team-collection по ID точки и локализации
  const url = `/team-collections?locale=${locale}&filters[point][id][$eq]=${pointId}&populate[point][fields][0]=Slug&populate[point][fields][1]=Name&populate[Pictures][populate][files]=*`;
  const response: IBaseResponse<ITeamDTO[]> = await strapiFetch(url);

  if (
    response.data &&
    Array.isArray(response.data) &&
    response.data.length > 0
  ) {
    return response.data[0];
  }

  throw new Error(
    `No team data found for point: ${pointSlug} in locale: ${locale}`,
  );
};

export const getAffichePageData = async (
  locale: string,
  pointSlug: string,
): Promise<IAfficheDTO> => {
  // Сначала найдем точку по slug в нужной локализации
  const pointUrl = `/points?filters[Slug][$eq]=${pointSlug}&locale=${locale}`;
  const pointResponse: IBaseResponse<IPointDTO[]> = await strapiFetch(pointUrl);

  if (
    !pointResponse.data ||
    !Array.isArray(pointResponse.data) ||
    pointResponse.data.length === 0
  ) {
    throw new Error(
      `No point found with slug: ${pointSlug} in locale: ${locale}`,
    );
  }

  const pointId = pointResponse.data[0].id;

  // Теперь найдем affiche-collection по ID точки и локализации
  const url = `/affiche-collections?locale=${locale}&filters[point][id][$eq]=${pointId}&populate[point][fields][0]=Slug&populate[point][fields][1]=Name&populate[afficheItem][populate][picture][fields][0]=url`;
  const response: IBaseResponse<IAfficheDTO[]> = await strapiFetch(url);

  if (
    response.data &&
    Array.isArray(response.data) &&
    response.data.length > 0
  ) {
    return response.data[0];
  }

  throw new Error(
    `No affiche data found for point: ${pointSlug} in locale: ${locale}`,
  );
};

export const getGlobalData = async (
  pointSlug: string,
): Promise<IGlobalDataDTO> => {
  // Сначала найдем точку по slug в любой локализации
  const pointUrl = `/points?filters[Slug][$eq]=${pointSlug}&fields[0]=id`;
  const pointResponse: IBaseResponse<IPointDTO[]> = await strapiFetch(pointUrl);

  if (
    !pointResponse.data ||
    !Array.isArray(pointResponse.data) ||
    pointResponse.data.length === 0
  ) {
    throw new Error(`No point found with slug: ${pointSlug}`);
  }

  const pointId = pointResponse.data[0].id;

  // Теперь найдем global-data-collection по ID точки
  const url = `/global-data-collections?filters[points][id][$eq]=${pointId}&populate=*`;
  const response: IBaseResponse<IGlobalDataDTO[]> = await strapiFetch(url);

  if (
    response.data &&
    Array.isArray(response.data) &&
    response.data.length > 0
  ) {
    return response.data[0];
  }

  throw new Error(`No global data found for point: ${pointSlug}`);
};

// ОДИН запрос для получения ВСЕХ данных точки
export const getPointData = async (
  pointSlug: string,
  locale: string,
): Promise<PointData> => {
  try {
    // Загружаем ВСЕ данные для точки параллельно
    const [home, gallery, team, affiche, global] = await Promise.all([
      getHomePageData(locale, pointSlug),
      getGalleryPageData(pointSlug),
      getTeamPageData(locale, pointSlug),
      getAffichePageData(locale, pointSlug),
      getGlobalData(pointSlug),
    ]);

    return {
      home,
      gallery,
      team,
      affiche,
      global,
    };
  } catch (error) {
    console.error(`Error loading data for point ${pointSlug}:`, error);
    throw new Error(`Failed to load data for point ${pointSlug}`);
  }
};

// Функция для получения всех доступных точек
export const getAllPoints = async (): Promise<IPointDTO[]> => {
  const url = `/points?filters[isActive][$eq]=true&populate[MainImage][fields][0]=url`;
  const response: IBaseResponse<IPointDTO[]> = await strapiFetch(url);
  return response.data;
};
