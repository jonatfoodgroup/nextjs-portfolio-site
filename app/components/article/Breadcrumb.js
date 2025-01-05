"use client";
import Link from "next/link";
import { Icon } from "@iconify/react/dist/iconify.js";

export const Breadcrumb = ({ article }) => {
    return (
        <div className="bg-light-orange pt-20">
            <div className="container mx-auto" data-aos="fade-in" data-aos-delay="200">
                <nav className="flex items-center space-x-1 text-sm text-darker-gray mx-auto py-4 rounded-md md:flex hidden">
                    <Link href="/" className="underline hover:text-black">Home</Link>
                    <span>/</span>
                    <Link href="/blog"
                        className="underline hover:text-black">Articles</Link>
                    <span>/</span>
                    <span
                        className="text-darker-gray font-bold"
                    >
                        <Icon icon={article.acf?.icon} className="inline-block text-orange w-6 h-6 mr-2" />  
                        {article.title.rendered}</span>
                    <EditPageLink id={article.id} />
                </nav>
            </div>
        </div>
    )
  }
  
  const EditPageLink = ({ id }) => (
    <Link
        target="_blank"
        href={'https://jonsenterfitt.com/wp-admin/post.php?post=' + id + '&action=edit'}>
        Edit this page
    </Link>
  )