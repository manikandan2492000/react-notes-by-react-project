export const topic06Routing = {
    "6. Routing (React Router)": [
        {
            id: "react-router",
            title: "React Router (BrowserRouter)",
            category: "Routing",
            explanation: `React Router is the standard library for routing in React. It enables navigation among views of various components, allows changing the browser URL, and keeps the UI in sync with the URL.`,
            analogy: `It's like a **switchboard operator** for your app. When the user asks for "/about", the router connects them to the About component.`,
            realUsage: `Navigation in almost any React SPA.`,
            code: `import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/users/:id" element={<User />} />
      </Routes>
    </BrowserRouter>
  );
}`,
            interviewQuestions: [
                {
                    question: "What is the difference between `<Link>` and `<a>` tag?",
                    answer: "`<a>` triggers a full page reload. `<Link>` uses the History API to change the URL without reloading the page, preserving the application state and making navigation instant."
                }
            ]
        },
        {
            id: "routes",
            title: "Routes",
            category: "Routing",
            explanation: `Routes define the relationship between URLs and components. The \`<Routes>\` component renders the first matching \`<Route>\`.`,
            analogy: `Routes are like a **menu at a restaurant** - each item (URL) maps to a specific dish (component).`,
            realUsage: `Defining all pages and views in your application.`,
            code: `<Routes>
  <Route path="/" element={<Home />} />
  <Route path="/about" element={<About />} />
  <Route path="/contact" element={<Contact />} />
  <Route path="*" element={<NotFound />} /> {/* Catch-all for 404 */}
</Routes>`,
            interviewQuestions: [
                {
                    question: "How do you create a 404 Not Found page?",
                    answer: "Use a route with `path=\"*\"` as the last route. The `*` matches any path that hasn't been matched by previous routes, acting as a catch-all."
                }
            ]
        },
        {
            id: "route-nesting",
            title: "Route Nesting",
            category: "Routing",
            explanation: `Nested routes allow you to render components within components, creating layouts with shared UI elements.`,
            analogy: `Nested routes are like **rooms in a house** - the living room (parent route) has furniture (shared UI), but each closet (child route) has different contents.`,
            realUsage: `Dashboard layouts with sidebars, settings pages with tabs, any UI with shared chrome.`,
            code: `<Routes>
  <Route path="/dashboard" element={<DashboardLayout />}>
    <Route path="overview" element={<Overview />} />
    <Route path="analytics" element={<Analytics />} />
    <Route path="settings" element={<Settings />} />
  </Route>
</Routes>

function DashboardLayout() {
  return (
    <div>
      <Sidebar />
      <Outlet /> {/* Child routes render here */}
    </div>
  );
}`,
            interviewQuestions: [
                {
                    question: "What is the `<Outlet>` component?",
                    answer: "`<Outlet>` is a placeholder where child routes render. It's used in parent route components to indicate where nested content should appear."
                }
            ]
        },
        {
            id: "route-params",
            title: "Route Params",
            category: "Routing",
            explanation: `Route parameters allow you to capture dynamic segments of the URL and access them in your components.`,
            analogy: `Route params are like **wildcards in search** - \`/users/:id\` is like saying "find any user" where \`:id\` can be any value.`,
            realUsage: `User profiles (\`/users/123\`), product pages (\`/products/abc\`), blog posts (\`/posts/my-post\`).`,
            code: `// Route definition
<Route path="/users/:userId" element={<UserProfile />} />

// Component
import { useParams } from 'react-router-dom';

function UserProfile() {
  const { userId } = useParams();
  
  useEffect(() => {
    fetchUser(userId);
  }, [userId]);
  
  return <div>User ID: {userId}</div>;
}`,
            interviewQuestions: [
                {
                    question: "Can you have multiple params in one route?",
                    answer: "Yes. Example: `/users/:userId/posts/:postId`. Access both with `useParams()` and destructure: `const { userId, postId } = useParams()`."
                }
            ]
        },
        {
            id: "query-params",
            title: "Query Params",
            category: "Routing",
            explanation: `Query parameters are the part of URL after \`?\` used for optional data like filters, search terms, or pagination.`,
            analogy: `Query params are like **options when ordering food** - the burger (path) is the main item, but "extra cheese" (query param) is optional.`,
            realUsage: `Search (\`/search?q=react\`), filters (\`/products?category=electronics&sort=price\`), pagination (\`/items?page=2\`).`,
            code: `import { useSearchParams } from 'react-router-dom';

function SearchPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  
  const query = searchParams.get('q');
  const page = searchParams.get('page') || '1';
  
  function updateSearch(newQuery) {
    setSearchParams({ q: newQuery, page: '1' });
  }
  
  return (
    <div>
      <p>Searching for: {query}</p>
      <p>Page: {page}</p>
    </div>
  );
}`,
            interviewQuestions: [
                {
                    question: "What's the difference between route params and query params?",
                    answer: "**Route params** (`/users/:id`) are required parts of the path, defining the resource. **Query params** (`?sort=name`) are optional, used for filtering, sorting, or configuration. Route params affect routing, query params don't."
                }
            ]
        },
        {
            id: "navigation",
            title: "Navigation",
            category: "Routing",
            explanation: `Programmatic navigation allows you to navigate using JavaScript code instead of user clicks.`,
            analogy: `Programmatic navigation is like having a **remote control** - you can change channels (routes) from your code.`,
            realUsage: `Redirecting after form submission, auth redirects, conditional navigation.`,
            code: `import { useNavigate } from 'react-router-dom';

function LoginForm() {
  const navigate = useNavigate();
  
  async function handleSubmit(e) {
    e.preventDefault();
    await login();
    navigate('/dashboard'); // Navigate after login
    // navigate(-1); // Go back
    // navigate(-2); // Go back 2 pages
  }
  
  return <form onSubmit={handleSubmit}>...</form>;
}`,
            interviewQuestions: [
                {
                    question: "When should you use `<Navigate>` vs `useNavigate`?",
                    answer: "`<Navigate>` is declarative - use in render for conditional redirects. `useNavigate` is imperative - use in event handlers or effects for programmatic navigation after actions."
                }
            ]
        },
        {
            id: "protected-routes",
            title: "Protected Routes",
            category: "Routing",
            explanation: `Protected routes restrict access to certain pages based on authentication or permissions.`,
            analogy: `Protected routes are like **VIP sections** - you need credentials to enter.`,
            realUsage: `Dashboard pages, admin panels, user profile pages - any route requiring authentication.`,
            code: `function ProtectedRoute({ children }) {
  const { isAuthenticated } = useAuth();
  
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }
  
  return children;
}

// Usage
<Routes>
  <Route path="/public" element={<Public />} />
  <Route path="/dashboard" element={
    <ProtectedRoute>
      <Dashboard />
    </ProtectedRoute>
  } />
</Routes>`,
            interviewQuestions: [
                {
                    question: "Why use `replace` prop in `<Navigate>`?",
                    answer: "`replace` replaces the current entry in history instead of adding a new one. For auth redirects, you don't want the login page in history - clicking back shouldn't take you to a protected page you can't access."
                }
            ]
        },
        {
            id: "lazy-loaded-routes",
            title: "Lazy Loaded Routes",
            category: "Routing",
            explanation: `Lazy loading routes splits your code into chunks that are loaded only when the route is accessed, reducing initial bundle size.`,
            analogy: `Lazy loading is like a **library with closed stacks** - books are fetched only when requested, not all loaded upfront.`,
            realUsage: `Large apps with many routes, admin sections, less frequently accessed pages.`,
            code: `import { lazy, Suspense } from 'react';

const Dashboard = lazy(() => import('./Dashboard'));
const Analytics = lazy(() => import('./Analytics'));

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/dashboard" element={
        <Suspense fallback={<Loading />}>
          <Dashboard />
        </Suspense>
      } />
      <Route path="/analytics" element={
        <Suspense fallback={<Loading />}>
          <Analytics />
        </Suspense>
      } />
    </Routes>
  );
}`,
            interviewQuestions: [
                {
                    question: "What is code splitting and why is it important?",
                    answer: "Code splitting breaks your app into smaller chunks loaded on demand. Important because: 1) **Faster initial load** - users download less code upfront, 2) **Better caching** - unchanged routes don't need re-download, 3) **Improved Time to Interactive**."
                }
            ]
        },
        {
            id: "code-splitting-routing",
            title: "Code Splitting with Routing",
            category: "Routing",
            explanation: `Code splitting at the route level is the most effective way to split your app - each route loads its own bundle.`,
            analogy: `It's like **ordering courses at a restaurant** - you get the appetizer first, then the main course, not everything at once.`,
            realUsage: `Standard practice in production React apps to improve load times.`,
            code: `import { lazy, Suspense } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

// Lazy load route components
const Home = lazy(() => import('./pages/Home'));
const About = lazy(() => import('./pages/About'));
const Dashboard = lazy(() => import('./pages/Dashboard'));

function App() {
  return (
    <BrowserRouter>
      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/dashboard" element={<Dashboard />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}`,
            interviewQuestions: [
                {
                    question: "Where should you place the Suspense boundary for lazy routes?",
                    answer: "You can place it: 1) **Around Routes** - one loading state for all routes (simpler), 2) **Per Route** - different loading states per route (more control), 3) **Nested** - in route components for granular loading. Choose based on UX requirements."
                }
            ]
        },
        {
            id: "404-pages",
            title: "404 Pages",
            category: "Routing",
            explanation: `404 pages handle routes that don't match any defined paths. Essential for good UX when users navigate to invalid URLs.`,
            analogy: `404 pages are like a **helpful receptionist** - when you ask for a room that doesn't exist, they politely tell you instead of ignoring you.`,
            realUsage: `Every production app should have a 404 page.`,
            code: `function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/about" element={<About />} />
      
      {/* Catch-all route - must be last */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

function NotFound() {
  return (
    <div>
      <h1>404 - Page Not Found</h1>
      <p>The page you're looking for doesn't exist.</p>
      <Link to="/">Go Home</Link>
    </div>
  );
}`,
            interviewQuestions: [
                {
                    question: "Why must the catch-all route be last?",
                    answer: "React Router matches routes in order. If `path=\"*\"` is first, it would match every route and prevent other routes from rendering. It must be last so it only matches URLs that didn't match any other route."
                }
            ]
        },
        {
            id: "search-params",
            title: "Search Params (useSearchParams)",
            category: "Routing",
            explanation: `The \`useSearchParams\` hook provides access to read and modify the URL query string, similar to \`useState\` but synchronized with the URL.`,
            analogy: `Search params are like **sticky notes on your desk** - visual reminders of your current state that persist when you refresh.`,
            realUsage: `Filters, sorting, pagination, search queries - any UI state you want to persist in the URL.`,
            code: `import { useSearchParams } from 'react-router-dom';

function ProductList() {
  const [searchParams, setSearchParams] = useSearchParams();
  
  const category = searchParams.get('category') || 'all';
  const sort = searchParams.get('sort') || 'name';
  
  function handleFilterChange(newCategory) {
    setSearchParams({ category: newCategory, sort });
  }
  
  function handleSortChange(newSort) {
    setSearchParams({ category, sort: newSort });
  }
  
  return (
    <div>
      <p>Category: {category}, Sort: {sort}</p>
      {/* URL: /products?category=electronics&sort=price */}
    </div>
  );
}`,
            interviewQuestions: [
                {
                    question: "Why store state in URL search params?",
                    answer: "Benefits: 1) **Shareable** - users can share filtered/sorted views, 2) **Bookmarkable** - save specific views, 3) **Refreshable** - state persists through refresh, 4) **Back button works** - browser history tracks state changes."
                }
            ]
        }
    ]
};
