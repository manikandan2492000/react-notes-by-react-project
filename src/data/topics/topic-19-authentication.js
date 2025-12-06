export const topic19Authentication = {
    "19. Authentication": [
        {
            id: "jwt",
            title: "JWT (JSON Web Token)",
            category: "Authentication",
            explanation: `JWT is a compact, URL-safe token used for authentication. Contains claims about a user, signed by the server.`,
            analogy: `JWT is like a **VIP wristband** at a concert - shows you're authenticated, contains info about you, can't be forged.`,
            realUsage: `API authentication, single sign-on, stateless auth.`,
            code: `// Login returns JWT
const response = await fetch('/api/login', {
  method: 'POST',
  body: JSON.stringify({ username, password })
});
const { token } = await response.json();

// Store token
localStorage.setItem('token', token);

// Use in requests
fetch('/api/protected', {
  headers: {
    'Authorization': \`Bearer \${token}\`
  }
});`,
            interviewQuestions: [
                {
                    question: "Where to store JWT?",
                    answer: "Options: 1) **localStorage** - easy but vulnerable to XSS, 2) **httpOnly cookie** - immune to XSS but vulnerable to CSRF (mitigate with same-site), 3) **Memory** - secure but lost on refresh. Best: httpOnly cookie with CSRF protection for sensitive apps."
                }
            ]
        },
        {
            id: "oauth",
            title: "OAuth 2.0",
            category: "Authentication",
            explanation: `Authorization framework allowing third-party apps limited access to user accounts.`,
            analogy: `OAuth is like **valet parking** - you give limited access (starter key) without full ownership (car keys).`,
            realUsage: `"Login with Google/Facebook", API access delegation.`,
            code: `// OAuth flow
// 1. Redirect to provider
window.location = 'https://provider.com/oauth/authorize?client_id=...';

// 2. Provider redirects back with code
const code = new URLSearchParams(window.location.search).get('code');

// 3. Exchange code for token
const { access_token } = await fetch('/api/token', {
  method: 'POST',
  body: JSON.stringify({ code })
}).then(r => r.json());`,
            interviewQuestions: [
                {
                    question: "Difference between OAuth and OpenID Connect?",
                    answer: "**OAuth 2.0** is for authorization (what you can access). **OpenID Connect** (built on OAuth) adds authentication (who you are). OIDC returns ID token with user info, OAuth returns access token for resources."
                }
            ]
        }
    ]
};

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

export const topic21Deployment = {
    "21. Deployment": [
        {
            id: "vercel",
            title: "Vercel",
            category: "Deployment",
            explanation: `Platform for frontend deployment with zero-config, automatic HTTPS, and global CDN.`,
            analogy: `Vercel is like a **magic butler** - hand him your code, he instantly sets up everything without you lifting a finger.`,
            realUsage: `Deploying Next.js apps, static sites, serverless functions.`,
            code: `// Deploy with CLI
npm i -g vercel
vercel

// Or connect GitHub repo
// Auto-deploys on every push`,
            interviewQuestions: [
                {
                    question: "When to use Vercel vs traditional hosting?",
                    answer: "**Vercel**: JAMstack apps, Next.js, automatic scaling, global CDN. **Traditional hosting**: Full control needed, specific server requirements, existing infrastructure. Vercel is simpler for modern React apps."
                }
            ]
        },
        {
            id: "netlify",
            title: "Netlify",
            category: "Deployment",
            explanation: `Platform for deploying static sites and JAMstack apps with continuous deployment.`,
            analogy: `Netlify is like **automated publishing** - connect your repo, every commit = new deployment.`,
            realUsage: `Static sites, React apps, serverless functions.`,
            code: `// netlify.toml
[build]
  command = "npm run build"
  publish = "dist"

[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200`,
            interviewQuestions: [
                {
                    question: "Netlify vs Vercel?",
                    answer: "Very similar. **Vercel**: Optimized for Next.js, slightly faster builds. **Netlify**: Better for static sites, more build minutes on free tier, form handling. Both excellent - choose based on framework and features needed."
                }
            ]
        }
    ]
};

export const topic22SystemDesign = {
    "22. React System Design": [
        {
            id: "component-architecture",
            title: "Component Architecture",
            category: "System Design",
            explanation: `Designing scalable component systems requires planning composition, state management, and data flow.`,
            analogy: `System design is like **city planning** - zones (features), roads (data flow), utilities (shared services).`,
            realUsage: `Large apps, design systems, reusable component libraries.`,
            code: `// Atomic Design Pattern
atoms/          # Button, Input, Label
molecules/      # FormField (Input + Label)
organisms/      # LoginForm (multiple molecules)
templates/      # PageLayout
pages/          # LoginPage (template + data)`,
            interviewQuestions: [
                {
                    question: "How do you design a scalable React app?",
                    answer: "1) **Feature-based structure** - organize by domain, 2) **Shared components** - reusable UI library, 3) **State management** - appropriate for scale (Context/Redux/Zustand), 4) **Code splitting** - lazy load routes, 5) **Type safety** - TypeScript for large teams."
                }
            ]
        }
    ]
};

export const topic23InterviewTopics = {
    "23. MAANG React Interview Topics": [
        {
            id: "virtual-dom-deep-dive",
            title: "Virtual DOM Deep Dive",
            category: "Interview",
            explanation: `Understanding reconciliation, diffing algorithm, and performance implications.`,
            analogy: `Virtual DOM is React's **secret sauce** - interviewers want to know you understand how it works under the hood.`,
            realUsage: `Common senior-level interview question.`,
            code: `// React compares trees
// O(n) heuristic algorithm
// Same type = update, different type = replace`,
            interviewQuestions: [
                {
                    question: "Explain React's reconciliation algorithm",
                    answer: "React uses a heuristic O(n) algorithm comparing trees level-by-level: 1) Different element types = rebuild subtree, 2) Same type = update props, 3) Lists use keys to identify moved items. This is much faster than generic O(n³) tree diff algorithms."
                }
            ]
        },
        {
            id: "performance-optimization-interview",
            title: "Performance Optimization",
            category: "Interview",
            explanation: `Common interview topic: identifying and fixing performance bottlenecks.`,
            analogy: `Performance optimization is like **being a detective** - profile, find bottlenecks, fix them.`,
            realUsage: `Every interview for senior positions includes performance questions.`,
            code: `// Tools: React DevTools Profiler
// Techniques: memo, useMemo, useCallback, code splitting, virtualization`,
            interviewQuestions: [
                {
                    question: "How would you optimize a slow React app?",
                    answer: "1) **Profile** with React DevTools, 2) **Identify** unnecessary re-renders, 3) **Memo** expensive components, 4) **Code split** routes, 5) **Virtualize** long lists, 6) **Debounce** inputs, 7) **Lazy load** images. Always measure before optimizing."
                }
            ]
        },
        {
            id: "state-management-patterns",
            title: "State Management Patterns",
            category: "Interview",
            explanation: `Choosing appropriate state management for different scenarios.`,
            analogy: `State management is like **choosing transportation** - bicycle for short trips (local state), car for medium (Context), train for long/many passengers (Redux).`,
            realUsage: `Interviewers assess architecture decisions.`,
            code: `// Local: useState
// Shared: Context
// Global/Complex: Redux/Zustand
// Server: React Query/SWR`,
            interviewQuestions: [
                {
                    question: "When would you use Redux vs Context?",
                    answer: "**Context**: Simple global state, theme/auth, 2-3 levels deep. **Redux**: Complex state logic, time-travel debugging needed, many components need same data, middleware for logging/analytics. Context is simpler, Redux is more powerful."
                }
            ]
        }
    ]
};
