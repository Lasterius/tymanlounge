"use client";

import { AfficheItem } from "@/app/[locale]/affiche/libs/affiche.types";
import { Button } from "@/shared/button";
import Image from "next/image";
import { useState } from "react";

export const AfficheList = ({
  blocks,
  strapiUrl,
  buttonText,
}: {
  blocks: AfficheItem[];
  strapiUrl: string | undefined;
  buttonText: string;
}) => {
  const [visibleCount, setVisibleCount] = useState(5);
  const loadMore = () => {
    setVisibleCount((prev) => prev + 6);
  };

  const visibleBlocks = blocks.slice(0, visibleCount);
  const hasMore = visibleCount < blocks.length;

  return (
    <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
      {visibleBlocks.map((block: AfficheItem) => (
        <li
          key={block.id}
          className="relative h-[33vh] sm:h-[40vh] xl:h-[50vh]"
        >
          <Image
            alt={block.name}
            src={`${strapiUrl}${block.picture.url}`}
            fill
            className="object-cover brightness-50"
          />
          <div className="absolute inset-0 flex flex-col justify-center gap-2 p-4 text-wht sm:p-8 xl:p-20">
            <h4 className="max-w-max border-b border-solid border-wht">
              {block.name}
            </h4>
            <p>{block.date}</p>
            <p className="text-justify">{block.description}</p>
          </div>
        </li>
      ))}

      {hasMore ? (
        <div className="relative flex h-[33vh] items-center justify-center px-12 sm:h-[40vh] xl:h-[50vh]">
          <Button onClick={loadMore}>{buttonText}</Button>
        </div>
      ) : (
        ""
      )}
    </ul>
  );
};
