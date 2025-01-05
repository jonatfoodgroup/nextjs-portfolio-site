
import Header from "../../../components/Header";
import Footer from "../../../components/marketing/Footer";
import ArticleContent from "../../../components/article/ArticleContent";
import { decode } from "html-entities";
import Sidebar from "../../../components/article/Sidebar";
import { Breadcrumb } from "../../../components/article/Breadcrumb";
import TableOfContents from "../../../components/article/TOC";

export async function generateStaticPaths() {
  console.log('Fired');
  const paths = await generateStaticParams();
  console.log('Generated Static Paths:', paths);
  return { paths, fallback: 'blocking' }; // Or 'true' if fallback pages are allowed
}

export async function generateStaticParams() {
  const baseUrl = "https://jonsenterfitt.com/wp-json/wp/v2";
  let allServices = [];
  let page = 1;
  let totalPages = null;

  console.log('Fetching services for static params');
  try {
    while (true) {
      const response = await fetch(`${baseUrl}/posts?page=${page}`);

      if (!response.ok) {
        throw new Error(`Error fetching services: ${response.statusText}`);
      }

      // Get total pages from response headers on the first fetch
      if (totalPages === null) {
        totalPages = parseInt(response.headers.get('X-WP-TotalPages'), 10);
      }

      const services = await response.json();

      // Append fetched services to allServices
      allServices = [...allServices, ...services];

      // Break the loop if the current page is the last one
      if (page >= totalPages) {
        break;
      }

      // Increment the page counter
      page++;
    }

    console.log('All fetched services:', allServices.length);
    return allServices.map((service) => ({
      slug: service.slug,
    }));
  } catch (error) {
    console.error("Error fetching services for static params:", error);
    return [];
  }
}
export async function generateMetadata({ params }) {
    const { slug } = params;
    const baseUrl = "https://jonsenterfitt.com/wp-json/wp/v2";

    console.log('slug', slug);
    try {
        const response = await fetch(`${baseUrl}/posts?slug=${slug}`);
        if (!response.ok) {
            throw new Error(`Error fetching service: ${response.statusText}`);
        }
        const article = await response.json();

        if (!article || article.length === 0) {
            return {
                title: "Service Not Found",
            };
        }

        const { title, acf } = article[0];
        return {
            title: `${decode(title.rendered)} | StrongStart`,
            description: acf?.masthead?.masthead_content || "Discover our service offerings.",
        };
    } catch (error) {
        console.error("Error fetching metadata for service:", error);
        return {
            title: "Error",
        };
    }
}

export default async function SingleArticle({ params }) {
    const { slug } = params;

    const baseUrl = "https://jonsenterfitt.com/wp-json/wp/v2";
    const response = await fetch(`${baseUrl}/posts?slug=${slug}`);
    const article = await response.json();


    if (!article || article.length === 0) {
        return {
            notFound: true,
        };
    }


    return (
      <>
        <Header />
        <Breadcrumb article={article[0]} />
        <div className="container mx-auto px-4 mt-20">
          <div className="flex flex-col md:flex-row justify-center items-start">
            <div className="hidden md:block w-1/4 sticky top-20">
              <TableOfContents article={article[0]} />
            </div>
            <div className="w-full md:w-2/3 md:pr-4">
              <ArticleContent article={article[0]} />
            </div>
            <div className="w-full md:w-1/3 md:pl-4">
              <Sidebar article={article[0]} />
            </div>
          </div>
        </div>
        <Footer />
      </>
    );
}

