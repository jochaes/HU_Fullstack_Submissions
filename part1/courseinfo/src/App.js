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
  return(
    <div>
     <Part partName = {props.partName1}  partExercises = {props.partExersises1}/>
     <Part partName = {props.partName2}  partExercises = {props.partExersises2}/>
     <Part partName = {props.partName3}  partExercises = {props.partExersises3}/>
    </div>
  )
}
const Total = ( ) => {
  return(
    <div>
      <p>Total</p>
    </div>
  )
}
const App = () => {
  const course = 'Half Stack application development'

  const part1 =  {
    name: 'Fundamentals of React',
    exercises:10
  }

  const part2 =  {
    name: 'Using props to pass data',
    exercises:7
  }

  const part3 =  {
    name: 'State of a component',
    exercises:14
  }

  return (
    <div>
      <Header courseName = {course} /> 
      <Content partName1 = {part1.name} partExersises1 = {part1.exercises} 
               partName2 = {part2.name} partExersises2 = {part2.exercises}
               partName3 = {part3.name} partExersises3 = {part3.exercises}/>
      <Total />
      <p>Number of exercises {part1.exercises + part2.exercises + part3.exercises}</p>
    </div>
  )
}

export default App