import { BaseResponse } from "@/shared/config/types/global.types";
import { GalleryList } from "@/widgets/galleryList";
import { getGalleryPageData } from "./api/getGalleryPageData";
import { GalleryData } from "./libs/gallery.types";

const Gallery = async () => {
  const apiData: BaseResponse<GalleryData> = await getGalleryPageData();
  const { Pictures } = apiData.data;
  const strapiUrl = process.env.STRAPI_URL;

  return (
    <div className="pt-14">
      <GalleryList pictures={Pictures} strapiUrl={strapiUrl} />
    </div>
  );
};

export default Gallery;
