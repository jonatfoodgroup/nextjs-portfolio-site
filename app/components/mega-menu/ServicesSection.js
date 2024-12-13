"use client";
import React from 'react';
import services from '../../data/services';
import audiences from '../../data/audiences';
import softwares from '../../data/softwares';
import Link from 'next/link';
import { Icon } from '@iconify/react/dist/iconify.js';

const ServicesSection = () => {
    let iconSize = 'h-12 w-12';

    // sort services by title
    services.sort((a, b) => a.title.localeCompare(b.title));
  return (
    <div className="flex flex-col md:flex-row items-start">
      {/* Audiences Section */}
      <div style={{ minWidth: '160px' }}>
        <h4 className="text-foreground uppercase text-xs font-normal mb-0 mt-0 tracking-wide">Solutions For</h4>
        <ul className="mt-3">
          {audiences.map((audience) => (
            <li className="mb-2" key={audience.title}>
              <Link href={audience.link} className="text-xs font-extrabold leading-6 text-foreground hover:text-blue-500 flex items-center gap-x-2">
                <Icon icon={audience.icon} className="text-md text-foreground" />
                {audience.title}
              </Link>
            </li>
          ))}
        </ul>
      </div>

      {/* Services Section */}
      <div className="ml-4">
        <section className="d-block">
          <div className="grid grid-cols-1 gap-y-8 sm:grid-cols-3">
            {services.map((service) => (
              <Link href={`/services/${service.link}`} key={service.title} className="text-lg font-semibold leading-6 hover:text-foreground group pr-6 py-1">
                <div className="flex">
                  <div className="flex-shrink-0">
                    <div className={`flex items-center justify-center ${iconSize} rounded-md bg-slate-200 text-${service.color}-500`}>
                      <Icon icon={service.icon} className={`text-${service.color}-500 text-xl`} />
                    </div>
                  </div>
                  <div className="ml-4">
                    <h4 className="text-lg font-semibold text-foreground leading-6 hover:text-blue-500 mt-0 mb-0">
                      {service.title}
                    </h4>
                    <p className="text-xs line-clamp-2 font-light text-slate-500 leading-relaxed mt-1">
                      {service.description}
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