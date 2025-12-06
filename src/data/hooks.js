export const hooks = [
    {
        id: "use-state",
        title: "useState",
        category: "Hooks",
        explanation: `
\`useState\` allows functional components to manage state. It returns an array with two elements: the current state value and a function to update it.

### Syntax:
\`const [state, setState] = useState(initialValue);\`

### Key Points:
- Updates are **asynchronous** (batched for performance).
- State updates trigger a re-render.
- If the new state depends on the old state, use the functional update form: \`setState(prev => prev + 1)\`.
    `,
        analogy: `
\`useState\` is like a **whiteboard** in a classroom. The teacher (component) writes something on it. When the content changes, everyone (the UI) sees the new information immediately.
    `,
        realUsage: `
Used for toggles, form inputs, counters, and any dynamic data that changes over time.
    `,
        code: `
import { useState } from 'react';

function Counter() {
  const [count, setCount] = useState(0);

  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={() => setCount(count + 1)}>Increment</button>
      {/* Functional update (safer) */}
      <button onClick={() => setCount(c => c - 1)}>Decrement</button>
    </div>
  );
}
    `,
        interviewQuestions: [
            {
                question: "Why shouldn't we update state directly (e.g., state.value = 5)?",
                answer: "Direct mutation doesn't trigger a re-render, so the UI won't update. React relies on the state setter function to know when to re-render."
            },
            {
                question: "What is state batching?",
                answer: "React groups multiple state updates into a single re-render for better performance. In React 18, automatic batching works even inside promises and timeouts."
            }
        ]
    },
    {
        id: "use-effect",
        title: "useEffect",
        category: "Hooks",
        explanation: `
\`useEffect\` handles **side effects** in functional components. Side effects include data fetching, subscriptions, manual DOM manipulations, and timers.

### Syntax:
\`useEffect(setup, dependencies?)\`

- **No dependency array**: Runs after *every* render.
- **Empty array []**: Runs only *once* (on mount).
- **[prop, state]**: Runs when any dependency changes.
- **Cleanup function**: Returned function runs before the component unmounts or before the next effect runs.
    `,
        analogy: `
\`useEffect\` is like a **cleaning crew**.
- **Mount**: They arrive and set up (start effect).
- **Update**: If the room gets dirty (deps change), they clean up the old mess and set up again.
- **Unmount**: They pack up and leave (cleanup function).
    `,
        realUsage: `
Fetching data from an API when a component loads, or setting up an event listener for window resize.
    `,
        code: `
import { useEffect, useState } from 'react';

function Timer() {
  const [seconds, setSeconds] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setSeconds(s => s + 1);
    }, 1000);

    // Cleanup function
    return () => clearInterval(interval);
  }, []); // Empty array = run once on mount

  return <div>Timer: {seconds}</div>;
}
    `,
        interviewQuestions: [
            {
                question: "What happens if you omit the dependency array?",
                answer: "The effect runs after every single render, which can lead to performance issues or infinite loops if the effect updates state."
            },
            {
                question: "When does the cleanup function run?",
                answer: "It runs when the component unmounts, and also before re-running the effect if dependencies have changed."
            }
        ]
    },
    {
        id: "use-ref",
        title: "useRef",
        category: "Hooks",
        explanation: `
\`useRef\` returns a mutable object \`{ current: initialValue }\` that persists across renders.

### Two Main Use Cases:
1. **Accessing DOM elements directly**.
2. **Storing mutable values** that do *not* cause re-renders when updated.
    `,
        analogy: `
\`useRef\` is like a **pocket** in your jeans. You can put things in it and take them out (change the value) without changing your outfit (re-rendering). \`useState\` is like holding a sign; if you change the sign, everyone notices (re-render).
    `,
        realUsage: `
Focusing an input field automatically, storing a previous state value for comparison, or holding a timer ID.
    `,
        code: `
import { useRef, useEffect } from 'react';

function TextInputWithFocusButton() {
  const inputEl = useRef(null);

  const onButtonClick = () => {
    // \`current\` points to the mounted text input element
    inputEl.current.focus();
  };

  return (
    <>
      <input ref={inputEl} type="text" />
      <button onClick={onButtonClick}>Focus the input</button>
    </>
  );
}
    `,
        interviewQuestions: [
            {
                question: "Does changing .current trigger a re-render?",
                answer: "No. `useRef` updates are synchronous but do not notify React to re-render. Use `useState` if you need the UI to update."
            },
            {
                question: "What is the difference between useRef and createRef?",
                answer: "`useRef` persists the same object object across renders. `createRef` creates a new object on every render (mostly used in class components)."
            }
        ]
    }
];
