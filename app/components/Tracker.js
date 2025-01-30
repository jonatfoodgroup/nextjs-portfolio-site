"use client";
import React from "react";
import { Icon } from "@iconify/react/dist/iconify.js";

const StepsTracker = ({ steps, currentStep }) => {
  return (
    <div className="w-full p-6 bg-gray-900 rounded-xl shadow">
      <div className="flex justify-between items-center">
        {steps.map((step, index) => (
          <div key={index} className="flex flex-col items-center w-full">
            <div
              className={`w-12 h-12 flex items-center justify-center rounded-full ${
                index < currentStep
                  ? "bg-green-600 text-white"
                  : index === currentStep
                  ? "bg-blue-600 text-white"
                  : "bg-gray-800 text-white"
              }`}
            >
              <Icon icon={step.icon} className="text-xl" />
            </div>
            <div className="mt-2 text-center">
              <p
                className={`text-sm font-semibold ${
                  index <= currentStep ? "text-white" : "text-gray-400"
                }`}
              >
                {step.title}
              </p>
              {/* <p className="text-xs text-gray-500">{step.description}</p> */}
            </div>
            {index < steps.length - 1 && (
              <div className="flex-grow h-1 bg-gray-800 mx-2"></div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default StepsTracker;