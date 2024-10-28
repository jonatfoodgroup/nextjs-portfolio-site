"use client";
import React from "react";

const ImageGrid = ({
    images = []
}) => {
    let image = 'https://plus.unsplash.com/premium_photo-1675018587751-76c5626f5b33?q=80&w=3000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D';
    return (
        <section className="py-4">
            <div className="container mx-auto px-4">
                <div className="grid grid-cols-2 gap-8">
                    {images.map((image, index) => (
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