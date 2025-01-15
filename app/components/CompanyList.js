import React from 'react';
import { useHubspot } from '../providers/HubspotProvider';
import Link from 'next/link';
import ProjectsCount from './projects/ProjectsCount';

const CompaniesList = () => {
  const { companies, loading, error } = useHubspot();

  if (loading) return <p>Loading companies...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className='mt-20'>
      <h2
        className='text-xl font-bold mb-4'
      >Companies</h2>
      <div className='border-b border-gray-200 mb-4'>
        {companies.map((company) => (
            <Link href={`/portal/${company.id}`} key={company.id} className='block py-2 px-4 hover:bg-gray-100 border-b border-gray-200'>
                {company.properties.name} - <ProjectsCount hubspotId={company.id} />
            </Link>
        ))}
      </div>
    </div>
  );
};

export default CompaniesList;1