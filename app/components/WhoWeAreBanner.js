"use client";
import { Icon } from "@iconify/react/dist/iconify.js";

const WhoWeAreBanner = () => {
    return (
        <>
            <section className="bg-light-orange py-8 md:py-16">
                <div className="container mx-auto flex flex-col md:flex-row items-center justify-between inner-container min-h-[50vh]">
                    <div className="w-full md:w-1/2">
                        <h2 className="text-5xl font-bold text-center md:text-left">Experience Where It Matters Most</h2>
                        <p className="text-center md:text-left text-xl mt-4 leading-relaxed">
                            StrongStart empowers businesses and teams to confidently deliver exceptional results through cutting-edge technology, deep expertise, and AI-driven innovation. Together, we build solutions that inspire trust, drive growth, and elevate your impact.
                        </p>
                    </div>
                    <div className="w-full md:w-1/2 flex justify-center">
                        
                    </div>
                </div>
            </section>
        </>
    )
}

export default WhoWeAreBanner;