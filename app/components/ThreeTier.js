"use client";
import { useState,useEffect } from "react";

const ThreeTier = ({
  subtitle = "Projects & Contributions",
  title = "Technology changes every day. I do my best to keep up.",
  items = []
}) => {


  useEffect(() => {
  }, []);
  
  return (
    <section className="py-4">
      <div className="container mx-auto px-4">
        <div className="flex flex-col">
          <p className="text-gray-500">{subtitle}</p>
          <h2 className="text-5xl font-regular mb-8 max-w-2xl mt-16">
            {title}
          </h2>
        </div>
        <div className="flex flex-col px-20">
          {items.map((item, index) => (
            <Item key={index} {...item} />
          ))}
        </div>
      </div>
    </section>
  );
};

const Item = ({ title, description }) => {
  const [image, setImage] = useState(
    "https://plus.unsplash.com/premium_photo-1675018587751-76c5626f5b33?q=80&w=3000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
  );
  return (
    <div className="flex flex-row mt-10">
      <img
        src={image}
        alt="Electric Car"
        className="w-1/3 mb-8 object-cover object-center rounded-xl"
        style={{
          height: "300px",
        }}
      />
      <div className="flex flex-col w-2/3 pl-8">
        <h2 className="text-4xl font-regular mb-8 w-1/2">{title}</h2>
        <p className="text-gray-500 pr-16">{description}</p>
      </div>
    </div>
  )
}

export default ThreeTier;
