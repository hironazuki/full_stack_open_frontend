import React from 'react';
import ReactDOM from 'react-dom';

const Header = ({course}) => {
  return (
    <h2>{course.name}</h2>
  )
}

const Course = ({course}) => {
  return (
    <>
      <Header course={course} />
      <Content course={course} />
      <Total course={course} />
    </>
  )
}

const Content = ({course}) => {
  return (
    <>
      {course.parts.map((part) =>
        <p key={part.id}>{part.name} {part.exercises}</p>
      )}
    </>
  )
}


const Total = ({course}) => {
  const exercises = course.parts.map(part => part.exercises)
  const reducer = (accumulator, currentValue) => accumulator + currentValue;
  const total = exercises.reduce(reducer)
  return (
    <h4>{`Number of exercises ${total}`}</h4>
  )
}

const App = () => {
  const courses = [
    {
      name: 'Half Stack application development',
      id: 1,
      parts: [
        {
          name: 'Fundamentals of React',
          exercises: 10,
          id: 1
        },
        {
          name: 'Using props to pass data',
          exercises: 7,
          id: 2
        },
        {
          name: 'State of a component',
          exercises: 14,
          id: 3
        },
        {
          name: 'Redux',
          exercises: 11,
          id: 4
        }
      ]
    },
    {
      name: 'Node.js',
      id: 2,
      parts: [
        {
          name: 'Routing',
          exercises: 3,
          id: 1
        },
        {
          name: 'Middlewares',
          exercises: 7,
          id: 2
        }
      ]
    }
  ]
  
  return (
    <>
      <h1>Web development curriculum</h1>
      <div>
        {courses.map(course => 
          <Course key={course.id} course={course} />
        )}
      </div>
    </>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))