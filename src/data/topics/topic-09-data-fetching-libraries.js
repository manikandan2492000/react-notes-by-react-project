export const topic09DataFetchingLibraries = {
  "9. Data Fetching Libraries": [
    {
      id: "react-query",
      title: "React Query (TanStack Query)",
      category: "Data Fetching",
      explanation: `React Query is a powerful data fetching and caching library that handles server state management, caching, background updates, and automatic refetching.`,
      analogy: `React Query is like a **smart assistant** that remembers what you asked for, updates it in the background, and tells you when something changed.`,
      realUsage: `Managing server state, caching API responses, automatic background refresh, infinite scrolling, pagination.`,
      code: `import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';

// Fetching data
function Posts() {
  const { data, isLoading, error } = useQuery({
    queryKey: ['posts'],
    queryFn: () => fetch('/api/posts').then(r => r.json())
  });
  
  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;
  
  return <ul>{data.map(post => <li key={post.id}>{post.title}</li>)}</ul>;
}

// Mutations
function AddPost() {
  const queryClient = useQueryClient();
  
  const mutation = useMutation({
    mutationFn: (newPost) => fetch('/api/posts', {
      method: 'POST',
      body: JSON.stringify(newPost)
    }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['posts'] });
    }
  });
  
  return (
    <button onClick={() => mutation.mutate({ title: 'New Post' })}>
      Add Post
    </button>
  );
}`,
      interviewQuestions: [
        {
          question: "What problems does React Query solve?",
          answer: "1) **Caching** - automatic caching and deduplication, 2) **Background updates** - auto-refetch on window focus/network reconnect, 3) **Loading/error states** - built-in state management, 4) **Optimistic updates** - easier to implement, 5) **DevTools** - excellent debugging tools."
        },
        {
          question: "What is the difference between `staleTime` and `cacheTime`?",
          answer: "`staleTime` determines how long data is considered fresh (won't refetch). `cacheTime` determines how long unused data stays in cache before garbage collection. Example: `staleTime: 5000` means don't refetch for 5s, `cacheTime: 600000` means keep in cache for 10 minutes even if unused."
        }
      ]
    },
    {
      id: "swr",
      title: "SWR",
      category: "Data Fetching",
      explanation: `SWR (stale-while-revalidate) is a data fetching library by Vercel. It returns cached data first, then fetches fresh data and updates.`,
      analogy: `SWR is like **reading yesterday's newspaper while waiting for today's delivery** - you get instant information, then it updates when fresh data arrives.`,
      realUsage: `Similar use cases to React Query - data fetching, caching, revalidation.`,
      code: `import useSWR from 'swr';

const fetcher = url => fetch(url).then(r => r.json());

function Profile() {
  const { data, error, isLoading } = useSWR('/api/user', fetcher);
  
  if (error) return <div>Failed to load</div>;
  if (isLoading) return <div>Loading...</div>;
  
  return <div>Hello {data.name}!</div>;
}

// With options
const { data } = useSWR('/api/data', fetcher, {
  refreshInterval: 3000, // Refresh every 3s
  revalidateOnFocus: false
});`,
      interviewQuestions: [
        {
          question: "How is SWR different from React Query?",
          answer: "**Similarities**: Both handle caching, revalidation, and background updates. **Differences**: SWR is simpler and smaller, RQ has more features (mutations, devtools, infinite queries). Choose SWR for simplicity, RQ for advanced needs."
        }
      ]
    },
    {
      id: "apollo-client",
      title: "Apollo Client",
      category: "Data Fetching",
      explanation: `Apollo Client is a comprehensive state management library for GraphQL. It handles data fetching, caching, and local state management.`,
      analogy: `Apollo is like a **personal shopper for GraphQL** - you tell it what you want, and it figures out the most efficient way to get it.`,
      realUsage: `Apps using GraphQL APIs - social networks, content platforms, e-commerce with GraphQL backends.`,
      code: `import { useQuery, gql } from '@apollo/client';

const GET_DOGS = gql\`
  query GetDogs {
    dogs {
      id
      breed
    }
  }
\`;

function Dogs() {
  const { loading, error, data } = useQuery(GET_DOGS);
  
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;
  
  return data.dogs.map(({ id, breed }) => (
    <div key={id}>{breed}</div>
  ));
}`,
      interviewQuestions: [
        {
          question: "What is normalized caching in Apollo?",
          answer: "Apollo caches objects by ID, normalizing data across queries. If multiple queries fetch the same object, it's stored once. Updates to that object automatically update all queries using it. This prevents data duplication and ensures consistency."
        }
      ]
    },
    {
      id: "rtk-query",
      title: "RTK Query",
      category: "Data Fetching",
      explanation: `RTK Query is a data fetching and caching tool built into Redux Toolkit. It simplifies data fetching while integrating with Redux.`,
      analogy: `RTK Query is like **adding a delivery service** to your Redux store - it handles fetching and caching while fitting naturally into your existing Redux setup.`,
      realUsage: `Apps already using Redux that need data fetching capabilities without adding another library.`,
      code: `import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const pokemonApi = createApi({
  reducerPath: 'pokemonApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://pokeapi.co/api/v2/' }),
  endpoints: (builder) => ({
    getPokemonByName: builder.query({
      query: (name) => \`pokemon/\${name}\`
    })
  })
});

export const { useGetPokemonByNameQuery } = pokemonApi;

// Usage
function Pokemon({ name }) {
  const { data, error, isLoading } = useGetPokemonByNameQuery(name);
  
  return (
    <div>
      {data?.name}
    </div>
  );
}`,
      interviewQuestions: [
        {
          question: "When should you use RTK Query vs React Query?",
          answer: "Use RTK Query if: 1) Already using Redux, 2) Want Redux devtools integration, 3) Need to combine server and client state. Use React Query if: 1) Not using Redux, 2) Want more flexibility, 3) GraphQL support. RTK Query is Redux-first, React Query is more universal."
        }
      ]
    },
    {
      id: "axios-vs-fetch",
      title: "Axios vs Fetch",
      category: "Data Fetching",
      explanation: `Comparison between the native Fetch API and the Axios library for making HTTP requests.`,
      analogy: `Fetch is like a **basic calculator**, Axios is like a **scientific calculator** - same core function, but Axios has more features built-in.`,
      realUsage: `Choose based on project needs - Fetch for simple projects, Axios for production apps needing features.`,
      code: `// Fetch
fetch(url)
  .then(r => r.json())
  .then(data => console.log(data));

// Axios - simpler syntax
axios.get(url)
  .then(r => console.log(r.data));

// Error handling
// Fetch - manual check
fetch(url).then(r => {
  if (!r.ok) throw new Error('Failed');
  return r.json();
});

// Axios - automatic
axios.get(url).catch(err => {
  // Rejects on any HTTP error
});`,
      interviewQuestions: [
        {
          question: "List key differences between Fetch and Axios",
          answer: "**Fetch**: 1) Native (no install), 2) Manual JSON parsing, 3) No timeout support, 4) Only rejects on network errors. **Axios**: 1) Third-party, 2) Auto JSON conversion, 3) Timeout support, 4) Rejects on HTTP errors, 5) Request/response interceptors, 6) Better IE support."
        }
      ]
    }
  ]
};
