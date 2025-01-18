import React from "react";
import PropTypes from "prop-types";
import { Icon } from "@iconify/react/dist/iconify.js";

const Button = ({ children, onClick, variant = "outline", size = "sm", disabled = false, icon}) => {
  const baseStyles =
    "inline-flex items-center justify-center font-regular rounded transition-shadow focus:outline-none focus:ring-2 focus:ring-offset-2 space-x-1";

  const variants = {
    primary: "bg-blue-500 text-white hover:bg-blue-600 focus:ring-blue-500",
    secondary: "bg-gray-500 text-white hover:bg-gray-600 focus:ring-gray-500",
    danger: "bg-red-500 text-white hover:bg-red-600 focus:ring-red-500",
    success: "bg-green-500 text-white hover:bg-green-600 focus:ring-green-500",
    outline: "bg-transparent border border-gray-700 text-gray-400 hover:bg-gray-800 focus:ring-gray-500",
  };

  const sizes = {
    sm: "text-sm px-3 py-2",
    md: "text-base px-4 py-2",
    lg: "text-lg px-6 py-3",
  };

  const disabledStyles = "opacity-50 cursor-not-allowed";

  return (
    <button
      onClick={onClick}
      className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${
        disabled ? disabledStyles : ""
      }`}
      disabled={disabled}
    >
      {
        icon && <Icon icon={icon} className="mr-1" />
      }
      {children}
    </button>
  );
};

Button.propTypes = {
  children: PropTypes.node.isRequired,
  onClick: PropTypes.func,
  variant: PropTypes.oneOf(["primary", "secondary", "danger", "success", "outline"]),
  size: PropTypes.oneOf(["sm", "md", "lg"]),
  disabled: PropTypes.bool,
};

export default Button;