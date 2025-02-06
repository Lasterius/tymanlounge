"use client";

import { IPictures } from "@/app/[locale]/gallery/libs/gallery.types";
import Image from "next/image";
import { useCallback, useEffect, useState } from "react";

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
  const [touchStartX, setTouchStartX] = useState<number | null>(null);

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

  const goToNextImage = useCallback(() => {
    if (selectedImageIndex !== null) {
      setSelectedImageIndex((prevIndex) => (prevIndex + 1) % pictures.length);
    }
  }, [selectedImageIndex, pictures.length]);

  const goToPreviousImage = useCallback(() => {
    if (selectedImageIndex !== null) {
      setSelectedImageIndex(
        (prevIndex) => (prevIndex - 1 + pictures.length) % pictures.length,
      );
    }
  }, [selectedImageIndex, pictures.length]);

  useEffect(() => {
    if (isOpen) {
      const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === "ArrowRight") {
          goToNextImage();
        } else if (e.key === "ArrowLeft") {
          goToPreviousImage();
        } else if (e.key === "Escape") {
          closeModal();
        }
      };

      document.addEventListener("keydown", handleKeyDown);
      return () => {
        document.removeEventListener("keydown", handleKeyDown);
      };
    }
  }, [isOpen, goToNextImage, goToPreviousImage]);

  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStartX(e.touches[0].clientX);
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX !== null) {
      const touchEndX = e.changedTouches[0].clientX;
      const deltaX = touchEndX - touchStartX;

      // Порог свайпа
      if (deltaX > 50) {
        goToPreviousImage();
      } else if (deltaX < -50) {
        goToNextImage();
      }

      setTouchStartX(null);
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

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  return (
    <div className="relative">
      {/* Галерея */}
      <div
        className="grid grid-cols-1 gap-4 p-4 sm:grid-cols-2 lg:grid-cols-3"
        style={{
          gridAutoRows: "30px", // Базовая высота строки
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
                width={1920}
                height={1080}
                loading={index < 9 ? "eager" : "lazy"}
                priority={index < 9}
                className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
              />
            </div>
          ))}
      </div>

      {/* Модальное окно */}
      {isOpen && selectedImageIndex !== null && (
        <div
          className="fixed inset-0 z-[999] flex flex-col items-center justify-center bg-blck bg-opacity-90"
          onClick={handleModalClick}
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
        >
          <div className="relative flex items-center justify-center rounded-lg shadow-lg">
            <button
              onClick={closeModal}
              className="absolute right-2 top-2 p-1 text-4xl text-white transition-colors hover:text-grn"
              style={{
                textShadow: "2px 2px 4px rgba(0, 0, 0, 0.7)",
              }}
            >
              ✕
            </button>

            {/* Картинка в модалке */}
            <Image
              src={`${strapiUrl}${pictures[selectedImageIndex].files.url}`}
              alt={`Selected Picture ${pictures[selectedImageIndex].id}`}
              width={1920}
              height={1020}
              priority
              className="h-full max-h-[95vh] w-full max-w-[95vw] object-contain"
            />
          </div>

          {/* Контейнер для кнопок перелистывания */}
          <div className="absolute bottom-4 flex justify-between gap-8">
            {/* Кнопка для перехода влево */}
            <button
              onClick={goToPreviousImage}
              className="p-2 text-4xl text-white transition-colors hover:text-grn"
              style={{
                textShadow: "2px 2px 4px rgba(0, 0, 0, 0.7)",
              }}
            >
              ←
            </button>

            {/* Кнопка для перехода вправо */}
            <button
              onClick={goToNextImage}
              className="p-2 text-4xl text-white transition-colors hover:text-grn"
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
