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
      "2 Men + Truck | $65/hh",
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
    title: `<h2>Moving Services Across ${cityName} &amp; Surrounding Suburbs</h2>`,
    description: `${cityName} Express Movers helps with house moves, apartment moves, office relocations, and furniture deliveries across ${cityName} and its surrounding suburbs.`,
    mapCenter: [-39.9301, 175.0479],
    mapZoom: 12,
    locations: [
      { label: "Whanganui Central", coordinates: [-39.9301, 175.0479] },
      { label: "Whanganui East", coordinates: [-39.9262, 175.0655] },
      { label: "Aramoho", coordinates: [-39.905, 175.058] },
      { label: "Durie Hill", coordinates: [-39.9392, 175.0578] },
      { label: "Putiki", coordinates: [-39.9386, 175.051] },
      { label: "Bastia Hill", coordinates: [-39.929, 175.062] },
      { label: "Gonville", coordinates: [-39.9447, 175.0253] },
      { label: "Castlecliff", coordinates: [-39.9476, 174.9951] },
      { label: "College Estate", coordinates: [-39.937, 175.029] },
      { label: "Springvale", coordinates: [-39.9209, 175.0226] },
      { label: "St Johns Hill", coordinates: [-39.9178, 175.0336] },
      { label: "Tawhero", coordinates: [-39.9235, 175.033] },
      { label: "Balgownie", coordinates: [-39.9285, 175.025] },
      { label: "Otamatea", coordinates: [-39.908, 175.014] },
      { label: "Marybank", coordinates: [-39.878, 175.053] },
      { label: "Upokongaro", coordinates: [-39.874, 175.109] },
      { label: "Kai Iwi", coordinates: [-39.856, 174.934] },
      { label: "Fordell", coordinates: [-39.959, 175.196] },
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
