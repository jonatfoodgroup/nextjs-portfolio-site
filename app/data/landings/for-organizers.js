"use client";
import { Icon } from "@iconify/react/dist/iconify.js";

const forOrganizers = {
    "meta": {
    "title": "MODAL | Partner with Us",
    "description": "Join MODAL to unlock new opportunities in group transportation. Access seamless booking, enhanced fleet utilization, and a growing network of clients and venues across the nation.",
},

"topbar": {
    "nav": [
        {
            "label": () => {
                return (
                    <span className="text-gray-500 flex items-center">
                        <Icon 
                        icon="bx:bx-log-in"
                        className="text-xl mr-2" />
                        Operator Login
                    </span>
                )
            },
            "url": "/login"
        },
        {
            "label": () => {
                return (
                    <span className="text-gray-500 flex items-center">
                        <Icon icon="bx:bx-phone-call" className="text-xl mr-2" />
                        Contact Us: 415.824.8888
                    </span>
                )
            },
            "url": "tel:14158248888"
        },
    ]
},

"header": {
    "company_name": "MODAL",
    "logo_url": "", // Add logo image for MODAL
    "nav": [
        {
            "label": "Operators",
            "url": "/operators"
        },
        {
            "label": "Venues",
            "url": "/venues"
        },
        {
            "label": "Technology",
            "url": "/technology"
        },
    ],
    "cta": {
        "label": "Partner with Us",
        "url": "/partner"
    }
},
    "hero": {
        "bg_image": "https://executivecoach.net/wp-content/uploads/2024/04/3-Buses-1.jpg.webp", // Use an image of luxury buses or motorcoaches in action
        "title": () => {
            return `Drive Your Business Forward with MODAL`
        },
        "description": "Join a network of trusted operators and access seamless booking, increased visibility, and unmatched support to scale your group transportation services.",
        "cta": {
            "label": "Get Started",
            "url": "/signup"
        }
    },
    "introduction": {
        "sectionTitle": "Why Partner with MODAL?",
        "headline": () => {
            return (
                <>
                    At MODAL, we simplify operations and bring new demand to your business. With our streamlined booking platform, operators can maximize fleet utilization, minimize downtime, and drive profitability.
                    <br />
                    <br />
                    <span
                        data-aos="fade-in"
                        data-aos-delay="200"
                        className="text-2xl text-gray-500">Experience more bookings, reduced admin time, and reliable support.</span>
                </>
            )
        },
        "cta": {
            "label": "Learn More",
            "url": "/why-modal"
        }
    },
    "feature_section": {
        "sectionTitle": "Built for Operators Like You",
        "headline": "Increase Bookings, Streamline Operations, and Boost Visibility",
        "features": [
            {
                "title": "Seamless Booking Integration",
                "description": "Our platform connects you directly with high-demand venues and clients, making it easy for them to book your services for events, corporate travel, and more.",
                "image": "https://modal.com/images/booking-integration.jpg",
            },
            {
                "title": "Fleet Optimization",
                "description": "Maximize fleet efficiency by reducing idle time and increasing utilization. Our tools help you match supply with demand to keep your vehicles moving.",
                "image": "https://modal.com/images/fleet-optimization.jpg",
            },
            {
                "title": "Real-Time Visibility & Tracking",
                "description": "Stay informed with real-time tracking and reporting features that give you full visibility over your fleet’s status and availability.",
                "image": "https://modal.com/images/tracking.jpg",
            }
        ]
    },
    "callout": {
        "bg_image": "https://modal.com/images/operator-callout-bg.jpg", // A background showing satisfied operators or luxury fleet in action
        "title": "Expand Your Reach with MODAL",
        "description": "Be part of a platform that drives growth for operators across the nation. Join MODAL today and unlock new opportunities in group transportation.",
        "cta": {
            "label": "Partner with MODAL",
            "url": "/partner"
        }
    },
    "get_started": {
        "image": "https://modal.com/images/get-started-operators.jpg", // An inviting image, like a driver preparing a luxury vehicle or an operator meeting with clients
        "title": "Ready to Grow Your Business?",
        "description": "Join MODAL and gain access to a growing network of venues and clients. Get started with a seamless setup process and dedicated support every step of the way.",
        "cta": {
            "label": "Book a Demo",
            "url": "/demo"
        }
    }
};

export default forOrganizers;