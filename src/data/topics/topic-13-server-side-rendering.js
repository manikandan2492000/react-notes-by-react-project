export const topic13ServerSideRendering = {
    "13. Server-Side Rendering": [
        {
            id: "ssr-concepts",
            title: "SSR Concepts",
            category: "SSR",
            explanation: `Server-Side Rendering (SSR) renders React components on the server and sends HTML to the client. Improves SEO and initial load time.`,
            analogy: `SSR is like receiving a **printed newspaper** vs **printing it yourself** (CSR) - you get content instantly.`,
            realUsage: `SEO-critical pages, blogs, e-commerce product pages.`,
            code: `// Next.js SSR
export async function getServerSideProps() {
  const res = await fetch('https://api.example.com/data');
  const data = await res.json();
  
  return { props: { data } };
}`,
            interviewQuestions: [
                {
                    question: "What is Hydration?",
                    answer: "Hydration is when React attaches event listeners to server-rendered HTML, making it interactive. The server sends HTML, client downloads JS, React 'hydrates' the static HTML into a fully interactive React app."
                }
            ]
        },
        {
            id: "nextjs-basics",
            title: "Next.js Basics",
            category: "SSR",
            explanation: `Next.js is a React framework for production with built-in SSR, SSG, routing, and more.`,
            analogy: `Next.js is **React with batteries included** - routing, SSR, optimization all configured.`,
            realUsage: `Production React apps, e-commerce, content sites, SaaS products.`,
            code: `// File-based routing
// pages/about.js -> /about
export default function About() {
  return <div>About</div>;
}`,
            interviewQuestions: [
                {
                    question: "What is the difference between SSR, SSG, and ISR?",
                    answer: "**SSR**: Render on every request. **SSG** (Static Generation): Pre-render at build time. **ISR** (Incremental Static Regeneration): SSG but regenerate in background on interval. SSG is fastest, SSR always fresh, ISR is hybrid."
                }
            ]
        },
        {
            id: "ssg",
            title: "Static Site Generation (SSG)",
            category: "SSR",
            explanation: `SSG pre-renders pages at build time. Pages are static HTML, extremely fast.`,
            analogy: `SSG is like **meal prep** - cook everything Sunday, just reheat during the week.`,
            realUsage: `Blogs, documentation sites, marketing pages - content that doesn't change often.`,
            code: `// Next.js SSG
export async function getStaticProps() {
  const posts = await getPosts();
  return { props: { posts } };
}`,
            interviewQuestions: [
                {
                    question: "When should you use SSG vs SSR?",
                    answer: "Use **SSG** when: 1) Content doesn't change often, 2) Can pre-render at build, 3) SEO important. Use **SSR** when: 1) Content changes frequently, 2) User-specific content, 3) Can't pre-render all possible paths."
                }
            ]
        },
        {
            id: "isr",
            title: "Incremental Static Regeneration (ISR)",
            category: "SSR",
            explanation: `ISR allows updating static pages after build without rebuilding entire site.`,
            analogy: `ISR is like a **self-updating encyclopedia** - mostly static, but automatically refreshes entries periodically.`,
            realUsage: `E-commerce product pages, news sites, blogs with frequent updates.`,
            code: `export async function getStaticProps() {
  const data = await fetchData();
  
  return {
    props: { data },
    revalidate: 60 // Regenerate every 60 seconds
  };
}`,
            interviewQuestions: [
                {
                    question: "How does ISR improve upon SSG?",
                    answer: "ISR combines SSG speed with SSR freshness. Pages are static but regenerate in background. First visitor gets cached page, triggers regeneration, next visitor gets updated page. Best of both worlds for semi-dynamic content."
                }
            ]
        }
    ]
};
