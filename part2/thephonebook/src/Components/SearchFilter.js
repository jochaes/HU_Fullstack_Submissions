import React from "react"

const SearchFilter = ( {value, onChange}) =>      
<div>
    Filter Shown with: <input value={value} onChange={onChange} />
</div>

export default SearchFilter
