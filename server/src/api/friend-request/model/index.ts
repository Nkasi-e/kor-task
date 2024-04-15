import { IRequest } from "./data-type";
import { Model, Schema } from "../../../config/database";

const FriendRequestSchema = new Schema<IRequest>(
  {
    id: Schema.Types.ObjectId,
    sender_id: { type: Schema.Types.ObjectId, ref: "user", required: true },
    receiver_id: { type: Schema.Types.ObjectId, ref: "user", required: true },
    status: {
      type: String,
      required: true,
      enum: ["pending", "accepted", "declined"],
      default: "pending",
    },
  },
  { timestamps: true, minimize: false, id: true }
);

export default Model<IRequest>("friend_request", FriendRequestSchema);
