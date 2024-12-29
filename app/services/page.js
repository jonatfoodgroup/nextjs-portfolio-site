import Header from "../components/Header"
import Footer from "../components/marketing/Footer";
import ServiceList from "../components/ServicesList";
import Link from "next/link";

export async function generateMetadata() {
    return {
        title: "Services | StrongStart",
        description: "Discover our service offerings.",
    };
}

export default function Home() {
    return (
        <>
            <Header />
                <Breadcrumb />
                <div className="container mx-auto py-8">
                    <ServiceList />
                </div>
            <Footer />
        </>
    );
}

const Breadcrumb = ({ service }) => {
    return (
        <div className="bg-light-gray py-4 pt-20">
            <div className="container mx-auto">
                <nav className="flex items-center space-x-2 text-sm p-4 text-black">
                    <Link
                        className="underline hover:text-blue-500 transition flex items-center space-x-12"
                        href="/">
                        Home</Link>
                    <span>/</span>
                    <span className="font-bold"
                    >Services</span>
                </nav>
            </div>
        </div>
    );
}