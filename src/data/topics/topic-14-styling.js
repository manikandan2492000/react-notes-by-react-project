export const topic14Styling = {
    "14. Styling in React": [
        {
            id: "css-modules",
            title: "CSS Modules",
            category: "Styling",
            explanation: `CSS Modules scope CSS by automatically generating unique class names, preventing naming collisions.`,
            analogy: `CSS Modules are like **apartment numbers** - two buildings can both have apartment #5 without confusion.`,
            realUsage: `Component-scoped styles, preventing global CSS pollution in large apps.`,
            code: `/* Button.module.css */
.button {
  background: blue;
}

// Button.jsx
import styles from './Button.module.css';
<button className={styles.button}>Click</button>
// Outputs: <button class="Button_button__2x3kl">`,
            interviewQuestions: [
                {
                    question: "How do CSS Modules work?",
                    answer: "Build tools (Webpack, Vite) transform class names into unique hashes at build time. `button` becomes `Button_button__2x3kl`. This ensures styles are scoped to components without runtime overhead."
                }
            ]
        },
        {
            id: "styled-components",
            title: "Styled Components",
            category: "Styling",
            explanation: `CSS-in-JS library that lets you write CSS in JavaScript with tagged template literals.`,
            analogy: `Styled Components = **CSS inside JS** - styles live with components, no separate files.`,
            realUsage: `Dynamic styling based on props, component libraries, theming.`,
            code: `import styled from 'styled-components';

const Button = styled.button\`
  background: \${props => props.primary ? 'blue' : 'gray'};
  padding: 10px 20px;
  
  &:hover {
    opacity: 0.8;
  }
\`;

<Button primary>Click me</Button>`,
            interviewQuestions: [
                {
                    question: "What are pros/cons of CSS-in-JS?",
                    answer: "**Pros**: 1) Dynamic styles, 2) No name collisions, 3) Delete component = delete CSS, 4) Theme support. **Cons**: 1) Runtime overhead, 2) Larger bundle, 3) No caching, 4) Learning curve. Trade-offs depend on use case."
                }
            ]
        },
        {
            id: "tailwind-css",
            title: "Tailwind CSS",
            category: "Styling",
            explanation: `Utility-first CSS framework with pre-defined classes for rapid UI development.`,
            analogy: `Tailwind is like **LEGO pieces** - pre-made blocks you assemble vs sculpting from scratch.`,
            realUsage: `Rapid prototyping, consistent design systems, utility-based styling.`,
            code: `<div className="flex items-center justify-between p-4 bg-blue-500">
  <h1 className="text-2xl font-bold text-white">Title</h1>
  <button className="px-4 py-2 bg-white text-blue-500 rounded hover:bg-gray-100">
    Click
  </button>
</div>`,
            interviewQuestions: [
                {
                    question: "Tailwind pros and cons?",
                    answer: "**Pros**: 1) Rapid development, 2) Consistent spacing/colors, 3) Small production bundle (PurgeCSS), 4) No naming. **Cons**: 1) Verbose HTML, 2) Learning curve, 3) Hard to read, 4) Not semantic. Great for speed, can be messy for complex components."
                }
            ]
        },
        {
            id: "emotion",
            title: "Emotion",
            category: "Styling",
            explanation: `CSS-in-JS library with powerful composition and theming capabilities.`,
            analogy: `Emotion = **Styled Components' faster cousin** - similar API, better performance.`,
            realUsage: `Similar to Styled Components, popular in MUI (Material-UI).`,
            code: `import { css } from '@emotion/react';

<div css={css\`
  background: hotpink;
  &:hover {
    background: lightpink;
  }
\`}>
  Styled with Emotion
</div>`,
            interviewQuestions: [
                {
                    question: "Emotion vs Styled Components?",
                    answer: "Similar APIs. **Emotion**: Smaller bundle, better performance, SSR-friendly. **Styled Components**: More popular, better docs. Both are good - Emotion has slight technical edge."
                }
            ]
        }
    ]
};

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

export const topic16Testing = {
    "16. Testing": [
        {
            id: "react-testing-library",
            title: "React Testing Library",
            category: "Testing",
            explanation: `Testing library focusing on testing components as users interact with them.`,
            analogy: `RTL tests **what users see**, not implementation details - like a QA tester using the app.`,
            realUsage: `Standard for testing React components in modern apps.`,
            code: `import { render, screen, fireEvent } from '@testing-library/react';

test('button click increments counter', () => {
  render(<Counter />);
  
  const button = screen.getByText(/increment/i);
  fireEvent.click(button);
  
  expect(screen.getByText(/count: 1/i)).toBeInTheDocument();
});`,
            interviewQuestions: [
                {
                    question: "Why avoid testing implementation details?",
                    answer: "Testing implementation (internal state, component methods) makes tests fragile. If you refactor without changing behavior, tests should still pass. RTL focuses on user-facing behavior, making tests more resilient."
                }
            ]
        },
        {
            id: "jest",
            title: "Jest",
            category: "Testing",
            explanation: `JavaScript testing framework with built-in assertions, mocking, and coverage.`,
            analogy: `Jest is a **complete testing toolkit** - everything you need in one box.`,
            realUsage: `Unit tests, integration tests, snapshot tests.`,
            code: `describe('Math functions', () => {
  test('adds 1 + 2 to equal 3', () => {
    expect(add(1, 2)).toBe(3);
  });
  
  test('mock function', () => {
    const mock = jest.fn();
    mock('hello');
    expect(mock).toHaveBeenCalledWith('hello');
  });
});`,
            interviewQuestions: [
                {
                    question: "What are snapshot tests?",
                    answer: "Snapshot tests save component output and compare future renders against it. Useful for catching unintended changes. However, easy to blindly update snapshots - use sparingly, prefer explicit assertions."
                }
            ]
        }
    ]
};

export const topic17BuildTools = {
    "17. Build Tools": [
        {
            id: "vite",
            title: "Vite",
            category: "Build Tools",
            explanation: `Next-generation build tool with instant server start and lightning-fast HMR.`,
            analogy: `Vite is a **sports car** (fast, modern) vs Webpack's **truck** (powerful but slow).`,
            realUsage: `Modern React development, replacing Create React App.`,
            code: `// vite.config.js
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()]
});`,
            interviewQuestions: [
                {
                    question: "Why is Vite faster than Webpack?",
                    answer: "Vite uses native ES modules in dev (no bundling), only transforms on-demand. Webpack bundles everything upfront. Vite's HMR is near-instant. Production builds use Rollup for optimized output."
                }
            ]
        },
        {
            id: "webpack",
            title: "Webpack",
            category: "Build Tools",
            explanation: `Powerful module bundler that's been the standard for years.`,
            analogy: `Webpack = **Swiss Army knife** - extremely configurable but complex.`,
            realUsage: `Complex build configurations, legacy projects.`,
            code: `// webpack.config.js
module.exports = {
  entry: './src/index.js',
  output: {
    path: __dirname + '/dist',
    filename: 'bundle.js'
  },
  module: {
    rules: [
      { test: /\\.jsx?$/, use: 'babel-loader' }
    ]
  }
};`,
            interviewQuestions: [
                {
                    question: "When to use Webpack vs Vite?",
                    answer: "**Vite**: New projects, faster dev experience, simpler config. **Webpack**: Complex build needs, extensive plugin ecosystem, specific loaders required. Most new projects should start with Vite."
                }
            ]
        }
    ]
};

export const topic18TypeScript = {
    "18. TypeScript with React": [
        {
            id: "typescript-basics",
            title: "TypeScript Basics with React",
            category: "TypeScript",
            explanation: `TypeScript adds static typing to JavaScript, catching errors at compile time.`,
            analogy: `TypeScript is like **grammar check** for code - catches mistakes before they cause problems.`,
            realUsage: `Large codebases, teams, preventing runtime errors.`,
            code: `interface Props {
  name: string;
  age?: number;
}

const Welcome: React.FC<Props> = ({ name, age }) => {
  return <h1>Hello, {name}</h1>;
};

// Hooks with TypeScript
const [count, setCount] = useState<number>(0);

type User = {
  id: number;
  name: string;
};

const [user, setUser] = useState<User | null>(null);`,
            interviewQuestions: [
                {
                    question: "Benefits of TypeScript in React?",
                    answer: "1) **Catch errors early** - before runtime, 2) **Better autocomplete** - IDEs know prop types, 3) **Refactoring confidence** - types ensure changes don't break things, 4) **Documentation** - types show what components expect. Worth learning curve for medium+ projects."
                }
            ]
        },
        {
            id: "generic-components",
            title: "Generic Components",
            category: "TypeScript",
            explanation: `Generic components work with multiple types while maintaining type safety.`,
            analogy: `Generics are like **adjustable wrenches** - one tool, multiple sizes.`,
            realUsage: `Reusable list components, form  components, data tables.`,
            code: `interface ListProps<T> {
  items: T[];
  renderItem: (item: T) => React.ReactNode;
}

function List<T>({ items, renderItem }: ListProps<T>) {
  return <ul>{items.map(renderItem)}</ul>;
}

// Usage
<List items={users} renderItem={user => <li>{user.name}</li>} />`,
            interviewQuestions: [
                {
                    question: "When to use generics?",
                    answer: "Use generics for reusable components that work with different data types: lists, tables, form fields, data fetching hooks. Generics maintain type safety while being flexible."
                }
            ]
        }
    ]
};
