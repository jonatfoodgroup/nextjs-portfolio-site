"use client";
import React, { useState } from "react";
import { useDrawer } from "../../providers/DrawerProvider";
const Item = ({ title, description }) => {
    const { setDrawerData } = useDrawer();
    const [image, setImage] = useState(
      "https://plus.unsplash.com/premium_photo-1675018587751-76c5626f5b33?q=80&w=3000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
    );
    return (
      <div className="flex flex-col mt-10 md:w-1/2 w-full" data-aos-delay="100">
        <div className="relative">
          <img
            src={image}
            alt="Electric Car"
            className="mb-4 object-cover w-full object-center rounded-xl hover:shadow-lg hover:scale-105 transition-transform transform duration-200 cursor-pointer h-[200px]"
            onClick={() => setDrawerData({ title, description })}
          />
        </div>
        <div className="flex flex-col">
          <h2 className="text-2xl font-semibold mb-8 text-text">{title}</h2>
          <p className="text-gray-500 pr-16">{description}</p>
        </div>
      </div>
    );
  };
  
    export default Item;