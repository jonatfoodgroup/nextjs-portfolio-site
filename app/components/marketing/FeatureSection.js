"use client";
import React from "react";
import Link from "next/link";

const FeatureSection = ({
  content = null
}) => {
if (!content) return null;
return (
  <section className="py-4">
    <div className="container mx-auto px-4">
      <div className="flex flex-col">
        <p
          data-aos="fade-in"
          className="text-gray-500">{content.sectionTitle}</p>
        <h2
          data-aos="fade-in"
          data-aos-delay="200"
          className="text-5xl font-regular mb-8 max-w-2xl mt-16">{content.headline}</h2>
      </div>
      <div className="flex flex-col px-20">
        {content.features.map((feature, index) => (
          <Feature key={index} title={feature.title} description={feature.description} image={feature.image} index={index} cta={feature.cta} />
        ))}
      </div>
    </div>
  </section>
)
}

const Feature = ({ title, description, image, index, cta = null }) => {
  return (
    <div className="flex flex-row mt-10" data-aos="fade-in" data-aos-delay={(index + 1) * 50}>
      <img
        src={image}
        alt="" className="w-1/3 mb-8 object-cover object-center rounded-xl" style={{ height: "300px" }} />
      <div className="flex flex-col w-2/3 pl-8">
        <h2 className="text-3xl font-semibold mb-4 w-3/4 mt-4">{title}</h2>
        <p className="text-gray-500 pr-16">{description}</p>
        {
          cta ? (
            <Link href={cta.url} className="text-blue-500 hover:text-blue-700 mt-4">{cta.label}
            </Link>
          ) : null
        }
      </div>
    </div>
  )
}

export default FeatureSection;