"use client";
import React, { useState, useEffect } from "react";
import { db } from "../../firebase/config";
import { ref, onValue } from "firebase/database";
import projects from "../../data/projects";
import { Icon } from "@iconify/react/dist/iconify.js";
import DataTable from "react-data-table-component";
import { Tooltip } from "react-tooltip";
import AOS from "aos";
import "aos/dist/aos.css";
import QRCode from "react-qr-code";

export default function ProposalPage({ params }) {
  const [proposal, setProposal] = useState({});
  const [proposalViews, setProposalViews] = useState(0);
  const [loading, setLoading] = useState(true);
  const [tocIsOpen, setTocIsOpen] = useState(false);
  const [drawerData, setDrawerData] = useState(null);
  const [version, setVersion] = useState("1.1");

  useEffect(() => {
    const dbRef = ref(db, `proposals/${params.id}`);
    onValue(dbRef, (snapshot) => {
      let prop = snapshot.val();
      prop.id = params.id;
      setProposal(prop);
      setLoading(false);
    });

    setProposalViews(proposalViews + 1);
  }, []);

  useEffect(() => {
    AOS.init();
    AOS.refresh();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!proposal) {
    return <div>Proposal not found</div>;
  }

  return (
    <div className="relative bg-gray-50 w-full min-h-screen">
      <div className="fixed top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 to-green-500"></div>

      <div className="fixed top-8 right-8">
        <QRCode value={window.location.href} size={48} />
      </div>
      <AccessControls />
      <div className="container mx-auto md:px-4 px-0">
        <section className="flex flex-col md:flex-row md:justify-between md:items-start mb-16 w-full">
          <div className="md:w-2/3 mt-8 md:mt-0 w-full">
            <h2 className="text-5xl font-medium mb-2 leading-tight md:mt-40 mt-20 md:text-6xl">
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
                {proposalViews === 1 ? "1 view" : `${proposalViews} views`}
              </p>
            </div>
          </div>
        </section>
      </div>

      <section id="Summary" className="py-16 bg-white" >
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row md:justify-between md:items-start mb-16">
            <div className="md:w-1/4 mt-8 md:mt-0">
              <h2 className="text-3xl font-medium mb-2 leading-tight">
                Summary
              </h2>
            </div>
            <div className="md:w-3/4 mt-8 md:mt-0">
              <p className="text-2xl text-gray-500 leading-relaxed max-w-4xl">
                KwikLok is embarking on a refinement journey for their current
                site and processes surrounding the site. With a sitemap spanning
                37 pages, the content and structure of the content is wonderful.
                With intentional changes in UX interactions and restructuring of
                the sitemap to better align with the intention of the
                experience, we believe Kwiklok could win with what they already
                have while having the option to expand the content program and
                e-commerce offering when ready without a major overhaul.
              </p>

              <div className="flex flex-col mt-8">
                <div className="flex md:flex-row md:space-x-4 flex-col">
                  <Item
                    title="Redesign site"
                    description="Redesign the site"
                    setDrawerData={setDrawerData}
                  />
                  <Item
                    title="Improve site performance"
                    description="Improve site performance"
                    setDrawerData={setDrawerData}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="Introduction" className="py-16 bg-white" >
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row md:justify-between md:items-start mb-16">
            <div className="md:w-1/4 mt-8 md:mt-0">
              <h2 className="text-3xl font-medium mb-2 leading-tight">
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
                      <a
                        href="https://www.linkedin.com/in/jonsenterfitt/"
                        target="_blank"
                        rel="noreferrer"
                        className="text-black"
                      >
                        <Icon
                          icon="akar-icons:linkedin-fill"
                          width="32"
                          height="32"
                        />
                      </a>
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
                      <a
                        href="https://www.linkedin.com/in/jonsenterfitt/"
                        target="_blank"
                        rel="noreferrer"
                        className="text-black"
                      >
                        <Icon
                          icon="akar-icons:linkedin-fill"
                          width="32"
                          height="32"
                        />
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="Goals" className="py-16 bg-white" >
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

      <section id="Scope" className="py-16 bg-white" >
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row md:justify-between md:items-start mb-16">
            <div className="md:w-1/4 mt-8 md:mt-0">
              <h2 className="text-3xl font-medium mb-2 leading-tight">
                Phases
              </h2>
            </div>
            <div className="md:w-3/4 mt-8 md:mt-0 flex flex-col space-y-12">
              <div className="flex flex-col md:w-2/3 w-full">
                <h3 className="text-2xl font-medium">Gather & Identify</h3>
                <h5 className="text-md font-medium">1-3 weeks</h5>
                <p className="text-gray-500">
                  We kick off by diving deep into your company, customers,
                  products, and competitors. We&apos;ll start with your
                  analytics to see what&apos;s working, what needs improvement,
                  and how we can enhance user experience and distribution
                  strategy.
                </p>
              </div>
              <div className="flex flex-col md:w-2/3 w-full">
                <h3 className="text-2xl font-medium">Gather & Identify</h3>
                <h5 className="text-md font-medium">1-3 weeks</h5>
                <p className="text-gray-500">
                  We kick off by diving deep into your company, customers,
                  products, and competitors. We&apos;ll start with your
                  analytics to see what&apos;s working, what needs improvement,
                  and how we can enhance user experience and distribution
                  strategy.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="Assumptions" className="py-16 bg-white" >
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row md:justify-between md:items-start mb-16">
            <div className="md:w-1/4 mt-8 md:mt-0">
              <h2 className="text-3xl font-medium mb-2 leading-tight">
                Assumptions
              </h2>
            </div>
            <div className="md:w-3/4 mt-8 md:mt-0">
              {/* an assumptions list */}
              <div className="flex flex-col">
                <ul className="text-2xl text-gray-500 leading-relaxed max-w-4xl">
                  <li>
                    <span className="font-bold text-black">Content:</span> All
                    content will be provided by KwikLok in a timely manner.
                  </li>
                  <li>
                    <span className="font-bold text-black">Images:</span> All
                    images will be provided by KwikLok in a timely manner.
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="Timeline" className="py-16 bg-white" >
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row md:justify-between md:items-start mb-16">
            <div className="md:w-1/4 mt-8 md:mt-0">
              <h2 className="text-3xl font-medium mb-2 leading-tight">
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

      <section id="Budget" className="py-16 bg-white" >
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row md:justify-between md:items-start mb-16">
            <div className="md:w-1/4 mt-8 md:mt-0">
              <h2 className="text-3xl font-medium mb-2 leading-tight">
                Budget
              </h2>
            </div>
            <div className="md:w-3/4 mt-8 md:mt-0">
              <Subheading title="Estimated Project Cost" />
              <BudgetTable />

              <div className="flex flex-col mt-8">
                <Subheading title="Payment Structure" />
                <p className="text-2xl text-gray-600 leading-relaxed">
                  To ensure smooth progress and commitment from both parties,
                  the payment structure will be as follows:
                </p>
                <ul className="text-2xl text-gray-500 leading-relaxed max-w-4xl ml-8 mt-8">
                  <li className="text-gray-500 mb-4">
                    <span className="font-bold text-black">
                      Initial Deposit:
                    </span>{" "}
                    A non-refundable deposit of 25% of the estimated total
                    project cost will be required upon signing the contract.
                    This secures the project start date and covers initial setup
                    and planning.
                  </li>
                  <li className="text-gray-500 mb-4">
                    <span className="font-bold text-black">
                      Bi-Weekly Billing
                    </span>
                    Invoices will be issued bi-weekly based on hours worked,
                    with detailed timesheets provided for transparency. Payments
                    are due within 14 days of invoice receipt.
                  </li>
                </ul>

                <Subheading title="Payment Terms" />
                <Subheading title="Adjustments & Scope Changes" />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section
        id="RelatedProjects"
        className="py-16 bg-white"
        
      >
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:justify-between md:items-start mb-16">
            <h2 className="text-3xl font-medium mb-2 leading-tight">
              Related Projects
            </h2>
            <div className="mt-8 md:mt-0 w-full">
              <div className="flex md:flex-row gap-8 flex-col">
                {/* limit to 2 projects */}
                {projects.slice(0, 3).map((project, index) => (
                  <Item
                    key={index}
                    {...project}
                    setDrawerData={setDrawerData}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="Signature" className="py-16 bg-white" >
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row md:justify-between md:items-start mb-16">
            <div className="md:w-1/4 mt-8 md:mt-0">
              <h2 className="text-3xl font-medium mb-2 leading-tight">
                Signature
              </h2>
            </div>
            <div className="md:w-2/3 mt-8 md:mt-0">
              <SignatureForm />
            </div>
          </div>
        </div>
      </section>

      <TableOfContents isOpen={tocIsOpen} setIsOpen={setTocIsOpen} />
      <Drawer data={drawerData} setDrawerData={setDrawerData} />
    </div>
  );
}

const AccessControls = () => {
  const handlePrint = () => {
    window.print();
  };
  return (
    <div className="flex flex-col mt-8 fixed bottom-0 left-0 p-4 w-full align-items justify-center z-50">
      <div className="flex gap-4 mx-auto bg-slate-50 p-4 rounded">
        <button
          className="bg-gray-100 text-gray-600 px-4 py-2 rounded hover:bg-gray-200"
          onClick={handlePrint}
          data-tooltip-id="Print"
          data-tooltip-place="top"
          data-tooltip-content={"Print"}
        >
          <Icon icon="ri:printer-line" width="24" height="24" />
          <Tooltip id="Print" place="top" />
        </button>
        {/* Share */}
        <button
          className="bg-gray-100 text-gray-600 px-4 py-2 rounded hover:bg-gray-200"
          data-tooltip-id="Share"
          data-tooltip-place="top"
          data-tooltip-content={"Share Access"}
        >
          <Icon icon="mdi:account-security-outline" width="24" height="24" />
          <Tooltip id="Share" place="top" />
        </button>

        {/* Request edit */}
        <button
          className="bg-gray-100 text-gray-600 px-4 py-2 rounded hover:bg-gray-200"
          data-tooltip-id="RequestEdit"
          data-tooltip-place="top"
          data-tooltip-content={"Request Edit"}
        >
          <Icon icon="mdi:account-edit-outline" width="24" height="24" />
          <Tooltip id="RequestEdit" place="top" />
        </button>

        {/* Comment */}
        <button
          className="bg-gray-100 text-gray-600 px-4 py-2 rounded hover:bg-gray-200"
          data-tooltip-id="Comment"
          data-tooltip-place="top"
          data-tooltip-content={"Comment"}
        >
          <Icon
            icon="mdi:comment-text-multiple-outline"
            width="24"
            height="24"
          />
          <Tooltip id="Comment" place="top" />
        </button>

        {/* Schedule a zoom */}
        <button
          className="bg-gray-100 text-gray-600 px-4 py-2 rounded hover:bg-gray-200"
          data-tooltip-id="Schedule"
          data-tooltip-place="top"
          data-tooltip-content={"Schedule a Zoom"}
        >
          <Icon icon="mdi:calendar-plus" width="24" height="24" />
          <Tooltip id="Schedule" place="top" />
        </button>
      </div>
    </div>
  );
};

const SignatureForm = () => {
  return (
    <form className="flex flex-col align-top justify-start bg-gray-100 p-8 space-y-2">
      <div className="grid grid-cols-2 gap-4">
        <div className="flex flex-col">
          <label className="text-lg font-semibold mb-0" htmlFor="name">
            Name
          </label>
          <input
            className="border border-gray-300 bg-white p-2 pl-4"
            type="text"
            id="name"
            placeholder="Your name"
            name="name"
          />
        </div>
        <div className="flex flex-col">
          <label className="text-lg font-semibold mb-0" htmlFor="signature">
            Signature
          </label>
          <input
            className="border border-gray-300 bg-white p-2 pl-4 mb-4"
            type="text"
            id="signature"
            placeholder="Your signature"
            name="signature"
          />
        </div>
      </div>
      <button
        className="bg-blue-500 text-white px-4 py-2 mt-4 text-center align-middle justify-center"
        type="submit"
      >
        Sign
      </button>
    </form>
  );
};

const Item = ({ title, description, setDrawerData }) => {
  const [image, setImage] = useState(
    "https://plus.unsplash.com/premium_photo-1675018587751-76c5626f5b33?q=80&w=3000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
  );
  return (
    <div
      className="flex flex-col mt-10 md:w-1/2 w-full"
      
      data-aos-delay="100"
    >
      <img
        src={image}
        alt="Electric Car"
        className="mb-8 object-cover object-center rounded-xl hover:shadow-lg hover:scale-105 transition-transform transform duration-200 cursor-pointer"
        style={{
          height: "300px",
        }}
        onClick={() => setDrawerData({ title, description })}
      />
      <div className="flex flex-col">
        <h2 className="text-3xl font-semibold mb-8">{title}</h2>
        <p className="text-gray-500 pr-16">{description}</p>
      </div>
    </div>
  );
};

const Drawer = ({ data = null, setDrawerData }) => {
  if (!data) {
    return null;
  }
  return (
    <div
      className="fixed top-0 right-0 h-full w-1/2 bg-white shadow-lg p-8"
      id="drawer"
    >
      <h2 className="text-3xl font-semibold">{data.title}</h2>
    </div>
  );
};

const TableOfContents = ({ isOpen, setIsOpen }) => {
  const [active, setActive] = useState(null);
  const data = [
    { title: "Summary", id: "Summary" },
    { title: "Introduction", id: "Introduction" },
    { title: "Goals", id: "Goals" },
    { title: "Scope", id: "Scope" },
    { title: "Assumptions", id: "Assumptions" },
    { title: "Timeline", id: "Timeline" },
    { title: "Budget", id: "Budget" },
    { title: "Related Projects", id: "RelatedProjects" },
    { title: "Signature", id: "Signature" },
  ];

  const handleClick = (id) => {
    const el = document.getElementById(id);
    el.scrollIntoView({ behavior: "smooth" });
  };

  // scrollspy
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      const el = data.find((item) => {
        const section = document.getElementById(item.id);
        if (!section) {
          return null;
        }
        const top = section.offsetTop;
        const bottom = top + section.offsetHeight;
        return scrollPosition >= top && scrollPosition < bottom;
      });

      if (el) {
        setActive(el.id);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <button
        className="fixed top-1 left-0 p-4 bg-gray-100 text-gray-600 px-4 py-2 rounded flex flex-row gap-4"
        onClick={() => setIsOpen(!isOpen)}
      >
        <Icon icon="mdi:table-of-contents" width="24" height="24" />
        Table of Contents
      </button>
      <div
        className={`fixed top-1 left-0 h-full md:w-1/4 bg-white shadow-lg w-full p-8 ${
          isOpen ? "block" : "hidden"
        }`}
      >
        <button
          className="bg-gray-100 text-gray-600 px-4 py-2 rounded"
          onClick={() => setIsOpen(false)}
        >
          Close
        </button>
        <h2 className="text-3xl font-semibold">Table of Contents</h2>
        <ul className="mt-8">
          {data.map((item, index) => (
            <li
              key={index}
              className={`text-lg cursor-pointer ${
                active === item.id
                  ? "text-blue-500 font-semibold"
                  : "text-gray-500"
              }`}
              onClick={() => handleClick(item.id)}
            >
              {item.title}
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};

const BudgetTable = () => {
  const data = [
    { item: "Redesign site", cost: "$10,000" },
    { item: "Improve site performance", cost: "$5,000" },
    { item: "Improve site accessibility", cost: "$2,000" },
  ];

  const columns = [
    {
      name: "Item",
      selector: "item",
      sortable: false,
    },
    {
      name: "Cost",
      selector: "cost",
      sortable: false,
    },
  ];

  return (
    <DataTable columns={columns} pagination highlightOnHover pointerOnHover />
  );
};

const Subheading = ({ title }) => {
  return <h2 className="text-3xl font-medium mb-4 leading-tight">{title}</h2>;
};
