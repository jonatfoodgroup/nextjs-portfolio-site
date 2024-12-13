import projects from '../../data/projects';
import Header from '../../components/Header';
import CaseStudyView from '../../components/views/CaseStudyDetailView';

export async function generateStaticParams() {
    // Returning params for static generation (no "params" object here; we directly return the object structure)
    return projects.map((service) => ({
      slug: service.slug,
    }));
  }
  
  export async function generateMetadata({ params }) {
    const { slug } = params;
    const project = projects.find((service) => service.slug === slug);
  
    if (!project) {
      return {
        title: 'Case Study Not Found',
      };
    }
  
    return {
      title: `${project.title} | Belfort Design Agency`,
      description: project.description,
    };
  }

export default function CaseStudyPage({ params }) {
    if (!params) {
        return <h1>Case Study Not Found</h1>;
    }
    const { slug } = params;
    const project = projects.find((service) => service.slug === slug);
    
  
    if (!project) {
        return <h1>Case Study Not Found</h1>;
    }
  
    return (
        <>
            <Header />
            <CaseStudyView project={project} />
        </>
    );
}

