import Image from "next/image";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import VerifiedUserOutlinedIcon from "@mui/icons-material/VerifiedUserOutlined";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import MovingQuoteLeadForm from "@/Components/UI/Forms/MovingQuoteLeadForm";
import styles from "./GetFreeMovingQuotePage.module.scss";

export default function GetFreeMovingQuotePage({ content }) {
  const {
    promoText,
    title,
    description,
    features,
    trustItems,
    form,
  } = content;

  return (
    <div className={styles.page}>
      <section className={styles.hero}>
        <Container maxWidth="lg" className={styles.heroInner}>
          <div className={styles.contentColumn}>
            <div className={styles.promoPill}>
              <span className={styles.promoDot} />
              {promoText}
            </div>

            <Typography variant="h1" component="h1" className={styles.title}>
              {title.firstLine}
              <br />
              {title.secondLine} <span>{title.highlight}</span>
            </Typography>

            <Typography variant="h5" component="p" className={styles.description}>
              <strong>{description.lead}</strong> {description.body}
            </Typography>

            <div className={styles.featureGrid}>
              {features.map((item) => (
                <div key={item} className={styles.featureItem}>
                  <CheckCircleIcon sx={{ fontSize: 22 }} />
                  <span>{item}</span>
                </div>
              ))}
            </div>

            <div className={styles.trustPanel}>
              {trustItems.map((item) => (
                <div className={styles.trustItem} key={item.label}>
                  {item.image ? (
                    <Image
                      src={item.image.src}
                      alt={item.image.alt}
                      width={item.image.width}
                      height={item.image.height}
                    />
                  ) : (
                    <div className={styles.trustBadge}>
                      <VerifiedUserOutlinedIcon sx={{ fontSize: 32 }} />
                    </div>
                  )}
                  <div className={styles.trustItemText}>
                    <span className={styles.trustLabel}>{item.label}</span>
                    <p>{item.text}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className={styles.formColumn}>
            <MovingQuoteLeadForm {...form} />
          </div>
        </Container>
      </section>
    </div>
  );
}
