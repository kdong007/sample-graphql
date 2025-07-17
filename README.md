# sample-graphql

This is a sample graphql server built with Typescript + Apollo Server

## Launch server

`yarn install` + `yarn dev`

# GraphQL Notes

## 📌 Overview

**Official Website**: [https://graphql.org/](https://graphql.org/)

**One-liner summary**: Strongly typed, JSON-only, API handler.

### Key Characteristics

-   **Strongly typed** via **schema**
-   **Data-serving API**
    -   Not suitable for web frontend serving
-   **JSON-only**
    -   No XML or binary
    -   Binary alternatives:
        -   Base64
        -   Link to CDN/REST endpoint for binary data

---

## 🚀 GraphQL Operations

A GraphQL request is called an **operation**. There are three main types:

### 1. **Query**

-   Read-only (advisory, not enforced)
-   Similar to `GET` / SQL `SELECT`

### 2. **Mutation**

-   Modifies data (like `POST`, `PUT`, `DELETE`)
-   Handled by backend resolvers

### 3. **Subscription**

-   Long connections, typically over WebSockets

---

## 🖥️ GraphQL Server

A GraphQL server:

-   Runs on **one endpoint**, typically via `POST`
-   Can coexist with regular REST endpoints
-   Benefits from REST best practices:
    -   HTTP2, compression, HTTPS, etc.

### Mindset Shift

From **linear REST logic**:

-   Parse → Access DB → Clean → Respond

To **graph-oriented design**:

-   Define resources
-   Connect via schema
-   Implement **resolvers** per resource
-   GraphQL engine handles resolver orchestration

---

## 📝 Schema-First vs Code-First

| Style            | Description                                   |
| ---------------- | --------------------------------------------- |
| **Schema-First** | Define schema manually, then attach resolvers |
| **Code-First**   | Schema generated from code (Recommended)      |

📖 [More details](https://blog.logrocket.com/code-first-vs-schema-first-development-graphql/)

---

## 🧩 GraphQL Client

Since GraphQL operates over HTTP, any REST client works.

### Example Operation

```graphql
query {
    student(id: "123") {
        id
        name
        contact
    }
}
```

### cURL Example

```bash
curl -X POST -d '{"query":"query{student(id:\"123\"){id name contact}}"}' <your-server-address>
```

### Node `fetch` Example

```js
const query = `
query {
  student(id: "123") {
    id
    name
    contact
  }
}
`;

fetch("<your-server-address>", {
  method: 'POST',
  body: JSON.stringify({ query })
}).then(...);
```

---

## 🧰 DevTools

-   Postman
-   GraphiQL / GraphQL Playground
-   Apollo DevTools (Browser extension)

---

## 🔥 Major GraphQL Ecosystems

| Ecosystem  | Notes                                                                                            |
| ---------- | ------------------------------------------------------------------------------------------------ |
| **Relay**  | From Facebook [relay.dev](https://relay.dev)                                                     |
| **Apollo** | Community-driven, easier to use [apollographql.com](https://www.apollographql.com) (Recommended) |

---

## ⚖️ REST vs GraphQL vs SQL

|               | REST                           | GraphQL                           | SQL                                |
| ------------- | ------------------------------ | --------------------------------- | ---------------------------------- |
| **Input**     | Endpoint + Method + Query/body | Fixed endpoint + query string     | SQL queries                        |
| **Output**    | Anything (JSON/XML/etc.)       | JSON, typed via schema            | Table data, typed                  |
| **Logic**     | Endpoint handler (function)    | Resolver (function)               | Limited, mostly querying           |
| **Strengths** | Flexible, universal            | Typed, shape-controlled, flexible | Precise querying, minimal response |

---

## ✅ Benefits of GraphQL

### ✅ Strong Typing

-   Consistent schema across teams
-   Tools like GraphQL Codegen enable type-safe client code

### ✅ Two-pass Validation

-   Server validates:
    -   **Incoming query**
    -   **Outgoing response**

### ✅ Optimized Response

-   Clients request **only** needed fields
-   Reduces over-fetching

### ✅ Simplified API Design

-   Fewer endpoints
-   Easier Frontend/Backend collaboration

### ✅ Apollo Client Perks

-   Caching
-   Loading/Error states
-   Pagination & Infinite Scroll (FetchMore)
-   Reactive UI binding (Redux-like experience)

---

## ❗ Challenges of GraphQL

-   **Learning Curve**: Like React vs jQuery
-   **Backend-First Setup**: Best with GraphQL backend first
-   **Measuring Gains**: Performance gains aren’t always easy to quantify

---

<!-- ## 🏢 Companies Using GraphQL

-   **PayPal** – Payment services
-   **Microsoft Teams**
-   **Snapchat**
-   **LinkedIn** – Internal GraphQL-like system since 2020
-   **Coinbase** – Full migration for customer-facing apps
-   **Instant Cart** – ~70-80% services migrated
-   **WhyLabs** – Full GraphQL adoption

--- -->

## 🧠 GraphQL Design Philosophy

GraphQL views resources as a **graph**:

-   **Root Operations**: `query`, `mutation`, `subscription`
-   **Intermediate Nodes**: Connected resources
-   **Leaf Nodes**: Scalars (strings, numbers, etc.)

This leads to flexible, efficient, and maintainable API design.

---

# 🏁 Conclusion

GraphQL shines in large applications with complex data needs and multiple frontends. With tools like Apollo, strong typing, and streamlined queries, it reduces redundancy and improves developer efficiency — albeit with an upfront investment in learning and backend setup.
