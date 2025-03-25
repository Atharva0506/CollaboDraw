"use client";
import { Separator } from "@repo/ui";
import { PencilRuler } from "lucide-react";
import Link from "next/link";
import { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";

export const FooterSection = () => {
  useEffect(() => {
    AOS.init({ duration: 800, once: true });
  }, []);

  return (
    <footer id="footer" className="container py-24 sm:py-32">
      <div
        className="p-10 bg-card border border-secondary rounded-2xl"
        data-aos="fade-up"
      >
        <div className="grid grid-cols-2 md:grid-cols-4 xl:grid-cols-6 gap-x-12 gap-y-8">
          <div className="col-span-full xl:col-span-2" data-aos="fade-right">
            <Link href="#" className="flex font-bold items-center">
              <PencilRuler className="w-9 h-9 mr-2 bg-gradient-to-tr from-primary via-primary/70 to-primary rounded-lg border border-secondary" />
              <h3 className="text-2xl">ColloboDraw</h3>
            </Link>
          </div>

          {[
            { title: "Contact", links: ["Github", "Twitter", "Instagram"] },
            { title: "Platforms", links: ["iOS", "Android", "Web"] },
            { title: "Help", links: ["Contact Us", "FAQ", "Feedback"] },
            { title: "Socials", links: ["Discord", "LinkedIn"] },
          ].map((section, index) => (
            <div key={index} className="flex flex-col gap-2" data-aos="fade-up">
              <h3 className="font-bold text-lg">{section.title}</h3>
              {section.links.map((link, idx) => (
                <div key={idx}>
                  <Link href="#" className="opacity-60 hover:opacity-100">
                    {link}
                  </Link>
                </div>
              ))}
            </div>
          ))}
        </div>

        <Separator className="my-6" data-aos="zoom-in" />
        <section data-aos="fade-up">
          <h3>
            &copy; 2025 Designed and developed by
            <Link
              target="_blank"
              href="https://github.com/Atharva0506"
              className="text-primary transition-all border-primary hover:border-b-2 ml-1"
            >
              Atharva Naik
            </Link>
          </h3>
        </section>
      </div>
    </footer>
  );
};
