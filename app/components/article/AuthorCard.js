"use client";
import { useState, useEffect } from "react";
import { useWordpress } from "../../providers/WordpressProvider";
import Link from "next/link";
import FeaturedImage from "../FeaturedImage";
import { Tooltip } from "react-tooltip";

const AuthorCard = ({ authorId, size = 32 }) => {
    const { fetchAuthor } = useWordpress();
    const [author, setAuthor] = useState(null);

    useEffect(() => {
        const getAuthor = async () => {
            const author = await fetchAuthor(authorId);
            setAuthor(author);
        };

        getAuthor();
    }, [authorId]);

    return (
        <div>
            {author && (
                <div>
                    <Link href={`/blog/authors/${author.slug}`} className="flex items-center mt-4" data-tooltip-id={author.slug} data-tooltip-place="bottom" data-tooltip-content={'View Author'}>
                    {
                        author.acf.profile_image && (
                            <FeaturedImage mediaId={author.acf.profile_image} width={size} height={size} />
                        )
                    }
                            <h4
                                className="text-md font-semibold text-black hover:underline ml-2"
                            >{author.name}</h4>
                            <Tooltip id={author.slug} place="bottom" />
                    </Link>
                </div>
            )}
        </div>
    );
}

export default AuthorCard;