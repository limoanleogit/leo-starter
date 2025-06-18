import { Length } from "class-validator";
import { InputType, Field, ObjectType } from "type-graphql";

@InputType()
export class UserInput {
  @Field(() => String)
  username!: string;
  @Field(() => String)
  email!: string;
  @Field(() => String)
  password!: string;
  @Field(() => String)
  firstname!: string;
  @Field(() => String)
  lastname!: string;
}

@InputType()
export class UserLogin {

  @Field(() => String)
  @Length(1, 255)
  username!: string;

  @Field(() => String)
  password!: string;

}

@ObjectType()
export class FieldError {
  @Field(() => String)
  field: string;
  @Field(() => String)
  message: string;
}

@ObjectType()
export class LoginResponse {
  @Field(() => [FieldError], { nullable: true })
  errors?: FieldError[];

  @Field(() => String, { nullable: true })
  token?: string;

  @Field(() => String, { nullable: true })
  userId?: string;
}

@InputType()
export class QuestionInput {
  @Field(() => String)
  film: string;

  @Field(() => String)
  acteur: string;

  @Field(() => Boolean)
  isFilmChoice: boolean;

}
