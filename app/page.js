"use client";
import Button from "./components/Button";
import ThreeTier from "./components/ThreeTier";
import Timeline from "./components/Timeline";
import { Icon } from "@iconify/react/dist/iconify.js";

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

              <div className="flex flex-col md:flex-row mt-10 space-x-4">
                {/* use icons and add facebook, linkedin, instagram, and discord icons */}
                <a
                  href="#"
                  className="text-2xl text-gray-500 hover:text-gray-700"
                >
                  <Icon icon="akar-icons:facebook-fill" />
                </a>
                <a
                  href="#"
                  className="text-2xl text-gray-500 hover:text-gray-700"
                >
                  <Icon icon="akar-icons:linkedin-fill" />
                </a>
                <a
                  href="#"
                  className="text-2xl text-gray-500 hover:text-gray-700"
                >
                  <Icon icon="akar-icons:instagram-fill" />
                </a>
                <a
                  href="#"
                  className="text-2xl text-gray-500 hover:text-gray-700"
                >
                  <Icon icon="akar-icons:discord-fill" />
                </a>
              </div>
            </div>
          </section>
        </div>
      </section>
      <ThreeTier />
      <Timeline />
    </>
  );
}
