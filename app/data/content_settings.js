"use client";

let content_settings = {
    "header": {
        "company_name": "Belfort",
        "logo_url": "/images/logo.png",
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
            "label": "Contact",
            "url": "/contact"
        }
    },

    "hero": {
        "bg_image": "https://plus.unsplash.com/premium_photo-1675018587751-76c5626f5b33?q=80&w=3000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        "title": () => {
            return `Better Process.<br />Better Product.`
        },
        "description": "We deliver solutions rooted in a deep understanding of your business challenges, the people you serve, and the platforms you rely on, transforming complex problems into streamlined, impactful outcomes.",
        "cta": {
            "label": "Contact Us",
            "url": "/contact"
        }
    },
    "introduction": {
        "sectionTitle": "People, platforms & processes.",
        "headline": () => {
            return (
                <>
                    Strong relationships with customers, partners, and employees are the backbone of your business. Our technology solutions are the bridge, enhancing connections and enabling growth.
                    <br />
                    <br />
                    <span
                        data-aos="fade-in"
                        data-aos-delay="200"
                        className="text-2xl text-gray-500">Build seamless integrations with Belfort.</span>
                </>
            )
        },
        "cta": {
            "label": "See How We Work",
            "url": "/inquire"
        }
    },
    "image_grid": {
        "images": [
            "https://johannesippen.com/img/blog/design-sprint/ideas.jpg",
            "https://standuply.com/blog/wp-content/uploads/2022/04/war-room-1024x576-1.jpg"
        ]
    },
    "feature_section": {
        "sectionTitle": "Empowering Digital Transformation",
        "headline": "Redefining Technology to Serve People and Business",
        "features": [
            {
                "title": "Human-Centered Web Design & Development",
                "description":
                    "Our web applications are crafted to resonate with users and deliver on business goals. Through careful research and design, we build digital experiences that are engaging, intuitive, and aligned with your audience’s needs.",
                "image": "https://cdn.supplyon.com/wp-content/uploads/2019/07/Design-thinking-workshop_blog.jpg",
            },
            {
                "title": "Advanced AI Integration",
                "description":
                    "Harness the potential of Artificial Intelligence to elevate your operations. Our AI solutions provide actionable insights, streamline processes, and enable smarter, data-driven decisions.",
                "image": "https://www.oliverwymanforum.com/content/dam/oliver-wyman/ow-forum/artificial-intelligence/opening-new-pportunities-retailers-1200x720.jpg",
            },
            {
                "title": "Innovative IoT Solutions",
                "description":
                    "Unlock new efficiencies with connected devices and real-time data. Our scalable IoT solutions enable seamless integration across systems, enhancing operational visibility and control.",
                "image": "https://blues.com/wp-content/uploads/2022/06/hero-image-Pavans-blog-post.png",
            },
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
        "bg_image": "https://plus.unsplash.com/premium_photo-1675018587751-76c5626f5b33?q=80&w=3000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        "title": "Advanced Technology for Optimal Performance",
        "description": "Our solutions are designed to empower your business, driving growth and success through innovative technology and strategic insights.",
        "cta": {
            "label": "Learn More",
            "url": "/services"
        }
    },
    "get_started": {
        "image": "https://cdn.supplyon.com/wp-content/uploads/2019/07/Design-thinking-workshop_blog.jpg",
        "title": "Ready to start simplifying solutions and improving your business?",
        "description": "An informal chat to discuss your business needs and how we can help you, followed by an improvement plan and a quote is all it takes to get started.",
        "cta": {
            "label": "Get in Touch",
            "url": "/contact"
        }
    }
}

export default content_settings;