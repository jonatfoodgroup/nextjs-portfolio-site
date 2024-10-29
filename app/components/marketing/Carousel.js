"use client";
import React from 'react';
import Slider from 'react-slick';

const debounce = (func, wait) => {
    let timeout;
    return function (...args) {
        const context = this;
        if (timeout) clearTimeout(timeout);
        timeout = setTimeout(() => {
            timeout = null;
            func.apply(context, args);
        }, wait);
    };
}
const Carousel = ({
    content = null
}) => {
    const ref = React.useRef(null);
    let settings = {
        dots: true,
        speed: 300,
        slidesToShow: 3,
        infinite: true,
        arrows: true,
        slidesToScroll: 1,
        adaptiveHeight: true,
        className: "carousel",
    }

    const onWheelSlider = debounce((e, ref) => {
        if (!ref.current) return;

        if (e.deltaX > 0) {
            ref.current.slickNext();
        } else if (e.deltaX < 0) {
            ref.current.slickPrev();
        }
    }, 20);

    if (!content) return null;
    return (
        <section className="bg-white cursor-pointer" onWheel={(e) => onWheelSlider(e, ref)}>
            <Slider {...settings} ref={ref}>
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