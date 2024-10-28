// Import the services data
import services from '../../data/services';

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
    title: `${service.title} | Belfort`,
    description: service.description,
  };
}

export default function ServicePage({ params }) {
  const { slug } = params;
  const service = services.find((service) => service.slug === slug);

  if (!service) {
    return <h1>Service Not Found</h1>;
  }

  return (
    <div className="container mx-auto py-10">
      <div className="flex items-center space-x-4">
        <div className={`icon-container bg-${service.color}-500 p-4 rounded-md`}>
        </div>
        <h1 className="text-4xl font-bold">{service.title}</h1>
      </div>
      <p className="mt-4 text-lg">{service.description}</p>

      {/* Additional content for the service page */}
      <div className="mt-8">
        <p>More details about the {service.title}...</p>
        {/* You can add more detailed sections here */}
      </div>
    </div>
  );
}