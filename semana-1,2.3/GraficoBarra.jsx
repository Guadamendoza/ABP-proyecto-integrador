// components/GraficoBarra.jsx
import React from 'react';
import { Bar } from 'react-chartjs-2';
import {Chart as ChartJS,CategoryScale,LinearScale,BarElement,Title,Tooltip,Legend,
} from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const GraficoBarra = ({ filteredProducts }) => {
  // 1. Agrupar productos por categoría
  const productosPorCategoria = filteredProducts.reduce((acc, product) => {
    acc[product.category] = (acc[product.category] || 0) + 1;
    return acc;
  }, {});

  const labels = Object.keys(productosPorCategoria);
  const dataValues = Object.values(productosPorCategoria);

  // 2. Preparar los datos para el gráfico
  const data = {
    labels,
    datasets: [
      {
        label: 'Cantidad de productos',
        data: dataValues,
        backgroundColor: [
          '#ff6384',
          '#36a2eb',
          '#cc65fe',
          '#ffce56',
          '#4bc0c0',
          '#f87171',
        ],
        borderRadius: 6,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Cantidad de productos por categoría',
      },
    },
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };

  return (
    <div>
      <h3 className="font-semibold mt-4">Cantidad por categoría:</h3>
      <ul className="mb-4">
        {labels.map((cat, i) => (
          <li key={i}>
            {cat}: {dataValues[i]}
          </li>
        ))}
      </ul>
      <div style={{ maxWidth: '600px', margin: 'auto' }}>
        <Bar data={data} options={options} />
      </div>
    </div>
  );
};

export default GraficoBarra;
