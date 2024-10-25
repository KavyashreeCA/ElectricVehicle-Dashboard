import React from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale } from 'chart.js';

// Register necessary components
ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale);

const Visualizations = ({ data }) => {
  console.log("Data received in Visualizations:", data);
  // Check if data is defined and is an array
  if (!Array.isArray(data) || data.length === 0) {
    return <div></div>;
  }

  // Calculate the count of each vehicle make
  const makeCount = data.reduce((acc, curr) => {
    if (curr.Make) {  // Ensure Make is defined
      acc[curr.Make] = (acc[curr.Make] || 0) + 1;
    }
    return acc;
  }, {});

  // Prepare chart data
  const chartData = {
    labels: Object.keys(makeCount),
    datasets: [
      {
        label: 'Number of Vehicles',
        data: Object.values(makeCount),
        backgroundColor: 'rgba(75, 192, 192, 0.6)',
      },
    ],
  };

  return (
    <div>
      <h2>Vehicle Make Distribution</h2>
      <div style={{ width: '100%', height: '400px' }}> {/* Ensure there is space for the chart */}
        <Bar data={chartData} />
      </div>
    </div>
  );
};

export default Visualizations;
