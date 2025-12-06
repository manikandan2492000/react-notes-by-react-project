export const reactBasics = [
  {
    id: "what-is-react",
    title: "What is React?",
    category: "Basics",
    explanation: `
React is a **JavaScript library** for building user interfaces, primarily maintained by Meta (Facebook). It follows a **component-based architecture** and uses a **declarative** style of programming.

### Key Features:
- **Virtual DOM**: React keeps a lightweight representation of the DOM in memory and syncs it with the real DOM (Reconciliation).
- **Component-Based**: UI is built from small, reusable pieces called components.
- **Unidirectional Data Flow**: Data flows one way (downwards) from parent to child via props.
- **JSX**: A syntax extension that allows writing HTML-like code inside JavaScript.
    `,
    analogy: `
Think of React like **LEGO blocks**. 
- A traditional website is like a clay sculpture; if you want to change an arm, you might have to reshape the whole side.
- React is like a LEGO castle. If you want to change a tower, you just swap out the specific bricks (components) without touching the rest of the castle.
    `,
    realUsage: `
Used in single-page applications (SPAs) like **Facebook, Instagram, Netflix, and Airbnb** where the UI needs to update frequently without reloading the page.
    `,
    code: `
// Simple React Component
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
}
    `,
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
    id: "jsx",
    title: "JSX (JavaScript XML)",
    category: "Basics",
    explanation: `
JSX is a syntax extension for JavaScript that looks like HTML. It produces React "elements".

### Rules of JSX:
1. **Return a single root element**: Wrap adjacent elements in a parent or Fragment (\`<>\`...\`</>\`).
2. **Close all tags**: e.g., \`<img />\`.
3. **camelCase**: Use \`className\` instead of \`class\`, \`htmlFor\` instead of \`for\`.
    `,
    analogy: `
JSX is like a **translator**. The browser doesn't understand "HTML inside JS". Tools like Babel translate JSX into standard \`React.createElement()\` calls that the browser can execute.
    `,
    realUsage: `
Every React component uses JSX to define its UI structure. It makes code more readable compared to raw \`React.createElement\` calls.
    `,
    code: `
// JSX
const element = <h1 className="greeting">Hello, world!</h1>;

// Transpiles to:
const element = React.createElement(
  'h1',
  {className: 'greeting'},
  'Hello, world!'
);
    `,
    interviewQuestions: [
      {
        question: "Can browsers read JSX directly?",
        answer: "No. Browsers can only read JavaScript objects. JSX must be transpiled (usually by Babel) into `React.createElement()` calls before it reaches the browser."
      },
      {
        question: "Why can't we use 'class' in JSX?",
        answer: "`class` is a reserved keyword in JavaScript. Since JSX compiles to JS, we use `className` to avoid syntax errors."
      }
    ]
  },
  {
    id: "props-vs-state",
    title: "Props vs State",
    category: "Basics",
    explanation: `
- **Props (Properties)**: Read-only data passed from parent to child. They make components reusable.
- **State**: Mutable data managed *within* a component. When state changes, the component re-renders.
    `,
    analogy: `
- **Props** are like **DNA**: You inherit them from your parents, and you can't change them.
- **State** is like your **Mood**: It changes over time based on interactions (events) and is internal to you.
    `,
    realUsage: `
- **Props**: Passing a user's name to a generic \`Avatar\` component.
- **State**: Tracking whether a dropdown menu is open or closed.
    `,
    code: `
function UserCard({ name }) { // Props
  const [active, setActive] = React.useState(false); // State

  return (
    <div onClick={() => setActive(!active)}>
      <h2>{name}</h2>
      <p>Status: {active ? 'Active' : 'Inactive'}</p>
    </div>
  );
}
    `,
    interviewQuestions: [
      {
        question: "Can you modify props inside a child component?",
        answer: "No, props are **immutable** (read-only). If a child needs to change a value passed via props, the parent must pass a callback function (state lifting) to handle the change."
      },
      {
        question: "What happens when you call setState?",
        answer: "React schedules a re-render of the component. It updates the state, calculates the diff in the Virtual DOM, and updates the real DOM if necessary."
      }
    ]
  }
];
