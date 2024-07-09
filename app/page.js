import Image from "next/image";
import ThreeTier from "./components/ThreeTier";

export default function Home() {
  return (
    <>
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <section className="flex flex-col md:flex-row md:justify-between md:items-start mb-16">
            <div className="md:w-2/3 mt-8 md:mt-0">
              <h2 className="text-5xl font-regular mb-2 leading-tight mt-20">
                Hey there! I'm Jon Senterfitt.<br />
                I'm a web designer and developer.
              </h2>
              <p className="text-xl text-gray-500 leading-relaxed max-w-lg">
                I'm currently available for freelance work. I specialize in
                creating beautiful, responsive websites with a focus on
                performance and accessibility.
              </p>
              <a
                href="#"
                className="bg-black text-white pl-4 pr-2 py-2 mt-10 rounded-full inline-flex items-center text-xl"
              >
                Get in touch
                <div className="ml-4 bg-white rounded-full">
                  <svg
                    className="w-6 h-6 text-black"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M9 5l7 7-7 7"
                    ></path>
                  </svg>
                </div>
              </a>
            </div>
          </section>
        </div>
      </section>
      <ThreeTier />
    </>
  );
}
