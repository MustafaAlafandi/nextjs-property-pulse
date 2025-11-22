import { connectDB } from "@/config/database";
import Property from "@/models/Property";

// GET /api/properties/search
export const GET = async (request:Request) => {
  try {
    await connectDB();

    const { searchParams } = new URL(request.url);
    const location = searchParams.get("location") || "";
    const propertyType = searchParams.get("propertyType") || "All";
    console.log("propertyType from backend",propertyType);
    const locationPattern = new RegExp(location, "i");
    // Match location pattern against database fields
    let query = {
      $or: [
        { name: locationPattern },
        { description: locationPattern },
        { "location.street": locationPattern },
        { "location.city": locationPattern },
        { "locati  on.state": locationPattern },
        { "location.zipcode": locationPattern },
      ],
    };
    
    // Only check for property if its not "All"
    if(propertyType && propertyType !== "All"){
    const typePattern = new RegExp(propertyType,'i');
    query.type = typePattern
    }
    const properties = await Property.find(query);

    return new Response(JSON.stringify({ properties }), {
      status: 200,
    });
  } catch (err) {
    console.error(err);
    return new Response(
      JSON.stringify({ message: "Failed to fetch properties" }),
      { status: 500 }
    );
  }
};
