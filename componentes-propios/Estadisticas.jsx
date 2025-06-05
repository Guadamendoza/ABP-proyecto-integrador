import React, {useState} from 'react';

function Estadisticas ({ filteredProducts }) {
  const [show, setShow] = useState(true); // Estado para controlar la visibilidad de las estadísticas

  if (!filteredProducts || filteredProducts.length === 0) {
  return <p className="text-red-500">No hay productos disponibles para mostrar estadísticas.</p>;
}

const maxProduct = Math.max(...filteredProducts.map(p => p.price)); // map va a devolver una lista con los precios y los tres puntos va a separar los precios, luego el max va a devolver el precio mayor
const minProduct = Math.min(...filteredProducts.map(p => p.price));
const longitud = filteredProducts.filter(p => p.title.length > 20).length;

  // precio promedio de todos los productos 
    const avgPrice = (filteredProducts.reduce((acc, p) => acc + p.price, 0) / filteredProducts.length) || 0;

   //cantidad de productos por categoria
  const categorias = [...new Set(filteredProducts.map(p => p.category))]; // las categorias  de los productos filtrados
  const productosPorCategoria = categorias.map(cat => ({ // para cada categoria, vamos a crear un objeto con la categoria y la cantidad de productos que tiene
  categoria: cat,
  cantidad: filteredProducts.filter(p => p.category === cat).length
})); 

//precio promedio por categoria
const precioPromedioPorCategoria = categorias.map(cat => { // para cada categoria, vamos a crear un objeto con la categoria y el precio promedio de los productos que tiene
  const filtrados = filteredProducts.filter(p => p.category === cat); // filtramos los productos por categoria
  const promedio = (filtrados.reduce((acc, p) => acc + p.price, 0) / filtrados.length) // calculamos el precio promedio de los productos filtrados
  return { categoria: cat, promedio };
});

// productos con stock mayor a 50 
    const stockOver50 = filteredProducts.filter(p => p.stock > 50).length;

// productos con rating mayor a 4.5 
const ratingOver45 = filteredProducts.filter(p => p.rating > 4.5).length;

// producto mas caro y mas barato por categoria
const extremosPorCategoria = categorias.map(cat => { 
  const productosDeCategoria = filteredProducts.filter(p => p.category === cat);
  const maxPrecio = Math.max(...productosDeCategoria.map(p => p.price));
  const minPrecio = Math.min(...productosDeCategoria.map(p => p.price)); 

  return {
    categoria: cat,
    maxPrecio,
    minPrecio }
  });


 
// rating general de todos los productos 
const promedioRatingGeneral = (filteredProducts.reduce((acc, p) => acc + p.rating, 0) / filteredProducts.length).toFixed(2); // calculamos el rating promedio de todos los productos y lo redondeamos a dos decimales

// rating promedio por categoria
const promedioRatingPorCategoria = categorias.map(cat => {
  const productosCat = filteredProducts.filter(p => p.category === cat);
  const sumaRatings = productosCat.reduce((acc, p) => acc + p.rating, 0);
  const promedio = productosCat.length > 0 ? (sumaRatings / productosCat.length).toFixed(2) : "0.00";
  return {
    categoria: cat,
    promedio
  };
});

    return (
      <>
        <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"  onClick={() => setShow(!show)}>
          {show ? "Ocultar" : "Mostrar"}
        </button>
        {show && (
          <div className="bg-blue-50 p-4 mt-6 rounded-lg shadow-md transition-opacity duration-100">
            <h2 className="text-xl font-bold mb-2 text-blue-800">Estadísticas</h2>
            <p>Precio máximo: ${maxProduct}</p>
            <p>Precio mínimo: ${minProduct}</p>
            <p>Productos con título largo: {longitud}</p>
            <p>Precio promedio: $ {avgPrice}</p>
            <p>Stock mayor a 50: {stockOver50}</p>
            <p>Rating mayor a 4.5: {ratingOver45}</p>

            <h3 className="font-semibold mt-4">Cantidad por categoría:</h3>
            <ul>
              {productosPorCategoria.map((cat, i) => (
                <li key={i}>{cat.categoria}: {cat.cantidad}</li>
              ))}
            </ul>

            <h3 className="font-semibold mt-4">Precio promedio por categoría:</h3>
            <ul>
              {precioPromedioPorCategoria.map((cat, i) => (
                <li key={i}>{cat.categoria}: ${cat.promedio}</li>
              ))}
            </ul>

            <h3 className="font-semibold mt-4">Extremos por categoría:</h3>
            <ul>
              {extremosPorCategoria.map((cat, i) => (
                <li key={i}>
                  {cat.categoria}: Máx ${cat.maxPrecio} / Mín ${cat.minPrecio}
                </li>
              ))}
            </ul>

            <h3 className="font-semibold mt-4">Rating promedio general:</h3>
            <p>{promedioRatingGeneral}</p>

            <h3 className="font-semibold mt-4">Rating promedio por categoría:</h3>
            <ul>
              {promedioRatingPorCategoria.map((cat, i) => (
                <li key={i}>{cat.categoria}: {cat.promedio}</li>
              ))}
            </ul>
          </div>
        )}
      </>
    );
}
export default Estadisticas; 