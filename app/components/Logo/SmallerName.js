import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import Link from "next/link";

const SmallerName = () => {
    const textRef = useRef(null);

    useEffect(() => {
        const letters = textRef.current.querySelectorAll("span");
        
        gsap.fromTo(
            letters,
            { y: 50, opacity: 0 },
            {
                y: 0,
                opacity: 1,
                duration: 1.2,
                ease: "power4.out",
                stagger: 0.1,
            }
        );
    }, []);

    return (
        <Link className="smaller-name" ref={textRef} style={{ display: "inline-block", overflow: "hidden" }} href="/portal">
            {Array.from("StrongStart").map((char, i) => (
                <span key={i} style={{ display: "inline-block" }}>
                    {char}
                </span>
            ))}
        </Link>
    );
};

export default SmallerName;
