"use client";
import { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import { Badge, Button } from "@repo/ui";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

export const HeroSection = () => {
  useEffect(() => {
    AOS.init({ duration: 1000 });
  }, []);

  return (
    <section className="container w-full">
      <div
        className="grid place-items-center lg:max-w-screen-xl gap-8 mx-auto py-20 md:py-32"
        data-aos="fade-up"
      >
        <div className="text-center space-y-8">
          <Badge variant="outline" className="text-sm py-2" data-aos="zoom-in">
            <span className="mr-2 text-primary">
              <Badge> Real-Time </Badge>
            </span>
            <span> Collaboration & Creativity </span>
          </Badge>

          <div
            className="max-w-screen-md mx-auto text-center text-4xl md:text-6xl font-bold"
            data-aos="fade-up"
          >
            <h1>
              Seamless{" "}
              <span className="text-transparent px-2 bg-gradient-to-r from-[#D247BF] to-primary bg-clip-text">
                Real-Time
              </span>
              Collaboration
            </h1>
          </div>

          <p
            className="max-w-screen-sm mx-auto text-xl text-muted-foreground"
            data-aos="fade-up"
          >
            {`An interactive, real-time whiteboard where teams collaborate effortlessly—sketch, plan, and brainstorm together!`}
          </p>

          <div className="space-y-4 md:space-y-0 md:space-x-4" data-aos="zoom-in">
            <Link href="/signup">
              <Button className="w-5/6 md:w-1/4 font-bold group/arrow">
                Get Started
                <ArrowRight className="size-5 ml-2 group-hover/arrow:translate-x-1 transition-transform" />
              </Button>
            </Link>

            <Button
              asChild
              variant="secondary"
              className="w-5/6 md:w-1/4 font-bold"
            >
              <Link
                href="https://github.com/Atharva0506/CollaboDraw"
                target="_blank"
              >
                Github Repository
              </Link>
            </Button>
          </div>
        </div>

        <div className="relative group mt-14" data-aos="fade-up">
          <div className="absolute animate-gradient-move top-2 lg:-top-8 left-1/2 transform -translate-x-1/2 w-[90%] mx-auto h-24 lg:h-80 bg-primary/50 rounded-full blur-3xl"></div>
          <video
            width={1200}
            height={1200}
            className="w-full md:w-[1200px] mx-auto rounded-lg relative leading-none flex items-center border border-t-2 border-secondary border-t-primary/30"
            autoPlay
            loop
            muted
          >
            <source src="/Demo-vid.mp4" type="video/mp4" />
          </video>

          <div className="absolute bottom-0 left-0 w-full h-20 md:h-28 bg-gradient-to-b from-background/0 via-background/50 to-background rounded-lg"></div>
        </div>
      </div>
    </section>
  );
};
