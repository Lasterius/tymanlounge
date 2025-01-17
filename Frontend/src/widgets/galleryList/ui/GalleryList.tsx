"use client";

import { IPictures } from "@/app/[locale]/gallery/libs/gallery.types";
import Image from "next/image";
import { useEffect, useState } from "react";

export const GalleryList = ({
  pictures,
  strapiUrl,
}: {
  pictures: IPictures[];
  strapiUrl: string | undefined;
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedImageIndex, setSelectedImageIndex] = useState<number>(0);
  const [imageHeights, setImageHeights] = useState<number[]>([]);
  const [imagesLoaded, setImagesLoaded] = useState(false);

  const openModal = (index: number) => {
    setSelectedImageIndex(index);
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
    setSelectedImageIndex(0);
  };

  const handleModalClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      closeModal();
    }
  };

  const goToNextImage = () => {
    if (selectedImageIndex !== null) {
      setSelectedImageIndex((prevIndex) => (prevIndex + 1) % pictures.length);
    }
  };

  const goToPreviousImage = () => {
    if (selectedImageIndex !== null) {
      setSelectedImageIndex(
        (prevIndex) => (prevIndex - 1 + pictures.length) % pictures.length,
      );
    }
  };

  useEffect(() => {
    // Рассчитываем высоты изображений до первого рендера
    const heights = pictures.map(() =>
      Math.floor(Math.random() * (15 - 5 + 1) + 5),
    ); // Примерная высота
    setImageHeights(heights);
    setImagesLoaded(true); // Устанавливаем флаг после вычисления высот
  }, [pictures]);

  return (
    <div className="relative">
      {/* Галерея */}
      <div
        className="grid grid-cols-1 gap-4 p-4 sm:grid-cols-2 lg:grid-cols-3"
        style={{
          gridAutoRows: "20px", // Базовая высота строки
        }}
      >
        {imagesLoaded &&
          pictures.map((picture, index) => (
            <div
              key={picture.id}
              className="group relative cursor-pointer overflow-hidden rounded-lg shadow-lg"
              style={{
                gridRowEnd: `span ${imageHeights[index]}`,
              }}
              onClick={() => openModal(index)}
            >
              <Image
                src={`${strapiUrl}${picture.files.url}`}
                alt={`Picture ${picture.id}`}
                width={300}
                height={300}
                className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
              />
            </div>
          ))}
      </div>

      {/* Модальное окно */}
      {isOpen && selectedImageIndex !== null && (
        <div
          className="fixed inset-0 z-[999] flex items-center justify-center bg-black bg-opacity-70"
          onClick={handleModalClick}
        >
          <div className="relative max-w-screen-lg rounded-lg bg-white shadow-lg">
            <button
              onClick={closeModal}
              className="absolute right-2 top-2 p-1 text-4xl text-white transition-colors hover:text-grn"
              style={{
                textShadow: "2px 2px 4px rgba(0, 0, 0, 0.7)",
              }}
            >
              ✕
            </button>
            {/* Кнопка для перехода влево */}
            <button
              onClick={goToPreviousImage}
              className="absolute left-4 top-1/2 -translate-y-1/2 transform p-2 text-4xl text-white transition-colors hover:text-grn"
              style={{
                textShadow: "2px 2px 4px rgba(0, 0, 0, 0.7)",
              }}
            >
              ←
            </button>
            {/* Картинка в модалке */}
            <Image
              src={`${strapiUrl}${pictures[selectedImageIndex].files.url}`}
              alt={`Selected Picture ${pictures[selectedImageIndex].id}`}
              width={800}
              height={600}
              className="h-full max-h-[95vh] w-full max-w-[95vw] object-contain"
            />
            {/* Кнопка для перехода вправо */}
            <button
              onClick={goToNextImage}
              className="absolute right-4 top-1/2 -translate-y-1/2 transform p-2 text-4xl text-white transition-colors hover:text-grn"
              style={{
                textShadow: "2px 2px 4px rgba(0, 0, 0, 0.7)",
              }}
            >
              →
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
