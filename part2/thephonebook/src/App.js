import React, { useState, useEffect } from 'react'
import Person from './Components/Person'
import SearchFilter from './Components/SearchFilter'
import PersonForm from './Components/PersonForm'
import Persons from './Components/Persons'
import personsService from './Services/persons'
import Notification from './Components/Notification'


const App = () => {
  //UseStates for "Variables"
 // const [ persons, setPersons ] = useState([])
  const [persons, setPersons] = useState([]) //Empty because we want to retirve the info from the server 
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [ searchFilter, setSearchFilter ] = useState('')
  //const [errorMessage, setErrorMessage] = useState('This is an error message') // to set the error message
  const [errorMessage, setErrorMessage] = useState(null) // to set the error message

  const GETServerNotes = () =>{
    console.log("Sending request");
    personsService
      .getAll()
      .then( people => {
        console.log("Request Fulfilled");
        setPersons(people)
      } )
  }

  useEffect(GETServerNotes,[]) //Empy [] so it runs after th first render

  
  //Add a new person with name from the form's input, if the name doesn't exists already
  const addPerson = (event) =>{
    event.preventDefault()

    //Check if person already exists, with find
    const toFindPerson = persons.find( person => person.name === newName)
    if( toFindPerson !== undefined ){
      const message = `${newName} is already added to phonebook. \nReplace the old number with the new one?`
      if(window.confirm(message)){
        //Update the person's info
        personUpdate( toFindPerson, newNumber )
      }
      setNewName('')
      setNewNumber('')
    }else{
      const personObject = {
        name: newName,
        number: newNumber
      }
      //Request to store person
      personsService.create(personObject)
                    .then( storedPerson => {
                      const message = `${storedPerson.name}' contact has been added to the phonebook'`
                      showMessage(message)
                      setPersons( persons.concat(storedPerson) )
                    })
      setNewName('')
      setNewNumber('')
    }
  }

  //A function that displays a message 
  const showMessage = (message) => {
    setErrorMessage(message)
    setTimeout(() => {
      setErrorMessage(null)
    }, 5000);
  }
  
  //A function that returns an array containing persons to show 
  const personsArrayShow = () => {
    if( searchFilter === "" ){
      return persons.map(person => <Person key={person.name} onDeleteButtonHandler={handleDeleteButton} person={person}/>)
    }else{
      const regex = new RegExp(`${searchFilter}`, "gi") //Regular expression to get the name upper or lower case
      const filteredNames = persons.filter( person =>  person.name.match(regex) !== null) //Filter the names with that regex
      return filteredNames.map(person => <Person key={person.name} onDeleteButtonHandler={handleDeleteButton} person={person}/>)  //Map to <li> items 
    }
  }

  //A function to request a delete 
  const personDelete = ( personID ) => {

    const toDeletePerson = persons.find( p => p.id === parseInt(personID)) //Find the person to delete
    const message = `Delete ${toDeletePerson.name} ?`    //Message for window.confirm

    if (window.confirm(message)){     //If confirm then Delete the person 
      console.log('Ok deleting')
      personsService.destroy(personID)
      .then( () =>{
        const message = `${toDeletePerson.name}'s contact has been deleted from the phonebook`
        showMessage(message)
        setPersons( persons.filter( p=> p.id !== toDeletePerson.id ) )
      })
      .catch(error => {
        const message = "There was a problem trying to delete this user"
        showMessage(message)
      })      
    }
  }
  //A fucntion to update the person's phone number 
  const personUpdate = ( person, newPhoneNumber ) => {
      console.log (`updating ${person.name} with new number: ${newPhoneNumber}` )
      const newPerson = {...person, number: newPhoneNumber} 
      personsService.update(person.id, newPerson)
                    .then( updatedPerson => {
                      const message = `${person.name}'s phone number has been updated`
                      showMessage(message)
                      setPersons(persons.map( p=> p.id !== person.id ? p : updatedPerson )) 
                    })
                    .catch( error => {
                      const message = "User already deleted from the server"
                      showMessage(message)
                    })
  }


  ////////////Handlers 

  //Handler when name is changed in the form 
  const handleNameChange = (event) => setNewName(event.target.value)

  //Handler when number is changed in the form 
  const handleNumberChange = (event) => setNewNumber(event.target.value)

  //Handler when filter is changed
  const handleSearchFilterChange = (event) => setSearchFilter(event.target.value)

  //Handler when Delete Button is pressed
  const handleDeleteButton = (event) => personDelete(event.target.name) 

  return (
    <div>
      
      <h2>Phonebook</h2>
      <Notification message={errorMessage} />
      <SearchFilter value={searchFilter} onChange={handleSearchFilterChange}/>

      <h2>Add a new </h2>
      <PersonForm onSubmit={addPerson} nameValue={newName} nameOnChange={handleNameChange} numberValue={newNumber} numberOnChange={handleNumberChange} />

      <h2>Numbers</h2>
      <Persons personArray={ personsArrayShow()  } />

    </div>
  )
}

export default App