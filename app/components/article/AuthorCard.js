"use client";
import { useState, useEffect, useRef } from "react";
import { useWordpress } from "../../providers/WordpressProvider";
import Link from "next/link";
import FeaturedImage from "../FeaturedImage";

const AuthorCard = ({ authorId, size = 32 }) => {
    const { fetchAuthor } = useWordpress();
    const [author, setAuthor] = useState(null);
    const cacheRef = useRef({}); // Cache to store fetched authors

    useEffect(() => {
        const getAuthor = async () => {
            if (cacheRef.current[authorId]) {
                // Use cached author if available
                setAuthor(cacheRef.current[authorId]);
                return;
            }

            const fetchedAuthor = await fetchAuthor(authorId);
            if (fetchedAuthor) {
                cacheRef.current[authorId] = fetchedAuthor; // Cache the fetched author
                setAuthor(fetchedAuthor);
            }
        };

        getAuthor();
    }, [authorId, fetchAuthor]);

    return (
        <div>
            {author && (
                <div>
                    <Link
                        href={`/blog/authors/${author.slug}`}
                        className="flex items-center"
                    >
                        {author.acf.profile_image && (
                            <FeaturedImage
                                mediaId={author.acf.profile_image}
                                width={size}
                                height={size}
                            />
                        )}
                        <h4 className="text-md font-semibold text-black hover:underline ml-2">
                            {author.name}
                        </h4>
                    </Link>
                </div>
            )}
        </div>
    );
};

export default AuthorCard;