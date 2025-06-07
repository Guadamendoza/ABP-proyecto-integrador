import React from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Pie } from 'react-chartjs-2';

ChartJS.register(ArcElement, Tooltip, Legend);
const GraficoTorta = ({ filteredProducts }) => {
  const stockOver50 = filteredProducts.filter(p => p.stock > 50).length;
  const stock50OrLess = filteredProducts.filter(p => p.stock <= 50).length;

  const data = {
    labels: ["stock > 50", "stock <= 50"],
    datasets: [
      {
        label: 'Proporcion de productos por stock',
        data: [stockOver50, stock50OrLess],
        backgroundColor: [
          'rgba(255, 99, 132, 0.2)',
          'rgba(54, 162, 235, 0.2)',
          'rgba(255, 206, 86, 0.2)',
          'rgba(75, 192, 192, 0.2)',
          'rgba(153, 102, 255, 0.2)',
          'rgba(255, 159, 64, 0.2)',
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)',
          'rgba(255, 159, 64, 1)',
        ],
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
  };

  return (
      <div style={{ width: '250px', height: '250px' }}>
        <h3 className="font-semibold mt-4">Proporción de productos por stock:</h3>
        <Pie data={data} options={options} />
      </div>
  );
};

export default GraficoTorta;

