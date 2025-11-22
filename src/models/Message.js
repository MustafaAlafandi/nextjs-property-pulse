import { Shema, model, models } from "mongoose";

const MessageShema = new Shema(
  {
    sender: { type: Schema.Types.ObjectId, ref: "User", required: true },
    recipient: { type: Schema.Types.ObjectId, ref: "User", required: true },
    property: { type: Schema.Types.ObjectId, ref: "Property", required: true },
    name: { type: String, required: [true, "Name is required"] },
    email: { type: String, required: [true, "Email is required"] },
    phone: { type: String, required: [true, "Phone is required"] },
    body: { type: Boolean },
  },
  {
    Timestamp: true,
  }
);

const Message = models.Message || model("Message", MessageShema);

export default Message;