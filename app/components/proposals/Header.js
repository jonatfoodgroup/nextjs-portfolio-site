"use client";
import React, {useState} from "react";

const Header = ({
    proposal
}) => {
    const [version, setVersion] = useState("1.1");

    return (
        <section className="flex flex-col md:flex-row md:justify-between md:items-start mb-16 w-full">
          <div className="md:w-2/3 w-full md:mt-40 mt-20 ">

            <h2 className="text-5xl font-medium mb-2 leading-tight md:text-6xl">
              KwikLok Website & Integration Enhancement Strategy
            </h2>

            <h5 className="text-2xl font-light text-gray-500 leading-relaxed max-w-4xl">
              Subtitle information goes here
            </h5>

            <div className="flex flex-col md:flex-row mt-3 space-x-4">
              <p className="text-lg text-gray-500 leading-relaxed max-w-4xl">
                Prepared for KwikLok by Jon Senterfitt
              </p>
              <p className="text-lg text-gray-500 leading-relaxed max-w-4xl">
                Version: {version}
              </p>
            </div>

            <div className="flex flex-col md:flex-row mt-3">
              <p className="text-lg text-gray-500 leading-relaxed max-w-4xl">
                Last updated: {proposal.updatedAt} - Status: Awaiting Approval
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