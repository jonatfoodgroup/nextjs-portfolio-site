export async function GET(req, { params }) {
  const { companyId } = params; // Extract the company ID from the URL
  const HUBSPOT_API_URL = `https://api.hubapi.com/crm/v3/objects/companies/${companyId}`;
  const ACCESS_TOKEN = process.env.HUBSPOT_ACCESS_TOKEN; // Replace with your actual token

  console.log("Getting company by ID:", companyId);
  try {
    // Include additional properties, including the logo URL
    const url = new URL(HUBSPOT_API_URL);
    url.searchParams.append("properties", "is_active,discord_category_id,name,drive_folder_id,company_context,managing_content_,hs_logo");

    // Fetch specific company data from HubSpot API
    const response = await fetch(url.toString(), {
      method: "GET",
      headers: {
        Authorization: `Bearer ${ACCESS_TOKEN}`,
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      const errorData = await response.json();
      return Response.json(
        { error: errorData.message || "Failed to fetch company" },
        { status: response.status }
      );
    }

    const data = await response.json();

    return Response.json(
      {
        company: {
          ...data,
          properties: {
            ...data.properties,
            hs_logo: data.properties.hs_logo ? data.properties.hs_logo.value : null,
          },
        },
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error fetching company by ID:", error);
    return Response.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}