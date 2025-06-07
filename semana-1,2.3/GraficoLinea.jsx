import React from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

function GraficoLinea() {
  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Evolución de precios',
      },
    },
  };

  const labels = [
    'Enero', 'Febrero', 'Marzo', 'Abril',
    'Mayo', 'Junio', 'Julio', 'Agosto',
    'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'
  ];

  // Genera números entre -1000 y 1000
  const randomNumbers = () => labels.map(() =>
    parseFloat(((Math.random() * 2000) - 1000).toFixed(2)) //esto crea datos simulados 
  );

  const data = {
    labels,
    datasets: [
      {
        label: 'Producto A',
        data: randomNumbers(),
        borderColor: 'rgb(255, 99, 132)',
        backgroundColor: 'rgba(255, 99, 132, 0.5)',
      },
      {
        label: 'Producto B',
        data: randomNumbers(),
        borderColor: 'rgb(53, 162, 235)',
        backgroundColor: 'rgba(53, 162, 235, 0.5)',
      },
    ],
  };

  return (
    <div className="flex justify-center mt-6">
      <div style={{ width: '500px', height: '300px' }}>
        <Line options={options} data={data} />
      </div>
    </div>
  );
}

export default GraficoLinea;
