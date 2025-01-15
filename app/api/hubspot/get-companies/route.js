// app/api/hubspot/get-companies/route.js

export async function GET(req) {
  const HUBSPOT_API_URL = "https://api.hubapi.com/crm/v3/objects/companies";
  const ACCESS_TOKEN = process.env.HUBSPOT_ACCESS_TOKEN;
  const LIMIT = 50; // Max limit per request (HubSpot API allows up to 100)
  
  async function fetchCompanies(after = null) {
    const url = new URL(HUBSPOT_API_URL);
    url.searchParams.append("limit", LIMIT);
    url.searchParams.append("properties", "is_active,discord_category_id,name,drive_folder_id"); // Include is_active property
    if (after) {
      url.searchParams.append("after", after);
    }

    const response = await fetch(url, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${ACCESS_TOKEN}`,
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message);
    }

    return response.json();
  }

  try {
    let allCompanies = [];
    let after = null;
    let hasMore = true;

    // Fetch all companies by iterating over pages
    while (hasMore) {
      const { results, paging } = await fetchCompanies(after);
      allCompanies = allCompanies.concat(results);
      after = paging?.next?.after || null;
      hasMore = !!after; // Continue if there's a next page
    }

    // filter companies where is_active === "Yes"
    allCompanies = allCompanies.filter(company => company.properties.is_active === "true");

    // sort allCompanies by name
    allCompanies.sort((a, b) => a.properties.name.localeCompare(b.properties.name));
    return Response.json({ companies: allCompanies }, { status: 200 });
  } catch (error) {
    console.error("Error fetching company data:", error);
    return Response.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}