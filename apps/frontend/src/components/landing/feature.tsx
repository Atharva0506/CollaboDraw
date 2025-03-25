"use client";
import { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import { Card, CardContent, CardHeader, CardTitle } from "@repo/ui";
import { Icon } from "@repo/ui";
import { icons } from "lucide-react";

interface FeaturesProps {
  icon: string;
  title: string;
  description: string;
}

const featureList: FeaturesProps[] = [
  {
    icon: "Pencil",
    title: "Real-time Collaboration",
    description: "Draw and brainstorm with your team live, with seamless sync across devices.",
  },
  {
    icon: "Layers",
    title: "Multi-Layer Editing",
    description: "Organize your sketches with layers for better structure and flexibility.",
  },
  {
    icon: "Cloud",
    title: "Cloud Storage",
    description: "Access and save your drawings securely in the cloud anytime, anywhere.",
  },
  {
    icon: "Users",
    title: "Team Sharing",
    description: "Invite collaborators and work together with easy sharing options.",
  },
  {
    icon: "Paintbrush",
    title: "Advanced Drawing Tools",
    description: "Use a variety of brushes, colors, and shapes to bring your ideas to life.",
  },
  {
    icon: "Lock",
    title: "Secure & Private",
    description: "Control access to your boards with secure permissions and encryption.",
  },
];

export const FeaturesSection = () => {
  useEffect(() => {
    AOS.init({ duration: 800, once: true });
  }, []);

  return (
    <section id="features" className="container py-24 sm:py-32">
      <h2 className="text-lg text-primary text-center mb-2 tracking-wider" data-aos="fade-up">
        Features
      </h2>

      <h2 className="text-3xl md:text-4xl text-center font-bold mb-4" data-aos="fade-up" data-aos-delay="100">
        What Makes Us Different
      </h2>

      <h3 className="md:w-1/2 mx-auto text-xl text-center text-muted-foreground mb-8" data-aos="fade-up" data-aos-delay="200">
        Whiteboards that allow you to collaborate with your team in real-time, with seamless sync across devices.
      </h3>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {featureList.map(({ icon, title, description }, index) => (
          <div key={title} data-aos="zoom-in" data-aos-delay={index * 100}>
            <Card className="h-full bg-background border-0 shadow-none">
              <CardHeader className="flex justify-center items-center">
                <div className="bg-primary/20 p-2 rounded-full ring-8 ring-primary/10 mb-4">
                  <Icon
                    name={icon as keyof typeof icons}
                    size={24}
                    color="hsl(var(--primary))"
                    className="text-primary"
                  />
                </div>

                <CardTitle>{title}</CardTitle>
              </CardHeader>

              <CardContent className="text-muted-foreground text-center">
                {description}
              </CardContent>
            </Card>
          </div>
        ))}
      </div>
    </section>
  );
};
