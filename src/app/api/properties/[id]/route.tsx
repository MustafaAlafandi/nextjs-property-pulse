import { connectDB, disconnectDB } from "@/config/database";
import Property from "@/modules/Property";
import { getSessionUser } from "@/utils/getSessionUser";
// GET api/properties/:id
export const GET = async (
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) => {
  try {
    const { id } = await params; // ← unwrap the promise
    await connectDB();

    const property = await Property.findById(id);
    if (!property) {
      return new Response("Property not Found", { status: 404 });
    }
    return new Response(JSON.stringify(property), { status: 200 });
  } catch (err) {
    console.error(err);
    return new Response("Something Went Wrong", { status: 500 });
  } finally {
    await disconnectDB();
  }
};

// DELETE api/properties/:id
export const DELETE = async (
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) => {
  try {
    const { id } = await params;
    let userId;
    if (process.env.NEXT_PUBLIC_REGESTRING_ADDED === "true") {
      const sessionUser = await getSessionUser();
      // Check for session
      if (!sessionUser || !sessionUser.userId) {
        return new Response("User ID is required", { status: 401 });
      }

      userId = sessionUser.userId;

    } else {

      userId = process.env.NEXT_PUBLIC_TEST_PROFILE_ID;
      
    }
    await connectDB();

    console.log("userId",userId);

    const property = await Property.findById(id);

    console.log("property",property);

    if (!property) {
      return new Response("Property not Found", { status: 404 });
    }
    // Verify Owership
    if (property.owner.toString() !== userId) {
      return new Response("Unauthorized", { status: 401 });
    }

    await property.deleteOne();

    return new Response(JSON.stringify(property), { status: 200 });
  } catch (err) {
    console.error(err);
    return new Response("Something Went Wrong", { status: 500 });
  } finally {
    await disconnectDB();
  }
};
