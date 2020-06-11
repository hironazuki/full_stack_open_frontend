import React from 'react';
import ReactDOM from 'react-dom';

interface CoursePartBase {
  name: string;
  exerciseCount: number;
}

interface CoursePartOne extends CoursePartBase {
  name: 'Fundamentals';
  description: string;
}

interface CoursePartTwo extends CoursePartBase {
  name: 'Using props to pass data';
  groupProjectCount: number;
}

interface CoursePartThree extends CoursePartBase {
  name: 'Deeper type usage';
  description: string;
  exerciseSubmissionLink: string;
}
interface CoursePartFour extends CoursePartBase {
  name: 'test';
  description: string;
  test: string;
}

type CoursePart =
  | CoursePartOne
  | CoursePartTwo
  | CoursePartThree
  | CoursePartFour;

const Header: React.FC<{ courseName: string }> = ({ courseName }) => (
  <h1>{courseName}</h1>
);

/**
 * Helper function for exhaustive type checking
 */
const assertNever = (value: never): never => {
  throw new Error(
    `Unhandled discriminated union member: ${JSON.stringify(value)}`
  );
};

const Content: React.FC<{ courseParts: CoursePart[] }> = ({ courseParts }) => (
  <>
    {courseParts.map(part => {
      switch (part.name) {
        case 'Fundamentals':
          return (
            <p>
              {part.name} {part.exerciseCount} {part.description}
            </p>
          );
        case 'Using props to pass data':
          return (
            <p>
              {part.name} {part.exerciseCount} {part.groupProjectCount}
            </p>
          );
        case 'Deeper type usage':
          return (
            <p>
              {part.name} {part.exerciseCount} {part.description}{' '}
              {part.exerciseSubmissionLink}
            </p>
          );
        case 'test':
          return (
            <p>
              {part.name} {part.exerciseCount} {part.description} {part.test}
            </p>
          );
        default:
          return assertNever(part);
      }
    })}
  </>
);

const Total: React.FC<{ courseParts: CoursePart[] }> = ({ courseParts }) => (
  <p>
    Number of exercises{' '}
    {courseParts.reduce((carry, part) => carry + part.exerciseCount, 0)}
  </p>
);

const App = () => {
  const courseName = 'Half Stack application development';
  const courseParts: CoursePart[] = [
    {
      name: 'Fundamentals',
      exerciseCount: 10,
      description: 'This is an awesome course part'
    },
    {
      name: 'Using props to pass data',
      exerciseCount: 7,
      groupProjectCount: 3
    },
    {
      name: 'Deeper type usage',
      exerciseCount: 14,
      description: 'Confusing description',
      exerciseSubmissionLink: 'https://fake-exercise-submit.made-up-url.dev'
    },
    {
      name: 'test',
      exerciseCount: 23,
      description: 'Confusing description',
      test: 'test'
    }
  ];

  return (
    <div>
      <Header courseName={courseName} />
      <Content courseParts={courseParts} />
      <Total courseParts={courseParts} />
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));
