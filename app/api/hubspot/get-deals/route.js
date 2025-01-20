// app/api/hubspot/get-Deals/route.js

const calculateActuals = (deals) => {    // loop over the deals
    let total = 0;
    let closedBusiness = 0;

    // remove closed lost deals
    deals = deals.filter((deal) => {
        return deal.properties.dealstage !== "closedlost";
    });

    //  if project type is One off then the amount is the same, however, if the project type is Retainer then the amount is multiplied by the forecast duration which is a string and should be parsed
    deals.forEach((deal) => {
        const projectType = deal.properties.project_type;
        const forecastDuration = deal.properties.forecast_duration;
        const amount = parseInt(deal.properties.amount);

        if (projectType === "One off") {
            if (deal.properties.dealstage === "closedwon") {
                closedBusiness += amount;
            }
            total += amount;
        } else if (projectType === "Retainer") {
            if (deal.properties.dealstage === "closedwon") {
                closedBusiness += amount * parseInt(forecastDuration);
            }
            total += amount * parseInt(forecastDuration);
        }
    });

    return { total, closedBusiness };

}

export async function GET(req) {
    const HUBSPOT_API_URL = "https://api.hubapi.com/crm/v3/objects/Deals";
    const ACCESS_TOKEN = process.env.HUBSPOT_ACCESS_TOKEN;
    const LIMIT = 50; // Max limit per request (HubSpot API allows up to 100)
    

    async function fetchDeals(after = null) {
        const url = new URL(HUBSPOT_API_URL);
        url.searchParams.append("limit", LIMIT);
        url.searchParams.append("properties", "project_type,forecast_duration,amount,dealstage"); // Include is_active property
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

        console.log()
        return response.json();
    }

    try {
        let allDeals = [];
        let after = null;
        let hasMore = true;

        // Fetch all Deals by iterating over pages
        while (hasMore) {
            const { results, paging } = await fetchDeals(after);
            allDeals = allDeals.concat(results);
            after = paging?.next?.after || null;
            hasMore = !!after; // Continue if there's a next page
        }

        let {total, closedBusiness} = calculateActuals(allDeals);
        console.log(total);
        return Response.json({ Total: total, ClosedBusiness: closedBusiness, Deals: allDeals }, { status: 200 });
    } catch (error) {
        console.error("Error fetching company data:", error);
        return Response.json(
            { error: "Internal server error" },
            { status: 500 }
        );
    }
}