"use client";
import React from 'react';
import Slider from 'react-slick';

const Carousel = ({
    content = null
}) => {
    let settings = {
        dots: true,
        speed: 300,
        slidesToShow: 3,
        infinite: false,
        arrows: true,
        slidesToScroll: 1,
      adaptiveHeight: true,
      className: "carousel",
    }

    if (!content) return null;
    return (
        <section className="bg-white">
            <Slider {...settings}>
                {content.images.map((image, index) => {
                    return (
                        <Slide key={index} image={image} />
                    )
                })}
            </Slider>
        </section>
    )
}

const Slide = ({
    image = null
}) => {
    return (
        <img
            src={image}
            alt="Electric Car" class="w-full mb-8 object-cover object-center rounded-xl" style={{
                height: "400px"
            }} />
    )
}

export default Carousel;