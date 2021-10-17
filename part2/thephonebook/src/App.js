import React, { useState, useEffect } from 'react'
import Person from './Components/Person'
import SearchFilter from './Components/SearchFilter'
import PersonForm from './Components/PersonForm'
import Persons from './Components/Persons'
import axios from 'axios'
const App = () => {
  //UseStates for "Variables"
 // const [ persons, setPersons ] = useState([])
  const [persons, setPersons] = useState([]) //Empty because we want to retirve the info from the server 
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [ searchFilter, setSearchFilter ] = useState('')

  const GETServerNotes = () =>{
    console.log("Sending request");
    axios.get('http://localhost:3001/persons')
      .then( personList => {
        console.log("Request Fulfilled");
        const people = personList.data
        setPersons(people)
      } )
  }

  useEffect(GETServerNotes,[]) //Empy [] so it runs after th first render

  
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