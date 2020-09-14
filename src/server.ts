import { ApolloServer } from "apollo-server";
import fs from "fs";
import path from "path";
import {
    Resolvers,
    QuerySearchStudentsArgs,
    QueryStudentArgs,
    QuerySearchCoursesArgs,
    QueryCourseArgs,
} from "./generated/graphql";
import _ from "lodash";
import {
    students,
    StudentDoc,
    courses,
    enrollments,
    friendships,
} from "./data";

const typeDefs = fs.readFileSync(path.join(__dirname, "schema.gql")).toString();

// A map of functions which return data for the schema.
const resolvers: Resolvers = {
    Name: {
        fullName: ({ firstName, lastName }) => firstName + ", " + lastName,
    },
    Student: {
        name: ({ firstName, lastName }: StudentDoc) => ({
            firstName,
            lastName,
        }),
        courses: ({ id }: StudentDoc) =>
            (enrollments[id] || []).map(courseId =>
                _.find(courses, { id: courseId })
            ),
        friends: ({ id }: StudentDoc) =>
            _(friendships)
                // find a friendship link that has me
                .filter(link => link.includes(id))
                // convert to 1D array
                .flatten()
                // remove my own ids
                .filter(t => t != id)
                // map ids to actual student doc
                .map(id => _.find(students, { id }))
                .value(),
    },
    Query: {
        searchStudents: (root, { keyword }: QuerySearchStudentsArgs) => {
            if (!keyword) {
                return students;
            }
            return students.filter(
                ({ firstName, lastName }) =>
                    firstName.includes(keyword) || lastName.includes(keyword)
            );
        },
        student: (root, { id }: QueryStudentArgs) => _.find(students, { id }),
        searchCourses: (root, { keyword }: QuerySearchCoursesArgs) => {
            if (!keyword) {
                return courses;
            }

            return courses.filter(({ name }) => name.includes(keyword));
        },
        course: (root, { id }: QueryCourseArgs) => _.find(courses, { id }),
    },
    Mutation: {
        addStudent: () => null,
        editStudent: () => null,
    },
};

const server = new ApolloServer({
    typeDefs,
    resolvers,
});

server.listen().then(({ url }) => {
    console.log(`🚀 Server ready at ${url}`);
});
