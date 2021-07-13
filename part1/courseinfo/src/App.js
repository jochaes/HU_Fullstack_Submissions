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
  const part1 = 'Fundamentals of React'
  const exercises1 = 10
  const part2 = 'Using props to pass data'
  const exercises2 = 7
  const part3 = 'State of a component'
  const exercises3 = 14

  return (
    <div>
      <Header courseName = {course} /> 
      <Content partName1 = {part1} partExersises1 = {exercises1} 
               partName2 = {part2} partExersises2 = {exercises2}
               partName3 = {part3} partExersises3 = {exercises3}/>
      
      <Total />
      <p>Number of exercises {exercises1 + exercises2 + exercises3}</p>
    </div>
  )
}

export default App