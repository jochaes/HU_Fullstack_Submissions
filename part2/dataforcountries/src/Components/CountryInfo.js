import React from "react";


const CountryInfo = ({country}) =>
<li>
    <h2>{country.name.common}</h2>
    <p>Capital: {country.capital[0] }</p>
    <p>cca2: {country.cca2} </p>

    <h2>Languages</h2>
    <ul>
        {Object.values(country.languages).map(lang => <li key = {lang}> {lang} </li>) }
    </ul>
    
    <img src={country.flags.png} alt={country.name.common + "flag"} width="150" height="100"></img>
</li>


export default CountryInfo