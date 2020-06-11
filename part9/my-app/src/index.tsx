import React from 'react';
import ReactDOM from 'react-dom';

const Header: React.FC<{ courseName: string }> = ({ courseName }) => (
  <h1>{courseName}</h1>
);

interface CoursePart {
  name: string;
  exerciseCount: number;
}
const Content: React.FC<{ courseParts: CoursePart[] }> = ({ courseParts }) => (
  <>
    {courseParts.map((course, key) => (
      <p key={key}>
        {course.name} {course.exerciseCount}
      </p>
    ))}
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
  const courseParts = [
    {
      name: 'Fundamentals',
      exerciseCount: 10
    },
    {
      name: 'Using props to pass data',
      exerciseCount: 7
    },
    {
      name: 'Deeper type usage',
      exerciseCount: 14
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
