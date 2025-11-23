import { connectDB } from "@/config/database";
import Property from "@/models/Property";
// GET /api/properties/featured
export const GET = async (request: Request) => {
  try {
    await connectDB();
  
    const properties = await Property.find({is_featured:true});

    return new Response(JSON.stringify(properties), {
      status: 200,
    });
  } catch (err) {
    console.log(err);
    return new Response(JSON.stringify({error:"Internet server error"}), { status: 500 });
  }
};