import UserSchema from "./model";
import { IUserRepository } from "./model/data-type";
import { handleAsyncRequest } from "../../common/helper";

class UserHandler implements IUserRepository {
  async create(data: any): Promise<any> {
    const user = await handleAsyncRequest(UserSchema.create(data));
    return user;
  }

  async update(id: string, data: any): Promise<any> {
    const options = {
      lean: true,
      new: true,
      upsert: true,
      fields: {} as { [key: string]: number },
    };

    Object.keys(data).forEach((field) => {
      options.fields[field] = 1;
    });
    const user = await handleAsyncRequest(
      UserSchema.findByIdAndUpdate(id, data, options)
    );

    return user;
  }

  async findByEmail(email: string): Promise<any> {
    const user = await handleAsyncRequest(UserSchema.findOne({ email }));
    return user;
  }

  async findOne(usernameOrEmail: string): Promise<any> {
    const user = await handleAsyncRequest(
      UserSchema.findOne({
        $or: [{ email: usernameOrEmail }, { username: usernameOrEmail }],
      })
    );
    return user;
  }

  async getAll(): Promise<any> {
    const user = await handleAsyncRequest(UserSchema.find());

    return user;
  }

  async get(id: any): Promise<any> {
    const user = await handleAsyncRequest(UserSchema.findById(id));

    return user;
  }
  async findByUsername(username: string): Promise<any> {
    const user = await handleAsyncRequest(UserSchema.findOne({ username }));
    return user;
  }

  async blockUser(id: any, blockedUserId: string): Promise<any> {
    const user = await handleAsyncRequest(
      UserSchema.findByIdAndUpdate(id, {
        $addToSet: { blocked_users: blockedUserId },
      }).lean()
    );
    return user;
  }

  async reportStatus(id: any, reportUserId: string): Promise<any> {
    const user = await handleAsyncRequest(
      UserSchema.findByIdAndUpdate(id, {
        $addToSet: { reported_by: reportUserId },
        $inc: { report_count: 1 },
      })
    );
    return user;
  }
}

const UserRepository = new UserHandler();

export default UserRepository;
