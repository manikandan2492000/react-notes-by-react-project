export const topic22SystemDesign = {
    "22. React System Design": [
        {
            id: "component-architecture",
            title: "Component Architecture",
            category: "System Design",
            explanation: `Designing scalable component systems requires planning composition, state management, and data flow.`,
            analogy: `System design is like **city planning** - zones (features), roads (data flow), utilities (shared services).`,
            realUsage: `Large apps, design systems, reusable component libraries.`,
            code: `// Atomic Design Pattern
atoms/          #Button, Input, Label
molecules/      # FormField (Input + Label)
organisms/      # LoginForm (multiple molecules)
templates/      # PageLayout
pages/          # LoginPage (template + data)`,
            interviewQuestions: [
                {
                    question: "How do you design a scalable React app?",
                    answer: "1) **Feature-based structure** - organize by domain, 2) **Shared components** - reusable UI library, 3) **State management** - appropriate for scale (Context/Redux/Zustand), 4) **Code splitting** - lazy load routes, 5) **Type safety** - TypeScript for large teams."
                }
            ]
        }
    ]
};
