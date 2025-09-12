import Image from "next/image";
import { IDetailedPictureDTO } from "@/shared/services/types/dto.types";

interface MemberCardProps {
  picture: IDetailedPictureDTO;
  loading?: "lazy" | "eager";
  priority?: boolean;
}

export const MemberCard = ({
  picture,
  loading = "lazy",
  priority = false,
}: MemberCardProps) => {
  const strapiUrl = process.env.STRAPI_URL || "http://localhost:1337";

  return (
    <div className="relative h-[65vh] w-auto overflow-hidden rounded-2xl border-2 border-drkgrn shadow-2xl dark:border-grn">
      <Image
        src={`${strapiUrl}${picture.files.url}`}
        alt={`picture-${picture.files.id}`}
        fill
        sizes="1080px"
        className="object-cover"
        loading={loading}
        priority={priority}
      />
    </div>
  );
};
