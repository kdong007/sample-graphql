import { GraphQLResolveInfo } from 'graphql';
import { StudentDoc } from '../data';
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
export type RequireFields<T, K extends keyof T> = Omit<T, K> & { [P in K]-?: NonNullable<T[P]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
};

export type AddStudentInput = {
  firstName: Scalars['String']['input'];
  /** optional, autogenerate if null */
  id?: InputMaybe<Scalars['ID']['input']>;
  lastName: Scalars['String']['input'];
};

export type Course = {
  __typename?: 'Course';
  id: Scalars['ID']['output'];
  name: Scalars['String']['output'];
  students: Array<Student>;
};

export type EditStudentInput = {
  firstName?: InputMaybe<Scalars['String']['input']>;
  lastName?: InputMaybe<Scalars['String']['input']>;
};

export type Mutation = {
  __typename?: 'Mutation';
  addFriend: StudentFriendshipResult;
  addStudent: StudentResult;
  dropCourse: StudentEnrollmentResult;
  editStudent: StudentResult;
  enrollCourse: StudentEnrollmentResult;
  unFriend: StudentFriendshipResult;
};


export type MutationAddFriendArgs = {
  student1: Scalars['ID']['input'];
  student2: Scalars['ID']['input'];
};


export type MutationAddStudentArgs = {
  student: AddStudentInput;
};


export type MutationDropCourseArgs = {
  courseId: Scalars['ID']['input'];
  studentId: Scalars['ID']['input'];
};


export type MutationEditStudentArgs = {
  id: Scalars['ID']['input'];
  updates: EditStudentInput;
};


export type MutationEnrollCourseArgs = {
  courseId: Scalars['ID']['input'];
  studentId: Scalars['ID']['input'];
};


export type MutationUnFriendArgs = {
  student1: Scalars['ID']['input'];
  student2: Scalars['ID']['input'];
};

export type Name = {
  __typename?: 'Name';
  firstName: Scalars['String']['output'];
  fullName: Scalars['String']['output'];
  lastName: Scalars['String']['output'];
};

export type Query = {
  __typename?: 'Query';
  /** get course by ID */
  course?: Maybe<Course>;
  /**
   * Search for multiple courses
   * (This comment will exist in Graphql Playground DOCS)
   */
  searchCourses: Array<Course>;
  /**
   * Search for multiple students
   * (This comment will exist in Graphql Playground DOCS)
   */
  searchStudents: Array<Student>;
  /** get student by ID */
  student?: Maybe<Student>;
};


export type QueryCourseArgs = {
  id: Scalars['ID']['input'];
};


export type QuerySearchCoursesArgs = {
  keyword?: InputMaybe<Scalars['String']['input']>;
};


export type QuerySearchStudentsArgs = {
  keyword?: InputMaybe<Scalars['String']['input']>;
};


export type QueryStudentArgs = {
  id: Scalars['ID']['input'];
};

export type Student = {
  __typename?: 'Student';
  courses: Array<Course>;
  friends: Array<Student>;
  id: Scalars['ID']['output'];
  name: Name;
};

export type StudentEnrollmentResult = {
  __typename?: 'StudentEnrollmentResult';
  failureReason?: Maybe<Scalars['String']['output']>;
  student?: Maybe<Student>;
  success: Scalars['Boolean']['output'];
};

export type StudentFriendshipResult = {
  __typename?: 'StudentFriendshipResult';
  failureReason?: Maybe<Scalars['String']['output']>;
  students?: Maybe<Array<Student>>;
  success: Scalars['Boolean']['output'];
};

export type StudentResult = {
  __typename?: 'StudentResult';
  failureReason?: Maybe<Scalars['String']['output']>;
  student?: Maybe<Student>;
  success: Scalars['Boolean']['output'];
};

export type WithIndex<TObject> = TObject & Record<string, any>;
export type ResolversObject<TObject> = WithIndex<TObject>;

export type ResolverTypeWrapper<T> = Promise<T> | T;


export type ResolverWithResolve<TResult, TParent, TContext, TArgs> = {
  resolve: ResolverFn<TResult, TParent, TContext, TArgs>;
};
export type Resolver<TResult, TParent = {}, TContext = {}, TArgs = {}> = ResolverFn<TResult, TParent, TContext, TArgs> | ResolverWithResolve<TResult, TParent, TContext, TArgs>;

export type ResolverFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => Promise<TResult> | TResult;

export type SubscriptionSubscribeFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => AsyncIterable<TResult> | Promise<AsyncIterable<TResult>>;

export type SubscriptionResolveFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

export interface SubscriptionSubscriberObject<TResult, TKey extends string, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<{ [key in TKey]: TResult }, TParent, TContext, TArgs>;
  resolve?: SubscriptionResolveFn<TResult, { [key in TKey]: TResult }, TContext, TArgs>;
}

export interface SubscriptionResolverObject<TResult, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<any, TParent, TContext, TArgs>;
  resolve: SubscriptionResolveFn<TResult, any, TContext, TArgs>;
}

export type SubscriptionObject<TResult, TKey extends string, TParent, TContext, TArgs> =
  | SubscriptionSubscriberObject<TResult, TKey, TParent, TContext, TArgs>
  | SubscriptionResolverObject<TResult, TParent, TContext, TArgs>;

export type SubscriptionResolver<TResult, TKey extends string, TParent = {}, TContext = {}, TArgs = {}> =
  | ((...args: any[]) => SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>)
  | SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>;

export type TypeResolveFn<TTypes, TParent = {}, TContext = {}> = (
  parent: TParent,
  context: TContext,
  info: GraphQLResolveInfo
) => Maybe<TTypes> | Promise<Maybe<TTypes>>;

export type IsTypeOfResolverFn<T = {}, TContext = {}> = (obj: T, context: TContext, info: GraphQLResolveInfo) => boolean | Promise<boolean>;

export type NextResolverFn<T> = () => Promise<T>;

export type DirectiveResolverFn<TResult = {}, TParent = {}, TContext = {}, TArgs = {}> = (
  next: NextResolverFn<TResult>,
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;



/** Mapping between all available schema types and the resolvers types */
export type ResolversTypes = ResolversObject<{
  AddStudentInput: ResolverTypeWrapper<Partial<AddStudentInput>>;
  Boolean: ResolverTypeWrapper<Partial<Scalars['Boolean']['output']>>;
  Course: ResolverTypeWrapper<Partial<Omit<Course, 'students'> & { students: Array<ResolversTypes['Student']> }>>;
  EditStudentInput: ResolverTypeWrapper<Partial<EditStudentInput>>;
  ID: ResolverTypeWrapper<Partial<Scalars['ID']['output']>>;
  Mutation: ResolverTypeWrapper<{}>;
  Name: ResolverTypeWrapper<Partial<Name>>;
  Query: ResolverTypeWrapper<{}>;
  String: ResolverTypeWrapper<Partial<Scalars['String']['output']>>;
  Student: ResolverTypeWrapper<StudentDoc>;
  StudentEnrollmentResult: ResolverTypeWrapper<Partial<Omit<StudentEnrollmentResult, 'student'> & { student?: Maybe<ResolversTypes['Student']> }>>;
  StudentFriendshipResult: ResolverTypeWrapper<Partial<Omit<StudentFriendshipResult, 'students'> & { students?: Maybe<Array<ResolversTypes['Student']>> }>>;
  StudentResult: ResolverTypeWrapper<Partial<Omit<StudentResult, 'student'> & { student?: Maybe<ResolversTypes['Student']> }>>;
}>;

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = ResolversObject<{
  AddStudentInput: Partial<AddStudentInput>;
  Boolean: Partial<Scalars['Boolean']['output']>;
  Course: Partial<Omit<Course, 'students'> & { students: Array<ResolversParentTypes['Student']> }>;
  EditStudentInput: Partial<EditStudentInput>;
  ID: Partial<Scalars['ID']['output']>;
  Mutation: {};
  Name: Partial<Name>;
  Query: {};
  String: Partial<Scalars['String']['output']>;
  Student: StudentDoc;
  StudentEnrollmentResult: Partial<Omit<StudentEnrollmentResult, 'student'> & { student?: Maybe<ResolversParentTypes['Student']> }>;
  StudentFriendshipResult: Partial<Omit<StudentFriendshipResult, 'students'> & { students?: Maybe<Array<ResolversParentTypes['Student']>> }>;
  StudentResult: Partial<Omit<StudentResult, 'student'> & { student?: Maybe<ResolversParentTypes['Student']> }>;
}>;

export type CourseResolvers<ContextType = any, ParentType extends ResolversParentTypes['Course'] = ResolversParentTypes['Course']> = ResolversObject<{
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  students?: Resolver<Array<ResolversTypes['Student']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type MutationResolvers<ContextType = any, ParentType extends ResolversParentTypes['Mutation'] = ResolversParentTypes['Mutation']> = ResolversObject<{
  addFriend?: Resolver<ResolversTypes['StudentFriendshipResult'], ParentType, ContextType, RequireFields<MutationAddFriendArgs, 'student1' | 'student2'>>;
  addStudent?: Resolver<ResolversTypes['StudentResult'], ParentType, ContextType, RequireFields<MutationAddStudentArgs, 'student'>>;
  dropCourse?: Resolver<ResolversTypes['StudentEnrollmentResult'], ParentType, ContextType, RequireFields<MutationDropCourseArgs, 'courseId' | 'studentId'>>;
  editStudent?: Resolver<ResolversTypes['StudentResult'], ParentType, ContextType, RequireFields<MutationEditStudentArgs, 'id' | 'updates'>>;
  enrollCourse?: Resolver<ResolversTypes['StudentEnrollmentResult'], ParentType, ContextType, RequireFields<MutationEnrollCourseArgs, 'courseId' | 'studentId'>>;
  unFriend?: Resolver<ResolversTypes['StudentFriendshipResult'], ParentType, ContextType, RequireFields<MutationUnFriendArgs, 'student1' | 'student2'>>;
}>;

export type NameResolvers<ContextType = any, ParentType extends ResolversParentTypes['Name'] = ResolversParentTypes['Name']> = ResolversObject<{
  firstName?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  fullName?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  lastName?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type QueryResolvers<ContextType = any, ParentType extends ResolversParentTypes['Query'] = ResolversParentTypes['Query']> = ResolversObject<{
  course?: Resolver<Maybe<ResolversTypes['Course']>, ParentType, ContextType, RequireFields<QueryCourseArgs, 'id'>>;
  searchCourses?: Resolver<Array<ResolversTypes['Course']>, ParentType, ContextType, Partial<QuerySearchCoursesArgs>>;
  searchStudents?: Resolver<Array<ResolversTypes['Student']>, ParentType, ContextType, Partial<QuerySearchStudentsArgs>>;
  student?: Resolver<Maybe<ResolversTypes['Student']>, ParentType, ContextType, RequireFields<QueryStudentArgs, 'id'>>;
}>;

export type StudentResolvers<ContextType = any, ParentType extends ResolversParentTypes['Student'] = ResolversParentTypes['Student']> = ResolversObject<{
  courses?: Resolver<Array<ResolversTypes['Course']>, ParentType, ContextType>;
  friends?: Resolver<Array<ResolversTypes['Student']>, ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  name?: Resolver<ResolversTypes['Name'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type StudentEnrollmentResultResolvers<ContextType = any, ParentType extends ResolversParentTypes['StudentEnrollmentResult'] = ResolversParentTypes['StudentEnrollmentResult']> = ResolversObject<{
  failureReason?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  student?: Resolver<Maybe<ResolversTypes['Student']>, ParentType, ContextType>;
  success?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type StudentFriendshipResultResolvers<ContextType = any, ParentType extends ResolversParentTypes['StudentFriendshipResult'] = ResolversParentTypes['StudentFriendshipResult']> = ResolversObject<{
  failureReason?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  students?: Resolver<Maybe<Array<ResolversTypes['Student']>>, ParentType, ContextType>;
  success?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type StudentResultResolvers<ContextType = any, ParentType extends ResolversParentTypes['StudentResult'] = ResolversParentTypes['StudentResult']> = ResolversObject<{
  failureReason?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  student?: Resolver<Maybe<ResolversTypes['Student']>, ParentType, ContextType>;
  success?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type Resolvers<ContextType = any> = ResolversObject<{
  Course?: CourseResolvers<ContextType>;
  Mutation?: MutationResolvers<ContextType>;
  Name?: NameResolvers<ContextType>;
  Query?: QueryResolvers<ContextType>;
  Student?: StudentResolvers<ContextType>;
  StudentEnrollmentResult?: StudentEnrollmentResultResolvers<ContextType>;
  StudentFriendshipResult?: StudentFriendshipResultResolvers<ContextType>;
  StudentResult?: StudentResultResolvers<ContextType>;
}>;


export type TestGetStudentQueryVariables = Exact<{
  id: Scalars['ID']['input'];
}>;


export type TestGetStudentQuery = { __typename?: 'Query', student?: { __typename?: 'Student', id: string, name: { __typename?: 'Name', firstName: string, lastName: string, fullName: string } } | null };


export const TestGetStudentDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"testGetStudent"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"student"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"firstName"}},{"kind":"Field","name":{"kind":"Name","value":"lastName"}},{"kind":"Field","name":{"kind":"Name","value":"fullName"}}]}}]}}]}}]} as unknown as DocumentNode<TestGetStudentQuery, TestGetStudentQueryVariables>;