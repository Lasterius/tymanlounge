import { strapiFetch } from "@/app/api/route";
import { BaseResponse } from "@/shared/config/types/global.types";
import { GalleryList } from "@/widgets/galleryList";
import { GalleryData } from "./libs/gallery.types";
import { GalleryPageRoute } from "./libs/routes";

const Gallery = async () => {
  const GalleryPageUrl: string = GalleryPageRoute();
  const strapiUrl = process.env.STRAPI_URL;
  const apiData: BaseResponse<GalleryData> = await strapiFetch(GalleryPageUrl);
  const { Pictures } = apiData.data;

  return (
    <div className="mt-14">
      <GalleryList pictures={Pictures} strapiUrl={strapiUrl} />
    </div>
  );
};

export default Gallery;
