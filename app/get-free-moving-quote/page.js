import Header from "@/Components/UI/Header/Header";
import Footer from "@/Components/UI/Footer/Footer";
import GetFreeMovingQuotePage from "@/Components/Pages/GetFreeMovingQuotePage/GetFreeMovingQuotePage";
import styles from "@/Components/Pages/GetFreeMovingQuotePage/GetFreeMovingQuotePage.module.scss";
import LocationsCovered from "@/Components/UI/LocationsCovered/LocationsCovered";

export const metadata = {
  title: "Get Free Moving Quote | Manawatū Express Movers",
  description:
    "Get a free moving quote from Manawatū Express Movers with fast turnaround, clear pricing, and trusted local service.",
};

export default function Page() {
  return (
    <div className={styles.routeShell}>
      <Header />
      <main>
        <GetFreeMovingQuotePage />
        <LocationsCovered/> 
      </main>
      <Footer
        showFooterCta={false}
        footerCtaData={{
          title: "Book Your Move with Confidence",
          description:
            "Don’t risk delays, damage, or surprise costs on moving day. Choose a professional moving team that shows up on time and does the job right.",
          cta_link: { url: "/", title: "GET A QUOTE" },
        }}
      />
    </div>
  );
}
