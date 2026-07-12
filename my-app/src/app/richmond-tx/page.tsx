import { LocalLandingPage } from "@/components/local/local-landing-page";
import { LOCAL_PAGES } from "@/content/local-pages";

export default function RichmondTxPage() {
  return <LocalLandingPage config={LOCAL_PAGES["richmond-tx"]} />;
}
