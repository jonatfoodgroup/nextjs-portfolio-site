// Import the services data
import services from '../../data/services';
import ServiceView from '../../components/views/ServiceDetailView';
import Header from '../../components/Header';

export async function generateStaticParams() {
  // Returning params for static generation (no "params" object here; we directly return the object structure)
  return services.map((service) => ({
    slug: service.slug,
  }));
}

export async function generateMetadata({ params }) {
  const { slug } = params;
  const service = services.find((service) => service.slug === slug);

  if (!service) {
    return {
      title: 'Service Not Found',
    };
  }

  return {
    title: `${service.title} | Belfort Design Agency`,
    description: service.description,
  };
}

export default function ServicePage({ params }) {
  if (!params) {
    return <h1>Service Not Found</h1>;
  }
  const { slug } = params;
  const service = services.find((service) => service.slug === slug);


  if (!service) {
    return <h1>Service Not Found</h1>;
  }

  return (
    <>
      <Header />
      <ServiceView service={service} />
    </>
  );
}

