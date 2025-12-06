// Import all23 topic modules
import { topic01ReactBasics } from './topics/topic-01-react-basics';
import { topic02StateManagement } from './topics/topic-02-state-management';
import { topic03Hooks } from './topics/topic-03-hooks';
import { topic04ComponentPatterns } from './topics/topic-04-component-patterns';
import { topic05FormsValidation } from './topics/topic-05-forms-validation';
import { topic06Routing } from './topics/topic-06-routing';
import { topic07GlobalState } from './topics/topic-07-global-state';
import { topic08APIHandling } from './topics/topic-08-api-handling';
import { topic09DataFetchingLibraries } from './topics/topic-09-data-fetching-libraries';
import { topic10PerformanceOptimization } from './topics/topic-10-performance-optimization';
import { topic11RenderingBehavior } from './topics/topic-11-rendering-behavior';
import { topic12React18Features } from './topics/topic-12-react-18-features';
import { topic13ServerSideRendering } from './topics/topic-13-server-side-rendering';
import { topic14Styling } from './topics/topic-14-styling';
import { topic15Architecture } from './topics/topic-15-architecture';
import { topic16Testing } from './topics/topic-16-testing';
import { topic17BuildTools } from './topics/topic-17-build-tools';
import { topic18TypeScript } from './topics/topic-18-typescript';
import { topic19Authentication } from './topics/topic-19-authentication';
import { topic20BackendIntegration } from './topics/topic-20-backend-integration';
import { topic21Deployment } from './topics/topic-21-deployment';
import { topic22SystemDesign } from './topics/topic-22-system-design';
import { topic23InterviewTopics } from './topics/topic-23-interview-topics';

// Combine all topics into categories object
export const categories = {
    ...topic01ReactBasics,
    ...topic02StateManagement,
    ...topic03Hooks,
    ...topic04ComponentPatterns,
    ...topic05FormsValidation,
    ...topic06Routing,
    ...topic07GlobalState,
    ...topic08APIHandling,
    ...topic09DataFetchingLibraries,
    ...topic10PerformanceOptimization,
    ...topic11RenderingBehavior,
    ...topic12React18Features,
    ...topic13ServerSideRendering,
    ...topic14Styling,
    ...topic15Architecture,
    ...topic16Testing,
    ...topic17BuildTools,
    ...topic18TypeScript,
    ...topic19Authentication,
    ...topic20BackendIntegration,
    ...topic21Deployment,
    ...topic22SystemDesign,
    ...topic23InterviewTopics
};

// Export allTopics for the app to use
export const allTopics = Object.values(categories).flat();
