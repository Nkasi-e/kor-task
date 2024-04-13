import bcrypt from "bcrypt";

class SecurityRepository {
  static hashPassword = (password: string): string => {
    return bcrypt.hashSync(password, 10);
  };

  static comparePassword = (
    password: string,
    hashedPassword: string
  ): boolean => {
    try {
      return bcrypt.compareSync(password, hashedPassword);
    } catch (error) {
      return false;
    }
  };
}

export default SecurityRepository;
