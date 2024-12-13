"use client";
import { Icon } from "@iconify/react/dist/iconify.js";

const forVenues = {
    "meta": {
        "title": "MODAL | Partner with Us for Seamless Venue Transportation",
        "description": "Enhance your guest experience with MODAL's streamlined group transportation solutions. Join a network of trusted venues and elevate convenience and service quality for your guests.",
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
                            Venue Partner Login
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
        "logo_url": "", // Replace with MODAL logo
        "nav": [
            {
                "label": "For Venues",
                "url": "/venues"
            },
            {
                "label": "Operators",
                "url": "/operators"
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
        "bg_image": "https://modal.com/images/venue-partners-hero.jpg", // Use an image that represents a luxury venue or event setting with transportation services
        "title": () => {
            return `Elevate Your Guest Experience with MODAL`
        },
        "description": "MODAL provides seamless group transportation solutions tailored to your venue's needs. Enhance convenience and satisfaction for your guests with MODAL's reliable, luxury fleet and streamlined booking system.",
        "cta": {
            "label": "Learn More",
            "url": "/learn-more"
        }
    },
    "introduction": {
        "sectionTitle": "Why Partner with MODAL?",
        "headline": () => {
            return (
                <>
                    Make transportation easy and elegant for your guests. With MODAL, your venue gains access to a comprehensive platform designed to simplify bookings, improve operational flow, and enhance the overall experience for your clients.
                    <br />
                    <br />
                    <span
                        data-aos="fade-in"
                        data-aos-delay="200"
                        className="text-2xl text-gray-500">Deliver a seamless, high-touch experience from start to finish.</span>
                </>
            )
        },
        "cta": {
            "label": "Explore Benefits",
            "url": "/benefits"
        }
    },
    "feature_section": {
        "sectionTitle": "The MODAL Advantage for Venues",
        "headline": "Streamlined Bookings, Enhanced Guest Experience, and Reliable Service",
        "features": [
            {
                "title": "Effortless Integration",
                "description": "Our platform easily integrates with your venue’s systems, making it simple for guests to book luxury transportation directly through your website or concierge services.",
                "image": "https://modal.com/images/effortless-integration.jpg",
            },
            {
                "title": "On-Demand Fleet Availability",
                "description": "Ensure reliable, punctual service with access to MODAL’s premium fleet of vehicles. We work to provide your guests with a luxurious and seamless transportation experience.",
                "image": "https://modal.com/images/fleet-availability.jpg",
            },
            {
                "title": "Personalized Support",
                "description": "Our team is dedicated to helping your venue deliver an exceptional transportation experience. From custom setup to on-call support, MODAL is with you every step of the way.",
                "image": "https://modal.com/images/personalized-support.jpg",
            }
        ]
    },
    "callout": {
        "bg_image": "https://modal.com/images/venue-callout-bg.jpg", // Use an elegant background, such as a luxury hotel lobby or event setting
        "title": "Transform Your Venue's Transportation",
        "description": "Join MODAL’s network and bring premium transportation services to your venue. Partner with us to offer your guests a superior travel experience and enhance your venue's reputation for exceptional service.",
        "cta": {
            "label": "Become a Partner",
            "url": "/partner"
        }
    },
    "get_started": {
        "image": "https://modal.com/images/get-started-venues.jpg", // Use an image showing a concierge assisting guests or a luxury car arriving at a venue
        "title": "Ready to Enhance Your Guest Experience?",
        "description": "Partner with MODAL to offer a seamless, luxury transportation solution for your guests. Our team is here to help you get set up and provide ongoing support to ensure success.",
        "cta": {
            "label": "Get in Touch",
            "url": "/contact"
        }
    }
}

export default forVenues;