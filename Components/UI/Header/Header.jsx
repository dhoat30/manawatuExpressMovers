import TopTrustBar from "@/Components/Pages/GetFreeMovingQuotePage/TopTrustBar";
import ResponsiveNavbar from "./ResponsiveNavbar/ResponsiveNavbar";
export default function Header({ topBarContent }) {
  return (
    <>
      <TopTrustBar {...topBarContent} />
      <ResponsiveNavbar />
      <div className="header-offset" aria-hidden="true" />
    </>
  );
}
