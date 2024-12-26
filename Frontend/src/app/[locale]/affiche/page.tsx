import { AfficheList } from "@/widgets/afficheList";
import Image from "next/image";
import { strapiFetch } from "../../api/route";
import { IBlock } from "./libs/affiche.types";
import { AffichePageRoute } from "./libs/routes";

const Affiche = async ({
  params: { locale },
}: {
  params: { locale: string };
}) => {
  const AffichePageUrl: string = AffichePageRoute(locale);
  const strapiUrl = process.env.STRAPI_URL;
  const apiData = await strapiFetch(AffichePageUrl);
  const { blocks } = apiData.data;
  const upcomingBlock: IBlock = blocks.at(-1);
  const reversedBlocks: IBlock[] = blocks.slice(0, -1).reverse();

  return (
    <>
      <div className="flex h-screen w-full">
        <div className="flex w-1/2 flex-col items-start justify-center gap-5 px-28 py-32">
          <h3 className="mb-8 border-b border-solid border-grn">
            Upcoming event
          </h3>
          <h2>{upcomingBlock.name}</h2>
          <p className="italic">{upcomingBlock.date}</p>
          <p>{upcomingBlock.description}</p>
        </div>
        <div className="relative z-10 h-screen w-1/2">
          <Image
            alt={upcomingBlock.name}
            src={`${strapiUrl}${upcomingBlock.picture.url}`}
            fill
            sizes="50vw"
            className="object-cover"
            priority
          />
        </div>
      </div>
      {/* <ul className="flex">
        {reversedBlocks.map((block: IBlock) => (
          <li key={block.id} className="relative h-[50vh] w-1/3">
            <Image
              alt={block.name}
              src={`${strapiUrl}${block.picture.url}`}
              layout="fill"
              objectFit="cover"
              className="brightness-50"
            ></Image>
            <div className="text-wht absolute inset-0 flex flex-col justify-center gap-2 p-20">
              <h4 className="border-wht w-auto border-b border-solid">
                {block.name}
              </h4>
              <p>{block.date}</p>
              <p>{block.description}</p>
            </div>
          </li>
        ))}
      </ul> */}
      <AfficheList blocks={reversedBlocks} strapiUrl={strapiUrl} />
    </>
  );
};

export default Affiche;
