import connectDB from "@/config/database";
export const GET = async (request) => {
  try {
    await connectDB();
    return new Response(
      JSON.stringify({ message: "Hello World", DBConnect: "connected" }),
      { status: 200 }
    );
  } catch (err) {
    console.log(err);
    return new Response("Something Went Wrong", { status: 500 });
  }
};
