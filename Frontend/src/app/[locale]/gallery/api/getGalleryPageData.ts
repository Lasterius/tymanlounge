import { GalleryPageRoute } from "@/shared/config/apiPaths";
import { BaseResponse } from "@/shared/config/types/global.types";
import { strapiFetch } from "@/shared/services/strapiFetch";
import { GalleryData } from "../libs/gallery.types";

export const getGalleryPageData = async (): Promise<
  BaseResponse<GalleryData>
> => {
  const GalleryPageUrl: string = GalleryPageRoute();
  const response: BaseResponse<GalleryData> = await strapiFetch(GalleryPageUrl);
  return response;
};
