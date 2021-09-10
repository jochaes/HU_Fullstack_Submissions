import React from 'react'
import ReactDOM from 'react-dom'

const Course = ({course}) => {
  return(
    <div>
      <Header course={course} />
      <Content parts={course.parts} />
    </div>
  )
}

const Header = ({ course }) => {
  return (
    <h1>{course.name}</h1>
  )
}

const Total = ({ parts }) => {

  console.log(parts);

  const total = parts.reduce( (sum, part) => sum + part.exercises ,0)

  //const sum = course.parts[0].exercises + course.parts[1].exercises + course.parts[2].exercises
  return(
    <p>Number of exercises {total}</p>
  ) 
}

const Part = ({text, value}) => {
  return (
    <p>
      {text} {value}
    </p>    
  )
}

const Content = ({ parts }) => {
  return (
    <div>
      {parts.map( part => <Part key={part.id} text={part.name} value={part.exercises} />)}
    </div>
  )
}

const App = () => {
  const course = {
    id:1,
    name: 'Half Stack application development',
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10,
        id:1
      },
      {
        name: 'Using props to pass data',
        exercises: 7,
        id:2
      },
      {
        name: 'State of a component',
        exercises: 14,
        id:3
      }
      
    ]
  }

  return (

    <div>
      <Course course={course} />
      {/* <Total parts={course.parts} /> */}
    </div>
  
  )
}

ReactDOM.render(<App />, document.getElementById('root'))