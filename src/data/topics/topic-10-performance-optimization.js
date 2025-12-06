export const topic10PerformanceOptimization = {
    "10. Performance Optimization": [
        {
            id: "react-memo",
            title: "React.memo",
            category: "Performance",
            explanation: `React.memo is a higher-order component that memoizes the result. It only re-renders when props change.`,
            analogy: `React.memo is like **remembering the answer to amath problem** - if the question (props) hasn't changed, use the cached answer instead of recalculating.`,
            realUsage: `Expensive components that receive the same props often, list items, components in large lists.`,
            code: `const ExpensiveComponent = React.memo(function ExpensiveComponent({ data }) {
  // Expensive rendering logic
  return <div>{data.value}</div>;
});

// With custom comparison
const MyComponent = React.memo(
  function MyComponent(props) {
    return <div>{props.value}</div>;
  },
  (prevProps, nextProps) => {
    return prevProps.value === nextProps.value; // true = don't re-render
  }
);`,
            interviewQuestions: [
                {
                    question: "When should you NOT use React.memo?",
                    answer: "Don't use when: 1) Component already re-renders frequently with different props, 2) Props are different on every render, 3) Component is cheap to render. React.memo adds overhead - only use for expensive components with stable props."
                }
            ]
        },
        {
            id: "code-splitting",
            title: "Code Splitting",
            category: "Performance",
            explanation: `Code splitting breaks your app into smaller chunks that are loaded on demand, reducing initial bundle size.`,
            analogy: `Code splitting is like a **cookbook with chapters** - you don't need to load the dessert recipes until you're ready to make dessert.`,
            realUsage: `Large apps, route-based splitting, lazy-loaded modals, admin sections.`,
            code: `import { lazy, Suspense } from 'react';

// Lazy load component
const LazyComponent = lazy(() => import('./LazyComponent'));

function App() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <LazyComponent />
    </Suspense>
  );
}

// Route-based splitting
const Home = lazy(() => import('./pages/Home'));
const About = lazy(() => import('./pages/About'));

<Routes>
  <Route path="/" element={<Suspense fallback={<Loading />}><Home /></Suspense>} />
  <Route path="/about" element={<Suspense fallback={<Loading />}><About /></Suspense>} />
</Routes>`,
            interviewQuestions: [
                {
                    question: "What is the impact of code splitting on performance?",
                    answer: "**Benefits**: 1) Smaller initial bundle, 2) Faster Time to Interactive, 3) Better caching (unchanged routes don't re-download). **Trade-offs**: 1) Additional network requests, 2) Loading states needed, 3) Slightly more complex code. Overall huge benefit for large apps."
                }
            ]
        },
        {
            id: "virtualization",
            title: "Virtualization (react-window)",
            category: "Performance",
            explanation: `Virtualization only renders visible items in large lists, dramatically improving performance for long lists.`,
            analogy: `Virtualization is like a **theater with limited seats** - you only see the actors currently on stage, not the entire cast waiting backstage.`,
            realUsage: `Social media feeds, long data tables, chat logs, dropdown with thousands of options.`,
            code: `import { FixedSizeList } from 'react-window';

function App() {
  return (
    <FixedSizeList
      height={500}
      itemCount={10000}
      itemSize={35}
      width={300}
    >
      {({ index, style }) => (
        <div style={style}>
          Row {index}
        </div>
      )}
    </FixedSizeList>
  );
}`,
            interviewQuestions: [
                {
                    question: "How does virtualization improve performance?",
                    answer: "Instead of rendering 10,000 DOM nodes, virtualization renders only ~20 visible items. Benefits: 1) Less DOM manipulation, 2) Lower memory usage, 3) Faster initial render, 4) Smooth scrolling even with huge lists. Essential for lists with 100+ items."
                }
            ]
        },
        {
            id: "debouncing-throttling",
            title: "Debouncing & Throttling",
            category: "Performance",
            explanation: `Debouncing delays function execution until after a pause. Throttling limits function execution to once per interval.`,
            analogy: `**Debounce** = waiting for elevator doors to stay closed before moving. **Throttle** = elevator that only stops on certain floors.`,
            realUsage: `Debounce: search inputs, resize handlers. Throttle: scroll events, mouse move tracking.`,
            code: `// Debounce - wait for pause
function useDebounce(value, delay) {
  const [debouncedValue, setDebouncedValue] = useState(value);
  
  useEffect(() => {
    const handler = setTimeout(() => setDebouncedValue(value), delay);
    return () => clearTimeout(handler);
  }, [value, delay]);
  
  return debouncedValue;
}

// Throttle - max once per interval
function useThrottle(value, limit) {
  const [throttledValue, setThrottledValue] = useState(value);
  const lastRan = useRef(Date.now());
  
  useEffect(() => {
    const handler = setTimeout(() => {
      if (Date.now() - lastRan.current >= limit) {
        setThrottledValue(value);
        lastRan.current = Date.now();
      }
    }, limit - (Date.now() - lastRan.current));
    
    return () => clearTimeout(handler);
  }, [value, limit]);
  
  return throttledValue;
}`,
            interviewQuestions: [
                {
                    question: "When to use debounce vs throttle?",
                    answer: "**Debounce**: When you want to wait for user to finish (search input, form validation, window resize). **Throttle**: When you want regular updates but not too frequent (scroll position, mouse tracking, API rate limiting)."
                }
            ]
        },
        {
            id: "lazy-loading-images",
            title: "Lazy Loading Images",
            category: "Performance",
            explanation: `Lazy loading defers loading images until they're about to enter the viewport.`,
            analogy: `Lazy loading is like **loading chapters of a book as you read** instead of downloading the entire book at once.`,
            realUsage: `Image galleries, product catalogs, long pages with many images.`,
            code: `// Native lazy loading
<img src="image.jpg" loading="lazy" alt="Description" />

// With intersection observer
function LazyImage({ src, alt }) {
  const [imageSrc, setImageSrc] = useState('placeholder.jpg');
  const imgRef = useRef();
  
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setImageSrc(src);
          observer.disconnect();
        }
      },
      { rootMargin: '100px' } // Load 100px before visible
    );
    
    if (imgRef.current) {
      observer.observe(imgRef.current);
    }
    
    return () => observer.disconnect();
  }, [src]);
  
  return <img ref={imgRef} src={imageSrc} alt={alt} />;
}`,
            interviewQuestions: [
                {
                    question: "What are the benefits of lazy loading images?",
                    answer: "1) **Faster initial page load** - only load visible images, 2) **Less bandwidth** - users may not scroll to all images, 3) **Better LCP** (Largest Contentful Paint), 4) **Saves mobile data**. Especially important for image-heavy sites."
                }
            ]
        },
        {
            id: "memoization",
            title: "Memoization (useM emo, useCallback)",
            category: "Performance",
            explanation: `Memoization caches expensive computations or function references to avoid unnecessary recalculations.`,
            analogy: `Memoization is like **keeping a cheat sheet** - instead of solving the same problem repeatedly, you save the answer.`,
            realUsage: `Expensive calculations, preventing re-creation of callbacks, optimizing child re-renders.`,
            code: `// useMemo - memoize value
const sortedList = useMemo(() => {
  return items.sort((a, b) => a.value - b.value);
}, [items]);

// useCallback - memoize function
const handleClick = useCallback(() => {
  doSomething(id);
}, [id]);

// Passing to memo'd child
const MemoChild = React.memo(Child);
<MemoChild onClick={handleClick} />`,
            interviewQuestions: [
                {
                    question: "Can you overuse useMemo and useCallback?",
                    answer: "Yes! Premature optimization. Costs: 1) Memory to store cached values, 2) Comparison overhead on every render, 3) Code complexity. Only use for: 1) Genuinely expensive calculations, 2) Props to React.memo components, 3) Dependencies of other hooks. Profile before optimizing."
                }
            ]
        }
    ]
};
