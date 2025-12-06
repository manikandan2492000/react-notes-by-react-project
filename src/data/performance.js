export const performance = [
    {
        id: "memoization",
        title: "Memoization (React.memo, useMemo, useCallback)",
        category: "Performance",
        explanation: `
Memoization is an optimization technique to cache the result of an expensive operation.

- **React.memo**: HOC to skip re-rendering a component if props haven't changed.
- **useMemo**: Caches the *result* of a calculation.
- **useCallback**: Caches the *function definition* itself.
    `,
        analogy: `
- **React.memo**: A bouncer at a club. If you look the same (props), he remembers you and lets you in without checking ID again.
- **useMemo**: Remembering the answer to 234 * 567 so you don't have to calculate it every time.
    `,
        realUsage: `
Preventing a heavy chart component from re-rendering when a completely unrelated input field updates.
    `,
        code: `
// React.memo
const Child = React.memo(({ name }) => {
  console.log("Child render");
  return <div>{name}</div>;
});

function Parent() {
  const [count, setCount] = useState(0);
  // Child won't re-render when count changes
  return (
    <>
      <Child name="Alice" />
      <button onClick={() => setCount(c => c + 1)}>Count: {count}</button>
    </>
  );
}
    `,
        interviewQuestions: [
            {
                question: "Should you memoize everything?",
                answer: "No. Memoization has a cost (memory + comparison logic). Only use it for expensive calculations or when passing props to optimized children (to prevent reference equality checks failing)."
            }
        ]
    },
    {
        id: "code-splitting",
        title: "Code Splitting & Lazy Loading",
        category: "Performance",
        explanation: `
Code splitting allows you to split your bundle into smaller chunks which can then be loaded on demand.

### Tools:
- **React.lazy**: Lets you render a dynamic import as a regular component.
- **Suspense**: Lets you specify a loading indicator while the lazy component is loading.
    `,
        analogy: `
Instead of downloading the entire Netflix library (App Bundle) when you open the app, you only download the movie you clicked on (Lazy Loaded Component).
    `,
        realUsage: `
Loading the "Admin Dashboard" code only when the user actually navigates to the /admin route.
    `,
        code: `
import React, { Suspense } from 'react';

const OtherComponent = React.lazy(() => import('./OtherComponent'));

function MyComponent() {
  return (
    <div>
      <Suspense fallback={<div>Loading...</div>}>
        <OtherComponent />
      </Suspense>
    </div>
  );
}
    `,
        interviewQuestions: [
            {
                question: "What is the benefit of code splitting?",
                answer: "It reduces the initial bundle size, leading to faster initial load times (FCP/LCP) and better user experience."
            }
        ]
    }
];
