export const topic21Deployment = {
    "21. Deployment": [
        {
            id: "vercel",
            title: "Vercel",
            category: "Deployment",
            explanation: `Platform for frontend deployment with zero-config, automatic HTTPS, and global CDN.`,
            analogy: `Vercel is like a **magic butler** - hand him your code, he instantly sets up everything without you lifting a finger.`,
            realUsage: `Deploying Next.js apps, static sites, serverless functions.`,
            code: `// Deploy with CLI
npm i -g vercel
vercel

// Or connect GitHub repo
// Auto-deploys on every push`,
            interviewQuestions: [
                {
                    question: "When to use Vercel vs traditional hosting?",
                    answer: "**Vercel**: JAMstack apps, Next.js, automatic scaling, global CDN. **Traditional hosting**: Full control needed, specific server requirements, existing infrastructure. Vercel is simpler for modern React apps."
                }
            ]
        },
        {
            id: "netlify",
            title: "Netlify",
            category: "Deployment",
            explanation: `Platform for deploying static sites and JAMstack apps with continuous deployment.`,
            analogy: `Netlify is like **automated publishing** - connect your repo, every commit = new deployment.`,
            realUsage: `Static sites, React apps, serverless functions.`,
            code: `// netlify.toml
[build]
  command = "npm run build"
  publish = "dist"

[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200`,
            interviewQuestions: [
                {
                    question: "Netlify vs Vercel?",
                    answer: "Very similar. **Vercel**: Optimized for Next.js, slightly faster builds. **Netlify**: Better for static sites, more build minutes on free tier, form handling. Both excellent - choose based on framework and features needed."
                }
            ]
        }
    ]
};
