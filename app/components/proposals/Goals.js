"use client";
import React from "react";

const Goals = () => {
    return (
        <section id="Goals" className="py-16">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row md:justify-between md:items-start mb-16">
            <div className="md:w-1/4 mt-8 md:mt-0">
              <h2 className="text-3xl font-medium mb-2 leading-tight">Goals</h2>
            </div>
            <div className="md:w-3/4 mt-8 md:mt-0">
              <div className="grid md:grid-cols-2 gap-8 grid-cols-1">
                <div className="flex flex-col">
                  <h3 className="text-2xl font-medium">Redesign site</h3>
                  <p className="text-gray-500">
                    Redesign the site to improve the user experience and
                    accessibility.
                  </p>
                </div>
                <div className="flex flex-col">
                  <h3 className="text-2xl font-medium">
                    Improve site performance
                  </h3>
                  <p className="text-gray-500">
                    Improve site performance to increase user engagement and
                    search engine ranking.
                  </p>
                </div>
                <div className="flex flex-col">
                  <h3 className="text-2xl font-medium">
                    Improve site performance
                  </h3>
                  <p className="text-gray-500">
                    Improve site performance to increase user engagement and
                    search engine ranking.
                  </p>
                </div>
                <div className="flex flex-col">
                  <h3 className="text-2xl font-medium">
                    Improve site performance
                  </h3>
                  <p className="text-gray-500">
                    Improve site performance to increase user engagement and
                    search engine ranking.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    )
}

export default Goals;