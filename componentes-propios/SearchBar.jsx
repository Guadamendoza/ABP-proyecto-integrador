import React from "react";
function SearchBar({ term, setTerm }) {
  // input para buscar el producto y onchange para que se actualice el estado de búsqueda cuando se hacen modificaciones en los caracteres
  return (
    <div>
      <input 
        type="text" 
        placeholder="Buscar producto" 
        value={term} 
        onChange={(e) => setTerm(e.target.value)} 
        className="mb-4 p-2 w-full border rounded"
      />
    </div>
  );
}
 export default SearchBar;
