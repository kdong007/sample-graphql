export interface StudentDoc {
    id: string;
    firstName: string;
    lastName: string;
}
export const students: StudentDoc[] = [
    {
        id: "100",
        firstName: "John",
        lastName: "Depp",
    },
    {
        id: "101",
        firstName: "Al",
        lastName: "Pacino",
    },
    {
        id: "102",
        firstName: "Kevin",
        lastName: "Spacey",
    },
    {
        id: "103",
        firstName: "Robert",
        lastName: "Niro",
    },
    {
        id: "104",
        firstName: "Danzel",
        lastName: "Washington",
    },
];

// bi-directional
export const friendships = [
    ["100", "101"],
    ["100", "102"],
    ["100", "103"],
    ["101", "104"],
    ["104", "105"],
];

export const courses = [
    { id: "500", name: "Learn Python" },
    { id: "501", name: "Learn Java" },
    { id: "502", name: "Learn C++" },
    { id: "503", name: "Learn React" },
    { id: "504", name: "Learn Graphql" },
];

export const enrollments: { [k in string]: string[] } = {
    "100": ["500", "504"],
    "102": ["503", "501"],
    "104": ["504"],
};
