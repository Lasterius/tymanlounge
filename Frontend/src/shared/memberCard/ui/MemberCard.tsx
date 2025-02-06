import { TeamMember } from "@/app/[locale]/team/libs/team.types";
import { Instagram } from "@/shared/icons/Instagram";
import Image from "next/image";

interface MemberCardProps {
  colleague: TeamMember;
}

export const MemberCard = ({ colleague }: MemberCardProps) => {
  const strapiUrl = process.env.STRAPI_URL;

  return (
    <div className="relative h-[65vh] w-auto overflow-hidden rounded-2xl border-2 border-drkgrn shadow-2xl dark:border-grn">
      <Image
        src={`${strapiUrl}${colleague.photo.url}`}
        alt={colleague.name}
        fill
        sizes="1080px"
        className="object-cover"
      />
      <div className="absolute bottom-3 left-1/2 w-[90%] -translate-x-1/2 rounded-lg bg-blck bg-opacity-80 p-4 text-center text-wht">
        <a
          href={colleague.instagram}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-between transition-colors hover:text-grn"
        >
          <p className="text-xl font-bold">{colleague.name}</p>
          <Instagram className="h-5 w-5" />
        </a>
        <div className="flex items-center gap-3">
          <p className="font-mainPicture text-xl">{colleague.position}</p>
        </div>
        <p className="mt-2 text-justify text-sm xl:text-base">
          {colleague.description}
        </p>
      </div>
    </div>
  );
};
