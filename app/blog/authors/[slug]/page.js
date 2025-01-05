
import { notFound } from "next/navigation";
import Header from "../../../components/Header";
import Footer from "../../../components/marketing/Footer";
import PostList from "../../../components/article/PostList";
import FeaturedImage from "../../../components/FeaturedImage";
import FollowAuthor from "../../../components/FollowAuthor";

export async function generateStaticParams() {
    const baseUrl = "https://jonsenterfitt.com/wp-json/wp/v2";
    let allAuthors = [];
    let page = 1;
    let hasMore = true;

    try {
        while (hasMore) {
            const response = await fetch(`${baseUrl}/users?page=${page}`);
            if (!response.ok) {
                // If we hit a 400-level error, it may be because we've exhausted pages
                if (response.status === 400) break;
                throw new Error(`Error fetching authors: ${response.statusText}`);
            }
            const authors = await response.json();

            // Break the loop if no more posts are returned
            if (authors.length === 0) {
                hasMore = false;
            } else {
                allAuthors = [...allAuthors, ...authors];
                page++;
            }
        }

        return allAuthors.map((author) => ({
            slug: author.slug,
        }));
    } catch (error) {
        console.error("Error fetching authors for static params:", error);
        return [];
    }
}

export async function generateMetadata({ params }) {
    const { slug } = params;
    const baseUrl = "https://jonsenterfitt.com/wp-json/wp/v2";

    try {
        const response = await fetch(`${baseUrl}/users?slug=${slug}`);
        if (!response.ok) {
            throw new Error(`Error fetching author: ${response.statusText}`);
        }
        const author = await response.json();

        if (!author || author.length === 0) {
            return {
                title: "Author Not Found",
                description: "Author Not Found",
            };
        }

        return {
            title: author[0].name + " on StrongStart",
            description: author[0].description,
        };
    }
    catch (error) {
        console.error("Error fetching author for metadata:", error);
        return {
            title: "Author Not Found",
            description: "Author Not Found",
        };
    }
}

export default async function getPageData({ params }) {
    const { slug } = params;
    const baseUrl = "https://jonsenterfitt.com/wp-json/wp/v2";

    const response = await fetch(`${baseUrl}/users?slug=${slug}`);
    if (!response.ok) {
        throw new Error(`Error fetching author: ${response.statusText}`);
    }
    const author = await response.json();

    if (!author || author.length === 0) {
        return {
            notFound: true,
        };
    }


    // get the author's posts
    const postsResponse = await fetch(`${baseUrl}/posts?author=${author[0].id}`);
    const posts = await postsResponse.json();

    return (
        <>
            <Header />
            <div className="container mx-auto pt-20 px-4 text-center space-y-8 items-center justify-center align-middle">
                <div className="flex flex-col items-center justify-center align-middle mt-4 md:mt-16">
                    
                    {
                        author[0].acf.profile_image && (
                            <FeaturedImage mediaId={author[0].acf.profile_image} width={96} height={96} />
                        )
                    }
                    <h2 className="text-4xl font-bold mt-8"
                    >Posts by {author[0].name}</h2>
                    
                    <p className="text-md mt-4 max-w-4xl mb-8">{author[0].description}</p>
                    <FollowAuthor authorId={author[0].id} name={author[0].name} />
                </div>
                <PostList posts={posts} />
            </div>
            <Footer />
        </>
    );
}