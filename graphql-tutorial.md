# Graphql Tutorial

## Overview

First of all, this tutorial is based on my own experiences with graphql. Things may go wrong, always open for discussion.

In general, Graphql replaces JSON-response REST APIs. So:

-   If it is not an API, like an server side rendered HTML page => Not Graphql
-   If you want some non-JSON response, like images, videos, binary data => Not Graphql

A really abstract way of thinking Graphql is: **Graphql is a REST endpoint handler, sits on one REST endpoint. It is kind of like a SQL server accept SQL queries (select/update/delete... in Graphql grammar) in POST request, and return all responses in JSON.**

_Just to be clear, it is not DB. I don't want to confuse you by mentioning SQL_

## REST operations vs Graphql operations

### REST

**GET**: Send data with query strings

-   ?a=xxx&b=xxx&c=xxx

**POST/PUT/DELETE**: Send data with request body

-   plain text
-   form data
-   xml
-   JSON
-   almost anything...

All operations supports almost all kinds of response formats..

### Graphql

Assume Graphql handler running on `/graphql` endpoint

**query** (readonly operations, like GET)

POST http://www.yourserver.com/graphql

with a JSON body:

```
{
    "query": "query {...}"
}
```

**mutation** (operations that can mutate server data, like POST/PUT/DELETE)

POST http://www.yourserver.com/graphql

with a JSON body:

```
{
    "query": "mutation {...}" // the key is still "query"
}
```

## Benefits of Graphql

(Which is also the issues with REST if you don't keep your code extremely clean. I really mean extremely)

### Typed and Uniformed response data

## Graphql families

## Graphql Server

When talking about a "Graphql Server", it can be:

-   a REST server that has only one graphql handler on one endpoint
-   a REST server that has multiple graphql handlers on different endpoints
-   a REST server that has one more graphql handler(s) and normal REST endpoints/handlers

## Graphql Client
