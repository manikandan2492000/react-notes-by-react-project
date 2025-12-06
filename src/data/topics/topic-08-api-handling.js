export const topic08APIHandling = {
    "8. API Handling": [
        {
            id: "fetch-api",
            title: "Fetch API",
            category: "API",
            explanation: `The Fetch API provides a JavaScript interface for accessing and manipulating HTTP requests and responses. It's built into modern browsers and provides an easy, logical way to fetch resources asynchronously.`,
            analogy: `Fetch is like **sending a letter**. You send a request (letter) to a server (recipient) and wait for a response (reply). It's built into the browser, so you don't need extra stamps (libraries).`,
            realUsage: `Getting data from REST APIs to display in your app, posting form data, uploading files.`,
            code: `// GET request
fetch('https://api.example.com/users')
  .then(response => response.json())
  .then(data => console.log(data))
  .catch(error => console.error('Error:', error));

// POST request
fetch('https://api.example.com/users', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({ name: 'Alice', email: 'alice@example.com' })
})
  .then(response => response.json())
  .then(data => console.log(data));

// With async/await
async function fetchUsers() {
  try {
    const response = await fetch('https://api.example.com/users');
    if (!response.ok) throw new Error('Network response was not ok');
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error:', error);
  }
}`,
            interviewQuestions: [
                {
                    question: "What is the difference between Fetch and Axios?",
                    answer: "**Fetch**: Built-in, requires manual JSON parsing, doesn't reject on HTTP errors (only network failures), less features. **Axios**: Third-party library, auto JSON parsing, rejects on HTTP errors, interceptors, request/response transformation, better error handling. Axios is more feature-rich, Fetch has no dependencies."
                },
                {
                    question: "How do you cancel a fetch request?",
                    answer: "Use AbortController: `const controller = new AbortController(); fetch(url, { signal: controller.signal }); controller.abort();`. This is useful for cleaning up requests when components unmount or when user navigates away."
                }
            ]
        },
        {
            id: "axios",
            title: "Axios",
            category: "API",
            explanation: `Axios is a popular promise-based HTTP client for the browser and Node.js. It provides a more powerful and flexible API than Fetch.`,
            analogy: `Axios is like a **professional courier service** with tracking, insurance, and guaranteed delivery. Fetch is like regular mail - basic but gets the job done.`,
            realUsage: `API calls in production apps, when you need interceptors, automatic retries, or better error handling.`,
            code: `import axios from 'axios';

// GET request
axios.get('https://api.example.com/users')
  .then(response => console.log(response.data))
  .catch(error => console.error(error));

// POST request
axios.post('https://api.example.com/users', {
  name: 'Alice',
  email: 'alice@example.com'
})
  .then(response => console.log(response.data));

// Interceptors
axios.interceptors.request.use(
  config => {
    config.headers.Authorization = \`Bearer \${token}\`;
    return config;
  }
);

// Create instance with defaults
const api = axios.create({
  baseURL: 'https://api.example.com',
  timeout: 5000,
  headers: { 'X-Custom-Header': 'value' }
});`,
            interviewQuestions: [
                {
                    question: "What are Axios interceptors and when would you use them?",
                    answer: "Interceptors let you intercept requests or responses before they're handled. Use cases: 1) **Auth tokens** - automatically add to all requests, 2) **Logging** - log every request/response, 3) **Error handling** - global error handling, 4) **Token refresh** - auto-refresh expired tokens."
                }
            ]
        },
        {
            id: "error-handling",
            title: "Error Handling in API Calls",
            category: "API",
            explanation: `Proper error handling is crucial for good UX. Handle network errors, HTTP errors, timeout errors, and validation errors differently.`,
            analogy: `Error handling is like **having a backup plan** - if the main route is closed (network error), you know alternative routes (retry, cache, offline mode).`,
            realUsage: `All production apps need robust error handling for API calls.`,
            code: `async function fetchData() {
  try {
    const response = await fetch(url, {
      signal: AbortSignal.timeout(5000) // Timeout after 5s
    });
    
    if (!response.ok) {
      if (response.status === 404) {
        throw new Error('Resource not found');
      } else if (response.status === 401) {
        throw new Error('Unauthorized');
      } else {
        throw new Error(\`HTTP error! status: \${response.status}\`);
      }
    }
    
    return await response.json();
  } catch (error) {
    if (error.name === 'AbortError') {
      console.error('Request timed out');
    } else if (error.name === 'TypeError') {
      console.error('Network error');
    } else {
      console.error('Error:', error.message);
    }
    throw error; // Re-throw to handle in component
  }
}`,
            interviewQuestions: [
                {
                    question: "How do you handle race conditions in API calls?",
                    answer: "Solutions: 1) **AbortController** - cancel previous request when new one starts, 2) **Ignore flag** - use boolean to ignore stale responses, 3) **Request IDs** - track latest request, ignore older ones, 4) **Debouncing** - delay API calls until user stops typing."
                }
            ]
        },
        {
            id: "loading-states",
            title: "Loading States",
            category: "API",
            explanation: `UI should reflect the current state of async operations: idle, loading, success, or error.`,
            analogy: `Loading states are like **status updates on a delivery** - waiting for dispatch, in transit, delivered, or failed.`,
            realUsage: `Every API call in React should track loading state for better UX.`,
            code: `function UserProfile({ userId }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  useEffect(() => {
    async function loadUser() {
      try {
        setLoading(true);
        setError(null);
        const data = await fetchUser(userId);
        setUser(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }
    
    loadUser();
  }, [userId]);
  
  if (loading) return <Spinner />;
  if (error) return <Error message={error} />;
  if (!user) return <NotFound />;
  
  return <div>{user.name}</div>;
}`,
            interviewQuestions: [
                {
                    question: "What is the suspense pattern and how does it relate to loading states?",
                    answer: "Suspense lets components 'wait' for something before rendering. With React 18+ and frameworks like Next.js, you can throw promises from components and Suspense catches them, showing fallback UI. This moves loading states from component logic to the React tree structure."
                }
            ]
        },
        {
            id: "caching-strategies",
            title: "Caching Strategies",
            category: "API",
            explanation: `Caching API responses reduces network requests, improves performance, and enables offline functionality.`,
            analogy: `Caching is like **keeping a photocopy** of important documents - you don't need to go to the filing cabinet every time.`,
            realUsage: `User profiles, static content, frequently accessed data.`,
            code: `// Simple in-memory cache
const cache = new Map();

async function fetchWithCache(url, ttl = 60000) {
  const cached = cache.get(url);
  
  if (cached && Date.now() - cached.timestamp < ttl) {
    return cached.data;
  }
  
  const data = await fetch(url).then(r => r.json());
  cache.set(url, { data, timestamp: Date.now() });
  
  return data;
}

// Using SWR (stale-while-revalidate)
import useSWR from 'swr';

function Profile() {
  const { data, error } = useSWR('/api/user', fetcher, {
    revalidateOnFocus: false,
    dedupingInterval: 2000
  });
  
  if (error) return <div>Failed to load</div>;
  if (!data) return <div>Loading...</div>;
  return <div>Hello {data.name}!</div>;
}`,
            interviewQuestions: [
                {
                    question: "What are different caching strategies?",
                    answer: "1) **Cache-First** - use cache if available, 2) **Network-First** - fetch from network, fallback to cache, 3) **Stale-While-Revalidate** - return cache immediately, update in background, 4) **Cache-Only** - never fetch (offline-first), 5) **Network-Only** - always fetch fresh data."
                }
            ]
        },
        {
            id: "optimistic-updates",
            title: "Optimistic Updates",
            category: "API",
            explanation: `Optimistic updates immediately update the UI before the server responds, assuming the request will succeed. If it fails, roll back the change.`,
            analogy: `Optimistic updates are like **ordering food and sitting down immediately** - you assume the order will go through, but if the kitchen is closed, you have to get up.`,
            realUsage: `Like buttons, social media posts, todo apps - actions where success is expected and rollback is acceptable.`,
            code: `function TodoList() {
  const [todos, setTodos] = useState([]);
  
  async function toggleTodo(id) {
    // Optimistic update
    const previousTodos = todos;
    setTodos(todos.map(todo => 
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    ));
    
    try {
      await fetch(\`/api/todos/\${id}/toggle\`, { method: 'PATCH' });
    } catch (error) {
      // Revert on error
      setTodos(previousTodos);
      alert('Failed to update todo');
    }
  }
  
  return (
    <ul>
      {todos.map(todo => (
        <li key={todo.id} onClick={() => toggleTodo(todo.id)}>
          {todo.text}
        </li>
      ))}
    </ul>
  );
}`,
            interviewQuestions: [
                {
                    question: "When should you NOT use optimistic updates?",
                    answer: "Avoid when: 1) **Failures are common** - users will see constant rollbacks, 2) **Side effects are complex** - hard to roll back cascading changes, 3) **Data is critical** - financial transactions should be confirmed, 4) **Multiple users** - conflicts are likely. Use for simple, low-stakes operations."
                }
            ]
        }
    ]
};
