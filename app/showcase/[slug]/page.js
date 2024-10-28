import ShowcaseDetailView from "../../components/views/ShowcaseDetailView";
import '../../globals.css';
import { decode } from "html-entities";
// Fetch posts from the WordPress API
async function fetchPosts() {
    const res = await fetch('https://jonsenterfitt.com/wp-json/wp/v2/project', {
        cache: 'no-store'
    });
    if (!res.ok) {
        throw new Error('Failed to fetch posts');
    }
    return res.json();
}

// Generate paths dynamically for static generation
export async function generateStaticParams() {
    const posts = await fetchPosts();
    return posts.map((post) => ({
        slug: post.slug,
    }));
}

// Generates metadata dynamically for each post
export async function generateMetadata({ params }) {
    const posts = await fetchPosts();
    const post = posts.find((post) => post.slug === params.slug);
    return {
        title: post.title ? decode(post.title.rendered) : '',
        description: post.excerpt ? post.excerpt.rendered : '',
        openGraph: {
            images: post.featured_media ? [post.featured_media] : [],
        },
    };
}

// Fetch individual post data based on the slug
export async function getPost(slug) {
    const posts = await fetchPosts();
    return posts.find((post) => post.slug === slug);
}

const PostPage = async ({ params }) => {
    const post = await getPost(params.slug);

    if (!post) {
        return <p>Post not found.</p>;
    }

    return (
        <div>
            <ShowcaseDetailView item={post} />
        </div>
    );
};

export default PostPage;
