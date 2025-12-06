export const topic07GlobalState = {
    "7. Global State Management": [
        {
            id: "context-api",
            title: "Context API",
            category: "Global State",
            explanation: `Context provides a way to pass data through the component tree without having to pass props down manually at every level. It's built into React and requires no external libraries.`,
            analogy: `Context is like a **broadcast system** or a **PA system**. Instead of whispering a message from person to person (props drilling), you announce it on the loudspeaker so anyone who needs to hear it can listen.`,
            realUsage: `Theming (Dark/Light mode), User Authentication state, Language/Locale settings, Cart state in e-commerce.`,
            code: `import { createContext, useContext, useState } from 'react';

const ThemeContext = createContext();

function ThemeProvider({ children }) {
  const [theme, setTheme] = useState('light');
  
  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) throw new Error('useTheme must be within ThemeProvider');
  return context;
}

// Usage
function Button() {
  const { theme } = useTheme();
  return <button className={theme}>Click me</button>;
}`,
            interviewQuestions: [
                {
                    question: "When should you NOT use Context?",
                    answer: "Don't use Context for high-frequency updates (like a timer or mouse position) because it triggers a re-render in all consuming components. For that, use a dedicated state management library like Redux or Zustand with selectors."
                },
                {
                    question: "How can you optimize Context re-renders?",
                    answer: "1) Split contexts by update frequency, 2) Use `useMemo` for context value, 3) Wrap consumers in `React.memo`, 4) Use multiple contexts instead of one large one, 5) Consider using state management libraries for complex cases."
                }
            ]
        },
        {
            id: "redux",
            title: "Redux",
            category: "Global State",
            explanation: `Redux is a predictable state container for JavaScript apps. It centralizes application state and logic, following three core principles: single source of truth, state is read-only, and changes are made with pure functions.`,
            analogy: `Redux is like a **bank**.
- The **Store** is the bank vault holding all money (state).
- You cannot directly access the vault.
- You must fill out a slip (**Action**) and give it to the teller (**Reducer**).
- The teller updates the account balance according to the rules.`,
            realUsage: `Large scale applications with complex state interactions, e-commerce carts, multi-user apps, undo/redo functionality.`,
            code: `import { createStore } from 'redux';

// Action
const increment = () => ({ type: 'INCREMENT' });
const decrement = () => ({ type: 'DECREMENT' });

// Reducer
function counter(state = 0, action) {
  switch (action.type) {
    case 'INCREMENT':
      return state + 1;
    case 'DECREMENT':
      return state - 1;
    default:
      return state;
  }
}

// Store
const store = createStore(counter);

// Subscribe to changes
store.subscribe(() => console.log(store.getState()));

// Dispatch an action
store.dispatch(increment()); // 1`,
            interviewQuestions: [
                {
                    question: "What are the three core principles of Redux?",
                    answer: "1. **Single Source of Truth**: The state of your whole application is stored in an object tree within a single store. \n2. **State is Read-Only**: The only way to change the state is to emit an action. \n3. **Changes are made with Pure Functions**: Reducers are pure functions that take the previous state and an action, and return the next state."
                },
                {
                    question: "What is Redux Toolkit and why use it?",
                    answer: "Redux Toolkit (RTK) is the official recommended way to write Redux logic. It simplifies Redux by: 1) Reducing boilerplate, 2) Including best practices by default, 3) Providing utilities like `createSlice`, 4) Immutable updates with Immer built-in, 5) Built-in devtools integration."
                }
            ]
        },
        {
            id: "redux-toolkit",
            title: "Redux Toolkit",
            category: "Global State",
            explanation: `Redux Toolkit (RTK) is the official, opinionated toolset for efficient Redux development. It simplifies store setup, reducer creation, and immutable update logic.`,
            analogy: `Redux Toolkit is like a **power drill** vs a manual screwdriver (vanilla Redux). Same job, way less effort.`,
            realUsage: `Modern Redux apps - RTK is now the recommended way to write Redux.`,
            code: `import { configureStore, createSlice } from '@reduxjs/toolkit';

// Slice (combines actions + reducer)
const counterSlice = createSlice({
  name: 'counter',
  initialState: { value: 0 },
  reducers: {
    increment: state => {
      state.value += 1; // Immer makes this safe!
    },
    decrement: state => {
      state.value -= 1;
    },
    incrementByAmount: (state, action) => {
      state.value += action.payload;
    }
  }
});

// Export actions and reducer
export const { increment, decrement, incrementByAmount } = counterSlice.actions;
export default counterSlice.reducer;

// Store
const store = configureStore({
  reducer: {
    counter: counterSlice.reducer
  }
});`,
            interviewQuestions: [
                {
                    question: "How does RTK simplify Redux?",
                    answer: "1) `configureStore` - auto-setup with good defaults, 2) `createSlice` - generates actions+reducers, 3) Immer - allows 'mutable' updates, 4) `createAsyncThunk` - simplifies async logic, 5) RTK Query - built-in data fetching."
                }
            ]
        },
        {
            id: "zustand",
            title: "Zustand",
            category: "Global State",
            explanation: `Zustand is a small, fast, and scalable state management library. It has a simple API and no boilerplate, making it easier than Redux for most use cases.`,
            analogy: `Zustand is like a **sticky note** system - simple, direct, no bureaucracy. Redux is like a **formal filing system** - more structure for complex needs.`,
            realUsage: `Apps that need global state but don't want Redux complexity. Great for medium-sized apps.`,
            code: `import create from 'zustand';

//Create store
const useStore = create((set) => ({
  count: 0,
  increment: () => set((state) => ({ count: state.count + 1 })),
  decrement: () => set((state) => ({ count: state.count - 1 })),
  reset: () => set({ count: 0 })
}));

// Usage in component
function Counter() {
  const count = useStore((state) => state.count);
  const increment = useStore((state) => state.increment);
  
  return (
    <>
      <p>{count}</p>
      <button onClick={increment}>+</button>
    </>
  );
}`,
            interviewQuestions: [
                {
                    question: "How is Zustand different from Redux?",
                    answer: "Zustand: 1) Simpler API, 2) No boilerplate, 3) No Provider needed, 4) Built-in selectors, 5) Smaller bundle size. Redux: 1) More structure, 2) Middleware ecosystem, 3) Time-travel debugging, 4) Better for very large apps. Choose Zustand for simplicity, Redux for complex requirements."
                }
            ]
        },
        {
            id: "recoil",
            title: "Recoil",
            category: "Global State",
            explanation: `Recoil is a state management library for React developed by Facebook. It uses atoms (units of state) and selectors (derived state) for a more React-like API.`,
            analogy: `Recoil is like **LEGObricks of state** - each piece (atom) is independent, and you can combine them (selectors) in flexible watch

.`,
            realUsage: `Apps with complex dependencies between state pieces, derived state, async queries.`,
            code: `import { atom, selector, useRecoilState, useRecoilValue } from 'recoil';

// Atom (unit of state)
const textState = atom({
  key: 'textState',
  default: ''
});

// Selector (derived state)
const charCountState = selector({
  key: 'charCountState',
  get: ({get}) => {
    const text = get(textState);
    return text.length;
  }
});

// Usage
function TextInput() {
  const [text, setText] = useRecoilState(textState);
  const count = useRecoilValue(charCountState);
  
  return (
    <>
      <input value={text} onChange={(e) => setText(e.target.value)} />
      <p>Character Count: {count}</p>
    </>
  );
}`,
            interviewQuestions: [
                {
                    question: "What are atoms and selectors in Recoil?",
                    answer: "**Atoms** are units of state - small, independent pieces that components can subscribe to. **Selectors** are derived state or async queries - they compute values based on atoms or other selectors. This lets you model your state as a graph."
                }
            ]
        },
        {
            id: "jotai",
            title: "Jotai",
            category: "Global State",
            explanation: `Jotai is a primitive and flexible state management library for React. Similar to Recoil but simpler and smaller.`,
            analogy: `Jotai is like **atoms in chemistry** - small, indivisible units that can combine to form molecules (complex state).`,
            realUsage: `Lightweight global state, atomic state updates, bottom-up state management.`,
            code: `import { atom, useAtom } from 'jotai';

// Create atom
const countAtom = atom(0);

// Derived atom
const doubleCountAtom = atom((get) => get(countAtom) * 2);

// Usage
function Counter() {
  const [count, setCount] = useAtom(countAtom);
  const [doubled] = useAtom(doubleCountAtom);
  
  return (
    <>
      <p>Count: {count}</p>
      <p>Doubled: {doubled}</p>
      <button onClick={() => setCount(c => c + 1)}>+</button>
    </>
  );
}`,
            interviewQuestions: [
                {
                    question: "When would you choose Jotai over Context API?",
                    answer: "Choose Jotai when: 1) Need fine-grained subscriptions (avoid re-renders), 2) Want atomic updates, 3) Have derived/computed state, 4) Need async atoms. Use Context for simple, infrequent updates."
                }
            ]
        },
        {
            id: "mobx",
            title: "MobX",
            category: "Global State",
            explanation: `MobX makes state management simple by transparently applying reactive programming. State changes automatically trigger UI updates.`,
            analogy: `MobX is like **Excel spreadsheets** - when you change a cell, all formulas referencing it automatically update.`,
            realUsage: `Apps where you want automatic reactivity, minimal boilerplate, and don't want to manually track dependencies.`,
            code: `import { makeAutoObservable } from 'mobx';
import { observer } from 'mobx-react-lite';

class CounterStore {
  count = 0;
  
  constructor() {
    makeAutoObservable(this);
  }
  
  increment() {
    this.count += 1;
  }
  
  get doubled() {
    return this.count * 2;
  }
}

const store = new CounterStore();

const Counter = observer(() => {
  return (
    <>
      <p>{store.count}</p>
      <p>Doubled: {store.doubled}</p>
      <button onClick={() => store.increment()}>+</button>
    </>
  );
});`,
            interviewQuestions: [
                {
                    question: "How is MobX different from Redux?",
                    answer: "MobX: 1) Mutable state, 2) Automatic reactivity, 3) Less boilerplate, 4) OOP-friendly. Redux: 1) Immutable state, 2) Explicit updates, 3) Functional programming, 4) More predictable. MobX is faster to write, Redux is more predictable and easier to debug."
                }
            ]
        }
    ]
};
