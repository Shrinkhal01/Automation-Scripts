import React from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const PriceChart = ({ products }) => {
  if (!products || products.length === 0) {
    return (
      <div className="flex justify-center items-center h-64 text-gray-500">
        <div className="text-center">
          <p className="text-lg">No data to display</p>
          <p className="text-sm mt-2">Scrape products to see price comparison</p>
        </div>
      </div>
    );
  }

  // Prepare chart data
  const chartData = {
    labels: products.map(product => {
      // Truncate long product names for better display
      return product.name.length > 15 
        ? product.name.substring(0, 15) + '...' 
        : product.name;
    }),
    datasets: [
      {
        label: 'Price ($)',
        data: products.map(product => product.price),
        backgroundColor: products.map((_, index) => {
          const colors = [
            'rgba(59, 130, 246, 0.8)',   // Blue
            'rgba(16, 185, 129, 0.8)',   // Green
            'rgba(245, 158, 11, 0.8)',   // Yellow
            'rgba(239, 68, 68, 0.8)',    // Red
            'rgba(139, 92, 246, 0.8)',   // Purple
          ];
          return colors[index % colors.length];
        }),
        borderColor: products.map((_, index) => {
          const colors = [
            'rgba(59, 130, 246, 1)',     // Blue
            'rgba(16, 185, 129, 1)',     // Green
            'rgba(245, 158, 11, 1)',     // Yellow
            'rgba(239, 68, 68, 1)',      // Red
            'rgba(139, 92, 246, 1)',     // Purple
          ];
          return colors[index % colors.length];
        }),
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: false,
      },
      tooltip: {
        callbacks: {
          title: function(context) {
            const index = context[0].dataIndex;
            return products[index].name;
          },
          label: function(context) {
            return `Price: $${context.parsed.y.toFixed(2)}`;
          },
          afterLabel: function(context) {
            const index = context.dataIndex;
            const product = products[index];
            return [
              `Description: ${product.description || 'N/A'}`,
              `Scraped: ${new Date(product.scraped_at).toLocaleDateString()}`
            ];
          }
        }
      }
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          callback: function(value) {
            return '$' + value.toFixed(2);
          }
        }
      },
      x: {
        ticks: {
          maxRotation: 45,
          minRotation: 0
        }
      }
    },
  };

  return (
    <div className="h-64 w-full">
      <Bar data={chartData} options={options} />
    </div>
  );
};

export default PriceChart;