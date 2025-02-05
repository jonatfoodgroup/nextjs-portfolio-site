import campaignsData from "../../data/campaigns/campaignsData";

export async function GET(req) {
    return Response.json(campaignsData);
  }