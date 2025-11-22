import { Line } from 'react-chartjs-2';
import PropTypes from 'prop-types';
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

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

export default function InventoryChart({ data, options, className = '' }) {
  return (
    <div className={`bg-gray-800 p-4 rounded shadow ${className}`}>
      <Line data={data} options={options} />
    </div>
  );
}

InventoryChart.propTypes = {
  data: PropTypes.object.isRequired,
  options: PropTypes.object,
  className: PropTypes.string,
};
