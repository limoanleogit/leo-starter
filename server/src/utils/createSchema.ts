import { GraphQLSchema } from "graphql";
import { buildSchema } from "type-graphql";
import { userResolver } from "../resolvers/user";
import { LoginResolver } from "../resolvers/login";
import { QuestionResolver } from "../resolvers/questions";

export const createSchema = (): Promise<GraphQLSchema> =>
  buildSchema({
    resolvers: [userResolver, LoginResolver, QuestionResolver],
    validate: false,
  });
