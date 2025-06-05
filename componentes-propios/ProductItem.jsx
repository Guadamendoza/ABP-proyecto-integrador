import React from 'react'
function ProductItem ({title, price, category, stock}) {

    return (
        <div>
            <h2 className="text-lg font-semibold mb-2">{title}</h2>
            <p className="text-gray-700 font-medium">${price}</p>
            <p>Stock: {stock}</p>
            <p>Categoría: {category}</p>
        </div>
    );

}

export default ProductItem;