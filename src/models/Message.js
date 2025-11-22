import { Schema, model, models, ObjectId } from "mongoose";
const MessageShema = new Schema(
  {
    sender: { type: ObjectId, ref: "User", required: true },
    recipient: { type: ObjectId, ref: "User", required: true },
    property: { type: ObjectId, ref: "Property", required: true },
    name: { type: String, required: [true, "Name is required"] },
    email: { type: String, required: [true, "Email is required"] },
    phone: { type: String, required: [true, "Phone is required"] },
    body: { type: String, required: true },
  },
  {
    Timestamp: true,
  }
);

const Message = models.Message || model("Message", MessageShema);

export default Message;
