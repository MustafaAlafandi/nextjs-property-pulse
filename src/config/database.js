import mongoose from "mongoose";
let connected = false;
const connectDB = async () => {
  // Ensure that only the fields that are specified in our schema will be saved in the database.
  mongoose.set("strictQuery", true);
  if (!connected) {
    // Connect to MongoDB
    try {
      console.log("MONGODB_URI", process.env.MONGODB_URI);
      await mongoose.connect(process.env.MONGODB_URI);
      //358151584376412:ErWd5wy9YithGSqPRKLu6D0i0WI@dhq8gapqp
      console.log("MongoDB connected successfully...");
      connected = true;
    } catch (err) {
      console.log(err);
    }
  }
};

export { connectDB };
