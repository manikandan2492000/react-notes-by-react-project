export const topic03Hooks = {
    "3. Hooks (All Important Hooks)": [
        {
            id: "useeffect",
            title: "useEffect",
            category: "Hooks",
            explanation: `\`useEffect\` lets you perform side effects in function components. It serves the same purpose as \`componentDidMount\`, \`componentDidUpdate\`, and \`componentWillUnmount\` in React classes, combined into one API.`,
            analogy: `It's like a **reminder system**. "After you paint the wall (render), don't forget to open the window (side effect)."`,
            realUsage: `Data fetching, setting up subscriptions, manually changing the DOM, logging, timers.`,
            code: `import { useEffect } from 'react';

function Profile({ userId }) {
  useEffect(() => {
    // This runs after render
    fetchUser(userId).then(setUser);
    
    // Cleanup function (runs before next effect and unmount)
    return () => {
      cancelRequest();
    };
  }, [userId]); // Dependency array
}`,
            interviewQuestions: [
                {
                    question: "What happens if the dependency array is empty `[]`?",
                    answer: "The effect runs **only once** after the initial render, similar to `componentDidMount`. The cleanup runs only on unmount."
                },
                {
                    question: "What happens if you omit the dependency array?",
                    answer: "The effect runs **after every render**, including after every state update. This can cause performance issues and infinite loops if you update state inside."
                }
            ]
        },
        {
            id: "dependency-array",
            title: "Dependency Array",
            category: "Hooks",
            explanation: `The dependency array tells React when to re-run the effect. Include all values from component scope (props, state, functions) that the effect uses.`,
            analogy: `The dependency array is like a **shopping list** - it lists all the ingredients (dependencies) your recipe (effect) needs. When any ingredient changes, you remake the dish.`,
            realUsage: `Controlling when effects run to avoid bugs and performance issues.`,
            code: `// Runs on every render
useEffect(() => {
  console.log('Every render');
});

// Runs only once on mount
useEffect(() => {
  console.log('Mount only');
}, []);

// Runs when count changes
useEffect(() => {
  document.title = \`Count: \${count}\`;
}, [count]);

// Multiple dependencies
useEffect(() => {
  fetchData(userId, filter);
}, [userId, filter]);`,
            interviewQuestions: [
                {
                    question: "What happens if you forget a dependency?",
                    answer: "You might use a stale value (from a previous render), causing bugs. ESLint plugin `eslint-plugin-react-hooks` warns about missing dependencies. Always include all values used inside the effect."
                }
            ]
        },
        {
            id: "cleanup-function",
            title: "Cleanup Function",
            category: "Hooks",
            explanation: `The cleanup function returned from useEffect runs before the component unmounts and before the effect runs again. Use it to cancel subscriptions, timers, or requests.`,
            analogy: `Cleanup is like **turning off the lights when you leave a room** - you clean up resources you no longer need.`,
            realUsage: `Canceling API requests, clearing timers, removing event listeners, unsubscribing from subscriptions.`,
            code: `useEffect(() => {
  // Setup
  const timer = setTimeout(() => {
    console.log('Delayed message');
  }, 1000);
  
  // Cleanup
  return () => {
    clearTimeout(timer);
  };
}, []);

// WebSocket cleanup
useEffect(() => {
  const ws = new WebSocket('ws://...');
  ws.onmessage = handleMessage;
  
  return () => {
    ws.close();
  };
}, []);`,
            interviewQuestions: [
                {
                    question: "When does the cleanup function run?",
                    answer: "1) Before the effect runs again (if dependencies changed), 2) When the component unmounts. This prevents memory leaks and ensures proper cleanup of resources."
                }
            ]
        },
        {
            id: "infinite-loop-problems",
            title: "Infinite Loop Problems",
            category: "Hooks",
            explanation: `Infinite loops occur when an effect updates state that triggers a re-render, which runs the effect again, creating a cycle.`,
            analogy: `An infinite loop is like standing between **two mirrors** - you see yourself reflecting infinitely because each mirror shows the other.`,
            realUsage: `Common mistake when learning useEffect. Always check dependencies and avoid updating state that's in the dependency array.`,
            code: `// ❌ Infinite loop - count in dependency triggers re-run
useEffect(() => {
  setCount(count + 1);
}, [count]);

// ❌ Infinite loop - missing dependency array
useEffect(() => {
  setData(fetchData());
});

// ✅ Correct - runs once
useEffect(() => {
  fetchData().then(setData);
}, []);

// ✅ Correct - functional update
useEffect(() => {
  const timer = setInterval(() => {
    setCount(c => c + 1); // Don't need count in dependency
  }, 1000);
  return () => clearInterval(timer);
}, []);`,
            interviewQuestions: [
                {
                    question: "How do you debug infinite loops in useEffect?",
                    answer: "1) Check if state updated in effect is also in dependencies, 2) Use functional updates to avoid dependencies, 3) Add console.logs to track re-renders, 4) Use React DevTools Profiler to see render causes."
                }
            ]
        },
        {
            id: "common-patterns-useeffect",
            title: "Common Patterns with useEffect",
            category: "Hooks",
            explanation: `Common useEffect patterns include fetching data, subscriptions, DOM manipulation, and synchronizing with external systems.`,
            analogy: `useEffect patterns are like **recipes** - proven combinations of ingredients (dependencies) and steps (effect logic) for common tasks.`,
            realUsage: `Standard patterns used across React applications for side effects.`,
            code: `// Data fetching
useEffect(() => {
  let ignore = false;
  
  fetchUser(userId).then(user => {
    if (!ignore) setUser(user);
  });
  
  return () => { ignore = true; }; // Prevent race condition
}, [userId]);

// Event listener
useEffect(() => {
  function handleResize() {
    setWidth(window.innerWidth);
  }
  window.addEventListener('resize', handleResize);
  return () => window.removeEventListener('resize', handleResize);
}, []);

// Document title
useEffect(() => {
  document.title = \`You clicked \${count} times\`;
}, [count]);`,
            interviewQuestions: [
                {
                    question: "What is a race condition in useEffect and how do you prevent it?",
                    answer: "Race condition: Component fetches data for id=1, then id changes to id=2 before request 1 completes. Response 1 arrives after response 2, showing wrong data. Fix: Use a boolean flag `ignore` that's set to true in cleanup to ignore stale responses."
                }
            ]
        },
        {
            id: "useref",
            title: "useRef",
            category: "Hooks",
            explanation: `\`useRef\` returns a mutable ref object whose \`.current\` property persists across renders. Unlike state, updating a ref doesn't trigger a re-render.`,
            analogy: `useRef is like a **pocket** in your component's jacket. You can put stuff in there, take it out, or replace it without anyone noticing (no re-render).`,
            realUsage: `Accessing DOM nodes, storing mutable values (timers, previous values), avoiding re-renders for certain data.`,
            code: `// Accessing DOM elements
function TextInput() {
  const inputRef = useRef(null);
  
  function focusInput() {
    inputRef.current.focus();
  }
  
  return <input ref={inputRef} />;
}

// Storing mutable value
function Timer() {
  const intervalRef = useRef(null);
  
  useEffect(() => {
    intervalRef.current = setInterval(() => {
      console.log('tick');
    }, 1000);
    
    return () => clearInterval(intervalRef.current);
  }, []);
}`,
            interviewQuestions: [
                {
                    question: "What's the difference between useRef and useState?",
                    answer: "`useState` triggers re-render when updated. `useRef` doesn't trigger re-render - changes to `.current` are 'invisible' to React. Use refs for values you need to persist but don't affect rendering."
                }
            ]
        },
        {
            id: "usememo",
            title: "useMemo",
            category: "Hooks",
            explanation: `\`useMemo\` memoizes (caches) the result of an expensive calculation. It only recalculates when dependencies change.`,
            analogy: `useMemo is like **keeping answers to math problems** you've already solved. Instead of recalculating 2+2 every time, you remember the answer is 4.`,
            realUsage: `Filtering/sorting large lists, expensive computations, preventing unnecessary recalculations.`,
            code: `function TodoList({ todos, filter }) {
  // Expensive calculation - only runs when todos or filter changes
  const visibleTodos = useMemo(() => {
    return todos.filter(todo => {
      if (filter === 'active') return !todo.completed;
      if (filter === 'completed') return todo.completed;
      return true;
    });
  }, [todos, filter]);
  
  return <ul>{visibleTodos.map(todo => ...)}</ul>;
}`,
            interviewQuestions: [
                {
                    question: "When should you use useMemo?",
                    answer: "Use when: 1) Calculation is genuinely expensive (profiler confirms), 2) Passing objects to child components with React.memo, 3) Value is used in dependency array of other hooks. Don't overuse - premature optimization makes code harder to read."
                }
            ]
        },
        {
            id: "usecallback",
            title: "useCallback",
            category: "Hooks",
            explanation: `\`useCallback\` memoizes a function so it has the same reference across renders. Useful for passing callbacks to optimized child components.`,
            analogy: `useCallback is like **giving someone your business card** instead of writing your phone number on different scraps of paper each time.`,
            realUsage: `Optimizing child components wrapped in React.memo, passing callbacks to useEffect dependencies.`,
            code: `function Parent() {
  const [count, setCount] = useState(0);
  
  // Without useCallback - new function on every render
  const increment = () => setCount(c => c + 1);
  
  // With useCallback - same function reference
  const increment = useCallback(() => {
    setCount(c => c + 1);
  }, []); // No dependencies needed (functional update)
  
  return <Child onIncrement={increment} />;
}

const Child = React.memo(({ onIncrement }) => {
  // Only re-renders if onIncrement reference changes
  return <button onClick={onIncrement}>Increment</button>;
});`,
            interviewQuestions: [
                {
                    question: "What's the difference between useMemo and useCallback?",
                    answer: "`useMemo(() => fn)` returns the **result** of calling fn. `useCallback(fn)` returns the **function** fn itself. In fact, `useCallback(fn, deps)` is equivalent to `useMemo(() => fn, deps)`."
                }
            ]
        },
        {
            id: "usereducer",
            title: "useReducer",
            category: "Hooks",
            explanation: `\`useReducer\` is an alternative to useState for managing complex state logic. It takes a reducer function and initial state, returning current state and a dispatch function.`,
            analogy: `useReducer is like a **customer service department**. You send requests (actions) to dispatch, a specialist (reducer) processes them, and updates the records (state).`,
            realUsage: `Complex state objects with multiple sub-values, state logic that depends on previous state, managing form state with multiple fields.`,
            code: `const initialState = { count: 0, step: 1 };

function reducer(state, action) {
  switch (action.type) {
    case 'increment':
      return { ...state, count: state.count + state.step };
    case 'decrement':
      return { ...state, count: state.count - state.step };
    case 'setStep':
      return { ...state, step: action.payload };
    default:
      throw new Error();
  }
}

function Counter() {
  const [state, dispatch] = useReducer(reducer, initialState);
  
  return (
    <>
      <p>Count: {state.count}</p>
      <button onClick={() => dispatch({ type: 'increment' })}>+</button>
      <button onClick={() => dispatch({ type: 'decrement' })}>-</button>
      <input 
        value={state.step} 
        onChange={e => dispatch({ type: 'setStep', payload: Number(e.target.value) })}
      />
    </>
  );
}`,
            interviewQuestions: [
                {
                    question: "When should you use useReducer vs useState?",
                    answer: "Use useReducer when: 1) State has complex update logic, 2) Multiple sub-values in state, 3) Next state depends on previous state, 4) Want to optimize performance (dispatch identity is stable). Use useState for simple values."
                }
            ]
        },
        {
            id: "uselayouteffect",
            title: "useLayoutEffect",
            category: "Hooks",
            explanation: `\`useLayoutEffect\` fires synchronously after all DOM mutations but **before** the browser paints. It blocks visual updates until your callback finishes.`,
            analogy: `It's like **checking your makeup** in the mirror right before you step on stage. You fix it *before* the audience sees you. \`useEffect\` is fixing it *after* you're already on stage (which might cause a flicker).`,
            realUsage: `Measuring DOM elements (width/height) to adjust layout before showing it to the user (preventing layout shift).`,
            code: `function Tooltip() {
  const ref = useRef(null);
  const [tooltipHeight, setTooltipHeight] = useState(0);
  
  useLayoutEffect(() => {
    const { height } = ref.current.getBoundingClientRect();
    setTooltipHeight(height);
  }, []);
  
  return <div ref={ref} style={{ top: -tooltipHeight }}>Tooltip</div>;
}`,
            interviewQuestions: [
                {
                    question: "Why prefer useEffect over useLayoutEffect?",
                    answer: "`useLayoutEffect` is synchronous and blocks the browser from painting, which can hurt performance. Always start with `useEffect` and only switch if you see a visual flicker or need to measure/mutate DOM before paint."
                }
            ]
        },
        {
            id: "useimperativehandle",
            title: "useImperativeHandle",
            category: "Hooks",
            explanation: `\`useImperativeHandle\` customizes the instance value that is exposed to parent components when using \`ref\`. Use with \`forwardRef\`.`,
            analogy: `It's like a **hotel concierge** - you don't give guests direct access to all hotel operations, only a limited interface (check-in, room service).`,
            realUsage: `Exposing limited API to parent components, custom input controls, integration with third-party DOM libraries.`,
            code: `import { forwardRef, useImperativeHandle, useRef } from 'react';

const FancyInput = forwardRef((props, ref) => {
  const inputRef = useRef();
  
  useImperativeHandle(ref, () => ({
    focus: () => {
      inputRef.current.focus();
    },
    scrollIntoView: () => {
      inputRef.current.scrollIntoView();
    }
  }));
  
  return <input ref={inputRef} />;
});

// Usage
function Parent() {
  const ref = useRef();
  return (
    <>
      <FancyInput ref={ref} />
      <button onClick={() => ref.current.focus()}>Focus</button>
    </>
  );
}`,
            interviewQuestions: [
                {
                    question: "When should you use useImperativeHandle?",
                    answer: "Rarely. It breaks encapsulation. Use only when: 1) Building reusable UI libraries, 2) Integrating with imperative third-party libraries, 3) Need to expose specific methods (focus, play/pause) without exposing entire DOM node."
                }
            ]
        },
        {
            id: "useid",
            title: "useId",
            category: "Hooks",
            explanation: `\`useId\` is a hook for generating unique IDs that are stable across the server and client. It is primarily used for accessibility attributes (aria-labelledby, htmlFor).`,
            analogy: `It's like a **ticket number generator**. It ensures that the ticket number you get on the website (server) matches the one you have when you arrive at the venue (client), preventing confusion (hydration mismatches).`,
            realUsage: `Linking labels to inputs: \`<label htmlFor={id}>...</label><input id={id} />\`.`,
            code: `import { useId } from 'react';

function NameField() {
  const id = useId();
  
  return (
    <>
      <label htmlFor={id}>Name:</label>
      <input id={id} type="text" />
    </>
  );
}

// For multiple related elements
function PasswordField() {
  const id = useId();
  
  return (
    <>
      <label htmlFor={id}>Password:</label>
      <input id={id} type="password" aria-describedby={id + '-hint'} />
      <p id={id + '-hint'}>Must be at least 8 characters</p>
    </>
  );
}`,
            interviewQuestions: [
                {
                    question: "Can useId be used for list keys?",
                    answer: "No. Keys must be generated from your data (like database IDs). `useId` generates IDs based on the component tree structure, which changes if order changes. Use data-based keys for lists."
                }
            ]
        },
        {
            id: "usetransition",
            title: "useTransition",
            category: "Hooks",
            explanation: `\`useTransition\` lets you mark a state update as a transition (non-urgent). This allows React to prioritize other urgent updates (like typing) while the transition update (like filtering a list) runs in the background.`,
            analogy: `It's like **telling your assistant**: "Take this letter to the post office (transition), but if the phone rings (urgent user input), answer the phone first."`,
            realUsage: `Keeping the UI responsive while filtering a large list or navigating to a new page.`,
            code: `import { useState, useTransition } from 'react';

function SearchList({ items }) {
  const [filter, setFilter] = useState('');
  const [isPending, startTransition] = useTransition();
  
  function handleChange(e) {
    const value = e.target.value;
    setFilter(value); // Urgent: input value update
    
    startTransition(() => {
      setFilteredItems(items.filter(item => item.includes(value))); // Non-urgent
    });
  }
  
  return (
    <>
      <input value={filter} onChange={handleChange} />
      {isPending ? <Spinner /> : <List items={filteredItems} />}
    </>
  );
}`,
            interviewQuestions: [
                {
                    question: "What is the difference between useTransition and setTimeout?",
                    answer: "`setTimeout` delays execution by a fixed time. `useTransition` executes immediately but at a **lower priority**, meaning it can be interrupted by higher priority updates like user input. React dynamically schedules transitions."
                }
            ]
        },
        {
            id: "usedeferredvalue",
            title: "useDeferredValue",
            category: "Hooks",
            explanation: `\`useDeferredValue\` lets you defer updating a part of the UI. It returns a deferred version of the value that may lag behind the actual value.`,
            analogy: `It's like **watching a live sports game with a slight delay**. The important actions (user input) happen instantly, but the commentary (derived UI) can lag a bit.`,
            realUsage: `Keeping expensive UI (like charts or visualizations) responsive during input.`,
            code: `import { useState, useDeferredValue } from 'react';

function Search() {
  const [query, setQuery] = useState('');
  const deferredQuery = useDeferredValue(query);
  
  return (
    <>
      <input value={query} onChange={e => setQuery(e.target.value)} />
      {/* This list uses deferred query, so it doesn't block input */}
      <SearchResults query={deferredQuery} />
    </>
  );
}`,
            interviewQuestions: [
                {
                    question: "What's the difference between useDeferredValue and useTransition?",
                    answer: "`useTransition` wraps the setState call to mark it as non-urgent. `useDeferredValue` can't wrap setState (e.g., if it's from a prop), so it defers the value instead. Use useTransition when you control the setState, useDeferredValue when you receive the value."
                }
            ]
        },
        {
            id: "usesyncexternalstore",
            title: "useSyncExternalStore",
            category: "Hooks",
            explanation: `\`useSyncExternalStore\` lets you subscribe to an external store. It's designed for libraries that manage state outside React (like Redux, Zustand).`,
            analogy: `It's like **subscribing to a newspaper**. The newspaper (external store) publishes news, and you get notified when there's an update.`,
            realUsage: `Library authors use this to integrate external state systems with React. App developers rarely use it directly.`,
            code: `import { useSyncExternalStore } from 'react';

// External store (e.g., browser API)
const store = {
  listeners: [],
  value: window.innerWidth,
  subscribe(listener) {
    window.addEventListener('resize', () => {
      this.value = window.innerWidth;
      this.listeners.forEach(l => l());
    });
    this.listeners.push(listener);
    return () => {
      this.listeners = this.listeners.filter(l => l !== listener);
    };
  },
  getSnapshot() {
    return this.value;
  }
};

function useWindowWidth() {
  return useSyncExternalStore(
    store.subscribe,
    store.getSnapshot
  );
}`,
            interviewQuestions: [
                {
                    question: "Why was useSyncExternalStore added in React 18?",
                    answer: "React 18's concurrent features can cause 'tearing' - different components seeing different values from an external store. `useSyncExternalStore` ensures all components see consistent snapshots, preventing visual inconsistencies."
                }
            ]
        },
        {
            id: "useinsertioneffect",
            title: "useInsertionEffect",
            category: "Hooks",
            explanation: `\`useInsertionEffect\` is designed for CSS-in-JS libraries to inject styles before layout effects fire. It runs before DOM mutations.`,
            analogy: `It's like **setting the stage before the actors arrive** - you arrange the props (styles) before anyone can see them.`,
            realUsage: `Used internally by CSS-in-JS libraries (styled-components, Emotion). App developers should avoid using it directly.`,
            code: `// For CSS-in-JS library authors only
import { useInsertionEffect } from 'react';

function useCSS(styles) {
  useInsertionEffect(() => {
    const styleElement = document.createElement('style');
    styleElement.textContent = styles;
    document.head.appendChild(styleElement);
    
    return () => {
      document.head.removeChild(styleElement);
    };
  });
}`,
            interviewQuestions: [
                {
                    question: "When should you use useInsertionEffect?",
                    answer: "Almost never. It's specifically for CSS-in-JS library authors who need to inject styles before layout calculations. If you're not building a CSS-in-JS library, use `useEffect` or `useLayoutEffect` instead."
                }
            ]
        }
    ]
};
