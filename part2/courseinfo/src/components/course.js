import React from "react"

const Course = ({ course }) => {
    return (
      <div>
        <Header course={course} />
        <Content parts={course.parts} />
        <Total parts={course.parts} />
      </div>
    );
  };

const Header = ({ course }) => {
    return <h1>{course.name}</h1>
}

const Total = ({ parts }) => {
    const total = parts.reduce((sum, part) => sum + part.exercises, 0)
    return (
        <p>
            <b>total of exercises {total}</b>
        </p>
    )
}

const Part = ({ text, value }) => {
    return (
        <p>
            {text} {value}
        </p>
    )
}
  
const Content = ({ parts }) => {
    return (
        <div>
            {parts.map((part) => (
                <Part key={part.id} text={part.name} value={part.exercises} />
            ))}
        </div>
    )
}

export default Course