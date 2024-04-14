import { INotification } from "./data-type";
import { Model, Schema } from "../../../config/database";

const NotificationSchema = new Schema<INotification>(
  {
    id: Schema.Types.ObjectId,
    receiver_id: { type: Schema.Types.ObjectId, ref: "user", required: true },
    message: { type: String, required: true },
    type: {
      type: String,
      enum: [
        "friend_request",
        "friend_request_accepted",
        "friend_request_rejected",
        "status_update",
      ],
      required: true,
    },
  },
  { timestamps: true, minimize: false, id: true }
);

export default Model<INotification>("notification", NotificationSchema);
