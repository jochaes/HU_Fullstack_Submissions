const { request, response } = require('express')
const express = require('express')  //Here we import express as part of the app
const app = express()
app.use(express.json())          //We use express.json to get the json data from the request 


let persons = [
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

const generateId = ( ) => {
    const max = 100000
    return Math.floor(Math.random() * max);
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

app.post('/api/persons', (request, response)=>{
    const body = request.body

    if( !body.name || !body.number){   //If there is no name or number then returns error 
        return response.status(400).json({
            error:'Info missing'
        })
    }

    const newPerson = {   //New person to store
        id:generateId(),   //Id autogenerated 
        name: body.name,
        number: body.number
    }

    persons = persons.concat(newPerson)  //Stores the new person in the array 
    //console.log(request.body)
    response.send(newPerson)
})

app.delete('/api/persons/:id', (request, response)=>{
    const reqId = Number(request.params.id)   //Parse the param to an int
    persons = persons.filter(person => person.id !== reqId)   //Database is a new database without the note with the given id 
    response.status(204).end()     
})


const PORT = 3001
app.listen(PORT)
console.log(`Server running on port ${PORT}`);