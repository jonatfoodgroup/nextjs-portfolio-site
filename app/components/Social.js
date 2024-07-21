"use client";
import { Icon } from "@iconify/react/dist/iconify.js";

const Social = ({ items = [] }) => {
  return (
    <div className="flex flex-col md:flex-row mt-10 space-x-4">
      {items.map((item, index) => (
        <Item key={index} {...item} />
      ))}
    </div>
  );
};

const Item = ({
  icon = "akar-icons:facebook-fill",
  link = "#"
}) => {
  return (
    <a href={link} className="text-2xl text-gray-500 hover:text-gray-700">
      <Icon icon={icon} />
    </a>
  );
}
export default Social;
