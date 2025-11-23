import { connectDB } from "@/config/database";
import Message from "@/models/Message";
import { getSessionUser } from "@/utils/getSessionUser";

export const dynamic = "force-dynamic";

// POST /api/messages/[id]
export const PUT = async (
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) => {
  try {
    const { id } = await params;

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

    const message = await Message.findById(id);
    if (!message) {
      return Response.json({ error: "Message not found" }, { status: 404 });
    }
    // Verify Ownership
    if (message.recipient.toString() !== userId) {
      return new Response("Unauthorized", { status: 401 });
    }
    // Update message to read/unread depending on the current status
    message.read = !message.read;

    await message.save();
    return new Response(JSON.stringify({ message }), { status: 200 });
  } catch (err) {
    console.error("Error in POST /api/messages/[id]:", err);
    return new Response(JSON.stringify({ error: "Internal Server Error" }), {
      status: 500,
    });
  }
};
