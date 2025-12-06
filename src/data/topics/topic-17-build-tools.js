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
