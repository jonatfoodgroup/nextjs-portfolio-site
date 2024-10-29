"use client";
import React from "react";

const ImageGrid = ({
    content = null
}) => {
    if (!content) return null;
    return (
        <section className="py-4">
            <div className="container mx-auto px-4">
                <div className="grid grid-cols-2 gap-8">
                    {content.images.map((image, index) => (
                        <ImageItem 
                        key={index} image={image} index={index} />
                    ))}
                </div>
            </div>
        </section>
    )
}

const ImageItem = ({ image,index }) => {
    return (
        <div className="flex flex-col justify-center items-start" data-aos="fade-in" data-aos-delay={index*200}>
            <img
                src={image}
                alt="Electric Car" className="w-full mb-8 object-cover object-center rounded-xl" style={{height:"500px"}} />
        </div>
    )
}

export default ImageGrid;