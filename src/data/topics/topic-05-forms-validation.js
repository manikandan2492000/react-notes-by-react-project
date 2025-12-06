export const topic05FormsValidation = {
    "5. Forms & Validation": [
        {
            id: "controlled-inputs",
            title: "Controlled Inputs",
            category: "Forms",
            explanation: `In a controlled component, form data is handled by a React component. The alternative is uncontrolled components, where form data is handled by the DOM itself.`,
            analogy: `- **Controlled**: You driving a car. You control every turn and speed change.
- **Uncontrolled**: A self-driving car. You just tell it where to go, and it handles the driving.`,
            realUsage: `Most forms in React are controlled to allow validation, instant feedback, and disabling the submit button.`,
            code: `function ControlledInput() {
  const [value, setValue] = useState('');

  return (
    <input 
      value={value} 
      onChange={e => setValue(e.target.value)} 
    />
  );
}`,
            interviewQuestions: [
                {
                    question: "What is the main advantage of controlled components?",
                    answer: "You have complete control over the value. You can enforce input formats (e.g., uppercase only), validate instantly, or conditionally disable the submit button."
                }
            ]
        },
        {
            id: "uncontrolled-inputs",
            title: "Uncontrolled Inputs",
            category: "Forms",
            explanation: `Uncontrolled inputs maintain their own internal state. You access the value using refs.`,
            analogy: `Like a **suggestion box** - you don't control what people write, you just collect it later.`,
            realUsage: `File inputs (always uncontrolled), integrating with non-React libraries, simple forms.`,
            code: `function UncontrolledInput() {
  const inputRef = useRef();
  
  function handleSubmit() {
    console.log(inputRef.current.value);
  }
  
  return (
    <>
      <input ref={inputRef} defaultValue="Default" />
      <button onClick={handleSubmit}>Submit</button>
    </>
  );
}`,
            interviewQuestions: [
                {
                    question: "When should you use uncontrolled inputs?",
                    answer: "When: 1) You don't need instant validation, 2) Integrating with non-React code, 3) File inputs (always uncontrolled). For most forms, controlled inputs are better."
                }
            ]
        },
        {
            id: "form-libraries",
            title: "Form Libraries",
            category: "Forms",
            explanation: `Form libraries like Formik and React Hook Form provide abstractions for common form tasks: validation, error handling, submission, and field management.`,
            analogy: `Form libraries are like **tax software** - instead of manually calculating taxes, the software handles the logic while you just fill in the values.`,
            realUsage: `Complex forms with many fields, validation schemas, dynamic fields, or multi-step flows.`,
            code: `// React Hook Form example
import { useForm } from 'react-hook-form';

function MyForm() {
  const { register, handleSubmit, formState: { errors } } = useForm();
  
  const onSubmit = data => console.log(data);
  
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input {...register('email', { required: true })} />
      {errors.email && <span>Email is required</span>}
      
      <button type="submit">Submit</button>
    </form>
  );
}`,
            interviewQuestions: [
                {
                    question: "When should you use a form library vs plain React?",
                    answer: "Use a library when: 1) Forms have complex validation, 2) Many fields (10+), 3) Dynamic field arrays, 4) Multi-step forms. For simple forms (1-3 fields), plain `useState` is simpler."
                }
            ]
        },
        {
            id: "formik",
            title: "Formik",
            category: "Forms",
            explanation: `Formik is a popular form library that helps with validation, error handling, and form submission. It uses render props or hooks.`,
            analogy: `Formik is like a **personal assistant for forms** - it handles the tedious parts so you can focus on the UI.`,
            realUsage: `Forms with complex validation logic, wizard forms, async validation.`,
            code: `import { useFormik } from 'formik';

function SignupForm() {
  const formik = useFormik({
    initialValues: {
      email: '',
      password: ''
    },
    validate: values => {
      const errors = {};
      if (!values.email) {
        errors.email = 'Required';
      }
      return errors;
    },
    onSubmit: values => {
      console.log(values);
    }
  });
  
  return (
    <form onSubmit={formik.handleSubmit}>
      <input
        name="email"
        value={formik.values.email}
        onChange={formik.handleChange}
      />
      {formik.errors.email && <div>{formik.errors.email}</div>}
      <button type="submit">Submit</button>
    </form>
  );
}`,
            interviewQuestions: [
                {
                    question: "What are Formik's main features?",
                    answer: "1) Form state management (values, errors, touched), 2) Validation (sync and async), 3) Error messages, 4) Form submission handling, 5) Field-level validation, 6) Integration with Yup schema validation."
                }
            ]
        },
        {
            id: "react-hook-form",
            title: "React Hook Form",
            category: "Forms",
            explanation: `React Hook Form is a performant, flexible form library with minimal re-renders. It uses uncontrolled components and refs for better performance.`,
            analogy: `RHF is like a **smart thermostat** - it only adjusts when necessary, not constantly monitoring every degree change.`,
            realUsage: `High-performance forms, forms with many fields, when you want minimal re-renders.`,
            code: `import { useForm } from 'react-hook-form';

function MyForm() {
  const { register, handleSubmit, formState: { errors } } = useForm();
  
  const onSubmit = data => console.log(data);
  
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input 
        {...register('email', {
          required: 'Email is required',
          pattern: {
            value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\\.[A-Z]{2,}$/i,
            message: 'Invalid email'
          }
        })} 
      />
      {errors.email && <span>{errors.email.message}</span>}
      
      <button type="submit">Submit</button>
    </form>
  );
}`,
            interviewQuestions: [
                {
                    question: "Why is React Hook Form more performant than Formik?",
                    answer: "RHF uses uncontrolled inputs with refs, minimizing re-renders. Formik uses controlled inputs, causing re-renders on every keystroke. RHF only re-renders when needed (validation, submission)."
                }
            ]
        },
        {
            id: "yup-validation",
            title: "Yup Validation",
            category: "Forms",
            explanation: `Yup is a schema builder for value parsing and validation. It integrates well with Formik and React Hook Form.`,
            analogy: `Yup is like a **blueprint inspector** - you define the rules (schema), and it checks if the building (form data) meets the specifications.`,
            realUsage: `Complex validation rules, consistent validation across frontend/backend, type coercion.`,
            code: `import * as Yup from 'yup';
import { useFormik } from 'formik';

const validationSchema = Yup.object({
  email: Yup.string()
    .email('Invalid email')
    .required('Required'),
  age: Yup.number()
    .min(18, 'Must be 18 or older')
    .required('Required'),
  website: Yup.string()
    .url('Must be a valid URL')
});

function MyForm() {
  const formik = useFormik({
    initialValues: { email: '', age: '', website: '' },
    validationSchema,
    onSubmit: values => console.log(values)
  });
  
  return <form onSubmit={formik.handleSubmit}>...</form>;
}`,
            interviewQuestions: [
                {
                    question: "What are Yup's advantages over custom validation?",
                    answer: "1) **Declarative** - schema is easier to read than imperative code, 2) **Reusable** - schemas can be shared and composed, 3) **Type coercion** - automatically converts strings to numbers, 4) **Async validation** support, 5) **Server-side reuse** - same schemas for client and server."
                }
            ]
        },
        {
            id: "debounced-inputs",
            title: "Debounced Inputs",
            category: "Forms",
            explanation: `Debouncing delays processing of input changes until the user stops typing for a specified time. Useful for search fields or expensive operations.`,
            analogy: `Debouncing is like **waiting for a bus** - instead of calling a taxi for each person, you wait until several people gather, then call one van.`,
            realUsage: `Search autocomplete, API calls on input, expensive validation.`,
            code: `import { useState, useEffect } from 'react';

function useDebounce(value, delay) {
  const [debouncedValue, setDebouncedValue] = useState(value);
  
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);
    
    return () => clearTimeout(handler);
  }, [value, delay]);
  
  return debouncedValue;
}

function SearchInput() {
  const [search, setSearch] = useState('');
  const debouncedSearch = useDebounce(search, 500);
  
  useEffect(() => {
    if (debouncedSearch) {
      fetchResults(debouncedSearch);
    }
  }, [debouncedSearch]);
  
  return <input value={search} onChange={e => setSearch(e.target.value)} />;
}`,
            interviewQuestions: [
                {
                    question: "What's the difference between debounce and throttle?",
                    answer: "**Debounce** waits for a pause in events before firing (e.g., wait until user stops typing). **Throttle** fires at most once per time interval (e.g., max once per 100ms). Use debounce for search, throttle for scroll/resize events."
                }
            ]
        },
        {
            id: "dynamic-forms",
            title: "Dynamic Forms",
            category: "Forms",
            explanation: `Dynamic forms allow adding/removing fields at runtime. Common in scenarios where the number of inputs is unknown beforehand.`,
            analogy: `Dynamic forms are like a **shopping list** - you can add or remove items as needed.`,
            realUsage: `Adding multiple addresses, phone numbers, education entries, or any variable-length list of inputs.`,
            code: `function DynamicForm() {
  const [fields, setFields] = useState([{ value: '' }]);
  
  function handleAdd() {
    setFields([...fields, { value: '' }]);
  }
  
  function handleRemove(index) {
    setFields(fields.filter((_, i) => i !== index));
  }
  
  function handleChange(index, value) {
    const newFields = [...fields];
    newFields[index].value = value;
    setFields(newFields);
  }
  
  return (
    <div>
      {fields.map((field, index) => (
        <div key={index}>
          <input
            value={field.value}
            onChange={e => handleChange(index, e.target.value)}
          />
          <button onClick={() => handleRemove(index)}>Remove</button>
        </div>
      ))}
      <button onClick={handleAdd}>Add Field</button>
    </div>
  );
}`,
            interviewQuestions: [
                {
                    question: "What's important about keys in dynamic forms?",
                    answer: "Never use array index as key if items can be reordered or removed - it causes bugs. Use unique IDs (uuid, database ID). If only appending to end and never removing, index might be okay, but IDs are safer."
                }
            ]
        },
        {
            id: "multi-step-forms",
            title: "Multi-step Forms",
            category: "Forms",
            explanation: `Multi-step forms break long forms into several pages/steps. They improve UX by reducing cognitive load and showing progress.`,
            analogy: `Multi-step forms are like **climbing stairs** - you tackle one floor at a time instead of facing a huge ladder all at once.`,
            realUsage: `Signup flows, checkout processes, onboarding wizards, surveys.`,
            code: `function MultiStepForm() {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    address: ''
  });
  
  function nextStep() {
    setStep(step + 1);
  }
  
  function prevStep() {
    setStep(step - 1);
  }
  
  function updateField(field, value) {
    setFormData({ ...formData, [field]: value });
  }
  
  return (
    <div>
      {step === 1 && (
        <Step1 data={formData} update={updateField} next={nextStep} />
      )}
      {step === 2 && (
        <Step2 data={formData} update={updateField} next={nextStep} prev={prevStep} />
      )}
      {step === 3 && (
        <Step3 data={formData} prev={prevStep} submit={() => console.log(formData)} />
      )}
    </div>
  );
}`,
            interviewQuestions: [
                {
                    question: "How do you manage state in multi-step forms?",
                    answer: "Options: 1) **Lift state up** to parent (simple), 2) **Context** (avoid prop drilling), 3) **Form library** (Formik/RHF with wizard), 4) **State management** (Redux/Zustand for complex flows). Choose based on complexity."
                }
            ]
        }
    ]
};
