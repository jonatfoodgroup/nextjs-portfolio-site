"use client";
import { decode } from "html-entities";
import { useWordpress } from "../providers/WordpressProvider";
import { useEffect } from "react";
import Link from "next/link";

const Page = () => {
    const { pages } = useWordpress();

    useEffect(() => {
        console.log(pages);
    }, [pages]);

    if (!pages) {
        return (
            <div>
                <h1>Loading...</h1>
            </div>
        );
    }
    return (
        <div>
            <h1>Pages</h1>
            <ul>
                {pages.map((page) => (
                    <li key={page.id}>
                        <Link href={`/tasks/${page.slug}`}>
                           {decode(page.title.rendered)}
                        </Link>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default Page;