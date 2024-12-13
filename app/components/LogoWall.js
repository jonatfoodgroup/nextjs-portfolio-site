"use client";
import { useRef } from "react";
import { Navigation, Pagination, Scrollbar, A11y, Autoplay } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import { Icon } from "@iconify/react/dist/iconify.js";

const LogoWall = () => {
  const staticLogos = Array.from({ length: 10 }, (_, index) => ({
    src: `/images/client-logos/${index + 1}.webp`,
    alt: `Client Logo ${index + 1}`,
  }));
  const sliderRef = useRef();

  const NextButton = () => {
    return (
      <button
        onClick={() => sliderRef.current.slideNext()}
        className="absolute top-1/2 -right-[10px] transform -translate-y-1/2 p-4  rounded-l-md  z-50 hover:bg-gray-100 hover:shadow-lg transition-all"
      >
        <Icon icon="bi:arrow-right" className="text-2xl text-gray-500" />
      </button>
    );
  };

  const PrevButton = () => {
    return (
      <button
        onClick={() => sliderRef.current.slidePrev()}
        className="absolute top-1/2 -left-[10px] transform -translate-y-1/2 p-4  rounded-r-md z-50 hover:bg-gray-100 hover:shadow-lg transition-all"
      >
        <Icon icon="bi:arrow-left" className="text-2xl text-gray-500" />
      </button>
    );
  }
  return (
    <Swiper
      ref={sliderRef}
      onSwiper={it => (sliderRef.current = it)}
      modules={[Navigation, Pagination, Scrollbar, A11y, Autoplay]}
      spaceBetween={10}
      slidesPerView={3} // Adjust the number of visible logos
      navigation
      // pagination={{ clickable: true }}
      keyboard={{ enabled: true }}
      mousewheel={{ enabled: true }}
      autoplay={{ delay: 3000 }} // Set to 0 to disable auto-play
      loop
      breakpoints={{
        640: {
          slidesPerView: 2,
          spaceBetween: 20,
        },
        1024: {
          slidesPerView: 3,
          spaceBetween: 30,
        },
        1440: {
          slidesPerView: 5,
          spaceBetween: 10,
        },
      }}
    >
      {staticLogos.map((logo, index) => (
        <SwiperSlide key={index} className='flex justify-center items-center py-8'>
          <img
            src={logo.src}
            alt={logo.alt}
            className="h-40 w-40 object-contain rounded-lg mx-auto"
          />
        </SwiperSlide>
      ))}
      <NextButton />
      <PrevButton />
    </Swiper>
  );
};



export default LogoWall;