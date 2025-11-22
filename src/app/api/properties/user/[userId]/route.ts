import { connectDB,  } from "@/config/database";
import Property from "@/models/Property";
// GET /api/properties/user/:userId
export const GET = async (
  requst: Response,
  { params }: { params: Promise<{ userId: string }> }
) => {
  try {
    const { userId } = await params;

    await connectDB();

    if (!userId) {
      return new Response("User Id is required", { status: 400 });
    }

    const properties = await Property.find({ owner: userId });
    return new Response(JSON.stringify(properties), {
      status: 200,
    });
  } catch (err) {
    console.log(err);
    return new Response("Something Went Wrong", { status: 500 });
  } finally {
    // await ();
  }
};