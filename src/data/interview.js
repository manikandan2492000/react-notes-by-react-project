export const interview = [
    {
        id: "virtual-dom-vs-real-dom",
        title: "Virtual DOM vs Real DOM",
        category: "Interview",
        explanation: `
Comparing the Virtual DOM with the Real DOM is a classic interview question.

| Feature | Real DOM | Virtual DOM |
|---------|----------|-------------|
| **Update** | Slow | Fast |
| **Memory** | Heavy | Lightweight |
| **HTML Update** | Creates new DOM | Updates Diff |
| **Reflow/Repaint** | High cost | Minimal cost |
    `,
        analogy: `
Real DOM is like **painting on a wall**. If you make a mistake, you have to scrape it off and repaint.
Virtual DOM is like **drafting on an iPad**. You can change things instantly, and only when it's perfect do you print it on the wall.
    `,
        realUsage: `
React uses this to ensure high performance even with complex UI updates.
    `,
        code: `
// No code for this conceptual topic, but remember:
// Virtual DOM = JS Object
const vNode = {
  type: 'div',
  props: { className: 'container' },
  children: ['Hello']
};
    `,
        interviewQuestions: [
            {
                question: "Is the Virtual DOM always faster?",
                answer: "No. For very simple apps or single-time renders, the overhead of maintaining the Virtual DOM might be slower than direct DOM manipulation. However, for complex, dynamic apps, it is significantly more efficient."
            }
        ]
    },
    {
        id: "controlled-vs-uncontrolled",
        title: "Controlled vs Uncontrolled Components",
        category: "Interview",
        explanation: `
- **Controlled**: Form data is handled by a React component via state. The source of truth is React state.
- **Uncontrolled**: Form data is handled by the DOM itself. Accessed via refs.
    `,
        analogy: `
- **Controlled**: A **puppet**. It only moves when you pull the strings (state).
- **Uncontrolled**: A **wind-up toy**. You set it going (initial value), but then it does its own thing until you grab it (ref).
    `,
        realUsage: `
- **Controlled**: Validation, instant input feedback, disabling submit button.
- **Uncontrolled**: Integrating with non-React libraries, simple forms where validation isn't needed.
    `,
        code: `
// Controlled
function ControlledInput() {
  const [val, setVal] = useState('');
  return <input value={val} onChange={e => setVal(e.target.value)} />;
}

// Uncontrolled
function UncontrolledInput() {
  const inputRef = useRef();
  const handleSubmit = () => alert(inputRef.current.value);
  return (
    <>
      <input ref={inputRef} />
      <button onClick={handleSubmit}>Submit</button>
    </>
  );
}
    `,
        interviewQuestions: [
            {
                question: "Which one should you use?",
                answer: "React recommends **Controlled Components** for most cases as they support validation and more control. Use Uncontrolled for quick prototypes or integrating with legacy code."
            }
        ]
    },
    {
        id: "lifting-state-up",
        title: "Lifting State Up",
        category: "Interview",
        explanation: `
When multiple components need to share the same changing data, lift the shared state up to their closest common ancestor.
    `,
        analogy: `
If two siblings are fighting over a toy, the parent takes the toy (state) and decides who gets to play with it (props).
    `,
        realUsage: `
A search bar (sibling A) filtering a list (sibling B). The state (search term) must live in the parent to be passed to both.
    `,
        code: `
function Parent() {
  const [query, setQuery] = useState('');
  return (
    <>
      <SearchBar query={query} setQuery={setQuery} />
      <List query={query} />
    </>
  );
}
    `,
        interviewQuestions: [
            {
                question: "What is prop drilling and how do you solve it?",
                answer: "Prop drilling is passing props through multiple levels of components that don't need them. Solved by **Context API**, **Redux**, or **Component Composition** (passing components as children)."
            }
        ]
    }
];
