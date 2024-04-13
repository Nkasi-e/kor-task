import { Model, Schema } from "../../../config/database";
import { User } from "./data-type";

const UserSchema = new Schema<User>(
  {
    id: Schema.Types.ObjectId,
    username: { type: String },
    email: { type: String },
    status: { type: String },
    friends: [{ type: Schema.Types.ObjectId, ref: "user" }],
  },
  { timestamps: true, minimize: false, id: true }
);

export default Model<User>("user", UserSchema);
