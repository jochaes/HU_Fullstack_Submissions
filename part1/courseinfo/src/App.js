import React from 'react'

const Header = ( props ) => {
  return(
    <div>
      <h1>{props.courseName}</h1>
    </div>
  )
}

const Part = (props) => {
  return(
    <div>
      <p>{props.partName} {props.partExercises}</p>
    </div>
  )

}

const Content  = ( props ) => {
  const partList = props.parts.map( value => <Part key= {value.name} partName = {value.name} partExercises = {value.exercises} /> )

  return(
    <div>
      {partList}
    </div>
  )
}

const Total = ( props ) => {
  let total = 0;
  props.parts.forEach(element => {
    total += element.exercises
  });

  return(
    <div>
      <p>{total}</p>
    </div>
  )
}

const App = () => {
  const course = {
    name: 'Half Stack application development',
    parts : [
      {
        name: 'Fundamentals of React',
        exercises:10
      },
      {
        name: 'Using props to pass data',
        exercises:7
      },
      {
        name: 'State of a component',
        exercises:14
      }
    ]
  }


  return (
    <div>
      <Header courseName = {course.name} /> 
      <Content parts = {course.parts}/>
      <Total parts = {course.parts}/>
    </div>
  )
}

export default App