import mongoose from "mongoose"

let connected = false;
 const connectDB = async () =>{
    // Ensure that only the fields that are specified in our schema will be saved in the database.
    mongoose.set('strictQuery',true);
    //If the database is already connected, don't connect again.
    if(connected){
        console.log("MongoDB is already connected...");
        return;
    }
    // Connect to MongoDB
    try{
        await mongoose.connect(process.env.MONGODB_URI);
        connected = true;
        console.log("MongoDB connected successfully...");
    }catch(err){
        console.log(err);
    }
 }
 export default connectDB;