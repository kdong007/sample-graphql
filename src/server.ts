import { ApolloServer } from "apollo-server";
import fs from "fs";
import path from "path";
import {
    Resolvers,
    QuerySearchStudentsArgs,
    QueryStudentArgs,
    QuerySearchCoursesArgs,
    QueryCourseArgs,
    MutationAddStudentArgs,
    MutationEditStudentArgs,
    MutationEnrollCourseArgs,
    MutationDropCourseArgs,
    MutationUnFriendArgs,
    MutationAddFriendArgs,
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
        addStudent: (root, args: MutationAddStudentArgs) => {
            const { id, ...student } = args.student;

            if (id && _.find(students, { id })) {
                return {
                    success: false,
                    failureReason: "ID_exists",
                };
            }

            // use given id or generate a new one
            const newStudentId =
                id ||
                _(students)
                    .map(({ id }) => parseInt(id))
                    // max() is aggregation, breaks weak chain
                    // for more info please checkout lodash doc
                    .max() + "";

            const newStudent = {
                id: newStudentId,
                ...student,
            };

            students.push(newStudent);

            return {
                success: false,
                student: newStudent,
            };
        },
        // editStudent(id: ID!, updates: EditStudentInput!): StudentResult!
        editStudent: (root, args: MutationEditStudentArgs) => {
            const { id, updates } = args;
            const student = _.find(students, { id });
            if (!student) {
                return {
                    success: false,
                    failureReason: "Student not found",
                };
            }

            _.assign(student, updates);

            return {
                success: true,
                student,
            };
        },

        enrollCourse: (root, args: MutationEnrollCourseArgs) => {
            const { studentId, courseId } = args;
            const student = _.find(students, { id: studentId });
            if (!student) {
                return {
                    success: false,
                    failureReason: "Student not found",
                };
            }

            if (!_.find(courses, { id: courseId })) {
                return {
                    success: false,
                    failureReason: "Course not found",
                };
            }

            const enrollRecords = enrollments[studentId];
            if (enrollRecords && enrollRecords.includes(courseId)) {
                return {
                    success: false,
                    failureReason: "Already enrolled",
                };
            }

            enrollments[studentId] = (enrollRecords || []).concat(courseId);

            return {
                success: true,
                student,
            };
        },

        dropCourse: (root, args: MutationDropCourseArgs) => {
            const { studentId, courseId } = args;
            const student = _.find(students, { id: studentId });
            if (!student) {
                return {
                    success: false,
                    failureReason: "Student not found",
                };
            }

            const enrollRecords = enrollments[studentId];
            if (!enrollRecords || !enrollRecords.includes(courseId)) {
                return {
                    success: false,
                    failureReason: "You aren't enroll in this course",
                };
            }

            enrollments[studentId] = _.without(enrollRecords, courseId);

            return {
                success: true,
                student,
            };
        },

        addFriend: (root, args: MutationAddFriendArgs) => {
            const s1 = _.find(students, { id: args.student1 });
            const s2 = _.find(students, { id: args.student2 });
            if (!s1) {
                return {
                    success: false,
                    failureReason: `Student ${args.student1} not found`,
                };
            }

            if (!s2) {
                return {
                    success: false,
                    failureReason: `Student ${args.student2} not found`,
                };
            }

            const newLink = [args.student1, args.student2];
            const newLinkReversed = [args.student2, args.student1];
            if (
                friendships.find(
                    link =>
                        _.isEqual(link, newLink) ||
                        _.isEqual(link, newLinkReversed)
                )
            ) {
                return {
                    success: false,
                    failureReason: "You two are already friends",
                };
            }

            friendships.push(newLink);
            return {
                success: true,
                students: [s1, s2],
            };
        },
        unFriend: (root, args: MutationUnFriendArgs) => {
            const s1 = _.find(students, { id: args.student1 });
            const s2 = _.find(students, { id: args.student2 });
            if (!s1) {
                return {
                    success: false,
                    failureReason: `Student ${args.student1} not found`,
                };
            }

            if (!s2) {
                return {
                    success: false,
                    failureReason: `Student ${args.student2} not found`,
                };
            }

            const newLink = [args.student1, args.student2];
            const newLinkReversed = [args.student2, args.student1];

            const index = friendships.findIndex(
                link =>
                    _.isEqual(link, newLink) || _.isEqual(link, newLinkReversed)
            );

            if (index < 0) {
                return {
                    success: false,
                    failureReason: "You two aren't friend",
                };
            }

            // remove 1 item at index
            friendships.splice(index, 1);
            return {
                success: true,
                students: [s1, s2],
            };
        },
    },
};

const server = new ApolloServer({
    typeDefs,
    resolvers,
});

export default server;
