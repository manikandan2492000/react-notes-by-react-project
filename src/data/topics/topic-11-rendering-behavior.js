export const topic11RenderingBehavior = {
    "11. Rendering Behavior": [
        {
            id: "reconciliation",
            title: "Reconciliation",
            category: "Rendering",
            explanation: `Reconciliation is the algorithm React uses to diff one tree with another to determine which parts need to be changed.`,
            analogy: `Reconciliation is like **finding differences between two photos** - React compares the old and new Virtual DOM to identify what changed.`,
            realUsage: `Understanding reconciliation helps optimize React performance and avoid unnecessary re-renders.`,
            code: `// React compares elements
// Different types -> unmount and remount
<div> -> <span> // Completely new tree

// Same type -> update props
<div className="before" /> -> <div className="after" /> // Update attribute

// Keys help identify elements
<ul>
  <li key="a">A</li>
  <li key="b">B</li>
</ul>`,
            interviewQuestions: [
                {
                    question: "How does React's diffing algorithm work?",
                    answer: "React uses a heuristic O(n) algorithm: 1) **Different element types** produce different trees (unmount old, mount new), 2) **Same element types** update props/attributes, 3) **Keys** help identify which children changed in lists. This is much faster than the O(n³) traditional tree diff algorithm."
                }
            ]
        },
        {
            id: "react-fiber",
            title: "React Fiber",
            category: "Rendering",
            explanation: `Fiber is React's reconciliation algorithm that enables incremental rendering. It can pause work and resume later, assign priority to different updates.`,
            analogy: `Fiber is like a **multi-lane highway with priorities** - ambulances (urgent updates) can bypass traffic, and heavy trucks (expensive renders) can be stopped to let cars pass.`,
            realUsage: `Powers React 18 features like concurrent rendering, Suspense, and transitions.`,
            code: `// Fiber enables prioritization
function workLoop(deadline) {
  while (nextUnitOfWork && deadline.timeRemaining() > 0) {
    nextUnitOfWork = performUnitOfWork(nextUnitOfWork);
  }
  if (nextUnitOfWork) {
    requestIdleCallback(workLoop);
  }
}`,
            interviewQuestions: [
                {
                    question: "What problem did React Fiber solve?",
                    answer: "Old React (Stack) would block the main thread for entire component tree renders, causing jank. Fiber breaks work into units that can be paused/resumed, allowing: 1) **Prioritization** - urgent updates first, 2) **Time slicing** - split work across frames, 3) **Better UX** - animations stay smooth even during heavy updates."
                }
            ]
        },
        {
            id: "batching",
            title: "Automatic Batching",
            category: "Rendering",
            explanation: `React groups multiple state updates into a single re-render for better performance. React 18 extends batching to all updates.`,
            analogy: `Batching is like **grouping errands** - instead of driving to the bank, then home, then the store, you do all errands in one trip.`,
            realUsage: `Improves performance automatically in React 18+. Previously only worked in event handlers.`,
            code: `// React 18 batches these
setTimeout(() => {
  setCount(c => c + 1);
  setFlag(f => !f);
  // Only ONE re-render (in React 18+)
}, 1000);

// Force sync update if needed (rare)
import { flushSync } from 'react-dom';
flushSync(() => {
  setCount(c => c + 1);
});
// Re-renders immediately`,
            interviewQuestions: [
                {
                    question: "What changed with batching in React 18?",
                    answer: "**Before React 18**: Batching only in event handlers. Timeouts, promises, and native events caused separate re-renders. **React 18**: Automatic batching everywhere using `createRoot`. This reduces re-renders and improves performance without code changes."
                }
            ]
        },
        {
            id: "render-vs-commit",
            title: "Render vs Commit Phase",
            category: "Rendering",
            explanation: `React rendering has two phases: **Render** (React calls components to figure out what should be on screen) and **Commit** (React applies changes to DOM).`,
            analogy: `**Render** = architect drawing blueprints. **Commit** = construction crew building the actual house.`,
            realUsage: `Understanding phases helps with performance optimization and side effect management.`,
            code: `// Render phase (can be async, pausable)
function MyComponent() {
  const [count, setCount] = useState(0);
  console.log('Rendering...'); // Happens in render phase
  return <div>{count}</div>;
}

// Commit phase (synchronous)
useLayoutEffect(() => {
  console.log('Committed to DOM'); // Happens after commit
});`,
            interviewQuestions: [
                {
                    question: "Can you have side effects in the render phase?",
                    answer: "No! Render phase should be pure. Side effects (API calls, DOM mutations, subscriptions) belong in useEffect/useLayoutEffect which run after commit. Render phase can be called multiple times or paused, so side effects would execute unpredictably."
                }
            ]
        },
        {
            id: "concurrent-rendering",
            title: "Concurrent Rendering",
            category: "Rendering",
            explanation: `Concurrent rendering allows React to work on multiple versions of the UI at the same time and interrupt rendering to handle urgent updates.`,
            analogy: `Concurrent rendering is like a **chef multitasking** - start cooking pasta, while water boils switch to chopping vegetables, pause everything if a fire alarm goes off (urgent update).`,
            realUsage: `Enables Suspense, transitions, and keeping UI responsive during heavy updates.`,
            code: `import { useTransition } from 'react';

function SearchResults() {
  const [isPending, startTransition] = useTransition();
  const [query, setQuery] = useState('');
  
  function handleChange(e) {
    const value = e.target.value;
    setQuery(value); // Urgent
    
    startTransition(() => {
      setFilteredResults(filterResults(value)); // Non-urgent transition
    });
  }
  
  return (
    <>
      <input value={query} onChange={handleChange} />
      {isPending ? <Spinner /> : <Results />}
    </>
  );
}`,
            interviewQuestions: [
                {
                    question: "What are the benefits of concurrent rendering?",
                    answer: "1) **Interruptible** - React can pause expensive renders for urgent updates, 2) **Prioritization** - user input > data fetching, 3) **Smoother UX** - UI stays responsive, 4) **Enables Suspense** - declarative loading states, 5) **Transitions** - mark updates as non-urgent."
                }
            ]
        }
    ]
};

export const topic12React18Features = {
    "12. React 18 Features": [
        {
            id: "concurrent-features",
            title: "Concurrent Features",
            category: "React 18",
            explanation: `React 18 introduces concurrent features: automatic batching, transitions, Suspense improvements, and more.`,
            analogy: `Concurrent features are like **upgrading from a single-core to multi-core processor** - multiple tasks can make progress simultaneously.`,
            realUsage: `Opt-in gradually for better UX in heavy apps.`,
            code: `// Enable concurrent features with createRoot
import { createRoot } from 'react-dom/client';

const root = createRoot(document.getElementById('root'));
root.render(<App />);`,
            interviewQuestions: [
                {
                    question: "What breaking changes came with React 18?",
                    answer: "Minimal breaking changes: 1) IE no longer supported, 2) Automatic batching may change behavior (use flushSync if needed), 3) Stricter hydration errors, 4) useEffect fires twice in StrictMode (dev only). Most apps can upgrade without code changes."
                }
            ]
        },
        {
            id: "usetransition",
            title: "useTransition Hook",
            category: "React 18",
            explanation: `useTransition marks state updates as non-urgent, allowing React to prioritize other updates.`,
            analogy: `Trans itions are like **letting urgent passengers board first** - regular passengers (transitions) wait for VIP passengers (urgent updates).`,
            realUsage: `Heavy filtering, navigating to new pages, expensive calculations.`,
            code: `const [isPending, startTransition] = useTransition();

startTransition(() => {
  setTab('results'); // Non-urgent
});`,
            interviewQuestions: [
                {
                    question: "How is useTransition different from debouncing?",
                    answer: "Debouncing **delays** execution. useTransition executes **immediately** but at lower priority - it can be interrupted. Transitions are interruptible and restart if new updates come, debouncing just waits."
                }
            ]
        },
        {
            id: "usedeferredvalue",
            title: "useDeferredValue Hook",
            category: "React 18",
            explanation: `useDeferredValue lets you defer updating a part of the UI, keeping expensive renders non-blocking.`,
            analogy: `Deferred values are like **watching sports with a slight delay** - live score updates instantly, but commentary can lag.`,
            realUsage: `Expensive derived UI, charts, visualizations that shouldn't block input.`,
            code: `const deferredQuery = useDeferredValue(query);

return (
  <>
    <input value={query} onChange={e => setQuery(e.target.value)} />
    <SlowList query={deferredQuery} />
  </>
);`,
            interviewQuestions: [
                {
                    question: "When to use useDeferredValue vs useTransition?",
                    answer: "Use **useTransition** when you control the setState call. Use **useDeferredValue** when you receive the value (e.g., from props) and can't wrap setState. useTransition is preferred when possible."
                }
            ]
        },
        {
            id: "suspense-improvements",
            title: "Suspense for Data Fetching",
            category: "React 18",
            explanation: `React 18 improves Suspense for data fetching, allowing declarative loading states.`,
            analogy: `Suspense is like a **placeholder** - you reserve a spot while content loads.`,
            realUsage: `Server components, data fetching libraries like Relay.`,
            code: `<Suspense fallback={<Loading />}>
  <ProfilePage />
</Suspense>`,
            interviewQuestions: [
                {
                    question: "Can you use Suspense with React Query?",
                    answer: "Yes, with experimental `suspense: true` option. However, error boundaries are required. Most apps use `isLoading` instead of Suspense for now. Suspense is more mature with frameworks like Next.js 13+ and Server Components."
                }
            ]
        }
    ]
};
