import { readdir } from "node:fs/promises";
import path from "node:path";
import Container from "@mui/material/Container";
import GalleryGrid from "./GalleryGrid";
import styles from "./GallerySection.module.scss";

const IMAGE_EXTENSIONS = new Set([".avif", ".jpeg", ".jpg", ".png", ".webp"]);
const VIDEO_EXTENSIONS = new Set([".m4v", ".mov", ".mp4", ".webm"]);

async function getGalleryMedia() {
  try {
    const galleryDirectory = path.join(process.cwd(), "public", "gallery");
    const files = await readdir(galleryDirectory);
    const photos = [];
    const videos = [];

    files
      .sort((a, b) => a.localeCompare(b, undefined, { numeric: true }))
      .forEach((fileName) => {
        const extension = path.extname(fileName).toLowerCase();
        const src = encodeURI(`/gallery/${fileName}`);

        if (IMAGE_EXTENSIONS.has(extension)) {
          photos.push({ src, type: "image" });
        } else if (VIDEO_EXTENSIONS.has(extension)) {
          videos.push({ src, type: "video" });
        }
      });

    const media = [];
    const photoQueue = [...photos];
    const videoQueue = [...videos];

    while (photoQueue.length || videoQueue.length) {
      media.push(...photoQueue.splice(0, 2));
      media.push(...videoQueue.splice(0, 1));
    }

    return media.map((item, index) => ({
      ...item,
      id: `${item.type}-${index}-${item.src}`,
      alt:
        item.type === "image"
          ? `Professional furniture moving and careful loading, gallery photo ${
              photos.indexOf(item) + 1
            }`
          : undefined,
    }));
  } catch {
    return [];
  }
}

export default async function GallerySection({ cityName = "Manawatū" }) {
  const media = await getGalleryMedia();

  if (!media.length) return null;

  return (
    <section className={styles.section} id="gallery" aria-labelledby="gallery-title">
      <Container maxWidth="lg">
        <div className={styles.headingWrapper}>
          <p className={styles.eyebrow}>OUR WORK</p>
          <h2 className={styles.heading} id="gallery-title">
            Real moves. Handled with care.
          </h2>
          <p className={styles.description}>
            A look at recent moves completed by our team in {cityName} and
            surrounding areas.
          </p>
        </div>

        <GalleryGrid media={media} />
      </Container>
    </section>
  );
}
