export const revalidate = 60; // Revalidate every 60 seconds

// Import the services data
import ServiceView from '../../components/views/ServiceDetailView';
import Header from '../../components/Header';
import { decode } from 'html-entities';

export async function generateStaticParams() {
  const baseUrl = "https://jonsenterfitt.com/wp-json/wp/v2";

  try {
    const response = await fetch(`${baseUrl}/service?parent=0`); // Fetch parent services
    if (!response.ok) {
      throw new Error(`Error fetching services: ${response.statusText}`);
    }
    const services = await response.json();

    // Log the fetched slugs for debugging
    console.log("Static paths being generated:", services.map(s => s.slug));

    return services.map((service) => ({
      slug: service.slug,
    }));
  } catch (error) {
    console.error("Error fetching services for static params:", error);
    return [];
  }
}

export async function generateStaticPaths() {
  const baseUrl = "https://jonsenterfitt.com/wp-json/wp/v2";

  try {
      const response = await fetch(`${baseUrl}/service?parent=0`); // Fetch parent services
      if (!response.ok) {
          throw new Error(`Error fetching services: ${response.statusText}`);
      }
      const services = await response.json();

      // Map services to the required params structure
      return services.map((service) => ({
          params: {
              slug: service.slug,
          },
      }));
  } catch (error) {
      console.error("Error fetching services for static paths:", error);
      return [];
  }
}

export async function generateMetadata({ params }) {
  const baseUrl = "https://jonsenterfitt.com/wp-json/wp/v2";
  const { slug } = params;

  try {
    const response = await fetch(`${baseUrl}/service?slug=${slug}`);
    if (!response.ok) {
      throw new Error(`Error fetching service: ${response.statusText}`);
    }
    const service = await response.json();

    if (!service || service.length === 0) {
      return {
        title: "Service Not Found",
      };
    }

    const { title, acf } = service[0];
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
export default async function ServicePage({ params }) {
  const { slug } = params;
  const baseUrl = "https://jonsenterfitt.com/wp-json/wp/v2";

  try {
    // Fetch the specific service by slug
    const response = await fetch(`${baseUrl}/service?slug=${slug}`);
    if (!response.ok) {
      return <h1>Service Not Found</h1>;
    }

    const service = await response.json();
    if (!service || service.length === 0) {
      return <h1>Service Not Found</h1>;
    }

    const serviceData = service[0];

    // Fetch child pages using the parent ID
    const childPagesResponse = await fetch(`${baseUrl}/service?parent=${serviceData.id}`);
    const childPages = childPagesResponse.ok ? await childPagesResponse.json() : [];

    // reverse the order of the child pages
    childPages.reverse();

    return (
      <>
        <Header />
        <ServiceView service={serviceData} children={childPages} />
      </>
    );
  } catch (error) {
    console.error("Error fetching service data:", error);
    return <h1>Service Not Found</h1>;
  }
}