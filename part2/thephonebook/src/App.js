import React, { useState } from 'react'
import Person from './Components/Person'

const App = () => {
  //UseStates for "Variables"
 // const [ persons, setPersons ] = useState([])
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456', id: 1 },
    { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }
  ])
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [ nameFilter, setNameFilter ] = useState('')

  
  //Add a new person with name from the form's input, if the name doesn't exists already
  const addPerson = (event) =>{
    event.preventDefault()
    //A new person object

    //Check if person already exists, with findIndex and Reduce 
    if( persons.findIndex( person => person.name === newName ) !== -1 ){
      window.alert( `${newName} is already added to phonebook` )
      setNewName('')
      setNewNumber('')
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

  //Handler when number is changed in the form 
  const handleNameFilterChange = (event) => setNameFilter(event.target.value)

  //Afunction that returns an array containing persons to show 
  const personsArrayShow = () => {
    if( nameFilter === "" ){
      return persons.map(person => <Person key={person.name} person={person}/>)
    }else{
      const regex = new RegExp(`${nameFilter}`, "gi") //Regular expression to get the name upper or lower case
      const filteredNames = persons.filter( person =>  person.name.match(regex) !== null) //Filter the names with that regex
      return filteredNames.map(person => <Person key={person.name} person={person}/>)  //Map to <li> items 
    }
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <div>
        Filter Shown with: <input value={nameFilter} onChange={handleNameFilterChange} />
      </div>


      <h2>Add a new </h2>
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
        {personsArrayShow()}
      </ul>
    </div>
  )
}

export default App