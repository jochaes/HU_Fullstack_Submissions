import React from "react"

const SearchFilter = ( {value, onChange}) =>      
<div>
    find countries: <input value={value} onChange={onChange} />
</div>

export default SearchFilter
