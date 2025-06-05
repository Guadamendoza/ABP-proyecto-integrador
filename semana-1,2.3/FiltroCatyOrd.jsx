import React from "react";

function FiltroCatyOrd({ categoria, setCategoria, ordenamiento, setOrdenamiento }) {
return (
  <>
    <div>
      <input
        type="text"
        placeholder="Filtrar por categoría"
        value={categoria}
        onChange={(e) => setCategoria(e.target.value)}
      />
    </div>

    <select value={ordenamiento} onChange={(e) => setOrdenamiento(e.target.value)}>
      <option value="">-- Ordenar por --</option>
      <option value="price-asc">Precio (menor a mayor)</option>
      <option value="price-desc">Precio (mayor a menor)</option>
      <option value="rating-asc">Rating (menor a mayor)</option>
      <option value="rating-desc">Rating (mayor a menor)</option>
    </select>
  </>
);
}

export default FiltroCatyOrd;

