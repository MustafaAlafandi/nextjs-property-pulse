import { connectDB } from "@/config/database";
import Message from "@/models/Message";
import { getSessionUser } from "@/utils/getSessionUser";

export const dynamic = "force-dynamic";

// POST /api/messages

export const POST = async (request: Request) => {
  try {
    await connectDB();

    const { name, email, phone, message, property, recipient } =
      await request.json();

    let sessionUser;
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
      return new Response(
        JSON.stringify({ error: "You must be logged in to send a message" }),
        {
          status: 401,
        }
      );
    }

    const { user } = sessionUser;

    // Can NOT send message to self
    if (user.id === recipient) {
      return new Response(
        JSON.stringify({ error: "Cannot send message to self" }),
        { status: 400 }
      );
    }

    const newMessage = new Message({
      sender: user.id,
      recipient,
      property,
      name,
      email,
      phone,
      body: message,
    });

    await newMessage.save();

    return new Response(
      JSON.stringify({ message: "Message sent successfully" }),
      {
        status: 201,
      }
    );
  } catch (err) {
    console.error("Error in POST /api/properties/messages:", err);
    return new Response(JSON.stringify({ error: "Internal Server Error" }), {
      status: 500,
    });
  }
};
