import React from "react";
import PropTypes from "prop-types";
import { Icon } from "@iconify/react/dist/iconify.js";

const Button = ({ children, onClick, variant = "outline", size = "sm", disabled = false, icon, width }) => {
  const baseStyles =
    "relative inline-flex items-center justify-center font-bold rounded-lg transition-all focus:outline-none focus:ring-2 focus:ring-offset-2 space-x-0 shadow-lg   transform hover:scale-105 active:scale-95";

  const variants = {
    primary: "bg-blue-500 text-white hover:bg-blue-600 focus:ring-blue-500 shadow-[0_0_15px_rgba(0,140,255,0.7)] hover:shadow-[0_0_25px_rgba(0,140,255,1)]",
    secondary: "bg-gray-500 text-white hover:bg-gray-600 focus:ring-gray-500 shadow-[0_0_15px_rgba(120,120,120,0.7)] hover:shadow-[0_0_25px_rgba(120,120,120,1)]",
    danger: "bg-red-500 text-white hover:bg-red-600 focus:ring-red-500 shadow-[0_0_15px_rgba(255,0,0,0.7)] hover:shadow-[0_0_25px_rgba(255,0,0,1)]",
    success: "bg-green-500 text-white hover:bg-green-600 focus:ring-green-500 shadow-[0_0_15px_rgba(0,255,0,0.7)] hover:shadow-[0_0_25px_rgba(0,255,0,1)]",
    outline: "bg-transparent border border-gray-700 text-gray-400 hover:bg-gray-800 focus:ring-gray-500 hover:text-white shadow-[0_0_15px_rgba(255,255,255,0.2)] hover:shadow-[0_0_25px_rgba(255,255,255,0.4)]",
  };

  const sizes = {
    sm: "text-sm px-4 py-2",
    md: "text-base px-6 py-3",
    lg: "text-lg px-8 py-4 text-xl",
  };

  const disabledStyles = "opacity-50 cursor-not-allowed hover:scale-100 hover:shadow-none";

  return (
    <button
      onClick={onClick}
      className={`${baseStyles} ${variants[variant]} ${sizes[size]} shiny-button ${
        disabled ? disabledStyles : ""
            }      }`}
      disabled={disabled}
    >
      <span className="shiny-effect"></span>
      {icon && <Icon icon={icon} className="text-2xl mr-2 animate-pulse" />}
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
  icon: PropTypes.string,
};

export default Button;