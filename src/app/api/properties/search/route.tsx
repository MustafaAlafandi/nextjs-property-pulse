import { connectDB } from "@/config/database";
import Property from "@/modules/Property";

// GET /api/properties/search
export const GET = async (request) => {
  try {
    await connectDB();

    const { searchParams } = new URL(request.url);
    const location = searchParams.get("location") || "";
    const propertyType = searchParams.get("propertyType") || "All";

    const locationPattern = new RegExp(location, "i");
    // Match location pattern against database fields
    let query = {
      $or: [
        { name: locationPattern },
        { description: locationPattern },
        { "location.street": locationPattern },
        { "location.city": locationPattern },
        { "location.state": locationPattern },
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
