"use client";
import React, { useEffect, useRef } from "react";
import * as THREE from "three";
import services from "../data/services";
import articles from "../data/articles";


export default function FancyMasthead() {
    let sitemapData = [
        { id: "Home", links: ["What We Do", "What We Think", "Who We Are"] },
        { id: "What We Do", links: [] },
        { id: "What We Think", links: ["Service1", "Service2"] },
        { id: "Who We Are", links: ["Post1", "Post2"] },
    ];

    //   add services to sitemapData
    services.forEach(service => {
        sitemapData.push({ id: service.title, links: [] });
    });

    //   add articles to sitemapData
    articles.forEach(article => {
        sitemapData.push({ id: article.title, links: [] });
    });

    // update what we do links to have the services
    sitemapData.find(page => page.id === "What We Do").links = services.map(service => service.title);

    // update what we think links to have the articles
    sitemapData.find(page => page.id === "What We Think").links = articles.map(article => article.title);

    // add links to AI Strategy & Implementation in What We Do to the articles
    sitemapData.find(page => page.id === "AI Strategy & Implementation").links = articles.map(article => article.title);


    return (
        <div
            className="relative"
            style={{
                paddingTop: "4rem",
                height: "50vh",
                width: "100%",
                overflow: "hidden",
                backgroundColor: "#000",
            }}
        >
            {/* <TestComponent /> */}
            <video widscth="100&" height="100vh" controls preload="auto" autoPlay loop muted style={{ objectFit: "cover", width: "100%", height: "100%" }}>
                <source src="/masthead.mp4" type="video/mp4" />
            </video>
            <div className="bg-overlay" style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%", background: "rgba(0, 0, 0, .4)" }}>
            </div>
        </div>
    );
}