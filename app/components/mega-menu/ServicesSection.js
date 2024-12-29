"use client";
import React from 'react';
import audiences from '../../data/audiences';
import Link from 'next/link';
import { Icon } from '@iconify/react/dist/iconify.js';
import { useWordpress } from '../../providers/WordpressProvider';
import { decode } from 'html-entities';
const ServicesSection = () => {
    let iconSize = 'h-12 w-12';
    const { services } = useWordpress();
    // sort services by title
    // services.sort((a, b) => a.title.localeCompare(b.title));
  return (
    <div className="flex flex-col md:flex-row items-start w-full">
      {/* Audiences Section */}
      <div className='w-full md:w-1/4'>
        <h4 className="text-foreground uppercase text-sm font-normal mb-0 mt-0 tracking-wide">Solutions For</h4>
        <ul className="mt-3">
          {audiences.map((audience) => (
            <li className="mb-2 py-2" key={audience.title}>
              <Link href={audience.link} className="text-xl font-extrabold leading-6 text-foreground hover:text-orange flex items-center flex-row">
                <Icon icon={audience.icon} className="text-xl text-foreground mr-2" />
                {audience.title}
              </Link>
            </li>
          ))}
        </ul>
      </div>

      {/* Services Section */}
      <div className="ml-4 pt-4 md:pt-0 py-4 md:py-4">
        <section className="d-block">
          <div className="grid grid-cols-1 gap-y-4 sm:grid-cols-4">
            {services.map((service,index) => (
              <Link href={`/services/${service.slug}`} key={service.title.rendered} className="text-lg font-semibold leading-6 hover:text-foreground group pr-6 py-1" data-aos="fade-up" data-aos-delay={index * 50}>
                <div className="flex flex-col">
                  <div className="ml-4 mb-4 flex items-center">
                    <div className={`flex items-center justify-center  rounded-md bg-white text-orange`}>
                    <Icon icon={service.acf?.icon} className={`text-4xl`} />
                    </div>
                  </div>
                  <div className="ml-4">
                    <h4 className="text-xl font-bold text-black leading-6 hover:text-orange mt-0 mb-0">
                      {decode(service.title.rendered)}
                    </h4>
                    <p className="text-sm line-clamp-3 font-light text-slate-500 leading-normal mt-2">
                      {decode(service.acf?.masthead?.masthead_content)}
                    </p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
};

export default ServicesSection;