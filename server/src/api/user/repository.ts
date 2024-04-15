import UserSchema from "./model";
import { IUserRepository } from "./model/data-type";
import { handleAsyncRequest, handleResponseFormat } from "../../common/helper";

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
    console.log(user.error);
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
}

const UserRepository = new UserHandler();

export default UserRepository;
