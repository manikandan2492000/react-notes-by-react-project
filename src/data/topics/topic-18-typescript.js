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
            realUsage: `Reusable list components, form components, data tables.`,
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
