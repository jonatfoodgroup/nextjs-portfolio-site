"use client";
import Button from "./components/Button";
import ThreeTier from "./components/ThreeTier";
import Timeline from "./components/Timeline";
import { Icon } from "@iconify/react/dist/iconify.js";
import LogoWall from "./components/LogoWall";
import Social from "./components/Social";

import projects from "./data/projects";
import history from "./data/work-history";
import logos from "./data/logos";
import social from "./data/social";

export default function Home() {
  return (
    <>
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <section className="flex flex-col md:flex-row md:justify-between md:items-start mb-16">
            <div className="md:w-2/3 mt-8 md:mt-0">
              <h2 className="text-6xl font-medium mb-2 leading-tight mt-10">
                Hey there! I&apos;m Jon Senterfitt.
                <br />
                I&apos;m a web designer and developer.
              </h2>
              <p className="text-2xl text-gray-500 leading-relaxed max-w-4xl">
                I&apos;m currently available for freelance work. I specialize in
                creating beautiful, responsive websites with a focus on
                performance and accessibility.
              </p>

              <div className="flex flex-col md:flex-row mt-10 space-x-2">
                <Button text="Get in touch" />
                <Button text="View Portfolio" />
              </div>

              <Social items={social} />
              
            </div>
          </section>
        </div>
      </section>
      <ThreeTier items={projects} />
      <Timeline items={history} />
      <LogoWall items={logos} />
    </>
  );
}
