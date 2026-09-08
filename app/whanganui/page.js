import Header from "@/Components/UI/Header/Header";
import Footer from "@/Components/UI/Footer/Footer";
import GetFreeMovingQuotePage from "@/Components/Pages/GetFreeMovingQuotePage/GetFreeMovingQuotePage";
import RegularProcess from "@/Components/UI/Layout/Sections/Process/RegularProcess";
import LocationsCovered from "@/Components/UI/LocationsCovered/LocationsCovered";
import GallerySection from "@/Components/UI/Gallery/GallerySection";
import styles from "@/Components/Pages/GetFreeMovingQuotePage/GetFreeMovingQuotePage.module.scss";

const cityName = "Whanganui";

const landingPageContent = {
  topBar: {
    items: [
      { icon: "verified", text: "4.9 Google Reviews" },
      { icon: "shield", text: "WINZ Approved" },
      { icon: "truck", text: "Full Transit Insurance" },
    ],
    email: process.env.NEXT_PUBLIC_EMAIL_ADDRESS,
  },
  hero: {
    promoText: "Price Beat Guarantee — We’ll Beat Any Quote by 10%",
    title: {
      firstLine: "Stress-Free House",
      secondLine: "Moves — Quote in",
      highlight: "15 Minutes",
    },
    description: {
      lead: `${cityName}’s trusted removalists.`,
      body: "Professional team, transparent pricing, and no hidden costs. Get a response within 15 minutes.",
    },
    features: [
      "2 Men + Truck | $65/hr",
      "No depot fee, pay on arrival",
      "Packing & unpacking available",
      "We can beat any quote by 10%",
      "WINZ Quotes",
      "Full transit insurance",
    ],
    trustItems: [
      { label: "NZ OWNED", text: "Professional Team" },
      {
        label: "WINZ",
        text: "Approved",
        image: {
          src: "/winz-logo.png",
          alt: "WINZ Approved",
          width: 42,
          height: 42,
        },
      },
      {
        label: "GOOGLE RATING",
        text: "★★★★★ 4.9",
        image: {
          src: "/google-logo.png",
          alt: "Google Rating",
          width: 38,
          height: 38,
        },
      },
    ],
    form: {
      formName: `${cityName} Moving Quote Request`,
      title: "Get Your Free Quote",
      subtitle: "Takes 60 seconds. No obligation whatsoever.",
      highlightText: "Efficient Stacking, Fewer Trips",
      submitButtonText: "GET FREE QUOTE",
      phoneCtaText: "Prefer to talk?",
      footerNote: "Honest advice • Free Quote • No obligation",
      privacyNote: "Your details are safe & never shared",
      errorMessage: "Something went wrong. Please try again.",
      fieldContent: {
        pickUpAddress: {
          label: "Moving from",
          errorMessage: "Please enter a valid pickup address",
        },
        dropOffAddress: {
          label: "Moving to",
          errorMessage: "Please enter a valid drop-off address",
        },
        firstname: {
          label: "First name",
          errorMessage: "First name should be at least 3 characters long",
        },
        email: {
          label: "Email address",
          errorMessage: "Enter a valid email address",
        },
        phone: {
          label: "Phone number",
          errorMessage: "Please enter a valid New Zealand phone number",
        },
      },
    },
  },
  process: {
    title: "Our Simple Moving Process",
    cards: [
      {
        title: "Tell Us About Your Move",
        description:
          "<p>Get in touch with your moving details, including where you’re moving from, where you’re moving to, and what needs to be moved.</p>",
      },
      {
        title: "Receive a Clear Quote",
        description:
          "<p>Our team reviews your moving requirements and prepares a straightforward quote, so you know what to expect before moving day.</p>",
      },
      {
        title: "Move Stress-Free",
        description:
          "<p>On moving day, our movers arrive prepared, handle your belongings with care, and complete the move efficiently from start to finish.</p>",
      },
    ],
  },
  locations: {
    title: `<h2>Moving Services Across ${cityName} &amp; Whanganui</h2>`,
    description: `${cityName} Express Movers helps with house moves, apartment moves, office relocations, and furniture deliveries across Palmerston North, ${cityName}, and Whanganui.`,
    mapCenter: [-40.3564, 175.6111],
    mapZoom: 10,
    locations: [
      { label: "Palmerston North Central", coordinates: [-40.3564, 175.6111] },
      { label: "Hokowhitu", coordinates: [-40.3587, 175.6316] },
      { label: "Awapuni", coordinates: [-40.3698, 175.5904] },
      { label: "Milson", coordinates: [-40.3288, 175.6092] },
      { label: "Kelvin Grove", coordinates: [-40.3373, 175.6424] },
      { label: "Roslyn", coordinates: [-40.3428, 175.6301] },
      { label: "Terrace End", coordinates: [-40.3512, 175.6358] },
      { label: "Takaro", coordinates: [-40.3521, 175.5881] },
      { label: "West End", coordinates: [-40.3654, 175.6002] },
      { label: "Highbury", coordinates: [-40.354, 175.5727] },
      { label: "Aokautere", coordinates: [-40.3904, 175.6651] },
      { label: "Ashhurst", coordinates: [-40.2942, 175.7544] },
      { label: "Feilding", coordinates: [-40.2256, 175.5653] },
      { label: "Bunnythorpe", coordinates: [-40.2803, 175.633] },
      { label: "Longburn", coordinates: [-40.3869, 175.5507] },
      { label: "Linton", coordinates: [-40.4277, 175.5834] },
      { label: "Sanson", coordinates: [-40.2207, 175.4249] },
      { label: "Bulls", coordinates: [-40.1742, 175.3845] },
      { label: "Whanganui", coordinates: [-39.9301, 175.0479] },
    ],
  },
  footer: {
    eyebrow: `${cityName} Express`,
    title: "Ready for a smoother move?",
    description:
      "Talk to a local moving team for clear pricing, careful handling, and a stress-free moving day.",
    copyrightName: `${cityName} Express Movers`,
  },
};

export const metadata = {
  title: `Get Free Moving Quote | ${cityName} Express Movers`,
  description: `Get a free moving quote from ${cityName} Express Movers with fast turnaround, clear pricing, and trusted local service.`,
};

export default function Page() {
  return (
    <div className={styles.routeShell}>
      <Header topBarContent={landingPageContent.topBar} />
      <main>
        <GetFreeMovingQuotePage content={landingPageContent.hero} />
        <RegularProcess {...landingPageContent.process} />
        <LocationsCovered {...landingPageContent.locations} />
        <GallerySection cityName={cityName} />
      </main>
      <Footer showFooterCta={false} content={landingPageContent.footer} />
    </div>
  );
}
