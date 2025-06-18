import { Arg, Mutation, Query, Resolver, Ctx } from "type-graphql";
import { User } from "../entities/User";
import { FieldError, UserInput } from "../types";
import * as bcrypt from "bcryptjs";
import { Context } from "../middleware/auth";

@Resolver()
export class userResolver {
  @Mutation(() => User)
  async register(@Arg("input") input: UserInput): Promise<User | undefined> {
    const { username, firstname, lastname, email, password } = input;
    const existingUser = await User.findOne({ where: { username } });
    if (existingUser && existingUser.username.length <= 2) {
      throw new Error("Length of username must be greater than 2")
    }
    const existingEmail = await User.findOne({ where: { email } });
    if (existingEmail && existingEmail.email.length <= 2) {
      throw new Error("Length of email must be greater than 2")
    }
    
    if (existingEmail) {
      throw new Error("Email already exists")
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = User.create({
      username,
      firstname,
      lastname,
      email,
      password: hashedPassword,
    });
    try {
      await user.save();
    } catch (error) {
      if (error.code === "23505" || error.detail.includes("already exists")) {
        throw new Error("User already exists")
      }
    }
    return user;
  }

  @Query(() => User, { nullable: true })
  async getUsername(
    @Arg("userId") userId: string
  ): Promise<User | null> {
    return User.findOne({ where: { id: parseInt(userId) } });
  }
}
