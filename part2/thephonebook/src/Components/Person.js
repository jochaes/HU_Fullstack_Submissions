import React from "react";

const Person = ( {person, onDeleteButtonHandler} ) => {

    return (
            <li> 
                {person.name} {person.number} 
                <button onClick={onDeleteButtonHandler} name={person.id} > Delete </button>
            </li>
    )
}

export default Person