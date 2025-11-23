import { connectDB } from "@/config/database";
import Message from "@/models/Message";
import { getSessionUser } from "@/utils/getSessionUser";

export const dynamic = "force-dynamic";

// PUT /api/messages/unread-count
export const GET = async () => {
  try {
    await connectDB();

    let sessionUser;
    let userId;
    if (process.env.NEXT_PUBLIC_REGESTRING_ADDED === "true") {
      sessionUser = await getSessionUser();
    } else {
      sessionUser = {
        user: {
          id: process.env.NEXT_PUBLIC_TEST_PROFILE_ID,
          name: process.env.NEXT_PUBLIC_TEST_PROFILE_NAME,
          email: process.env.NEXT_PUBLIC_TEST_PROFILE_EMAIL,
          image: process.env.NEXT_PUBLIC_TEST_PROFILE_IMAGE,
        },
      };
    }

    if (!sessionUser || !sessionUser.user) {
      return new Response(JSON.stringify({ error: "You must logged in" }), {
        status: 401,
      });
    }

    if (process.env.NEXT_PUBLIC_REGESTRING_ADDED === "true") {
      userId = sessionUser.userId;
    } else {
      userId = sessionUser.user.id;
    }

    const unreadedMessagesCount = await Message.countDocuments({ recipient:userId,read: false });

    return new Response(JSON.stringify({ count:unreadedMessagesCount }), { status: 200 });
  } catch (err) {
    console.error("Error in POST /api/messages/[id]:", err);
    return new Response(JSON.stringify({ error: "Internal Server Error" }), {
      status: 500,
    });
  }
};
