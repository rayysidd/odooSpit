import PropTypes from 'prop-types';

export default function StockAlert({ message, type = 'warning', onClose }) {
  const colorClasses = {
    warning: 'bg-yellow-100 text-yellow-800 border-yellow-400',
    info: 'bg-blue-100 text-blue-800 border-blue-400',
    error: 'bg-red-100 text-red-800 border-red-400',
  };

  return (
    <div
      className={`border-l-4 p-4 mb-4 ${colorClasses[type]} flex justify-between items-center rounded`}
      role="alert"
    >
      <span>{message}</span>
      {onClose && (
        <button
          onClick={onClose}
          aria-label="Close alert"
          className="ml-4 font-bold text-xl leading-none focus:outline-none"
        >
          &times;
        </button>
      )}
    </div>
  );
}

StockAlert.propTypes = {
  message: PropTypes.string.isRequired,
  type: PropTypes.oneOf(['warning', 'info', 'error']),
  onClose: PropTypes.func,
};
