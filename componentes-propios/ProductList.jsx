import React from 'react';
import ProductItem from './ProductItem.jsx'; //importando componente propio




function ProductList({ products }) {
  return (
         <section className="text-gray-600 body-font">
      <div className="container px-5 py-10 mx-auto">
        <div className="flex flex-wrap -m-4"></div>
      
      {products.map(p => {

        return (
          <ProductItem
            key={p.id}
            title={p.title} 
            price={p.price}
            category={p.category}
            stock={p.stock}
          />
        );
      })}
      
      {/* Renderización condicional por si no se encuentran productos */}
      {products.length === 0 && <div>No se encontraron productos</div>}
    </div>
    </section>
  );
}

export default ProductList;
