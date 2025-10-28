import connectDB from "@/config/database";
import Property from "@/modules/Porperty";
// GET /api/properties
export const GET = async () => {
  try {
    await connectDB();

    const properties = await Property.find({});
    return new Response(JSON.stringify(properties), {
      status: 200,
    });
  } catch (err) {
    console.log(err);
    return new Response("Something Went Wrong", { status: 500 });
  }
};
