import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import SocialProof from "@/components/SocialProof";
import WhoIsAthlio from "@/components/WhoIsAthlio";
import AppShowcase from "@/components/AppShowcase";
import WaitlistCta from "@/components/WaitlistCta";
import Faq from "@/components/Faq";
import Footer from "@/components/Footer";
import { WaitlistProvider } from "@/components/WaitlistProvider";

export default function Home() {
  return (
    <WaitlistProvider>
      <Navbar />
      <Hero />
      <SocialProof />
      <WhoIsAthlio />
      <AppShowcase />
      <WaitlistCta />
      <Faq />
      <Footer />
    </WaitlistProvider>
  );
}
