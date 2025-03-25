import { ContactSection } from "../components/landing/contact";
import { FAQSection } from "../components/landing/faq";
import { FeaturesSection } from "../components/landing/feature";
import { FooterSection } from "../components/landing/footer";
import { HeroSection } from "../components/landing/hero";
import { Navbar } from "../components/landing/navbar";
import { ServicesSection } from "../components/landing/services";
import { TestimonialSection } from "../components/landing/testimonial";

export default function Home() {
  return (
    <>
      <Navbar />
      <HeroSection />
      <FeaturesSection />
      <ServicesSection />
      <TestimonialSection />
      <FAQSection />
      <ContactSection />
      <FooterSection />
    </>
  );
}
