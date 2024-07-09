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
      className="bg-black text-white pl-4 pr-2 py-2 rounded-full inline-flex items-center text-xl hover:bg-gray-800"
    >
      {text}
      <div className="ml-4 bg-white rounded-full p-2">
        <Icon icon="akar-icons:arrow-right" className="text-black text-xl" />
      </div>
    </a>
  );
};

export default Button;