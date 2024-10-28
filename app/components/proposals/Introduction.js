"use client";
import React from "react";

const Introduction = () => {
    return (
        <section id="Introduction" className="py-16">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row md:justify-between md:items-start mb-16">
            <div className="md:w-1/4 mt-8 md:mt-0">
              <h2 className="text-3xl font-medium mb-2 leading-tight text-foreground">
                Introduction
              </h2>
            </div>
            <div className="md:w-3/4 mt-8 md:mt-0 w-full">
              {/* Avatar large */}
              <div className="flex flex-row gap-12">
                <div className="flex md:flex-row gap-4 flex-col">
                  <img
                    src="https://cdn.theorg.com/45fd5607-18f0-437b-a652-d790c63c5b2a_thumb.jpg"
                    alt="Jon Senterfitt"
                    className="rounded-full w-32 h-32"
                  />
                  <div className="flex flex-col">
                    <h3 className="text-2xl font-medium">Jon Senterfitt</h3>
                    <h5 className="text-md font-medium">
                      Lead Strategist & Developer
                    </h5>
                    <div className="flex flex-row gap-4 mt-2">
                      
                    </div>
                  </div>
                </div>
                <div className="flex md:flex-row gap-4 flex-col">
                  <img
                    src="https://media.licdn.com/dms/image/C5603AQFzo4mfy2jQyg/profile-displayphoto-shrink_200_200/0/1517491655088?e=2147483647&v=beta&t=iP0KxdowUnv-uFfcsvpH8BeSIjKt9bbmZ8_BOj1TVSk"
                    alt="Jon Senterfitt"
                    className="rounded-full w-32 h-32"
                  />
                  <div className="flex flex-col">
                    <h3 className="text-2xl font-medium">Les Voss</h3>
                    <h5 className="text-md font-medium">Creative Director</h5>
                    <div className="flex flex-row gap-4 mt-2">
                      
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    )
}

export default Introduction;