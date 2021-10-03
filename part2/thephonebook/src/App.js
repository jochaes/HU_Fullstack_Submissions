import React, { useState } from 'react'
import Person from './Components/Person'
import SearchFilter from './Components/SearchFilter'
import PersonForm from './Components/PersonForm'
import Persons from './Components/Persons'

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
  const [ searchFilter, setSearchFilter ] = useState('')

  
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
  
  //A function that returns an array containing persons to show 
  const personsArrayShow = () => {
    if( searchFilter === "" ){
      return persons.map(person => <Person key={person.name} person={person}/>)
    }else{
      const regex = new RegExp(`${searchFilter}`, "gi") //Regular expression to get the name upper or lower case
      const filteredNames = persons.filter( person =>  person.name.match(regex) !== null) //Filter the names with that regex
      return filteredNames.map(person => <Person key={person.name} person={person}/>)  //Map to <li> items 
    }
  }


  ////////////Handlers 

  //Handler when name is changed in the form 
  const handleNameChange = (event) => setNewName(event.target.value)

  //Handler when number is changed in the form 
  const handleNumberChange = (event) => setNewNumber(event.target.value)

  //Handler when number is changed in the form 
  const handleSearchFilterChange = (event) => setSearchFilter(event.target.value)



  return (
    <div>
      <h2>Phonebook</h2>
      <SearchFilter value={searchFilter} onChange={handleSearchFilterChange}/>

      <h2>Add a new </h2>
      <PersonForm onSubmit={addPerson} nameValue={newName} nameOnChange={handleNameChange} numberValue={newNumber} numberOnChange={handleNumberChange} />

      <h2>Numbers</h2>
      <Persons personArray={ personsArrayShow()  } />

    </div>

  )
}

export default App