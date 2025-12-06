export const topic01ReactBasics = {
    "1. React Basics": [
        {
            id: "what-is-react",
            title: "What is React?",
            category: "Basics",
            explanation: `React is a **JavaScript library** for building user interfaces, primarily maintained by Meta (Facebook). It follows a **component-based architecture** and uses a **declarative** style of programming.

### Key Features:
- **Virtual DOM**: React keeps a lightweight representation of the DOM in memory and syncs it with the real DOM (Reconciliation).
- **Component-Based**: UI is built from small, reusable pieces called components.
- **Unidirectional Data Flow**: Data flows one way (downwards) from parent to child via props.
- **JSX**: A syntax extension that allows writing HTML-like code inside JavaScript.`,
            analogy: `Think of React like **LEGO blocks**. 
- A traditional website is like a clay sculpture; if you want to change an arm, you might have to reshape the whole side.
- React is like a LEGO castle. If you want to change a tower, you just swap out the specific bricks (components) without touching the rest of the castle.`,
            realUsage: `Used in single-page applications (SPAs) like **Facebook, Instagram, Netflix, and Airbnb** where the UI needs to update frequently without reloading the page.`,
            code: `// Simple React Component
import React from 'react';

function Welcome({ name }) {
  return <h1>Hello, {name}</h1>;
}

export default function App() {
  return (
    <div>
      <Welcome name="Alice" />
      <Welcome name="Bob" />
    </div>
  );
}`,
            interviewQuestions: [
                {
                    question: "Why is React called a 'library' and not a 'framework'?",
                    answer: "React is a library because it only focuses on the **View** layer (UI). It doesn't enforce a specific routing or state management solution, unlike frameworks like Angular which provide a complete ecosystem out of the box."
                },
                {
                    question: "What is the Virtual DOM and how does it improve performance?",
                    answer: "The Virtual DOM is a lightweight JavaScript object copy of the real DOM. When state changes, React updates the Virtual DOM first, compares it with the previous version (Diffing), and only updates the changed parts in the real DOM (Reconciliation). This minimizes expensive direct DOM manipulations."
                }
            ]
        },
        {
            id: "spa-vs-mpa",
            title: "SPA vs MPA",
            category: "Basics",
            explanation: `- **SPA (Single Page Application)**: Loads a single HTML page and dynamically updates content as the user interacts with the app.
- **MPA (Multi-Page Application)**: Reloads the entire page for every new view or navigation.`,
            analogy: `- **SPA**: Like a **PowerPoint presentation**. You stay in the same room (browser tab) and just flip slides (views).
- **MPA**: Like **visiting different rooms** in a museum. To see the next exhibit, you have to walk out of the current room and enter a new one (full page reload).`,
            realUsage: `- **SPA**: Gmail, Trello, Twitter (smooth transitions, app-like feel).
- **MPA**: Amazon, eBay, News sites (better SEO out of the box, initial load might be faster for content-heavy sites).`,
            code: `// SPA (React Router)
<Link to="/about">About</Link> // Updates URL and view without reload

// MPA (Standard HTML)
<a href="/about.html">About</a> // Causes full page reload`,
            interviewQuestions: [
                {
                    question: "What are the downsides of an SPA?",
                    answer: "1. **SEO**: Search engines might have trouble indexing content if it's rendered via JS (though this is improving with SSR/SSG). \n2. **Initial Load Time**: Downloading the large JS bundle can take time. \n3. **Memory Usage**: Can be higher as the browser keeps the app running."
                }
            ]
        },
        {
            id: "virtual-dom",
            title: "Virtual DOM",
            category: "Basics",
            explanation: `The Virtual DOM (VDOM) is a programming concept where an ideal, or "virtual", representation of a UI is kept in memory and synced with the "real" DOM by a library such as ReactDOM. This process is called **reconciliation**.`,
            analogy: `Imagine you have a **blueprint** of a house.
- If you want to change the kitchen layout, you don't tear down the actual house immediately.
- You redraw the kitchen on the blueprint (Virtual DOM).
- Then you compare the new blueprint with the old one (Diffing).
- Finally, you only renovate the kitchen in the real house (Real DOM update).`,
            realUsage: `React uses this to ensure that even if you re-render a list of 100 items but only one changed text, only that one text node is updated in the browser.`,
            code: `// React updates this object first (Virtual DOM)
const vdom = {
  type: 'div',
  props: { className: 'container' },
  children: ['Hello World']
};

// After diffing, only minimal changes are applied to real DOM`,
            interviewQuestions: [
                {
                    question: "Is the Virtual DOM always faster than the Real DOM?",
                    answer: "No. The Virtual DOM adds overhead (diffing). For simple updates, direct DOM manipulation can be faster. However, for complex apps with frequent updates, the Virtual DOM is generally more performant because it minimizes expensive layout thrashing and repaints."
                }
            ]
        },
        {
            id: "real-vs-virtual-dom",
            title: "Real DOM vs Virtual DOM",
            category: "Basics",
            explanation: `**Real DOM**:
- Directly represents the HTML document structure in the browser
- Updates are slow because changing DOM triggers re-rendering and reflow
- Memory intensive for large applications

**Virtual DOM**:
- Lightweight JavaScript representation of Real DOM
- Changes are batched and optimized before applying to Real DOM
- Fast comparisons using diffing algorithm`,
            analogy: `Real DOM is like **editing a published book** - every change requires reprinting pages.
Virtual DOM is like **editing a draft** - you make all changes in the draft, then print only the pages that changed.`,
            realUsage: `React, Vue, and other modern frameworks use Virtual DOM to optimize rendering performance in dynamic web applications.`,
            code: `// Real DOM manipulation (slow)
document.getElementById('counter').innerText = count;
document.getElementById('title').innerText = title;
// Each change triggers separate reflow

// React with Virtual DOM (fast)
return (
  <>
    <div id="counter">{count}</div>
    <div id="title">{title}</div>
  </>
);
// React batches updates efficiently`,
            interviewQuestions: [
                {
                    question: "What is the diffing algorithm in Virtual DOM?",
                    answer: "React uses a heuristic O(n) algorithm that compares trees level by level. It assumes: 1) Elements of different types produce different trees, 2) Keys help identify which children have changed. This makes reconciliation fast enough for real-time updates."
                }
            ]
        },
        {
            id: "jsx",
            title: "JSX",
            category: "Basics",
            explanation: `JSX is a syntax extension for JavaScript that looks like HTML. It produces React "elements". JSX is not valid JavaScript - it needs to be transpiled (usually by Babel) into \`React.createElement()\` calls.`,
            analogy: `JSX is like a **translator**. The browser doesn't understand "HTML inside JS". Tools like Babel translate JSX into standard \`React.createElement()\` calls that the browser can execute.`,
            realUsage: `Every React component uses JSX to define its UI structure. It makes code more readable compared to raw \`React.createElement\` calls.`,
            code: `// JSX
const element = <h1 className="greeting">Hello, world!</h1>;

// Transpiles to:
const element = React.createElement(
  'h1',
  {className: 'greeting'},
  'Hello, world!'
);`,
            interviewQuestions: [
                {
                    question: "Can browsers read JSX directly?",
                    answer: "No. Browsers can only read JavaScript objects. JSX must be transpiled (usually by Babel) into `React.createElement()` calls before it reaches the browser."
                },
                {
                    question: "Why can't we use 'class' in JSX?",
                    answer: "`class` is a reserved keyword in JavaScript. Since JSX compiles to JS, we use `className` to avoid syntax errors. Similarly, we use `htmlFor` instead of `for`."
                }
            ]
        },
        {
            id: "components",
            title: "Components",
            category: "Basics",
            explanation: `Components are independent and reusable bits of code. They serve the same purpose as JavaScript functions, but work in isolation and return HTML (JSX). Components can be functional or class-based.`,
            analogy: `Components are like **functions** that return UI. Just like you write a helper function to avoid repeating logic, you write a component to avoid repeating UI code.`,
            realUsage: `Buttons, Headers, Footers, UserCards, Modals - everything in React is a component. You compose them to build complex UIs.`,
            code: `function Welcome(props) {
  return <h1>Hello, {props.name}</h1>;
}

// Usage
<Welcome name="Sara" />`,
            interviewQuestions: [
                {
                    question: "What is the difference between an Element and a Component?",
                    answer: "An **Element** is a plain object describing what you want to see on the screen (e.g., `<div />`). A **Component** is a function or class that optionally accepts input (props) and returns an element."
                }
            ]
        },
        {
            id: "functional-components",
            title: "Functional Components",
            category: "Basics",
            explanation: `Functional components are JavaScript functions that accept props as an argument and return React elements. Since React 16.8 (Hooks), functional components can use state and lifecycle features.`,
            analogy: `Functional components are like **pure functions** in math: given the same input (props), they return the same output (JSX).`,
            realUsage: `Preferred for most use cases in modern React. Cleaner syntax, easier to test, and work with Hooks.`,
            code: `// Simple functional component
function Greeting({ name }) {
  return <h1>Hello, {name}!</h1>;
}

// With hooks
function Counter() {
  const [count, setCount] = useState(0);
  
  return (
    <button onClick={() => setCount(count + 1)}>
      Clicked {count} times
    </button>
  );
}`,
            interviewQuestions: [
                {
                    question: "Can functional components have state?",
                    answer: "Yes! Since React 16.8, functional components can use the `useState` Hook to manage local state, making them as powerful as class components."
                }
            ]
        },
        {
            id: "class-components",
            title: "Class Components",
            category: "Basics",
            explanation: `Class components are ES6 classes that extend \`React.Component\` and must have a \`render()\` method. They were the primary way to use state and lifecycle methods before Hooks.`,
            analogy: `Class components are like **blueprints for objects** in OOP. They have properties (state) and methods (lifecycle methods).`,
            realUsage: `Still found in legacy codebases. Modern React favors functional components with Hooks.`,
            code: `class Welcome extends React.Component {
  constructor(props) {
    super(props);
    this.state = { count: 0 };
  }
  
  render() {
    return (
      <div>
        <h1>Hello, {this.props.name}</h1>
        <p>Count: {this.state.count}</p>
      </div>
    );
  }
}`,
            interviewQuestions: [
                {
                    question: "Why use functional components over class components?",
                    answer: "Functional components have: 1) Simpler syntax, 2) Easier to test, 3) Better performance (no `this` binding), 4) Hooks provide more flexibility than lifecycle methods, 5) Smaller bundle size."
                }
            ]
        },
        {
            id: "props",
            title: "Props",
            category: "Basics",
            explanation: `Props (short for properties) are read-only arguments passed to React components. They are passed from parent to child components and cannot be modified by the child.`,
            analogy: `Props are like **arguments to a function**. If a component is a machine, props are the raw materials you feed into it to get a specific output.`,
            realUsage: `Passing a \`userName\` to a \`Profile\` component, or a \`label\` to a \`Button\` component.`,
            code: `function Car(props) {
  return <h2>I am a {props.brand}!</h2>;
}

// Usage
const myElement = <Car brand="Ford" />;

// Destructuring props
function Car({ brand, color }) {
  return <h2>I am a {color} {brand}!</h2>;
}`,
            interviewQuestions: [
                {
                    question: "Are props mutable?",
                    answer: "No, props are **read-only** (immutable). A component must never modify its own props. This ensures data flows in one direction (top-down) and makes debugging easier."
                }
            ]
        },
        {
            id: "default-props",
            title: "Default Props",
            category: "Basics",
            explanation: `Default props allow you to set default values for props in case they are not provided by the parent component.`,
            analogy: `Default props are like **default parameters** in JavaScript functions - if the caller doesn't provide a value, a fallback is used.`,
            realUsage: `Useful for optional props like button variants, sizes, or themes.`,
            code: `function Button({ label, variant = 'primary' }) {
  return <button className={variant}>{label}</button>;
}

// Or using defaultProps (legacy)
Button.defaultProps = {
  variant: 'primary'
};`,
            interviewQuestions: [
                {
                    question: "What happens if a prop is undefined?",
                    answer: "If a prop is undefined and no default is set, it will be `undefined` in the component. This can cause issues if you try to access properties on it. Always use default props or conditional checks."
                }
            ]
        },
        {
            id: "props-drilling",
            title: "Props Drilling",
            category: "Basics",
            explanation: `Props drilling is the process of passing data from a parent component down through multiple levels of nested child components, even if intermediate components don't need the data.`,
            analogy: `Props drilling is like **whispering a message** through a chain of people. Even people who don't care about the message have to repeat it to the next person.`,
            realUsage: `Common problem in deeply nested component trees. Solutions include Context API, Redux, or component composition.`,
            code: `// Props drilling problem
function App() {
  const user = { name: 'Alice' };
  return <Parent user={user} />;
}

function Parent({ user }) {
  return <Child user={user} />; // Parent doesn't use user
}

function Child({ user }) {
  return <GrandChild user={user} />; // Child doesn't use user
}

function GrandChild({ user }) {
  return <div>{user.name}</div>; // Finally used here
}`,
            interviewQuestions: [
                {
                    question: "How can you avoid props drilling?",
                    answer: "Solutions: 1) **Context API** - share data without passing props, 2) **Component Composition** - pass components as children, 3) **State Management Libraries** (Redux, Zustand), 4) **Render Props** or **HOCs**."
                }
            ]
        },
        {
            id: "conditional-rendering",
            title: "Conditional Rendering",
            category: "Basics",
            explanation: `Conditional rendering in React works the same way conditions work in JavaScript. Use operators like \`if\`, ternary \`? :\`, or logical \`&&\` to conditionally render elements.`,
            analogy: `Conditional rendering is like a **bouncer at a club** - only let certain elements in based on conditions.`,
            realUsage: `Show/hide UI elements based on auth state, loading states, user permissions, etc.`,
            code: `function Greeting({ isLoggedIn }) {
  // Using if statement
  if (isLoggedIn) {
    return <UserGreeting />;
  }
  return <GuestGreeting />;
  
  // Using ternary
  return isLoggedIn ? <UserGreeting /> : <GuestGreeting />;
  
  // Using && (show only if true)
  return isLoggedIn && <UserGreeting />;
}`,
            interviewQuestions: [
                {
                    question: "What is the difference between `&&` and ternary for conditional rendering?",
                    answer: "`&&` renders the element only if condition is true (otherwise renders nothing). Ternary `? :` requires both branches. Be careful with `&&` - if the left side is `0`, it will render `0` instead of nothing."
                }
            ]
        },
        {
            id: "lists-rendering",
            title: "Lists Rendering (map)",
            category: "Basics",
            explanation: `You can build collections of elements and include them in JSX using JavaScript's \`map()\` function to transform arrays into arrays of elements.`,
            analogy: `Rendering lists is like a **factory assembly line** - you take raw materials (data array) and produce finished products (JSX elements).`,
            realUsage: `Displaying user lists, product catalogs, comment sections, etc.`,
            code: `const numbers = [1, 2, 3, 4, 5];

function NumberList() {
  return (
    <ul>
      {numbers.map((number) => (
        <li key={number}>{number}</li>
      ))}
    </ul>
  );
}

// With objects
const users = [{ id: 1, name: 'Alice' }, { id: 2, name: 'Bob' }];
const userList = users.map(user => 
  <li key={user.id}>{user.name}</li>
);`,
            interviewQuestions: [
                {
                    question: "Why do we need keys when rendering lists?",
                    answer: "Keys help React identify which items have changed, been added, or removed. Without keys, React may incorrectly reuse elements, leading to bugs. Keys should be stable, unique identifiers from your data (like IDs), not array indices."
                }
            ]
        },
        {
            id: "keys-in-lists",
            title: "Keys in Lists",
            category: "Basics",
            explanation: `Keys help React identify which items in a list have changed, are added, or are removed. Keys should be given to elements inside arrays to give them a stable identity.`,
            analogy: `Keys are like **ID badges** at a conference. Even if people move around (re-order), you can still identify who is who.`,
            realUsage: `Essential for any list rendering to ensure correct behavior during re-renders and avoid performance issues.`,
            code: `// Good: Using unique IDs
const todoItems = todos.map((todo) =>
  <li key={todo.id}>{todo.text}</li>
);

// Bad: Using index (avoid if list can change)
const todoItems = todos.map((todo, index) =>
  <li key={index}>{todo.text}</li>
);`,
            interviewQuestions: [
                {
                    question: "Why shouldn't you use array index as a key?",
                    answer: "If the list order changes (items added/removed/reordered), using index as key can cause: 1) Performance issues (React reuses wrong components), 2) Bugs with component state, 3) Incorrect behavior with form inputs. Use stable IDs from your data instead."
                }
            ]
        },
        {
            id: "events-in-react",
            title: "Events in React",
            category: "Basics",
            explanation: `Handling events with React elements is similar to handling events on DOM elements, but with some syntactic differences: React events are named using camelCase, and you pass a function rather than a string.`,
            analogy: `React events are like **doorbell buttons** - you wire them up to trigger functions when clicked/pressed.`,
            realUsage: `Handling clicks, form submissions, keyboard input, mouse movements, etc.`,
            code: `// React event
function Button() {
  function handleClick() {
    alert('Button clicked!');
  }
  
  return <button onClick={handleClick}>Click me</button>;
}

// With event object
function Input() {
  function handleChange(e) {
    console.log(e.target.value);
  }
  
  return <input onChange={handleChange} />;
}`,
            interviewQuestions: [
                {
                    question: "What is event pooling in React (legacy)?",
                    answer: "In React <17, synthetic events were pooled for performance. The event object was reused, so accessing it asynchronously would fail. React 17+ removed event pooling. Now you can access events asynchronously without calling `e.persist()`."
                }
            ]
        },
        {
            id: "inline-styling",
            title: "Inline Styling",
            category: "Basics",
            explanation: `Inline styles in React are specified with an object whose key is the camelCased version of the style name, and the value is usually a string.`,
            analogy: `Inline styles are like **wearing clothes directly** - quick and specific, but harder to reuse.`,
            realUsage: `Dynamic styles that change based on props or state, or quick prototyping.`,
            code: `// Inline style object
const divStyle = {
  color: 'blue',
  backgroundColor: 'lightgray',
  fontSize: '20px' // Note: camelCase, quotes for values
};

function StyledDiv() {
  return <div style={divStyle}>Styled content</div>;
}

// Inline directly
<div style={{ margin: '10px', padding: '5px' }}>Content</div>`,
            interviewQuestions: [
                {
                    question: "What are the downsides of inline styles?",
                    answer: "1) No pseudo-classes (:hover, :focus), 2) No media queries, 3) No CSS cascading, 4) Performance (re-creates objects on re-render if not memoized), 5) Harder to maintain for large apps. Better to use CSS Modules or styled-components for complex styling."
                }
            ]
        },
        {
            id: "external-styling",
            title: "External Styling",
            category: "Basics",
            explanation: `You can import CSS files to style your components. This is the traditional approach and works well with CSS Modules for scoped styles.`,
            analogy: `External styling is like having a **wardrobe** - organize styles separately and pick what you need.`,
            realUsage: `Most production apps use external stylesheets, often with CSS Modules or preprocessors (SASS/LESS).`,
            code: `// Button.css
.button {
  padding: 10px 20px;
  background-color: blue;
  color: white;
}

// Button.jsx
import './Button.css';

function Button() {
  return <button className="button">Click me</button>;
}

// With CSS Modules (Button.module.css)
import styles from './Button.module.css';
<button className={styles.button}>Click me</button>`,
            interviewQuestions: [
                {
                    question: "What are CSS Modules and why use them?",
                    answer: "CSS Modules scope CSS class names locally to the component, preventing global namespace pollution. Class names are automatically made unique (e.g., `Button_button__2x3kl`). This prevents style conflicts in large applications."
                }
            ]
        },
        {
            id: "component-re-rendering",
            title: "Component Re-rendering Rules",
            category: "Basics",
            explanation: `A React component re-renders when:
1. Its state changes (via \`setState\` or hooks)
2. Its props change
3. Its parent re-renders (by default)
4. Context value it consumes changes

Re-rendering doesn't mean the DOM updates - React compares Virtual DOM and only updates what changed.`,
            analogy: `Re-rendering is like **recalculating a spreadsheet** - whenever a cell changes, formulas referencing it recalculate, but the display only updates if the result is different.`,
            realUsage: `Understanding re-rendering is crucial for optimizing React performance and avoiding unnecessary work.`,
            code: `function Parent() {
  const [count, setCount] = useState(0);
  
  return (
    <div>
      <button onClick={() => setCount(count + 1)}>Count: {count}</button>
      <Child /> {/* Re-renders even if props don't change */}
    </div>
  );
}

// Optimization with React.memo
const Child = React.memo(function Child() {
  return <div>I only re-render if my props change</div>;
});`,
            interviewQuestions: [
                {
                    question: "How can you prevent unnecessary re-renders?",
                    answer: "1) **React.memo** - memoize functional components, 2) **useMemo** - memoize expensive calculations, 3) **useCallback** - memoize functions, 4) **Key prop** - help React identify unchanged items, 5) **Component splitting** - isolate state changes."
                }
            ]
        },
        {
            id: "fragment",
            title: "Fragment",
            category: "Basics",
            explanation: `Fragments let you group a list of children without adding extra nodes to the DOM. Useful when a component needs to return multiple elements.`,
            analogy: `Fragments are like **invisible containers** - they group items together without adding extra wrapping.`,
            realUsage: `Avoiding unnecessary \`<div>\` wrappers that pollute the DOM and affect CSS layouts.`,
            code: `// Using Fragment
import { Fragment } from 'react';

function List() {
  return (
    <Fragment>
      <li>Item 1</li>
      <li>Item 2</li>
    </Fragment>
  );
}

// Short syntax
function List() {
  return (
    <>
      <li>Item 1</li>
      <li>Item 2</li>
    </>
  );
}

// With key (when mapping)
items.map(item => (
  <Fragment key={item.id}>
    <dt>{item.term}</dt>
    <dd>{item.description}</dd>
  </Fragment>
))`,
            interviewQuestions: [
                {
                    question: "When would you use Fragment vs a div?",
                    answer: "Use Fragment when: 1) You don't want extra DOM nodes, 2) Parent has CSS like flexbox that breaks with extra wrappers, 3) Returning multiple elements from a component. Use `<div>` when you need to style or add attributes to the wrapper."
                }
            ]
        },
        {
            id: "strict-mode",
            title: "Strict Mode",
            category: "Basics",
            explanation: `StrictMode is a tool for highlighting potential problems in an application. It activates additional checks and warnings for its descendants. It doesn't render any visible UI and doesn't affect production builds.`,
            analogy: `StrictMode is like having a **spell checker** - it points out potential issues while you're writing, but doesn't affect the final document.`,
            realUsage: `Wrap your app (or parts of it) in StrictMode during development to catch issues early.`,
            code: `import { StrictMode } from 'react';
import ReactDOM from 'react-dom/client';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <StrictMode>
    <App />
  </StrictMode>
);`,
            interviewQuestions: [
                {
                    question: "What does StrictMode check for?",
                    answer: "1) Components with **unsafe lifecycle methods**, 2) **Legacy string ref API** usage, 3) **Unexpected side effects** (intentionally double-invokes functions in development), 4) **Deprecated findDOMNode** usage, 5) **Legacy context API**."
                },
                {
                    question: "Why do components render twice in StrictMode?",
                    answer: "In development, StrictMode intentionally double-invokes functions like render, useState, useMemo to help you find side effects that should be pure. This behavior only happens in development mode, not production."
                }
            ]
        }
    ]
};
