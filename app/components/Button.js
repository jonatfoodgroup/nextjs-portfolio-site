"use client";
import { Icon } from "@iconify/react/dist/iconify.js";

const Button = ({
  text = "Get in touch",
  size = "md",
  type = "primary",
}) => {
  return (
    <a
      href="#"
      className="bg-black text-white pl-4 pr-2 py-2 rounded-full inline-flex items-center text-md hover:bg-gray-800"
    >
      {text}
      <div className="ml-2 bg-white rounded-full p-1">
        <Icon icon="akar-icons:arrow-right" className="text-black text-md" />
      </div>
    </a>
  );
};

export default Button;