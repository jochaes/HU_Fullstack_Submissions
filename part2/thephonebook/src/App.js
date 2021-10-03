import React, { useState } from 'react'
import Person from './Components/Person'

const App = () => {
  //UseStates for "Variables"
  const [ persons, setPersons ] = useState([])
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')

  
  //Add a new person with name from the form's input, if the name doesn't exists already
  const addPerson = (event) =>{
    event.preventDefault()
    //A new person object

    //Check if person already exists, with findIndex and Reduce 
    if( persons.findIndex( person => person.name === newName ) !== -1 ){
      window.alert( `${newName} is already added to phonebook` )
    }else{
      const personObject = {
        name: newName,
        number: newNumber
      }
  
      setPersons( persons.concat(personObject) )
      setNewName('')
      setNewNumber('')
    }
  }
  ////////////Handlers 

  //Handler when name is changed in the form 
  const handleNameChange = (event) => setNewName(event.target.value)

  //Handler when number is changed in the form 
  const handleNumberChange = (event) => setNewNumber(event.target.value)

  return (
    <div>
      <h2>Phonebook</h2>

      <form onSubmit={addPerson}>
        <div>
          name: <input value={newName} onChange={handleNameChange} />
        </div>
        <div>
          number: <input value={newNumber} onChange={handleNumberChange} />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>

      <h2>Numbers</h2>
      <ul>
        {persons.map(person => <Person key={person.name} person={person}/>)}
      </ul>
    </div>
  )
}

export default App