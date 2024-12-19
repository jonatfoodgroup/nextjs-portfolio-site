
  // app/api/hubspot/get-companies/route.js

export async function GET(req) {
    const HUBSPOT_API_URL = "https://api.hubapi.com/crm/v3/objects/companies";
    const ACCESS_TOKEN = process.env.HUBSPOT_ACCESS_TOKEN;
  
    try {
      // Fetch company data from HubSpot API
      const response = await fetch(HUBSPOT_API_URL, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${ACCESS_TOKEN}`,
          "Content-Type": "application/json",
        },
      });
  
      if (!response.ok) {
        const errorData = await response.json();
        return Response.json(
          { error: errorData.message },
          { status: response.status }
        );
      }
  
      const data = await response.json();
      return Response.json({ companies: data }, { status: 200 });
    } catch (error) {
      console.error("Error fetching company data:", error);
      return Response.json(
        { error: "Internal server error" },
        { status: 500 }
      );
    }
  }