"use client";
import React, { useState, useEffect } from "react";
import { db } from "../../firebase/config";
import { ref, onValue } from "firebase/database";
import { Icon } from "@iconify/react/dist/iconify.js";
import Tabs from "../../components/Tabs";
import QRCode from "react-qr-code";

export default function ProjectPage({ params }) {
  const [tab, setTab] = useState("overview");
  const [milestones, setMilestones] = useState([]);
  const [invoices, setInvoices] = useState([]);
  return (
    <div>
      <PageTitle title="Project Name" />
      <Tabs
        options={["overview", "invoices", "payments", "settings"]}
        tab={tab}
        setTab={setTab}
      />
      {tab === "invoices" && <Invoices />}
      {tab === "overview" && <Overview />}
      {tab === "payments" && <Payments />}
    </div>
  );
}

const Roadmap = () => {
  return (
    <div className="border border-gray-200 p-4">
      <h2 className="text-2xl font-bold">Roadmap</h2>
      <Sprints />
    </div>
  );
};

const Ideas = () => {
  return (
    <div>
      <h2 className="text-2xl font-bold">Ideas</h2>
    </div>
  );
};

const Invoices = () => {
  let [invoices, setInvoices] = useState([]);

  return <div></div>;
};

const Sprints = () => {
  let [sprints, setSprints] = useState([]);

  return (
    <div>
      <h3 className="text-xl font-regular">Sprints</h3>
    </div>
  );
};

const Updates = () => {
  return (
    <div>
      <h2 className="text-2xl font-bold">Updates</h2>
    </div>
  );
};

const Overview = () => {
  return (
    <div className="">
      <div className="flex align-top space-x-4">
        <div className="flex flex-col w-2/3">
          <Roadmap />
        </div>
        <div className="flex flex-col">
          <Updates />
          <Ideas />
          <Payments />
          <Invoices />
          <Team />
        </div>
      </div>
    </div>
  );
};

const PageTitle = ({ title }) => {
  return (
    <div className="flex justify-between items-center">
      <h1 className="text-2xl font-bold">{title}</h1>
      <div className="flex space-x-4">
        <button className="bg-blue-500 text-white p-2 rounded">
          <Icon icon="akar-icons:download" className="text-white" />
        </button>
        <button className="bg-blue-500 text-white p-2 rounded">
          <Icon icon="akar-icons:download" className="text-white" />
        </button>
        <button className="bg-blue-500 text-white p-2 rounded">
          <Icon icon="akar-icons:download" className="text-white" />
        </button>
      </div>
    </div>
  );
};

const Team = () => {
  return (
    <div>
      <h3 className="text-xl font-regular">Team</h3>
    </div>
  );
};

const Payments = () => {
  let [payments, setPayments] = useState([]);

  return (
    <div>
      <h3 className="text-xl font-regular">Payments</h3>
    </div>
  )
};

const ProjectSettings = () => {
  return (
    <div>
      <h2 className="text-2xl font-bold">Settings</h2>
    </div>
  );
}