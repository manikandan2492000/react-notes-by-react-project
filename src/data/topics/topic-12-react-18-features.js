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
            id: "usetransition-react18",
            title: "useTransition Hook",
            category: "React 18",
            explanation: `useTransition marks state updates as non-urgent, allowing React to prioritize other updates.`,
            analogy: `Transitions are like **letting urgent passengers board first** - regular passengers (transitions) wait for VIP passengers (urgent updates).`,
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
            id: "usedeferredvalue-react18",
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
        },
        {
            id: "automatic-batching-react18",
            title: "Automatic Batching",
            category: "React 18",
            explanation: `React 18 extends batching to all updates (promises, timeouts, native events), not just React event handlers.`,
            analogy: `Automatic batching is like **saving drafts** - instead of saving after every keystroke, batch saves to be more efficient.`,
            realUsage: `Improves performance automatically without code changes.`,
            code: `// React 18 batches these
setTimeout(() => {
  setCount(c => c + 1);
  setFlag(f => !f);
  // Only ONE re-render
}, 1000);`,
            interviewQuestions: [
                {
                    question: "Can you opt-out of automatic batching?",
                    answer: "Yes, use `flushSync` from `react-dom` to force synchronous update: `flushSync(() => { setState(value); })`. This immediately commits changes to DOM. Rarely needed - only for specific DOM measurements after setState."
                }
            ]
        }
    ]
};
