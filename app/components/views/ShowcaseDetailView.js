"use client";
import Link from "next/link";
import { decode } from 'html-entities';
import { useEffect } from "react";
import Image from 'next/image';
import Slider from "react-slick";

export default function ShowcaseDetailView({ item }) {
    return (
        <div className="flex flex-col">
            <Breadcrumbs item={item} />
            <PageHeader item={item} />
            <ImageSlider />
            <PageContent item={item} />
        </div>
    )
}

const ImageSlider = () => {
    let images = [
        "https://placeholder.co/1000x1000",
        "https://placeholder.co/1000x1000",
        "https://placeholder.co/1000x1000",
        "https://placeholder.co/1000x1000",
    ]
    return (
        <Slider
            dots={true}
            infinite={true}
            fade={true}
            speed={2000}
            slidesToShow={3}
            pauseOnHover={false}
            slidesToScroll={1}
            autoplay={true}
            autoplaySpeed={4500}
        >
            {images.map((image, index) => {
                return (
                    <div key={index} className="relative w-full h-[400px]">
                        <Image
                            src={image}
                            fill
                            objectFit="cover"
                            objectPosition="center"
                            alt={`Slide ${index + 1}`}
                        />
                    </div>
                );
            })}
        </Slider>
    )
}

const PageHeader = ({ item }) => {
    return (
        <>
            <div className="container mx-auto">
                <h1
                    className="text-5xl mb-6"
                >{decode(item.title.rendered)}</h1>
            </div>
        </>
    )
}

const PageContent = ({ item }) => {
    useEffect(() => {
        // get the alt of images and set them as a caption for the image under the image
        const images = document.querySelectorAll('.showcase-content img');
        images.forEach((image) => {
            const alt = image.getAttribute('alt');
            if (!image.nextElementSibling || !image.nextElementSibling.classList.contains('text-center')) {
                const caption = document.createElement('span');
                caption.textContent = alt;
                caption.classList.add('text-center', 'block', 'text-xs', 'text-gray-500', 'mb-8');
                image.insertAdjacentElement('afterend', caption);
            }
        });
    }, []);

    return (
        <div className="container mx-auto showcase-content">
            {/* <pre>{JSON.stringify(item, null, 2)}</pre> */}
            <div
                dangerouslySetInnerHTML={{ __html: item.content.rendered }}
            />
        </div>
    )
}
const Breadcrumbs = ({ item }) => {
    return (
        <div className="breadcrumb py-4 mb-4">
            <div className="container mx-auto">
                <div className="text-sm">
                    <Link href="/showcase" className="underline">Showcase</Link>
                    <span> / </span>
                    <span>{decode(item.title.rendered)}</span>
                </div>
            </div>
        </div>
    )
}