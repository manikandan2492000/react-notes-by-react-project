export const topic02StateManagement = {
    "2. State Management (Local State)": [
        {
            id: "state-management",
            title: "State Management",
            category: "State Management",
            explanation: `State is a built-in React object that is used to contain data or information about the component. A component's state can change over time; whenever it changes, the component re-renders.`,
            analogy: `State is like a **component's memory**. It remembers things like "is the menu open?" or "what did the user type?".`,
            realUsage: `Form inputs, toggles, counters, fetched data - any data that changes over time in your app.`,
            code: `import { useState } from 'react';

function Counter() {
  const [count, setCount] = useState(0);

  return (
    <button onClick={() => setCount(count + 1)}>
      Count: {count}
    </button>
  );
}`,
            interviewQuestions: [
                {
                    question: "What is the difference between Props and State?",
                    answer: "**Props** get passed *to* the component (like function arguments) and are immutable. **State** is managed *within* the component (like local variables) and can be changed using setter functions."
                }
            ]
        },
        {
            id: "usestate",
            title: "useState",
            category: "Hooks",
            explanation: `\`useState\` is a Hook that lets you add React state to function components. It returns an array with two values: the current state and a function to update it.`,
            analogy: `It's like a **backpack** for your function. Normally, when a function finishes running, its variables disappear. \`useState\` lets the function "remember" a value between runs (renders).`,
            realUsage: `Tracking user input, toggling UI elements, counters, managing local component state.`,
            code: `const [age, setAge] = useState(28);
const [name, setName] = useState('Taylor');
const [todos, setTodos] = useState(() => createTodos()); // Lazy initialization

// Updating state
setAge(29);
setAge(a => a + 1); // Functional update`,
            interviewQuestions: [
                {
                    question: "Why do we destructure useState?",
                    answer: "Because `useState` returns an array `[value, setter]`. Destructuring allows us to give them meaningful names like `[count, setCount]` instead of accessing them as `state[0]` and `state[1]`."
                },
                {
                    question: "What happens if you update state with the same value?",
                    answer: "React will bail out without rendering the children or firing effects. It uses `Object.is` comparison to detect if the value actually changed."
                }
            ]
        },
        {
            id: "initial-state-patterns",
            title: "Initial State Patterns",
            category: "State Management",
            explanation: `Initial state can be set directly or computed lazily. Lazy initialization is useful when the initial state is expensive to calculate.`,
            analogy: `Lazy initialization is like **ordering food only when you're hungry** vs pre-ordering everything at the start of the day.`,
            realUsage: `Reading from localStorage, processing large datasets, complex calculations that only need to run once.`,
            code: `// Direct initialization
const [count, setCount] = useState(0);

// Lazy initialization (function only runs once)
const [todos, setTodos] = useState(() => {
  const saved = localStorage.getItem('todos');
  return saved ? JSON.parse(saved) : [];
});

// Functional initial state from props
function Component({ initialCount }) {
  const [count, setCount] = useState(() => initialCount * 2);
}`,
            interviewQuestions: [
                {
                    question: "When should you use lazy initialization?",
                    answer: "Use lazy initialization when: 1) Reading from localStorage/sessionStorage, 2) Complex computations for initial state, 3) The initializer function is expensive. Don't use it for simple values like `0` or `''`."
                }
            ]
        },
        {
            id: "updating-state-correctly",
            title: "Updating State Correctly",
            category: "State Management",
            explanation: `Never modify state directly. Always use the setter function. For objects and arrays, create new copies instead of mutating.`,
            analogy: `State is like a **legal contract** - you can't just scribble changes on it. You must create a new version with the updates.`,
            realUsage: `Essential for React to detect changes and trigger re-renders correctly.`,
            code: `// ❌ Wrong - mutating state
const [user, setUser] = useState({ name: 'Alice' });
user.name = 'Bob'; // DON'T DO THIS

// ✅ Correct - creating new object
setUser({ ...user, name: 'Bob' });

// Arrays
const [items, setItems] = useState([1, 2, 3]);

// ❌ Wrong
items.push(4);

// ✅ Correct
setItems([...items, 4]);
setItems(items.concat(4));`,
            interviewQuestions: [
                {
                    question: "Why can't you mutate state directly?",
                    answer: "React compares the old and new state by reference. If you mutate the object, the reference stays the same, so React thinks nothing changed and won't re-render. Always create new objects/arrays."
                }
            ]
        },
        {
            id: "state-batching",
            title: "State Batching",
            category: "State Management",
            explanation: `React groups multiple state updates into a single re-render for better performance. In React 18+, all updates are automatically batched, even in timeouts and promises.`,
            analogy: `State batching is like **collecting mail** - instead of driving to every house individually, the mailman collects all letters and delivers them in one trip.`,
            realUsage: `Improves performance by reducing unnecessary re-renders when multiple state updates happen together.`,
            code: `function handleClick() {
  setCount(c => c + 1);
  setFlag(f => !f);
  // React batches these and re-renders only once
}

// React 18+: Also batched in timeouts
setTimeout(() => {
  setCount(c => c + 1);
  setFlag(f => !f);
  // Still batched in React 18+
}, 1000);

// To force synchronous update (rare)
import { flushSync } from 'react-dom';
flushSync(() => {
  setCount(c => c + 1);
});`,
            interviewQuestions: [
                {
                    question: "What changed with batching in React 18?",
                    answer: "Before React 18, updates in setTimeout, promises, and native events were NOT batched. React 18 introduced automatic batching everywhere using the `createRoot` API, improving performance."
                }
            ]
        },
        {
            id: "derived-state",
            title: "Derived State",
            category: "State Management",
            explanation: `Derived state is data that can be computed from existing state or props. Don't store it in state - calculate it during render instead.`,
            analogy: `Derived state is like **calculating your age** from your birthdate - you don't store both the birthdate and age, you calculate age when needed.`,
            realUsage: `Filtered lists, computed totals, formatted values - anything that can be calculated from existing data.`,
            code: `function TodoList({ todos, filter }) {
  // ❌ Don't store derived state
  const [filteredTodos, setFilteredTodos] = useState([]);
  
  // ✅ Calculate during render
  const filteredTodos = todos.filter(todo => {
    if (filter === 'active') return !todo.completed;
    if (filter === 'completed') return todo.completed;
    return true;
  });
  
  return <ul>{filteredTodos.map(todo => ...)}</ul>;
}`,
            interviewQuestions: [
                {
                    question: "Why shouldn't you store derived state?",
                    answer: "Storing derived state creates synchronization bugs - if the source data changes, you must remember to update the derived state. It's simpler and more reliable to calculate it on every render. Use `useMemo` if the calculation is expensive."
                }
            ]
        },
        {
            id: "avoid-redundant-state",
            title: "Avoid Redundant State",
            category: "State Management",
            explanation: `Don't store data in state if it can be calculated from props or other state during render. This prevents synchronization issues.`,
            analogy: `Redundant state is like storing both **Celsius and Fahrenheit** - just store one and convert when needed.`,
            realUsage: `Simplifies components and prevents bugs where related state values get out of sync.`,
            code: `// ❌ Redundant state
function Form({ defaultName }) {
  const [name, setName] = useState(defaultName);
  const [email, setEmail] = useState('');
  const [isValid, setIsValid] = useState(false); // Redundant!
  
  // Every time you update name or email, you must update isValid
}

// ✅ Calculate during render
function Form({ defaultName }) {
  const [name, setName] = useState(defaultName);
  const [email, setEmail] = useState('');
  
  const isValid = name.length > 0 && email.includes('@');
  // Always in sync!
}`,
            interviewQuestions: [
                {
                    question: "How do you identify redundant state?",
                    answer: "Ask: Can this be calculated from props or other state? If yes, it's redundant. Examples: fullName from firstName + lastName, isFormValid from field values, filteredItems from items + filter."
                }
            ]
        },
        {
            id: "primitive-vs-object-state",
            title: "Primitive vs Object vs Array State",
            category: "State Management",
            explanation: `State can hold primitives (string, number), objects, or arrays. Objects and arrays require special handling because React compares by reference.`,
            analogy: `Primitives are like **numbers written on a whiteboard** - easy to erase and replace. Objects/arrays are like **filing cabinets** - you need to replace the whole cabinet to show something changed.`,
            realUsage: `Choose the right state structure based on your data and update patterns.`,
            code: `// Primitive state
const [count, setCount] = useState(0);
setCount(count + 1); // Simple

// Object state (create new object)
const [user, setUser] = useState({ name: '', age: 0 });
setUser({ ...user, name: 'Alice' }); // Spread to preserve other fields

// Array state (create new array)
const [items, setItems] = useState([1, 2, 3]);
setItems([...items, 4]); // Add item
setItems(items.filter(item => item !== 2)); // Remove item
setItems(items.map(item => item * 2)); // Update all`,
            interviewQuestions: [
                {
                    question: "Should you split state into multiple useState calls or keep it in one object?",
                    answer: "Split state when: 1) Values update independently, 2) Makes code clearer. Use objects when: 1) Values are always updated together, 2) Represents a single entity (like a form or user). There's no strict rule - choose based on update patterns."
                }
            ]
        },
        {
            id: "immutable-updates",
            title: "Immutable Updates",
            category: "State Management",
            explanation: `Always create copies of objects/arrays before modifying them in state. Use spread operator, array methods that return new arrays, or libraries like Immer.`,
            analogy: `Immutable updates are like **editing a document with "Track Changes** - you don't erase the original, you create a new version showing the modifications.`,
            realUsage: `Required for React to detect changes. Essential pattern in all React applications.`,
            code: `// Object updates
const [user, setUser] = useState({ name: 'Alice', age: 25, address: { city: 'NYC' }});

// Shallow update
setUser({ ...user, age: 26 });

// Nested update
setUser({
  ...user,
  address: { ...user.address, city: 'LA' }
});

// Array updates
const [todos, setTodos] = useState([]);

// Add
setTodos([...todos, newTodo]);

// Remove
setTodos(todos.filter(t => t.id !== id));

// Update
setTodos(todos.map(t => t.id === id ? { ...t, completed: true } : t));`,
            interviewQuestions: [
                {
                    question: "What is Immer and why use it?",
                    answer: "Immer is a library that lets you write 'mutative' code that produces immutable updates. With `useImmer`, you can write `draft.user.name = 'Bob'` and Immer converts it to an immutable update. Useful for deeply nested state."
                }
            ]
        },
        {
            id: "lifting-state-up",
            title: "Lifting State Up",
            category: "State Management",
            explanation: `When two components need to share state, move the state to their closest common ancestor and pass it down via props.`,
            analogy: `Lifting state up is like having **roommates share a grocery list**. Instead of each keeping their own list, put it on the fridge (parent) where everyone can see and update it.`,
            realUsage: `Synchronizing state between sibling components, managing shared form state, coordinated UI updates.`,
            code: `// Before: State in child component
function TemperatureInput() {
  const [temperature, setTemperature] = useState('');
  return <input value={temperature} onChange={e => setTemperature(e.target.value)} />;
}

// After: Lift state to parent
function Calculator() {
  const [temperature, setTemperature] = useState('');
  
  return (
    <>
      <TemperatureInput value={temperature} onChange={setTemperature} />
      <BoilingVerdict celsius={parseFloat(temperature)} />
    </>
  );
}

function TemperatureInput({ value, onChange }) {
  return <input value={value} onChange={e => onChange(e.target.value)} />;
}`,
            interviewQuestions: [
                {
                    question: "When should you lift state up vs use Context?",
                    answer: "Lift state up when: 1) Only a few components need it, 2) Components are close in the tree. Use Context when: 1) Many components at different depths need it, 2) To avoid prop drilling through many levels."
                }
            ]
        }
    ]
};
