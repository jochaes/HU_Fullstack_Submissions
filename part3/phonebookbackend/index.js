const { request, response } = require('express')
const express = require('express')  //Here we import express as part of the app
const app = express()
app.use(express.json())          //We use express.json to get the json data from the request 


const persons = [
    { 
      "id": 1,
      "name": "Arto Hellas", 
      "number": "040-123456"
    },
    { 
      "id": 2,
      "name": "Ada Lovelace", 
      "number": "39-44-5323523"
    },
    { 
      "id": 3,
      "name": "Dan Abramov", 
      "number": "12-43-234345"
    },
    { 
      "id": 4,
      "name": "Mary Poppendieck", 
      "number": "39-23-6423122"
    }
]

const getPersonsSize = () => {
    const personsSize = persons.length
    return personsSize
}

//Returns the actual date 
const generateDate = ( ) => {
    const nowDate = (new Date()).toString() //"Fri Jun 28 2013 15:30:18 GMT-0700 (PDT)"
    return nowDate
  }

//Returns phonebook to the client
app.get('/api/persons', (request, response)=>{
    response.json(persons)
})

app.get('/api/persons/:id',(request, response)=>{
    const reqId = Number(request.params.id)   //Parse the param to an int

    const person = persons.find( p => p.id === reqId ) //Find the person 

    if(!person){  //Error if person does not exists
        response.statusMessage = "We didn't found that person, sorry!"  //Sends a message inside the status message 
        return response.status(404).end() 
    }

    response.json(person)  //Returns person 
})

//Returns some html with a little info about the phonebook 
app.get('/info',(request, response)=>{
    const date = generateDate()
    const phonebookSize = getPersonsSize()
    const message = `
        <div> 
            <p>
                Phonebook has info for ${phonebookSize} people
            </p>
            <p>
                ${date}
            </p>
        </div>`

    response.setHeader('Content-Type', 'text/html')
    response.send(message)
})




const PORT = 3001
app.listen(PORT)
console.log(`Server running on port ${PORT}`);