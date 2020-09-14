import { GraphQLResolveInfo } from 'graphql';
export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type RequireFields<T, K extends keyof T> = { [X in Exclude<keyof T, K>]?: T[X] } & { [P in K]-?: NonNullable<T[P]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
};

export type Name = {
  __typename?: 'Name';
  firstName: Scalars['String'];
  lastName: Scalars['String'];
  fullName: Scalars['String'];
};

export type Student = {
  __typename?: 'Student';
  id: Scalars['ID'];
  name: Name;
  courses: Array<Course>;
  friends: Array<Student>;
};

export type Course = {
  __typename?: 'Course';
  id: Scalars['ID'];
  name: Scalars['String'];
  students: Array<Student>;
};

export type Query = {
  __typename?: 'Query';
  /**
   * Search for mutiple students
   * (This comment will exist in Graphql Playground DOCS)
   */
  searchStudents: Array<Student>;
  /** get student by ID */
  student?: Maybe<Student>;
  /**
   * Search for mutiple courses
   * (This comment will exist in Graphql Playground DOCS)
   */
  searchCourses: Array<Course>;
  /** get course by ID */
  course?: Maybe<Course>;
};


export type QuerySearchStudentsArgs = {
  keyword?: Maybe<Scalars['String']>;
};


export type QueryStudentArgs = {
  id: Scalars['ID'];
};


export type QuerySearchCoursesArgs = {
  keyword?: Maybe<Scalars['String']>;
};


export type QueryCourseArgs = {
  id: Scalars['ID'];
};

export type StudentResult = {
  __typename?: 'StudentResult';
  success: Scalars['Boolean'];
  failureReason?: Maybe<Scalars['String']>;
  student?: Maybe<Student>;
};

export type AddStudentInput = {
  /** optional, autogenreate if null */
  id?: Maybe<Scalars['ID']>;
  firstName: Scalars['String'];
  lastName: Scalars['String'];
};

export type EditStudentInput = {
  firstName?: Maybe<Scalars['String']>;
  lastName?: Maybe<Scalars['String']>;
};

export type StudentEnrollmentResult = {
  __typename?: 'StudentEnrollmentResult';
  success: Scalars['Boolean'];
  failureReason?: Maybe<Scalars['String']>;
  student?: Maybe<Student>;
};

export type StudentFriendshipResult = {
  __typename?: 'StudentFriendshipResult';
  success: Scalars['Boolean'];
  failureReason?: Maybe<Scalars['String']>;
  students?: Maybe<Array<Student>>;
};

export type Mutation = {
  __typename?: 'Mutation';
  addStudent: StudentResult;
  editStudent: StudentResult;
  enrollCourse: StudentEnrollmentResult;
  dropCourse: StudentEnrollmentResult;
  addFriend: StudentFriendshipResult;
  unFriend: StudentFriendshipResult;
};


export type MutationAddStudentArgs = {
  student: AddStudentInput;
};


export type MutationEditStudentArgs = {
  id: Scalars['ID'];
  updates: EditStudentInput;
};


export type MutationEnrollCourseArgs = {
  studentId: Scalars['ID'];
  courseId: Scalars['ID'];
};


export type MutationDropCourseArgs = {
  studentId: Scalars['ID'];
  courseId: Scalars['ID'];
};


export type MutationAddFriendArgs = {
  student1: Scalars['ID'];
  student2: Scalars['ID'];
};


export type MutationUnFriendArgs = {
  student1: Scalars['ID'];
  student2: Scalars['ID'];
};

export type WithIndex<TObject> = TObject & Record<string, any>;
export type ResolversObject<TObject> = WithIndex<TObject>;

export type ResolverTypeWrapper<T> = Promise<T> | T;


export type LegacyStitchingResolver<TResult, TParent, TContext, TArgs> = {
  fragment: string;
  resolve: ResolverFn<TResult, TParent, TContext, TArgs>;
};

export type NewStitchingResolver<TResult, TParent, TContext, TArgs> = {
  selectionSet: string;
  resolve: ResolverFn<TResult, TParent, TContext, TArgs>;
};
export type StitchingResolver<TResult, TParent, TContext, TArgs> = LegacyStitchingResolver<TResult, TParent, TContext, TArgs> | NewStitchingResolver<TResult, TParent, TContext, TArgs>;
export type Resolver<TResult, TParent = {}, TContext = {}, TArgs = {}> =
  | ResolverFn<TResult, TParent, TContext, TArgs>
  | StitchingResolver<TResult, TParent, TContext, TArgs>;

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
) => AsyncIterator<TResult> | Promise<AsyncIterator<TResult>>;

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

export type IsTypeOfResolverFn<T = {}> = (obj: T, info: GraphQLResolveInfo) => boolean | Promise<boolean>;

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
  Name: ResolverTypeWrapper<Partial<Name>>;
  String: ResolverTypeWrapper<Partial<Scalars['String']>>;
  Student: ResolverTypeWrapper<Partial<Student>>;
  ID: ResolverTypeWrapper<Partial<Scalars['ID']>>;
  Course: ResolverTypeWrapper<Partial<Course>>;
  Query: ResolverTypeWrapper<{}>;
  StudentResult: ResolverTypeWrapper<Partial<StudentResult>>;
  Boolean: ResolverTypeWrapper<Partial<Scalars['Boolean']>>;
  AddStudentInput: ResolverTypeWrapper<Partial<AddStudentInput>>;
  EditStudentInput: ResolverTypeWrapper<Partial<EditStudentInput>>;
  StudentEnrollmentResult: ResolverTypeWrapper<Partial<StudentEnrollmentResult>>;
  StudentFriendshipResult: ResolverTypeWrapper<Partial<StudentFriendshipResult>>;
  Mutation: ResolverTypeWrapper<{}>;
}>;

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = ResolversObject<{
  Name: Partial<Name>;
  String: Partial<Scalars['String']>;
  Student: Partial<Student>;
  ID: Partial<Scalars['ID']>;
  Course: Partial<Course>;
  Query: {};
  StudentResult: Partial<StudentResult>;
  Boolean: Partial<Scalars['Boolean']>;
  AddStudentInput: Partial<AddStudentInput>;
  EditStudentInput: Partial<EditStudentInput>;
  StudentEnrollmentResult: Partial<StudentEnrollmentResult>;
  StudentFriendshipResult: Partial<StudentFriendshipResult>;
  Mutation: {};
}>;

export type NameResolvers<ContextType = any, ParentType extends ResolversParentTypes['Name'] = ResolversParentTypes['Name']> = ResolversObject<{
  firstName?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  lastName?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  fullName?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType>;
}>;

export type StudentResolvers<ContextType = any, ParentType extends ResolversParentTypes['Student'] = ResolversParentTypes['Student']> = ResolversObject<{
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  name?: Resolver<ResolversTypes['Name'], ParentType, ContextType>;
  courses?: Resolver<Array<ResolversTypes['Course']>, ParentType, ContextType>;
  friends?: Resolver<Array<ResolversTypes['Student']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType>;
}>;

export type CourseResolvers<ContextType = any, ParentType extends ResolversParentTypes['Course'] = ResolversParentTypes['Course']> = ResolversObject<{
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  students?: Resolver<Array<ResolversTypes['Student']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType>;
}>;

export type QueryResolvers<ContextType = any, ParentType extends ResolversParentTypes['Query'] = ResolversParentTypes['Query']> = ResolversObject<{
  searchStudents?: Resolver<Array<ResolversTypes['Student']>, ParentType, ContextType, RequireFields<QuerySearchStudentsArgs, never>>;
  student?: Resolver<Maybe<ResolversTypes['Student']>, ParentType, ContextType, RequireFields<QueryStudentArgs, 'id'>>;
  searchCourses?: Resolver<Array<ResolversTypes['Course']>, ParentType, ContextType, RequireFields<QuerySearchCoursesArgs, never>>;
  course?: Resolver<Maybe<ResolversTypes['Course']>, ParentType, ContextType, RequireFields<QueryCourseArgs, 'id'>>;
}>;

export type StudentResultResolvers<ContextType = any, ParentType extends ResolversParentTypes['StudentResult'] = ResolversParentTypes['StudentResult']> = ResolversObject<{
  success?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  failureReason?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  student?: Resolver<Maybe<ResolversTypes['Student']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType>;
}>;

export type StudentEnrollmentResultResolvers<ContextType = any, ParentType extends ResolversParentTypes['StudentEnrollmentResult'] = ResolversParentTypes['StudentEnrollmentResult']> = ResolversObject<{
  success?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  failureReason?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  student?: Resolver<Maybe<ResolversTypes['Student']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType>;
}>;

export type StudentFriendshipResultResolvers<ContextType = any, ParentType extends ResolversParentTypes['StudentFriendshipResult'] = ResolversParentTypes['StudentFriendshipResult']> = ResolversObject<{
  success?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  failureReason?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  students?: Resolver<Maybe<Array<ResolversTypes['Student']>>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType>;
}>;

export type MutationResolvers<ContextType = any, ParentType extends ResolversParentTypes['Mutation'] = ResolversParentTypes['Mutation']> = ResolversObject<{
  addStudent?: Resolver<ResolversTypes['StudentResult'], ParentType, ContextType, RequireFields<MutationAddStudentArgs, 'student'>>;
  editStudent?: Resolver<ResolversTypes['StudentResult'], ParentType, ContextType, RequireFields<MutationEditStudentArgs, 'id' | 'updates'>>;
  enrollCourse?: Resolver<ResolversTypes['StudentEnrollmentResult'], ParentType, ContextType, RequireFields<MutationEnrollCourseArgs, 'studentId' | 'courseId'>>;
  dropCourse?: Resolver<ResolversTypes['StudentEnrollmentResult'], ParentType, ContextType, RequireFields<MutationDropCourseArgs, 'studentId' | 'courseId'>>;
  addFriend?: Resolver<ResolversTypes['StudentFriendshipResult'], ParentType, ContextType, RequireFields<MutationAddFriendArgs, 'student1' | 'student2'>>;
  unFriend?: Resolver<ResolversTypes['StudentFriendshipResult'], ParentType, ContextType, RequireFields<MutationUnFriendArgs, 'student1' | 'student2'>>;
}>;

export type Resolvers<ContextType = any> = ResolversObject<{
  Name?: NameResolvers<ContextType>;
  Student?: StudentResolvers<ContextType>;
  Course?: CourseResolvers<ContextType>;
  Query?: QueryResolvers<ContextType>;
  StudentResult?: StudentResultResolvers<ContextType>;
  StudentEnrollmentResult?: StudentEnrollmentResultResolvers<ContextType>;
  StudentFriendshipResult?: StudentFriendshipResultResolvers<ContextType>;
  Mutation?: MutationResolvers<ContextType>;
}>;


/**
 * @deprecated
 * Use "Resolvers" root object instead. If you wish to get "IResolvers", add "typesPrefix: I" to your config.
 */
export type IResolvers<ContextType = any> = Resolvers<ContextType>;
