import server from "../src/server";
import { createTestClient } from "apollo-server-testing";
import { gql } from "apollo-server";

const testClient = createTestClient(server);

test("hello", () => {
    expect(1 + 2).toBe(3);
});

const query = gql`
    query testGetStudent($id: ID!) {
        student(id: $id) {
            id
            name {
                firstName
                lastName
                fullName
            }
        }
    }
`;

test("basic apollo server test case", async () => {
    const { data, errors } = await testClient.query({
        query,
        variables: { id: 100 },
    });

    expect(errors).toBeFalsy();
    expect(data.student.id).toBe("100");
});
