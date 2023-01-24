import React, { useState } from 'react'


const Display = ({text}) => {
  return(
    <p>
      {text}
    </p>
  )
}


const DisplayPoints = ({value}) => {
  return(
    <p>
      Has {value} votes
    </p>
  )
}

const Button = ({onClick, text}) => {
  return(
    <button onClick={onClick}>{text}</button>
  )
}


const App = () => {
  const anecdotes = [
    'If it hurts, do it more often',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients'
  ]

  const pointsArrayLength = anecdotes.length
  const pointsArray = Array(pointsArrayLength).fill(0)


  const getRandomArbitrary = () => {
    return Math.round((Math.random() * (anecdotes.length - 1 - 0 ) + 0));
  }
   
  const [selected, setSelected] = useState(0)
  const [points, setPoints] = useState(pointsArray)

  const handleAddPoint = () => {
    const copy = {...points}
    copy[selected] += 1 
    setPoints(copy)
  }

  const returnMostVoted = () => {

    const pointsArray = Object.values(points)
    const max = Math.max.apply(Math,pointsArray)

    return pointsArray.indexOf(max)
  }

  const handleRandonAnecdote = () => setSelected( getRandomArbitrary() )

  return (
    <div >
      <div>
        <h1 className="principal">Anecdote of tFGFGhe day</h1>
        <Display text = {anecdotes[selected]} />
        <DisplayPoints value = {points[selected]} />
      </div>

      <div>
        <Button text="vote" onClick={handleAddPoint} />
        <Button text="next anecdote" onClick={handleRandonAnecdote} />
      </div>

      <div>
        <h1>Anecdote with most votes</h1>
        <Display text={anecdotes[returnMostVoted()]} />        
        <DisplayPoints value = {points[returnMostVoted()]} />


      </div>                              


    </div>
  )
}

export default App