import { connectDB } from "@/config/database";
import User from "@/models/User";
import Property from "@/models/Property";
import { getSessionUser } from "@/utils/getSessionUser";

export const dynamic = "force-dynamic";
// GET /api/bookmarks
export const GET = async () => {
  try {
    await connectDB();
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
    const user = await User.findOne({_id:userId});

    // Get users bookmarks
    const bookmarks = await Property.find({_id:{$in:user.bookmarks}});

    return new Response(JSON.stringify(bookmarks),{status:200});
  } catch (err) {
    console.error(err);
    return new Response("Something went wrong",{status:500});
  }
};

// POST /api/bookmarks
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

    let message;

    if (isBookmarked) {
      // If alread bookmarked, remove it
      user.bookmarks.pull(propertyId);
      message = "Bookmark removed successfully";
      isBookmarked = false;
    } else {
      // If not isBookmarked, add it
      user.bookmarks.push(propertyId);
      message = "Bookmark added successfully";
      isBookmarked = true;
    }

    await user.save();

    return new Response(JSON.stringify({ message, isBookmarked }), {
      status: 200,
    });
  } catch (err) {
    console.error(err);
    return new Response("Something went wrong", { status: 500 });
  }
};
