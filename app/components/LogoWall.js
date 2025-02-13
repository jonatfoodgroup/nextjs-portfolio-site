"use client";
import { useRef } from "react";
import { Navigation, Pagination, Scrollbar, A11y, Autoplay, Grid } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import { Icon } from "@iconify/react/dist/iconify.js";

const LogoWall = () => {
  const staticLogos = Array.from({ length: 12 }, (_, index) => ({
    src: `/images/client-logos/${index + 1}.webp`,
    alt: `Client Logo ${index + 1}`,
  }));
  const sliderRef = useRef();

  const NextButton = () => {
    return (
      <button
        onClick={() => sliderRef.current.slideNext()}
        className="absolute top-1/2 -right-[10px] transform -translate-y-1/2 p-4  rounded-l-md  z-50 hover:bg-gray-100 hover:shadow-lg transition-all border border-gray-200"
      >
        <Icon icon="bi:arrow-right" className="text-2xl text-gray-500" />
      </button>
    );
  };

  const PrevButton = () => {
    return (
      <button
        onClick={() => sliderRef.current.slidePrev()}
        className="absolute top-1/2 -left-[10px] transform -translate-y-1/2 p-4  rounded-r-md z-50 hover:bg-gray-100 hover:shadow-lg transition-all border border-gray-200"
      >
        <Icon icon="bi:arrow-left" className="text-2xl text-gray-500" />
      </button>
    );
  }

  return (
    <div className="relative bg-gray-50 py-8">
      <Swiper
        ref={sliderRef}
        onSwiper={it => (sliderRef.current = it)}
        modules={[Navigation, Pagination, Scrollbar, A11y, Autoplay, Grid]}
        spaceBetween={30}
        slidesPerView={5} // Adjust the number of visible logos
        navigation
        autoplay={{
          delay: 5000, // Increased autoplay speed for smoother transitions
          disableOnInteraction: false,
        }}
        loop
        speed={800} // Transition speed (higher value means slower transition)
        easing="ease-in-out" // Apply easing for smooth transitions
        breakpoints={{
          640: {
            slidesPerView: 2,
            spaceBetween: 20,
          },
          1024: {
            slidesPerView: 4,
            spaceBetween: 30,
          },
          1440: {
            slidesPerView: 4,
            spaceBetween: 10,
          },
        }}
      >
        {staticLogos.map((logo, index) => (
          <SwiperSlide key={index} className='flex justify-center items-center'>
            <img
              src={logo.src}
              alt={logo.alt}
              className="h-48 w-48 object-contain rounded-lg mx-auto"
            />
          </SwiperSlide>
        ))}
        <NextButton />
        <PrevButton />
      </Swiper>
    </div>
  );
};

export default LogoWall;