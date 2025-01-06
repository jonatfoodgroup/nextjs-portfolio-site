export const revalidate = 60; // Revalidate every 60 seconds

import BountySidebar from '../../components/bounties/BountySidebar';
import BountyView from '../../components/bounties/BountyView';
// Import the bounties data
import Header from '../../components/Header';
import { decode } from 'html-entities';
import TableOfContents from '../../components/article/TOC';
import SaveLink from '../../components/bounties/SaveBounty';

export async function generateStaticParams() {
  const baseUrl = "https://jonsenterfitt.com/wp-json/wp/v2";

  try {
    const response = await fetch(`${baseUrl}/bounty?parent=0`); // Fetch parent bounties
    if (!response.ok) {
      throw new Error(`Error fetching bounties: ${response.statusText}`);
    }
    const bounties = await response.json();

    return bounties.map((bounty) => ({
      slug: bounty.slug,
    }));
  } catch (error) {
    console.error("Error fetching bounties for static params:", error);
    return [];
  }
}

export async function generateStaticPaths() {
  const baseUrl = "https://jonsenterfitt.com/wp-json/wp/v2";

  try {
    const response = await fetch(`${baseUrl}/bounty?parent=0`); // Fetch parent bounties
    if (!response.ok) {
      throw new Error(`Error fetching bounties: ${response.statusText}`);
    }
    const bounties = await response.json();

    // Map bounties to the required params structure
    return bounties.map((bounty) => ({
      params: {
        slug: bounty.slug,
      },
    }));
  } catch (error) {
    console.error("Error fetching bounties for static paths:", error);
    return [];
  }
}

export async function generateMetadata({ params }) {
  const baseUrl = "https://jonsenterfitt.com/wp-json/wp/v2";
  const { slug } = params;

  try {
    const response = await fetch(`${baseUrl}/bounty?slug=${slug}`);
    if (!response.ok) {
      throw new Error(`Error fetching bounty: ${response.statusText}`);
    }
    const bounty = await response.json();

    if (!bounty || bounty.length === 0) {
      return {
        title: "bounty Not Found",
      };
    }

    const { title, acf } = bounty[0];
    return {
      title: `${decode(title.rendered)} | StrongStart`,
      description: acf?.masthead?.masthead_content || "Discover our bounty offerings.",
    };
  } catch (error) {
    console.error("Error fetching metadata for bounty:", error);
    return {
      title: "Error",
    };
  }
}
export default async function BountyPage({ params }) {
  const { slug } = params;
  const baseUrl = "https://jonsenterfitt.com/wp-json/wp/v2";

  try {
    // Fetch the specific bounty by slug
    const response = await fetch(`${baseUrl}/bounty?slug=${slug}`);
    if (!response.ok) {
      return <h1>bounty Not Found</h1>;
    }

    const bounty = await response.json();
    if (!bounty || bounty.length === 0) {
      return <h1>bounty Not Found</h1>;
    }

    const bountyData = bounty[0];

    return (
      <>
        <Header />
        <div className="container mx-auto px-4 pt-36">
          <div className="flex flex-col md:flex-row justify-center items-start">
            <div className="hidden md:block w-1/4 sticky top-20">
              <TableOfContents article={bountyData} title="In this bounty" />

              <h3 className="text-sm font-semibold mt-8 mb-4">Actions</h3>
              <SaveLink bounty={bountyData} />
            </div>
            <div className="w-full md:w-2/3 md:pr-4">
              <BountyView bounty={bountyData} />
            </div>
            <div className="w-full md:w-1/3 md:pl-4">
              {/* <BountySidebar bounty={bountyData} /> */}
            </div>
          </div>
        </div>
      </>
    );
  } catch (error) {
    console.error("Error fetching bounty data:", error);
    return <h1>bounty Not Found</h1>;
  }
}