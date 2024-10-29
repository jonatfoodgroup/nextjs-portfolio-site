"use client";

let luxor = {
    "header": {
        "company_name": "Luxor",
        "logo_url": "",
        "nav": [
            {
                "label": "About",
                "url": "/about"
            },
            {
                "label": "Services",
                "url": "/services"
            }
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
                "image": "https://luxorexecutivecar.com/images/luxury-fleet.jpg", // Image showing a premium car interior or a selection of luxury vehicles
            },
            {
                "title": "Professional Chauffeurs",
                "description":
                    "Our chauffeurs are trained to provide an exceptional service experience, ensuring punctuality, discretion, and a smooth, safe ride every time.",
                "image": "https://luxorexecutivecar.com/images/chauffeur-service.jpg", // Image showing a well-dressed chauffeur or a luxury car exterior with a chauffeur opening the door
            },
            {
                "title": "Real-Time Flight Tracking",
                "description":
                    "Stay relaxed with our real-time flight tracking service. We monitor your flight status to ensure prompt pick-up and avoid any travel delays, offering you peace of mind from takeoff to touchdown.",
                "image": "https://luxorexecutivecar.com/images/flight-tracking.jpg", // Image could show an app screen or airport setting with a luxury vehicle
            }
        ]
    },
    "carousel": {
        "images": [
            "https://plus.unsplash.com/premium_photo-1675018587751-76c5626f5b33?q=80&w=3000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
            "https://plus.unsplash.com/premium_photo-1675018587751-76c5626f5b33?q=80&w=3000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
            "https://plus.unsplash.com/premium_photo-1675018587751-76c5626f5b33?q=80&w=3000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
            "https://plus.unsplash.com/premium_photo-1675018587751-76c5626f5b33?q=80&w=3000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        ]
    },
    "callout": {
        "bg_image": "https://luxorexecutivecar.com/images/callout-bg.jpg", // Replace with a luxurious, inviting background such as a city skyline at night or a luxury car interior
        "title": "Elevate Your Travel Experience",
        "description": "Step into a world of elegance and comfort with Luxor Executive Car Service. From the moment you book to the final destination, every detail is crafted to exceed your expectations and deliver an unparalleled travel experience.",
        "cta": {
            "label": "Discover the Luxor Difference",
            "url": "/experience"
        }
    },
    "get_started": {
        "image": "https://luxorexecutivecar.com/images/get-started.jpg", // Replace with an image showing a luxury car interior or a chauffeur opening a car door
        "title": "Ready to Experience Luxury Travel?",
        "description": "From corporate events to special occasions, Luxor Executive Car Service is here to make your journey memorable and stress-free. Book now for a seamless, elegant ride tailored to your needs.",
        "cta": {
            "label": "Book Now",
            "url": "/reservations"
        }
    }
}

export default luxor;