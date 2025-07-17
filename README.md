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
    -   Usually comes with Graphql server framework, like Postgres' native IDE
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

### ✅ Reduced Frontend/Backend Communication Overhead

-   **Self-serve data fetching for frontend**:
    -   Frontend developers can define exactly what data they need via GraphQL queries without waiting for backend developers to create or modify specific REST endpoints.
-   **Flexible response shaping**:

    -   Unlike REST, where the response shape is fixed per endpoint, GraphQL allows frontend to shape the response directly in the query. No more back-and-forth requests to “add a field” or “remove a nested relation.”

-   **Avoid multiple backend iterations for UI changes**:

    -   Example:
        -   Traditional REST approach:
            -   Backend exposes `/product`, `/vendor`, `/order` endpoints.
            -   Frontend builds a dashboard page requiring data from multiple endpoints.
            -   Backend needs to create a `/dashboard` endpoint to combine data for performance optimization.
            -   Any dashboard changes = more backend work.
        -   GraphQL approach:
            -   Frontend simply writes a single query pulling `product`, `vendor`, `order` in one request.
            -   Backend remains unchanged as long as the schema supports the required fields.

-   **Fewer alignment meetings between teams**:

    -   Reduces typical cycles of:
        1. Frontend asks for an endpoint.
        2. Backend implements it.
        3. Frontend realizes extra fields are needed.
        4. Backend modifies again.
    -   With GraphQL, **schema evolves independently**, and frontend can iterate faster without constant backend adjustments.

-   **Cleaner separation of concerns**:
    -   Backend focuses on **business logic and data modeling**.
    -   Frontend focuses on **UI and data composition**.

### ✅ Apollo Client Perks

-   Caching
-   Loading/Error states
-   Pagination & Infinite Scroll (FetchMore)
-   Reactive UI binding (Redux-like experience)

### ✅ Normalized Client-Side Caching

-   **Automatic cache normalization**:
    -   Shared resources (e.g., `student(id: "123")`) across multiple queries and views are **de-duplicated** in the cache.
    -   When a resource is updated (e.g., via a `mutation`), all queries and UI components referencing the same resource ID will automatically reflect the updated data without requiring manual refresh or additional requests.
-   **Reduced redundant network requests**:
    -   GraphQL clients like Apollo avoid unnecessary requests by serving data directly from the cache if it’s already available, reducing server load and improving performance.

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
