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
