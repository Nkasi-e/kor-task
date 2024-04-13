import { Model, Schema } from "../../../config/database";
import { User } from "./data-type";

const UserSchema = new Schema<User>(
  {
    id: Schema.Types.ObjectId,
    username: { type: String },
    email: { type: String, default: null },
    status: { type: String, default: null },
    friends: [{ type: Schema.Types.ObjectId, ref: "user" }],
  },
  { timestamps: true, minimize: true, id: true }
);

export default Model<User>("user", UserSchema);
