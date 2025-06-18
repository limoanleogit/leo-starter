import { Arg, Mutation, Resolver } from "type-graphql";
import { User } from "../entities/User";
import * as bcrypt from 'bcryptjs'
import { LoginResponse, UserLogin } from "../types";
import * as jwt from "jsonwebtoken";

@Resolver()
export class LoginResolver {
  @Mutation(() => LoginResponse)
  async login(@Arg("input") { username, password }: UserLogin): Promise<LoginResponse> {

    const user = await User.findOne({ where: { username } })

    if (!user) {
        return {
            errors: [
                {
                    field: "username",
                    message: "That username doesn't exist"
                }
            ],
        }
    }

    const valid = await bcrypt.compare(password, user.password)

    if (!valid) {
        return {
            errors: [
                {
                    field: "password",
                    message: "That password is wrong"
                }
            ],
        }
    }

    const token = jwt.sign(
        { userId: user.id },
        process.env.JWT_SECRET || "secret",
        { expiresIn: "1h" }
    );
    return { token, userId: user.id.toString() };
  }
}