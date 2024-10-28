"use client";
import React from "react";

const FeatureSection = () => {
    let image = "https://plus.unsplash.com/premium_photo-1675018587751-76c5626f5b33?q=80&w=3000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D";
    
    const features = [
        {
          title: "Human-Centered Web Design & Development",
          description:
            "Our web applications are crafted to resonate with users and deliver on business goals. Through careful research and design, we build digital experiences that are engaging, intuitive, and aligned with your audience’s needs.",
          image: "https://cdn.supplyon.com/wp-content/uploads/2019/07/Design-thinking-workshop_blog.jpg",
        },
        {
          title: "Advanced AI Integration",
          description:
            "Harness the potential of Artificial Intelligence to elevate your operations. Our AI solutions provide actionable insights, streamline processes, and enable smarter, data-driven decisions.",
          image: "https://www.oliverwymanforum.com/content/dam/oliver-wyman/ow-forum/artificial-intelligence/opening-new-pportunities-retailers-1200x720.jpg",
        },
        {
          title: "Innovative IoT Solutions",
          description:
            "Unlock new efficiencies with connected devices and real-time data. Our scalable IoT solutions enable seamless integration across systems, enhancing operational visibility and control.",
          image: "https://blues.com/wp-content/uploads/2022/06/hero-image-Pavans-blog-post.png",
        },
      ];
    return (
        <section className="py-4">
            <div className="container mx-auto px-4">
                <div className="flex flex-col">
                    <p 
                    data-aos="fade-in"
                    className="text-gray-500">Empowering Digital Transformation</p>
                    <h2 
                    data-aos="fade-in"
                    data-aos-delay="200"
                    className="text-5xl font-regular mb-8 max-w-2xl mt-16">Redefining Technology to Serve People and Business</h2>
                </div>
                <div className="flex flex-col px-20">
                    {features.map((feature, index) => (
                        <Feature key={index} title={feature.title} description={feature.description} image={feature.image}  index={index} />  
                    ))}
                </div>
            </div>
        </section>
    )
}

const Feature = ({ title, description, image, index }) => {
    return (
        <div className="flex flex-row mt-10" data-aos="fade-in" data-aos-delay={(index+1)*50}>
            <img
                src={image}
                alt="Electric Car" className="w-1/3 mb-8 object-cover object-center rounded-xl" style={{height: "300px"}} />
            <div className="flex flex-col w-2/3 pl-8">
                <h2 className="text-3xl font-semibold mb-4 w-3/4 mt-4">{title}</h2>
                <p className="text-gray-500 pr-16">{description}</p>
            </div>
        </div>
    )
}

export default FeatureSection;