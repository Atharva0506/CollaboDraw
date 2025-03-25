"use client";
import { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import { Badge } from "@repo/ui";
import { Card, CardDescription, CardHeader, CardTitle } from "@repo/ui";

enum ProService {
  YES = 1,
  NO = 0,
}

interface ServiceProps {
  title: string;
  pro: ProService;
  description: string;
}

const serviceList: ServiceProps[] = [
  {
    title: "Real-Time Collaboration",
    description:
      "Multiple users can draw, edit, and collaborate in real time on a shared whiteboard.",
    pro: 0,
  },
  {
    title: "Cloud Storage & Sync",
    description:
      "Automatically save and sync your drawings across devices using cloud storage.",
    pro: 0,
  },
  {
    title: "Cross-Platform Accessibility",
    description:
      "Access your whiteboards from any device, including desktops, tablets, and smartphones.",
    pro: 0,
  },
  {
    title: "Offline Drawing Mode",
    description:
      "Create and edit drawings even without an internet connection, with automatic sync when online.",
    pro: 1,
  },
  {
    title: "Version Control",
    description:
      "Keep track of changes with version history, allowing you to restore previous versions easily.",
    pro: 1,
  },
  {
    title: "Secure Sharing & Permissions",
    description:
      "Control access to your whiteboards with customizable sharing settings and permissions.",
    pro: 1,
  },
  {
    title: "Advanced Drawing Tools",
    description:
      "Utilize a variety of drawing tools, shapes, layers, and templates for precise designs.",
    pro: 1,
  },
  {
    title: "AI-Powered Enhancements",
    description:
      "Improve sketches with AI-powered suggestions, shape recognition, and auto-smoothing.",
    pro: 1,
  },
];

export const ServicesSection = () => {
  useEffect(() => {
    AOS.init({ duration: 800, once: true });
  }, []);

  return (
    <section id="services" className="container py-24 sm:py-32">
      <h2 className="text-lg text-primary text-center mb-2 tracking-wider" data-aos="fade-up">
        Services
      </h2>

      <h2 className="text-3xl md:text-4xl text-center font-bold mb-4" data-aos="fade-up" data-aos-delay="100">
        Grow Your Business
      </h2>

      <h3 className="md:w-1/2 mx-auto text-xl text-center text-muted-foreground mb-8" data-aos="fade-up" data-aos-delay="200">
        From marketing and sales to operations and strategy, we have the expertise to help you achieve your goals.
      </h3>

      <div className="grid sm:grid-cols-2 lg:grid-cols-2 gap-4 w-full lg:w-[60%] mx-auto">
        {serviceList.map(({ title, description, pro }, index) => (
          <Card
            key={title}
            className="bg-muted/60 dark:bg-card h-full relative"
            data-aos="fade-up"
            data-aos-delay={index * 100}
          >
            <CardHeader>
              <CardTitle>{title}</CardTitle>
              <CardDescription>{description}</CardDescription>
            </CardHeader>
            <Badge
              data-pro={ProService.YES === pro}
              variant="secondary"
              className="absolute -top-2 -right-3 data-[pro=false]:hidden"
            >
              PRO
            </Badge>
          </Card>
        ))}
      </div>
    </section>
  );
};
