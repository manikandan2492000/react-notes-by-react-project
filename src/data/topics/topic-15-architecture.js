export const topic15Architecture = {
    "15. File & Folder Architecture": [
        {
            id: "feature-based",
            title: "Feature-Based Architecture",
            category: "Architecture",
            explanation: `Organize code by feature/domain rather than file type. Each feature is self-contained.`,
            analogy: `Feature-based is like **organizing a store by department** (electronics, clothing) vs by item type (all buttons together).`,
            realUsage: `Scalable apps, clear boundaries, easier to understand and maintain.`,
            code: `src/
  features/
    auth/
      components/
        LoginForm.jsx
      hooks/
        useAuth.js
      api/
        authAPI.js
      index.js
    products/
      components/
      hooks/
      api/
      index.js`,
            interviewQuestions: [
                {
                    question: "Feature-based vs Type-based architecture?",
                    answer: "**Feature-based**: Group by domain (auth, products). Easier to find related code, better for large teams. **Type-based**: Group by file type (components/, hooks/). Simple but scales poorly. Feature-based recommended for medium+ apps."
                }
            ]
        },
        {
            id: "monorepo",
            title: "Monorepo Structure",
            category: "Architecture",
            explanation: `Single repository containing multiple packages/apps. Shared code is easier to manage.`,
            analogy: `Monorepo = **mall with many stores** sharing infrastructure vs separate buildings (multiple repos).`,
            realUsage: `Companies with multiple related apps (web, mobile, admin) sharing code.`,
            code: `my-app/
  packages/
    web/          # React web app
    mobile/       # React Native app
    ui/           # Shared component library
    utils/        # Shared utilities`,
            interviewQuestions: [
                {
                    question: "Monorepo benefits and challenges?",
                    answer: "**Benefits**: 1) Share code easily, 2) Atomic commits across projects, 3) Consistent tooling. **Challenges**: 1) Slower CI/CD, 2) Complex tooling (Nx, Turborepo), 3) Access control harder. Worth it for related projects sharing code."
                }
            ]
        }
    ]
};
