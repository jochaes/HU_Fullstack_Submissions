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


//Returns phonebook to the client
app.get('/api/persons', (request, response)=>{
    response.json(persons)
})




const PORT = 3001
app.listen(PORT)
console.log(`Server running on port ${PORT}`);