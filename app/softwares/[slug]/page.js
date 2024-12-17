"use client";
import React, { useEffect, useState } from 'react';
import softwares from '../../data/softwares';
import Header from '../../components/Header';
import Footer from '../../components/marketing/Footer';

const SoftwarePage = ({ params }) => {
    const [software, setSoftware] = useState(null);

    useEffect(() => {
        const slug = params.slug;
        const software = softwares.find((software) => software.slug === slug);
        setSoftware(software);
    }, [params]);

    if (!software) {
        return <div>Software not found</div>;
    }

    return (
        <>
        <Header />
        <div className="container mx-auto inner-container pt-24">
            <h1 className="text-4xl font-bold text-text">{software.title}</h1>
            <p className="text-text mt-4">{software.description}</p>
            {
                software.features &&
                software.features.reduce((acc, feature) => {
                    const areaIndex = acc.findIndex(item => item.area === feature.area);
                    if (areaIndex === -1) {
                        acc.push({ area: feature.area, features: [{ title: feature.feature, description: feature.purpose }] });
                    } else {
                        acc[areaIndex].features.push({ title: feature.feature, description: feature.purpose });
                    }
                    return acc;
                }, []).map((section, index) => (
                    <div key={index} className="mt-8">
                        <h2 className="text-2xl font-bold text-text">{section.area}</h2>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
                            {section.features.map((feature, idx) => (
                                <div key={idx} className="p-4 bg-gray-100 rounded-md">
                                    <h3 className="text-lg font-bold text-text">{feature.title}</h3>
                                    <p className="text-text">{feature.description}</p>

                                </div>
                            ))}
                        </div>
                    </div>
                ))
            }
        </div>
        <Footer />
        </>
    );
}

export default SoftwarePage;