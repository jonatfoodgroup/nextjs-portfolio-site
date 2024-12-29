import Header from "../components/Header"
import Footer from "../components/marketing/Footer";
import Link from "next/link";

export async function generateMetadata() {
    return {
        title: "Blog | StrongStart",
        description: "Discover our latest articles.",
    };
}

export default function Home() {
    return (
        <>
            <Header />
            <div className="pt-20">
                <div className="container mx-auto py-8">
                    <h1 className="text-4xl font-bold text-dark-blue">Blog</h1>
                </div>
            </div>
            <Footer />
        </>
    );
}