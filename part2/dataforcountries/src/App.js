import React, { useState, useEffect } from 'react'
import axios from 'axios'
import './App.css';
import SearchFilter from './Components/SearchFilter';
import Country from './Components/Country';
import Countries from './Components/Countries';
import CountryInfo from './Components/CountryInfo';




function App() {

  //StateHook for countries data 
  const [countries, setCountries] = useState([]) //Empty because we want to retrieve the data from the api
  const [searchFilter, setSearchFilter] = useState('') //Search bar for countries 
  
  //Retrieve Countries data from RestAPI
  const getCountriesAPI = () => {
    console.log("Sending Get request to CountriesAPI")
    axios.get("https://restcountries.com/v3.1/all") //Get request to api
      .then( response => {
        console.log("Response Fulfilled")
        const countriesResponse = response.data
        setCountries(countriesResponse)             //countries are stored in the state
      } )
  }
  useEffect(getCountriesAPI,[])
  
  //Function that shows countries
  const showCountries = () => {
    if (searchFilter === ""){
      return []
    }else{
      const regex = new RegExp(`${searchFilter}`, "gi") //Regular expression to get the name upper or lower case
      const filteredNames = countries.filter( place =>  place.name.common.match(regex) !== null) //Filter the names with that regex
      if(filteredNames.length > 10){
        return <p>too many matches, specify another filter</p> //This must be done different, because Countries expect a ul element not a string, maybe we can change Countries to accept errors.
      }else{
        if(filteredNames.length === 1){
          return <CountryInfo country={filteredNames[0]} />

        }else{
          
          const countryArrayFinal = filteredNames.map(place => <Country key = {parseInt(place.ccn3)} country={place} onClickhandler={showButton} />)
          return <Countries countryArray={countryArrayFinal}/>
        }
        
      }
    }
  }



  //Handlers
  //Handle when searchbox text it's modified
  const handleSearchFilterChange = (event) => setSearchFilter(event.target.value)
  
  const showButton = (event) => {
    console.log(event.target.name);
    setSearchFilter(event.target.name)
  }



  return (
    <div>
      <h1>Countries!</h1>
      <SearchFilter value={searchFilter} onChange={handleSearchFilterChange}/>
      { showCountries() }

    </div>
  );
}

export default App;
