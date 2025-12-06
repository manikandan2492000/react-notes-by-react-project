export const topic23InterviewTopics = {
    "23. MAANG React Interview Topics": [
        {
            id: "virtual-dom-deep-dive",
            title: "Virtual DOM Deep Dive",
            category: "Interview",
            explanation: `Understanding reconciliation, diffing algorithm, and performance implications.`,
            analogy: `Virtual DOM is React's **secret sauce** - interviewers want to know you understand how it works under the hood.`,
            realUsage: `Common senior-level interview question.`,
            code: `// React compares trees
// O(n) heuristic algorithm
// Same type = update, different type = replace`,
            interviewQuestions: [
                {
                    question: "Explain React's reconciliation algorithm",
                    answer: "React uses a heuristic O(n) algorithm comparing trees level-by-level: 1) Different element types = rebuild subtree, 2) Same type = update props, 3) Lists use keys to identify moved items. This is much faster than generic O(n³) tree diff algorithms."
                }
            ]
        },
        {
            id: "performance-optimization-interview",
            title: "Performance Optimization",
            category: "Interview",
            explanation: `Common interview topic: identifying and fixing performance bottlenecks.`,
            analogy: `Performance optimization is like **being a detective** - profile, find bottlenecks, fix them.`,
            realUsage: `Every interview for senior positions includes performance questions.`,
            code: `// Tools: React DevTools Profiler
// Techniques: memo, useMemo, useCallback, code splitting, virtualization`,
            interviewQuestions: [
                {
                    question: "How would you optimize a slow React app?",
                    answer: "1) **Profile** with React DevTools, 2) **Identify** unnecessary re-renders, 3) **Memo** expensive components, 4) **Code split** routes, 5) **Virtualize** long lists, 6) **Debounce** inputs, 7) **Lazy load** images. Always measure before optimizing."
                }
            ]
        },
        {
            id: "state-management-patterns",
            title: "State Management Patterns",
            category: "Interview",
            explanation: `Choosing appropriate state management for different scenarios.`,
            analogy: `State management is like **choosing transportation** - bicycle for short trips (local state), car for medium (Context), train for long/many passengers (Redux).`,
            realUsage: `Interviewers assess architecture decisions.`,
            code: `// Local: useState
// Shared: Context
// Global/Complex: Redux/Zustand
// Server: React Query/SWR`,
            interviewQuestions: [
                {
                    question: "When would you use Redux vs Context?",
                    answer: "**Context**: Simple global state, theme/auth, 2-3 levels deep. **Redux**: Complex state logic, time-travel debugging needed, many components need same data, middleware for logging/analytics. Context is simpler, Redux is more powerful."
                }
            ]
        }
    ]
};
