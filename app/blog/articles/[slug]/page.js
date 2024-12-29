
import Header from "../../../components/Header";
import Footer from "../../../components/marketing/Footer";
import ArticleContent from "../../../components/article/ArticleContent";
import { decode } from "html-entities";
import Sidebar from "../../../components/article/Sidebar";
import { Breadcrumb } from "../../../components/article/Breadcrumb";

export async function generateStaticParams() {
    const baseUrl = "https://jonsenterfitt.com/wp-json/wp/v2";
    let allServices = [];
    let page = 1;
    let hasMore = true;
  
    try {
      while (hasMore) {
        const response = await fetch(`${baseUrl}/posts?page=${page}`);
        if (!response.ok) {
          // If we hit a 400-level error, it may be because we've exhausted pages
          if (response.status === 400) break;
          throw new Error(`Error fetching services: ${response.statusText}`);
        }
        const services = await response.json();
  
        // Break the loop if no more posts are returned
        if (services.length === 0) {
          hasMore = false;
        } else {
          allServices = [...allServices, ...services];
          page++;
        }
      }
  
      // Log the fetched slugs for debugging
      console.log("Static paths being generated:", allServices.map(s => s.slug));
  
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

    console.log(article);

    if (!article || article.length === 0) {
        return {
            notFound: true,
        };
    }


    return (
      <>
        <Header />
        <Breadcrumb article={article[0]} />
        <div className="container inner-container mx-auto px-4">
          <div className="flex flex-row justify-center items-start">
            <div className="w-2/3 pr-4">
              <ArticleContent article={article[0]} />
            </div>
            <div className="w-1/3 pl-4">
              <Sidebar article={article[0]} />
            </div>
          </div>
        </div>
        <Footer />
      </>
    );
}


