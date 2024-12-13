"use client";
import React, {useState} from "react";

let content = {
  title: "KwikLok Website & Integration Enhancement Strategy",
  subtitle: "Subtitle information goes here",
  version: "1.1",
  status: "Awaiting Approval",
}

const Header = ({
    proposal
}) => {

    return (
        <section className="flex flex-col md:flex-row md:justify-between md:items-start mb-16 w-full">
          <div className="md:w-3/4 w-full md:mt-40 mt-20 ">

            <h2 className="text-5xl font-medium mb-2 leading-tight md:text-6xl text-text">
              {content.title}
            </h2>

            <h5 className="text-2xl font-light text-gray-500 leading-relaxed max-w-4xl">
              {content.subtitle}
            </h5>

            <div className="flex flex-col md:flex-row mt-3 space-x-4">
              <p className="text-lg text-gray-500 leading-relaxed max-w-4xl">
                Prepared for KwikLok by Jon Senterfitt
              </p>
              <p className="text-lg text-gray-500 leading-relaxed max-w-4xl">
                Version: {content.version}
              </p>
            </div>

            <div className="flex flex-col md:flex-row mt-3">
              <p className="text-lg text-gray-500 leading-relaxed max-w-4xl">
                Last updated: {proposal.updatedAt} - Status: {content.status}
              </p>
            </div>

            {/* <div className="flex flex-col md:flex-row mt-3">
              <p className="text-lg text-gray-500 leading-relaxed max-w-4xl">
                {proposalViews === 1 ? "1 view" : `${proposalViews} views`}
              </p>
            </div> */}
          </div>
        </section>
    )
}

export default Header;