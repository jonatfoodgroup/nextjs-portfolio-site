import Link from 'next/link';
import { decode } from 'html-entities';

export const generateMetadata = () => {
    return {
        title: "Showcase",
        description: "Showcase of projects and work by Jon Senterfitt",
    };
}

// Fetch posts from the WordPress API
async function fetchPosts() {
    const res = await fetch('https://jonsenterfitt.com/wp-json/wp/v2/project');
    if (!res.ok) {
        throw new Error('Failed to fetch posts');
    }
    return res.json();
}

// The archive page component
const PostsArchive = async () => {
    const posts = await fetchPosts();

    return (
        <div className="container mx-auto py-8">
            <h1 className="text-4xl mb-6">Showcase</h1>

            {/* Display posts in a 3 column grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4">
                {posts.map((post) => (
                    <SingleItem key={post.id} post={post} />
                ))}
            </div>
        </div>
    );
};

const SingleItem = ({
    post
}) => {
    let image = "https://placehold.co/300x300";

    return (
        <div key={post.id} className="p-4 transition-shadow duration-300">
            <Link href={`/showcase/${post.slug}`}>
                    <img
                        src={image} // Make sure to handle image logic or use a placeholder
                        alt={decode(post.title.rendered)}
                        className="w-full h-48 object-cover mb-4 rounded"
                    />
                    <h2 className="text-xl font-semibold mb-2">
                        {decode(post.title.rendered)}
                    </h2>
            </Link>
            <p className="text-gray-400">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
            </p>
        </div>

    );
}

export default PostsArchive;
