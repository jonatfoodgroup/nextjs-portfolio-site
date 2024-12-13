"use client";
import React from "react";

const Timeline = () => {
    return (
        <section id="Timeline" className="py-16">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row md:justify-between md:items-start mb-16">
            <div className="md:w-1/4 mt-8 md:mt-0">
              <h2 className="text-3xl font-medium mb-2 leading-tight text-text">
                Timeline
              </h2>
            </div>
            <div className="md:w-3/4 mt-8 md:mt-0">
              <ul className="text-2xl text-gray-500 leading-relaxed max-w-4xl">
                <li>Redesign site</li>
                <li>Improve site performance</li>
                <li>Improve site accessibility</li>
              </ul>
            </div>
          </div>
        </div>
      </section>
    )
}

export default Timeline;