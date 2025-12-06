export const topic04ComponentPatterns = {
    "4. Component Patterns": [
        {
            id: "smart-vs-dumb",
            title: "Smart vs Dumb Components",
            category: "Patterns",
            explanation: `- **Smart (Container)**: Concerned with *how things work*. They provide data and behavior to other components. Handle state, side effects, and business logic.
- **Dumb (Presentational)**: Concerned with *how things look*. They receive data and callbacks via props. Focused purely on UI.`,
            analogy: `- **Smart Component**: The **Chef**. Knows the recipes, manages the inventory, cooks the food.
- **Dumb Component**: The **Waiter**. Doesn't know how to cook, just presents the food nicely to the customer.`,
            realUsage: `- \`UserListContainer\` (fetches users) -> \`UserList\` (renders the list).`,
            code: `// Dumb (Presentational)
function Button({ onClick, label }) {
  return <button onClick={onClick}>{label}</button>;
}

// Smart (Container)
function LoginContainer() {
  const [isLoading, setIsLoading] = useState(false);
  
  async function handleLogin() {
    setIsLoading(true);
    await login();
    setIsLoading(false);
  }
  
  return <Button onClick={handleLogin} label={isLoading ? 'Loading...' : 'Login'} />;
}`,
            interviewQuestions: [
                {
                    question: "Why separate Smart and Dumb components?",
                    answer: "It improves **reusability** (dumb components can be used anywhere) and **testability** (logic is separated from UI). Presentational components are easier to test since they're just pure functions of props."
                }
            ]
        },
        {
            id: "controlled-components",
            title: "Controlled Components",
            category: "Patterns",
            explanation: `In a controlled component, form data is handled by React component state. The React component controls the value displayed in the input.`,
            analogy: `You're driving a car. You control every turn and speed change (React controls the value).`,
            realUsage: `Most forms in React use controlled components for validation, instant feedback, and conditional submit buttons.`,
            code: `function ControlledForm() {
  const [value, setValue] = useState('');
  
  return (
    <input 
      value={value} 
      onChange={e => setValue(e.target.value)} 
    />
  );
}`,
            interviewQuestions: [
                {
                    question: "What is the main advantage of controlled components?",
                    answer: "You have complete control over the value. You can enforce input formats (e.g., uppercase only), validate instantly, conditionally disable submit, or derive other UI state from the input value."
                }
            ]
        },
        {
            id: "uncontrolled-components",
            title: "Uncontrolled Components",
            category: "Patterns",
            explanation: `Uncontrolled components store their own internal state in the DOM. You access values using refs instead of state.`,
            analogy: `A self-driving car. You just tell it where to go, and it handles the driving (DOM handles the state).`,
            realUsage: `File inputs (always uncontrolled), integrating with non-React code, simple forms.`,
            code: `function UncontrolledForm() {
  const inputRef = useRef(null);
  
  function handleSubmit(e) {
    e.preventDefault();
    console.log(inputRef.current.value);
  }
  
  return (
    <form onSubmit={handleSubmit}>
      <input ref={inputRef} defaultValue="Default" />
      <button type="submit">Submit</button>
    </form>
  );
}`,
            interviewQuestions: [
                {
                    question: "When should you use uncontrolled components?",
                    answer: "When: 1) Integrating React with legacy non-React code, 2) Simple forms where you don't need validation, 3) File inputs (which are always uncontrolled). Prefer controlled components for most cases."
                }
            ]
        },
        {
            id: "compound-components",
            title: "Compound Components",
            category: "Patterns",
            explanation: `Compound components work together to form a complete UI. They share implicit state while giving the user control over rendering.`,
            analogy: `Like a **car's parts** - the steering wheel, pedals, and gear shift work together, but you decide how to arrange your hands and feet.`,
            realUsage: `Select components, Tabs, Accordions, Dropdown menus.`,
            code: `// Using Context to share state
const TabContext = createContext();

function Tabs({ children, defaultTab }) {
  const [activeTab, setActiveTab] = useState(defaultTab);
  
  return (
    <TabContext.Provider value={{ activeTab, setActiveTab }}>
      <div>{children}</div>
    </TabContext.Provider>
  );
}

function TabList({ children }) {
  return <div role="tablist">{children}</div>;
}

function Tab({ id, children }) {
  const { activeTab, setActiveTab } = useContext(TabContext);
  return (
    <button onClick={() => setActiveTab(id)}>
      {children}
    </button>
  );
}

// Usage
<Tabs defaultTab="1">
  <TabList>
    <Tab id="1">First</Tab>
    <Tab id="2">Second</Tab>
  </TabList>
  <TabPanel id="1">Content 1</TabPanel>
</Tabs>`,
            interviewQuestions: [
                {
                    question: "What are the benefits of compound components?",
                    answer: "1) **Flexible** - user controls markup structure, 2) **Implicit state sharing** - no prop drilling, 3) **Clear API** - components are self-documenting, 4) **Separation of concerns** - each sub-component has a single responsibility."
                }
            ]
        },
        {
            id: "render-props",
            title: "Render Props",
            category: "Patterns",
            explanation: `A component with a render prop takes a function that returns a React element and calls it instead of implementing its own render logic.`,
            analogy: `It's like a **catering service** - you provide the venue and guest list, they bring the food. The pattern lets you inject custom rendering while reusing logic.`,
            realUsage: `Mouse tracking, data fetching, feature toggles. Less common now due to Hooks.`,
            code: `function Mouse({ render }) {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  
  useEffect(() => {
    function handleMove(e) {
      setPosition({ x: e.clientX, y: e.clientY });
    }
    window.addEventListener('mousemove', handleMove);
    return () => window.removeEventListener('mousemove', handleMove);
  }, []);
  
  return render(position);
}

// Usage
<Mouse render={({ x, y }) => (
  <h1>Mouse position: {x}, {y}</h1>
)} />`,
            interviewQuestions: [
                {
                    question: "Why are render props less common now?",
                    answer: "Hooks provide a cleaner way to share stateful logic. The same Mouse component would be a `useMousePosition()` hook now. Render props can lead to 'callback hell' when nesting multiple, while hooks compose cleanly."
                }
            ]
        },
        {
            id: "hoc",
            title: "Higher-Order Components (HOC)",
            category: "Patterns",
            explanation: `A higher-order component is a function that takes a component and returns a new component with additional props or behavior.`,
            analogy: `HOC is like a **gift wrapper**. You put a gift (component) in, and you get back the same gift but wrapped (enhanced).`,
            realUsage: `Authentication checks, analytics tracking, theme injection. Less common with Hooks.`,
            code: `// HOC function
function withAuth(Component) {
  return function AuthenticatedComponent(props) {
    const { isAuthenticated } = useAuth();
    
    if (!isAuthenticated) {
      return <Redirect to="/login" />;
    }
    
    return <Component {...props} />;
  };
}

// Usage
const ProtectedPage = withAuth(DashboardPage);`,
            interviewQuestions: [
                {
                    question: "What are the problems with HOCs?",
                    answer: "1) **Wrapper hell** - multiple HOCs create deep nesting, 2) **Prop collisions** - HOCs might override props, 3) **Hard to debug** - DevTools show generic names, 4) **Static composition** - can't be composed at runtime. Hooks solve most of these issues."
                }
            ]
        },
        {
            id: "provider-pattern",
            title: "Provider Pattern",
            category: "Patterns",
            explanation: `The Provider pattern uses React Context to make data available to a tree of components without prop drilling.`,
            analogy: `Provider is like **WiFi**. Instead of running cables (props) to every device, you broadcast the signal and devices connect as needed.`,
            realUsage: `Theme, authentication, language/locale, user settings.`,
            code: `const ThemeContext = createContext();

function ThemeProvider({ children }) {
  const [theme, setTheme] = useState('light');
  
  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

// Custom hook for easier access
function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) throw new Error('useTheme must be used within ThemeProvider');
  return context;
}

// Usage
<ThemeProvider>
  <App />
</ThemeProvider>`,
            interviewQuestions: [
                {
                    question: "When should you NOT use Context?",
                    answer: "Don't use Context for high-frequency updates (like mouse position, scroll position) because all consumers re-render on value change. For that, use state management libraries with selectors or useSyncExternalStore."
                }
            ]
        },
        {
            id: "custom-hooks",
            title: "Custom Hooks",
            category: "Patterns",
            explanation: `Custom Hooks are JavaScript functions that use React Hooks and can be reused across components. They must start with "use".`,
            analogy: `Custom hooks are like **recipes**. Instead of cooking from scratch every time, you save your proven recipes and reuse them.`,
            realUsage: `Extracting reusable logic: form handling, API calls, animations, localStorage sync.`,
            code: `// Custom hook
function useFetch(url) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  useEffect(() => {
    fetch(url)
      .then(res => res.json())
      .then(setData)
      .catch(setError)
      .finally(() => setLoading(false));
  }, [url]);
  
  return { data, loading, error };
}

// Usage
function UserProfile({ userId }) {
  const { data, loading, error } = useFetch(\`/api/users/\${userId}\`);
  
  if (loading) return <Spinner />;
  if (error) return <Error />;
  return <div>{data.name}</div>;
}`,
            interviewQuestions: [
                {
                    question: "What are the rules for custom hooks?",
                    answer: "1) Must start with 'use', 2) Can call other hooks, 3) Follow the rules of hooks (only call at top level, only from React functions), 4) Can return anything (not limited to JSX)."
                }
            ]
        },
        {
            id: "container-presenter",
            title: "Container-Presenter Pattern",
            category: "Patterns",
            explanation: `Same as Smart vs Dumb components. Container handles logic and data, Presenter handles UI.`,
            analogy: `Container is the **brain**, Presenter is the **face**. Brain thinks, face expresses.`,
            realUsage: `Separating concerns in complex components, making UI components reusable.`,
            code: `// Presenter
function UserList({ users, onUserClick }) {
  return (
    <ul>
      {users.map(user => (
        <li key={user.id} onClick={() => onUserClick(user)}>
          {user.name}
        </li>
      ))}
    </ul>
  );
}

// Container
function UserListContainer() {
  const [users, setUsers] = useState([]);
  
  useEffect(() => {
    fetchUsers().then(setUsers);
  }, []);
  
  function handleUserClick(user) {
    navigate(\`/users/\${user.id}\`);
  }
  
  return <UserList users={users} onUserClick={handleUserClick} />;
}`,
            interviewQuestions: [
                {
                    question: "Is this pattern still relevant with Hooks?",
                    answer: "Somewhat. Hooks let you mix logic and UI in the same component more cleanly. However, separating complex logic into custom hooks and keeping components focused on UI is still valuable."
                }
            ]
        },
        {
            id: "error-boundaries",
            title: "Error Boundaries",
            category: "Patterns",
            explanation: `Error boundaries are React components that catch JavaScript errors anywhere in their child component tree, log those errors, and display a fallback UI.`,
            analogy: `Error boundaries are like **airbags in a car**. When there's a crash (error), they deploy to protect you instead of letting the whole car explode.`,
            realUsage: `Catching errors in widgets, third-party components, or feature sections without crashing the entire app.`,
            code: `class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }
  
  static getDerivedStateFromError(error) {
    return { hasError: true };
  }
  
  componentDidCatch(error, errorInfo) {
    console.error('Error:', error, errorInfo);
  }
  
  render() {
    if (this.state.hasError) {
      return <h1>Something went wrong.</h1>;
    }
    return this.props.children;
  }
}

// Usage
<ErrorBoundary>
  <MyWidget />
</ErrorBoundary>`,
            interviewQuestions: [
                {
                    question: "What errors do Error Boundaries NOT catch?",
                    answer: "Error boundaries don't catch: 1) Errors in event handlers, 2) Async code (setTimeout, promises), 3) SSR errors, 4) Errors in the error boundary itself. Use try/catch for event handlers and async code."
                },
                {
                    question: "Can functional components be error boundaries?",
                    answer: "No, currently error boundaries must be class components. There's no Hook equivalent yet (as of React 18). You can wrap them in a reusable class component and use it throughout your app."
                }
            ]
        },
        {
            id: "portals",
            title: "Portals",
            category: "Patterns",
            explanation: `Portals provide a way to render children into a DOM node that exists outside the DOM hierarchy of the parent component.`,
            analogy: `Portals are like a **teleporter**. Your component is in one place in the React tree, but it renders content somewhere else in the DOM.`,
            realUsage: `Modals, tooltips, dropdowns - UI elements that need to break out of parent overflow/z-index constraints.`,
            code: `import { createPortal } from 'react-dom';

function Modal({ children }) {
  return createPortal(
    <div className="modal">
      {children}
    </div>,
    document.getElementById('modal-root')
  );
}

// In your HTML
// <div id="root"></div>
// <div id="modal-root"></div>`,
            interviewQuestions: [
                {
                    question: "How do events work with Portals?",
                    answer: "Events bubble through the React tree, not the DOM tree. Even though a portal is rendered elsewhere in the DOM, events from it will bubble to ancestors in the React component tree, allowing event delegation to work as expected."
                }
            ]
        }
    ]
};
