"use client";

import Image from "next/image";
import { useEffect, useMemo, useState } from "react";
import styles from "./GallerySection.module.scss";

const INITIAL_MEDIA_COUNT = 8;

function ExpandIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M8 3H3v5M16 3h5v5M8 21H3v-5M16 21h5v-5" />
    </svg>
  );
}

function CloseIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="m6 6 12 12M18 6 6 18" />
    </svg>
  );
}

function ArrowIcon({ direction }) {
  return (
    <svg
      viewBox="0 0 24 24"
      aria-hidden="true"
      className={direction === "next" ? styles.nextArrow : undefined}
    >
      <path d="m15 18-6-6 6-6" />
    </svg>
  );
}

export default function GalleryGrid({ media }) {
  const [showAll, setShowAll] = useState(false);
  const [activePhotoIndex, setActivePhotoIndex] = useState(null);
  const photos = useMemo(() => media.filter((item) => item.type === "image"), [media]);
  const visibleMedia = showAll ? media : media.slice(0, INITIAL_MEDIA_COUNT);
  const activePhoto =
    activePhotoIndex === null ? null : photos[activePhotoIndex];

  useEffect(() => {
    if (!activePhoto) return undefined;

    const previousOverflow = document.body.style.overflow;
    const handleKeyDown = (event) => {
      if (event.key === "Escape") setActivePhotoIndex(null);
      if (event.key === "ArrowLeft") {
        setActivePhotoIndex((current) =>
          current === null ? null : (current - 1 + photos.length) % photos.length
        );
      }
      if (event.key === "ArrowRight") {
        setActivePhotoIndex((current) =>
          current === null ? null : (current + 1) % photos.length
        );
      }
    };

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [activePhoto, photos.length]);

  const openPhoto = (photo) => {
    setActivePhotoIndex(photos.findIndex((item) => item.id === photo.id));
  };

  const showPreviousPhoto = () => {
    setActivePhotoIndex((current) =>
      current === null ? null : (current - 1 + photos.length) % photos.length
    );
  };

  const showNextPhoto = () => {
    setActivePhotoIndex((current) =>
      current === null ? null : (current + 1) % photos.length
    );
  };

  return (
    <>
      <div className={styles.grid}>
        {visibleMedia.map((item, index) => (
          <article
            className={`${styles.mediaCard} ${
              index === 0 ? styles.featured : ""
            } ${item.type === "video" ? styles.videoCard : ""}`}
            key={item.id}
          >
            {item.type === "image" ? (
              <button
                className={styles.imageButton}
                type="button"
                onClick={() => openPhoto(item)}
                aria-label={`Open ${item.alt}`}
              >
                <Image
                  src={item.src}
                  alt={item.alt}
                  fill
                  sizes={
                    index === 0
                      ? "(max-width: 700px) 100vw, (max-width: 1000px) 66vw, 50vw"
                      : "(max-width: 700px) 50vw, (max-width: 1000px) 33vw, 25vw"
                  }
                  className={styles.media}
                />
                <span className={styles.expandLabel}>
                  <ExpandIcon />
                  View photo
                </span>
              </button>
            ) : (
              <video
                className={`${styles.media} ${styles.videoMedia}`}
                controls
                playsInline
                preload="metadata"
                aria-label="Video from a recent move"
              >
                <source src={item.src} type="video/mp4" />
                Your browser does not support embedded video.
              </video>
            )}
          </article>
        ))}
      </div>

      {media.length > INITIAL_MEDIA_COUNT && (
        <div className={styles.buttonWrapper}>
          <button
            type="button"
            className={styles.showButton}
            onClick={() => setShowAll((current) => !current)}
            aria-expanded={showAll}
          >
            {showAll ? "Show fewer" : `View all ${media.length} photos & videos`}
          </button>
        </div>
      )}

      {activePhoto && (
        <div
          className={styles.lightbox}
          role="dialog"
          aria-modal="true"
          aria-label="Photo viewer"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) setActivePhotoIndex(null);
          }}
        >
          <button
            className={styles.closeButton}
            type="button"
            onClick={() => setActivePhotoIndex(null)}
            aria-label="Close photo viewer"
            autoFocus
          >
            <CloseIcon />
          </button>

          {photos.length > 1 && (
            <>
              <button
                className={`${styles.lightboxButton} ${styles.previousButton}`}
                type="button"
                onClick={showPreviousPhoto}
                aria-label="Previous photo"
              >
                <ArrowIcon direction="previous" />
              </button>
              <button
                className={`${styles.lightboxButton} ${styles.nextButton}`}
                type="button"
                onClick={showNextPhoto}
                aria-label="Next photo"
              >
                <ArrowIcon direction="next" />
              </button>
            </>
          )}

          <div className={styles.lightboxImage}>
            <Image
              src={activePhoto.src}
              alt={activePhoto.alt}
              fill
              sizes="100vw"
              className={styles.containedImage}
              priority
            />
          </div>
          <p className={styles.photoCount} aria-live="polite">
            {activePhotoIndex + 1} / {photos.length}
          </p>
        </div>
      )}
    </>
  );
}
