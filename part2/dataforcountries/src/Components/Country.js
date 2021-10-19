import React from "react";

const Country = ( {country, onClickhandler} ) => {
 
    return <li> 
                {country.name.common}
                <button onClick={onClickhandler} name={country.name.common}>show</button> 
            </li> 

}

export default Country