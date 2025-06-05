import React from 'react'
import { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import './App.css';


// importando componentes propios 
import ProductList from './components/ProductList.jsx';
import Stats from './components/Stats.jsx';
import SearchBar from './components/SearchBar.jsx';
import FiltroCatyOrd from './components/FiltroCatyOrd.jsx';
import Estadisticas from './components/Estadisticas.jsx';
import TailwindSats from './components/TailwindStats.jsx';


function App() {
  //estados
  const [products, setProducts] = useState([]);
  const [term, setTerm] = useState('');
  const [darkMode, setDarkMode] = useState(false); 
  const [categoria, setCategoria] = useState("");
  const [ordenamiento, setOrdenamiento] = useState(""); 


  


  //referencias 
  const containerRef = useRef (null);
  

  // llamada a la API y lo que quiero hacer con la respuesta o la acción que se realice después de tener los productos
  useEffect(() => { 
    axios.get("https://dummyjson.com/products")
         .then(res => { setProducts(res.data.products) }); // Toda la data va a ser alojada en el estado
  }, []);

  // Filtrar los productos 
  const filteredProducts = products.filter(product =>
    product.title.toLowerCase().includes(term.toLowerCase()) //filtro por nombre
    && (categoria === "" || product.category.toLowerCase().includes(categoria.toLowerCase())) // Filtro por categoría
  );

  // Ordenar los productos segun el precio 
  
  if (ordenamiento === 'price-asc') {
  filteredProducts.sort((a, b) => a.price - b.price);
} else if (ordenamiento === 'price-desc') {
  filteredProducts.sort((a, b) => b.price - a.price);
} else if (ordenamiento === 'rating-asc') {
  filteredProducts.sort((a, b) => a.rating - b.rating);
} else if (ordenamiento === 'rating-desc') {
  filteredProducts.sort((a, b) => b.rating - a.rating);
}
 

 
  // Función para cambiar el modo oscuro
const toggleDarkMode = () => {
  setDarkMode(!darkMode); // Cambia el estado de darkMode al valor contrario
  console.log(containerRef.current.classList.toggle("dark-mode"));
}

  
  return (

    <div ref={containerRef} className ="app"> 
      <h1 className="text-2xl font-bold mb-4 text-center">Lista de productos</h1>

      <button onClick={toggleDarkMode}
       >Modo{darkMode? " Claro":" Oscuro"}</button> 

     
     <SearchBar term= {term} setTerm = {setTerm}/>

     {/* Componente propio para filtrar por categoría */}
      <FiltroCatyOrd
  categoria={categoria} setCategoria={setCategoria} ordenamiento={ordenamiento} setOrdenamiento={setOrdenamiento}
/>


   {/* componente propio para mostrar los productos */}
   <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
      <ProductList products={filteredProducts} />
      </div>

    {/*componente propio para mostrar las estaditicas*/}

     <div className="bg-gray-100 dark:bg-gray-800 rounded-lg p-4 mt-6">
  <Estadisticas filteredProducts={filteredProducts} />
</div>

{/*componente propio para mostrar estadisticas con estilos de tailwind*/}
<TailwindSats/>


    </div>
  );
}

export default App;
