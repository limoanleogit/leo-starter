import gql from 'graphql-tag';
import * as Urql from 'urql';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = {
  [_ in K]?: never;
};
export type Incremental<T> =
  | T
  | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string };
  String: { input: string; output: string };
  Boolean: { input: boolean; output: boolean };
  Int: { input: number; output: number };
  Float: { input: number; output: number };
};

export type FieldError = {
  __typename?: 'FieldError';
  field: Scalars['String']['output'];
  message: Scalars['String']['output'];
};

export type LoginResponse = {
  __typename?: 'LoginResponse';
  errors?: Maybe<Array<FieldError>>;
  token?: Maybe<Scalars['String']['output']>;
  userId?: Maybe<Scalars['String']['output']>;
};

export type Mutation = {
  __typename?: 'Mutation';
  correctQuestions: Array<Scalars['Boolean']['output']>;
  login: LoginResponse;
  register: User;
};

export type MutationCorrectQuestionsArgs = {
  answers: Array<QuestionInput>;
};

export type MutationLoginArgs = {
  input: UserLogin;
};

export type MutationRegisterArgs = {
  input: UserInput;
};

export type Query = {
  __typename?: 'Query';
  getQuestion?: Maybe<Array<Questions>>;
  getUsername?: Maybe<User>;
  questionsfunc?: Maybe<Array<Questions>>;
};

export type QueryGetUsernameArgs = {
  userId: Scalars['String']['input'];
};

export type QuestionInput = {
  acteur: Scalars['String']['input'];
  film: Scalars['String']['input'];
  isFilmChoice: Scalars['Boolean']['input'];
};

export type Questions = {
  __typename?: 'Questions';
  acteur: Scalars['String']['output'];
  acteurImage: Scalars['String']['output'];
  createdAt: Scalars['String']['output'];
  film: Scalars['String']['output'];
  filmImage: Scalars['String']['output'];
  id: Scalars['Int']['output'];
  questionhash: Scalars['String']['output'];
  updatedAt: Scalars['String']['output'];
};

export type User = {
  __typename?: 'User';
  createdAt: Scalars['String']['output'];
  email: Scalars['String']['output'];
  firstname: Scalars['String']['output'];
  id: Scalars['Int']['output'];
  lastname: Scalars['String']['output'];
  password: Scalars['String']['output'];
  updatedAt: Scalars['String']['output'];
  username: Scalars['String']['output'];
};

export type UserInput = {
  email: Scalars['String']['input'];
  firstname: Scalars['String']['input'];
  lastname: Scalars['String']['input'];
  password: Scalars['String']['input'];
  username: Scalars['String']['input'];
};

export type UserLogin = {
  password: Scalars['String']['input'];
  username: Scalars['String']['input'];
};

export type LoginMutationVariables = Exact<{
  input: UserLogin;
}>;

export type LoginMutation = {
  __typename?: 'Mutation';
  login: { __typename?: 'LoginResponse'; token?: string | null; userId?: string | null };
};

export type CorrectQuestionsMutationVariables = Exact<{
  answers: Array<QuestionInput> | QuestionInput;
}>;

export type CorrectQuestionsMutation = {
  __typename?: 'Mutation';
  correctQuestions: Array<boolean>;
};

export type RegisterMutationVariables = Exact<{
  input: UserInput;
}>;

export type RegisterMutation = {
  __typename?: 'Mutation';
  register: {
    __typename?: 'User';
    email: string;
    firstname: string;
    lastname: string;
    username: string;
    password: string;
    createdAt: string;
    updatedAt: string;
  };
};

export type GetQuestionQueryVariables = Exact<{ [key: string]: never }>;

export type GetQuestionQuery = {
  __typename?: 'Query';
  getQuestion?: Array<{
    __typename?: 'Questions';
    id: number;
    questionhash: string;
    film: string;
    filmImage: string;
    acteur: string;
    acteurImage: string;
    createdAt: string;
    updatedAt: string;
  }> | null;
};

export type GetUsernameQueryVariables = Exact<{
  userId: Scalars['String']['input'];
}>;

export type GetUsernameQuery = {
  __typename?: 'Query';
  getUsername?: {
    __typename?: 'User';
    username: string;
    id: number;
    firstname: string;
    lastname: string;
  } | null;
};

export const LoginDocument = gql`
  mutation Login($input: UserLogin!) {
    login(input: $input) {
      token
      userId
    }
  }
`;

export function useLoginMutation() {
  return Urql.useMutation<LoginMutation, LoginMutationVariables>(LoginDocument);
}
export const CorrectQuestionsDocument = gql`
  mutation CorrectQuestions($answers: [QuestionInput!]!) {
    correctQuestions(answers: $answers)
  }
`;

export function useCorrectQuestionsMutation() {
  return Urql.useMutation<CorrectQuestionsMutation, CorrectQuestionsMutationVariables>(
    CorrectQuestionsDocument,
  );
}
export const RegisterDocument = gql`
  mutation Register($input: UserInput!) {
    register(input: $input) {
      email
      firstname
      lastname
      username
      password
      createdAt
      updatedAt
    }
  }
`;

export function useRegisterMutation() {
  return Urql.useMutation<RegisterMutation, RegisterMutationVariables>(RegisterDocument);
}
export const GetQuestionDocument = gql`
  query GetQuestion {
    getQuestion {
      id
      questionhash
      film
      filmImage
      acteur
      acteurImage
      createdAt
      updatedAt
    }
  }
`;

export function useGetQuestionQuery(
  options?: Omit<Urql.UseQueryArgs<GetQuestionQueryVariables>, 'query'>,
) {
  return Urql.useQuery<GetQuestionQuery, GetQuestionQueryVariables>({
    query: GetQuestionDocument,
    ...options,
  });
}
export const GetUsernameDocument = gql`
  query GetUsername($userId: String!) {
    getUsername(userId: $userId) {
      username
      id
      firstname
      lastname
    }
  }
`;

export function useGetUsernameQuery(
  options: Omit<Urql.UseQueryArgs<GetUsernameQueryVariables>, 'query'>,
) {
  return Urql.useQuery<GetUsernameQuery, GetUsernameQueryVariables>({
    query: GetUsernameDocument,
    ...options,
  });
}
