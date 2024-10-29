"use client";
import { Icon } from "@iconify/react/dist/iconify.js";

let luxor = {
    "meta": {
        "title": "Luxor Executive Car Service",
        "description": "Experience unmatched reliability and sophistication with Luxor Executive Car Service. Whether for business or pleasure, our fleet and expert chauffeurs deliver unparalleled comfort and style.",
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
                            Member Login
                        </span>
                    )
                },
                "url": "/login"
            },{
            "label": () => {
                 return (
                    <span className="text-gray-500 flex items-center">
                        <Icon icon="bx:bx-phone-call" className="text-xl mr-2" />
                        Call Us: 415.824.8888
                    </span>
                )
            },
            "url": "tel:14158248888"
        },
        ]
    },

    "header": {
        "company_name": "Luxor",
        "logo_url": "",
        "nav": [
            {
                "label": "About Us",
                "url": "/about"
            },
            {
                "label": "Corporate Accounts",
                "url": "/services"
            },
            {
                "label": "Our Fleet",
                "url": "/fleet"
            },
        ],
        "cta": {
            "label": "Book Now",
            "url": "/inquire"
        }
    },

    "hero": {
        "bg_image": "https://www.metrowestcarservice.com/wp-content/uploads/2020/05/4-1.jpg",
        "title": () => {
            return `Elite Transportation for Business & Leisure.`
        },
        "description": "Experience unmatched reliability and sophistication with Luxor Executive Car Service. Whether for business or pleasure, our fleet and expert chauffeurs deliver unparalleled comfort and style.",
        "cta": {
            "label": "Book Now",
            "url": "/inquire"
        }
    },
    "introduction": {
        "sectionTitle": "Unmatched Service, Every Mile.",
        "headline": () => {
            return (
                <>
                    At Luxor Executive Car Service, we believe every journey should reflect the highest standards of professionalism and luxury. From business meetings to special occasions, our commitment to reliability and elegance sets us apart.
                    <br />
                    <br />
                    <span
                        data-aos="fade-in"
                        data-aos-delay="200"
                        className="text-2xl text-gray-500">Experience the pinnacle of comfort and style with Luxor.</span>
                </>
            )
        },
        "cta": {
            "label": "View our fleet",
            "url": "/fleet"
        }
    },
    "image_grid": {
        "images": [
            "https://alpinelimousinenyc.com/wp-content/uploads/Corporate-Event-Transportation-image2-1.jpg",
            "https://houstonlimorental.services/wp-content/uploads/2013/11/Houston-Black-Car-Services.jpg"
        ]
    },
    "feature_section": {
        "sectionTitle": "Our Commitment to Excellence",
        "headline": "Luxury, Reliability, and Unmatched Service",
        "features": [
            {
                "title": "Premium Fleet Selection",
                "description":
                    "Choose from a curated selection of luxury sedans, SUVs, and limousines, each meticulously maintained to deliver the highest level of comfort and style for your journey.",
                "image": "https://www.limoserviceatlanta.com/wp-content/uploads/2024/01/blackcarservice.jpeg", // Image showing a premium car interior or a selection of luxury vehicles
                "cta": {
                    "label": "View Our Fleet",
                    "url": "/fleet"
                }
            },
            {
                "title": "Professional Chauffeurs",
                "description":
                    "Our chauffeurs are trained to provide an exceptional service experience, ensuring punctuality, discretion, and a smooth, safe ride every time.",
                "image": "https://img1.wsimg.com/isteam/ip/59534960-dd97-4cb5-a160-0a29ae8a6774/image%20(20).jpg", // Image showing a well-dressed chauffeur or a luxury car exterior with a chauffeur opening the door
            },
            {
                "title": "Real-Time Flight Tracking",
                "description":
                    "Stay relaxed with our real-time flight tracking service. We monitor your flight status to ensure prompt pick-up and avoid any travel delays, offering you peace of mind from takeoff to touchdown.",
                "image": "https://twowaylimousine.com/wp-content/uploads/2024/05/luxury-airport-limo-and-shuttle-services.webp", // Image could show an app screen or airport setting with a luxury vehicle
            }
        ]
    },
    "carousel": {
        "images": [
            "https://www.booklimoonline.com/wp-content/uploads/2023/03/2018-04-06-PHOTO-00000606.jpg",
            "https://coastaleventshuttle.com/wp-content/uploads/2023/01/wilmington-nc8217s-best-party-and-shuttle-bus-9.jpg",
            "https://oharelimousine.com/wp-content/uploads/elementor/thumbs/wedding-limousine-chicago-qt3jrc6upnjqh3j1ji5nd4im1itkxk5usf8nt11q5q.jpg",
            "https://www.autoserviziparlatore.com/wp-content/uploads/img-gallerie_ncc-sicilia_airport-transfer-service-siciliy.jpg"
        ]
    },
    "callout": {
        "bg_image": "https://t3.ftcdn.net/jpg/06/25/67/84/360_F_625678488_xJAfmWEBHUiZsU4lV9qLi0C3DH3XsjcH.jpg", // Replace with a luxurious, inviting background such as a city skyline at night or a luxury car interior
        "title": "Elevate Your Travel Experience",
        "description": "Step into a world of elegance and comfort with Luxor Executive Car Service. From the moment you book to the final destination, every detail is crafted to exceed your expectations and deliver an unparalleled travel experience.",
        "cta": {
            "label": "Discover the Luxor Difference",
            "url": "/experience"
        }
    },
    "get_started": {
        "image": "https://www.ablelimousine.com/images/dallasfleet/f-bklimo-int.jpg", // Replace with an image showing a luxury car interior or a chauffeur opening a car door
        "title": "Ready to Experience Luxury Travel?",
        "description": "From corporate events to special occasions, Luxor Executive Car Service is here to make your journey memorable and stress-free. Book now for a seamless, elegant ride tailored to your needs.",
        "cta": {
            "label": "Book Now",
            "url": "/reservations"
        }
    }
}

export default luxor;