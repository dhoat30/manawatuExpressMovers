"use client";

import useEmblaCarousel from "embla-carousel-react";
import AutoScroll from "embla-carousel-auto-scroll";
import Container from "@mui/material/Container";
import MailOutlineIcon from "@mui/icons-material/MailOutline";
import VerifiedOutlinedIcon from "@mui/icons-material/VerifiedOutlined";
import ShieldOutlinedIcon from "@mui/icons-material/ShieldOutlined";
import LocalShippingOutlinedIcon from "@mui/icons-material/LocalShippingOutlined";
import styles from "./GetFreeMovingQuotePage.module.scss";

const ICONS = {
  verified: VerifiedOutlinedIcon,
  shield: ShieldOutlinedIcon,
  truck: LocalShippingOutlinedIcon,
  email: MailOutlineIcon,
};

export default function TopTrustBar({ items = [], email }) {
  const resolvedEmail = email || process.env.NEXT_PUBLIC_EMAIL_ADDRESS;
  const mobileSlides = resolvedEmail
    ? [...items, { icon: "email", text: resolvedEmail, href: `mailto:${resolvedEmail}` }]
    : items;

  const renderIcon = (icon) => {
    const Icon = ICONS[icon];
    return Icon ? <Icon sx={{ fontSize: 18 }} /> : null;
  };

  const [emblaRef] = useEmblaCarousel(
    {
      align: "center",
      loop: true,
      dragFree: true,
    },
    [
      AutoScroll({
        speed: 0.8,
        stopOnInteraction: false,
        stopOnMouseEnter: true,
        playOnInit: true,
      }),
    ]
  );

  return (
    <div className={styles.topBar}>
      <Container maxWidth="xl" className={styles.topBarInner}>
        <div className={styles.topBarDesktop}>
          <div className={styles.topBarItems}>
            {items.map((item) => (
              <div key={item.text} className={styles.topBarItem}>
                {renderIcon(item.icon)}
                <span>{item.text}</span>
              </div>
            ))}
          </div>
          {resolvedEmail ? (
            <a href={`mailto:${resolvedEmail}`} className={styles.topBarLink}>
              <MailOutlineIcon sx={{ fontSize: 18 }} />
              <span>{resolvedEmail}</span>
            </a>
          ) : null}
        </div>

        <div className={`${styles.topBarMobile} embla`}>
          <div className="embla__viewport" ref={emblaRef}>
            <div className="embla__container">
              {mobileSlides.map((item) => {
                const content = (
                  <div className={styles.topBarMobileSlide}>
                    {renderIcon(item.icon)}
                    <span>{item.text}</span>
                  </div>
                );

                return (
                  <div key={item.text} className={`embla__slide ${styles.topBarMobileSlideWrapper}`}>
                    {item.href ? (
                      <a href={item.href} className={styles.topBarMobileLink}>
                        {content}
                      </a>
                    ) : (
                      content
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
}
