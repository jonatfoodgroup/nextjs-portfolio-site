import React from 'react';
import { useHubspot } from '../providers/HubspotProvider';
import Link from 'next/link';

const CompaniesList = () => {
  const { companies, loading, error } = useHubspot();

  if (loading) return <p>Loading companies...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div>
      <h2>Companies</h2>
      <ul>
        {companies.map((company) => (
        <li key={company.id}>
            <Link href={`/portal/${company.id}`}>
                {company.properties.name}
            </Link>
        </li>
        ))}
      </ul>
    </div>
  );
};

export default CompaniesList;1