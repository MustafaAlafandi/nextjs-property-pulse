import { connectDB } from "@/config/database";
import Property from "@/models/Property";
import User from "@/models/User";
import { getSessionUser } from "@/utils/getSessionUser";

export const dynamic = "force-dynamic";

// POST /api/bookmarks/check
export const POST = async (request: Request) => {
  try {
    await connectDB();
    const { propertyId } = await request.json();
    const sessionUser = await getSessionUser();
    let userId;

    if (process.env.NEXT_PUBLIC_REGESTRING_ADDED === "true") {
      if (!sessionUser || !sessionUser.userId) {
        return new Response("User ID is required", {
          status: 401,
        });
      }
      userId = sessionUser.userId;
    } else {
      userId = process.env.NEXT_PUBLIC_TEST_PROFILE_ID;
    }

    // Find user in database
    const user = await User.findOne({ _id: userId });

    // Check if property is bookmarked
    let isBookmarked = user.bookmarks.includes(propertyId);

    return new Response(JSON.stringify({ isBookmarked }), {
      status: 200,
    });
  } catch (err) {
    console.error(err);
    return new Response("Something went wrong", { status: 500 });
  }
};
