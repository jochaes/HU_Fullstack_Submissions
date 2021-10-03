import React, { useState } from 'react'
import Person from './Components/Person'

const App = () => {

  const [ persons, setPersons ] = useState([])

  const [ newName, setNewName ] = useState('')
  
  //Add a new person with name from the form's input
  const addPerson = (event) =>{
    event.preventDefault()
    //A new person object

    //Check if person already exists, with findIndex and Reduce 
    if( persons.findIndex( person => person.name === newName ) !== -1 ){
      window.alert( `${newName} is already added to phonebook` )
    }else{
      const personObject = {
        name: newName
      }
  
      setPersons( persons.concat(personObject) )
      setNewName('')
    }
  }

  const handleNameChange = (event) => setNewName(event.target.value)

  return (
    <div>
      <h2>Phonebook</h2>

      <form onSubmit={addPerson}>
        <div>
          name: <input value={newName} onChange={handleNameChange} />
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