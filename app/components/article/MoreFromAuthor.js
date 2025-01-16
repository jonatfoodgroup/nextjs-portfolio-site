"use client"
import { useState, useEffect } from "react"
import { useWordpress } from "../../providers/WordpressProvider"
import Link from "next/link"

const MoreFromAuthor = ({ authorId }) => {
    const { fetchPostsByAuthor } = useWordpress()
    const [posts, setPosts] = useState([])

    useEffect(() => {
        const getPosts = async () => {
            const posts = await fetchPostsByAuthor(authorId)
            setPosts(posts)
        }

        getPosts()
    }, [authorId])

    return (
        <div>
            <h3 className="text-md font-bold mb-2 mt-4">More from this Author</h3>
            <ul className="space-y-2">
                {posts.map((post) => (
                    <li key={post.id} className="text-sm mb-0">
                        <Link href={`/blog/articles/${post.slug}`}  className="text-black font-regular hover:underline mb-0">{post.title.rendered}
                        </Link>
                    </li>
                ))}
            </ul>
        </div>
    )
}

export default MoreFromAuthor