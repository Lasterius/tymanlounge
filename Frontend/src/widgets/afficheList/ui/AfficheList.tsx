"use client";

import { IBlock } from "@/app/[locale]/affiche/libs/affiche.types";
import { Button } from "@/shared/button";
import { useTranslations } from "next-intl";
import Image from "next/image";
import { useState } from "react";

export const AfficheList = ({
  blocks,
  strapiUrl,
}: {
  blocks: IBlock[];
  strapiUrl: string | undefined;
}) => {
  const [visibleCount, setVisibleCount] = useState(5);
  const loadMore = () => {
    setVisibleCount((prev) => prev + 6);
  };
  const t = useTranslations("AffichePage");

  const visibleBlocks = blocks.slice(0, visibleCount);
  const hasMore = visibleCount < blocks.length;

  return (
    <ul className="grid grid-cols-3">
      {visibleBlocks.map((block: IBlock) => (
        <li key={block.id} className="relative h-[50vh]">
          <Image
            alt={block.name}
            src={`${strapiUrl}${block.picture.url}`}
            fill
            sizes="33vw"
            className="object-cover brightness-50"
          />
          <div className="absolute inset-0 flex flex-col justify-center gap-2 p-20 text-wht">
            <h4 className="w-auto border-b border-solid border-wht">
              {block.name}
            </h4>
            <p>{block.date}</p>
            <p>{block.description}</p>
          </div>
        </li>
      ))}
      <li className="relative flex h-[50vh] items-center justify-center">
        {hasMore ? <Button onClick={loadMore}>{t("buttonLoad")}</Button> : ""}
      </li>
    </ul>
  );
};
