import { connectDB, disconnectDB } from "@/config/database";
import User from "@/modules/User";
import Property from "@/modules/Property";
import { getSessionUser } from "@/utils/getSessionUser";

export const dynamic = "force-dynamic";
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
    let isBookMarked = user.bookmarks.includes(propertyId);

    let message;

    if (isBookMarked) {
      // If alread bookmarked, remove it
      user.bookmarks.pull(propertyId);
      message = "Bookmark removed successfully";
      isBookMarked = false;
    } else {
      // If not isBookMarked, add it
      user.bookmarks.push(propertyId);
      message = "Bookmark added successfully";
      isBookMarked = true;
    }

    await user.save();

    return new Response(JSON.stringify({ message, isBookMarked }), {
      status: 200,
    });
  } catch (err) {
    console.error(err);
    return new Response("Something went wrong", { status: 500 });
  }
};
