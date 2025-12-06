export const topic20BackendIntegration = {
    "20. React + Backend Integration": [
        {
            id: "rest-apis",
            title: "REST APIs",
            category: "Backend",
            explanation: `REST (Representational State Transfer) uses HTTP methods for CRUD operations on resources.`,
            analogy: `REST is like a **library catalog system** - predictable verbs (GET, POST) on nouns (resources).`,
            realUsage: `Most common API architecture for web apps.`,
            code: `// CRUD operations
// Create
fetch('/api/users', { method: 'POST', body: JSON.stringify(user) });

// Read
fetch('/api/users/123');

// Update
fetch('/api/users/123', { method: 'PUT', body: JSON.stringify(updates) });

// Delete
fetch('/api/users/123', { method: 'DELETE' });`,
            interviewQuestions: [
                {
                    question: "REST vs GraphQL?",
                    answer: "**REST**: Simple, cacheable, multiple endpoints. Good for simple APIs. **GraphQL**: Single endpoint, fetch exactly what you need, fewer requests. Good for complex data requirements. Choose based on use case."
                }
            ]
        },
        {
            id: "graphql",
            title: "GraphQL",
            category: "Backend",
            explanation: `Query language for APIs. Clients specify exactly what data they need.`,
            analogy: `GraphQL is like **ordering à la carte** - pick exactly what you want. REST is a **set menu**.`,
            realUsage: `Complex data requirements, mobile apps (minimize data transfer), microservices.`,
            code: `import { useQuery, gql } from '@apollo/client';

const GET_USER = gql\`
  query GetUser($id: ID!) {
    user(id: $id) {
      name
      email
      posts {
        title
      }
    }
  }
\`;

const { data } = useQuery(GET_USER, { variables: { id: '123' } });`,
            interviewQuestions: [
                {
                    question: "GraphQL advantages?",
                    answer: "1) **No over-fetching** - get exactly what you need, 2) **Single request** - fetch related data together, 3) **Strongly typed** - schema defines structure, 4) **Introspection** - clients can query schema. Trade-off: more complex server setup."
                }
            ]
        }
    ]
};
