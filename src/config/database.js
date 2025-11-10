import mongoose from "mongoose"

 const connectDB = async () =>{
    // Ensure that only the fields that are specified in our schema will be saved in the database.
    mongoose.set('strictQuery',true);
    // Connect to MongoDB
    try{
        await mongoose.connect(process.env.MONGODB_URI);
        console.log("MongoDB connected successfully...");
    }catch(err){
        console.log(err);
    }
 }
 const disconnectDB = async ()=>{
    try{
        await mongoose.disconnect();
        console.log("MongoDB disconnected successfully");
    }catch(err)
    {
        console.log("Disconnect MongoDB failed");
    }
 }
 export {connectDB,disconnectDB};