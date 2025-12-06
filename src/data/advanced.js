export const advanced = [
    {
        id: "react-fiber",
        title: "React Fiber Architecture",
        category: "Advanced",
        explanation: `
React Fiber is the **reconciliation engine** introduced in React 16. Its main goal is to enable **incremental rendering** of the virtual DOM.

### Key Concepts:
- **Fiber Node**: A plain JavaScript object that represents a unit of work (e.g., a component instance or DOM node).
- **Prioritization**: Fiber can assign priorities to different types of updates (e.g., user input > data fetch).
- **Pause & Resume**: React can pause work on low-priority updates to handle high-priority ones (like animation or input).
    `,
        analogy: `
Old React (Stack Reconciler) was like a **single-lane road**; once a car (update) started, it had to finish before the next one could go.
React Fiber is like a **multi-lane highway with traffic lights**. Ambulances (high priority) can bypass traffic, and long trucks (heavy rendering) can be stopped to let cars pass.
    `,
        realUsage: `
Enables features like **Suspense** and **Concurrent Mode**, allowing the UI to remain responsive even during heavy rendering tasks.
    `,
        code: `
// Conceptual: How Fiber splits work (simplified)
function workLoop(deadline) {
  while (nextUnitOfWork && deadline.timeRemaining() > 0) {
    nextUnitOfWork = performUnitOfWork(nextUnitOfWork);
  }
  if (nextUnitOfWork) {
    requestIdleCallback(workLoop);
  }
}
    `,
        interviewQuestions: [
            {
                question: "What problem did React Fiber solve?",
                answer: "It solved the 'blocking rendering' issue of the Stack Reconciler. Long-running render tasks would freeze the main thread, making the app unresponsive. Fiber breaks tasks into chunks."
            },
            {
                question: "What are the two phases of Fiber reconciliation?",
                answer: "1. **Render Phase** (Async, interruptible): React builds the fiber tree and determines changes. \n2. **Commit Phase** (Sync, uninterruptible): React applies changes to the DOM."
            }
        ]
    },
    {
        id: "context-api",
        title: "Context API",
        category: "Advanced",
        explanation: `
The Context API provides a way to pass data through the component tree without having to pass props down manually at every level (**Prop Drilling**).

### When to use:
- Global state (Theme, User Auth, Language).
- Low-frequency updates.
    `,
        analogy: `
Context is like a **broadcast tower**. Instead of whispering a message from person to person (props), the tower broadcasts it, and anyone with a radio (Consumer/useContext) can tune in.
    `,
        realUsage: `
Managing Dark/Light mode, User Authentication state, or a shopping cart in a small e-commerce app.
    `,
        code: `
import React, { createContext, useContext, useState } from 'react';

// 1. Create Context
const ThemeContext = createContext('light');

function App() {
  const [theme, setTheme] = useState('dark');
  
  return (
    // 2. Provide Value
    <ThemeContext.Provider value={theme}>
      <Toolbar />
    </ThemeContext.Provider>
  );
}

function Toolbar() {
  return <ThemedButton />;
}

function ThemedButton() {
  // 3. Consume Value
  const theme = useContext(ThemeContext);
  return <button className={theme}>I am {theme}</button>;
}
    `,
        interviewQuestions: [
            {
                question: "Does Context replace Redux?",
                answer: "Not necessarily. Context is great for low-frequency global updates (Theme, Auth). Redux is better for complex state logic, frequent updates, and middleware support."
            },
            {
                question: "What is the performance pitfall of Context?",
                answer: "If the Context value is an object and created directly in the Provider without memoization, it creates a new reference on every render, causing all consumers to re-render unnecessarily."
            }
        ]
    },
    {
        id: "error-boundaries",
        title: "Error Boundaries",
        category: "Advanced",
        explanation: `
Error Boundaries are **Class Components** that catch JavaScript errors anywhere in their child component tree, log those errors, and display a fallback UI.

### Key Lifecycle Methods:
- \`static getDerivedStateFromError(error)\`: Update state to show fallback UI.
- \`componentDidCatch(error, info)\`: Log error information.
    `,
        analogy: `
An Error Boundary is like a **safety net** under a trapeze artist. If the artist (component) falls (crashes), the net catches them so the whole circus (app) doesn't stop.
    `,
        realUsage: `
Wrapping the entire app or major sections (like a widget) to prevent the "White Screen of Death" if one part crashes.
    `,
        code: `
class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    logErrorToService(error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return <h1>Something went wrong.</h1>;
    }
    return this.props.children; 
  }
}
    `,
        interviewQuestions: [
            {
                question: "Can Error Boundaries catch errors in event handlers?",
                answer: "No. Error Boundaries only catch errors during rendering, lifecycle methods, and constructors. For event handlers, use standard \`try/catch\` blocks."
            },
            {
                question: "Why can't we use Functional Components for Error Boundaries?",
                answer: "There is currently no Hook equivalent for \`componentDidCatch\` or \`getDerivedStateFromError\`."
            }
        ]
    }
];
