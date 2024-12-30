"use client";
import { useState, useEffect } from "react";
import { useWordpress } from "../../providers/WordpressProvider";
import Link from "next/link";
import FeaturedImage from "../FeaturedImage";

const AuthorCard = ({ authorId }) => {
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
                    <h3 className="text-xl font-bold mb-2">About the Author</h3>
                    <Link href={`/blog/authors/${author.slug}`} className="flex items-center">
                    {
                        author.acf.profile_image && (
                            <FeaturedImage mediaId={author.acf.profile_image} width={64} height={64} />
                        )
                    }
                            <h4
                                className="text-lg font-semibold text-black hover:underline ml-2"
                            >{author.name}</h4>
                    </Link>
                </div>
            )}
        </div>
    );
}

export default AuthorCard;