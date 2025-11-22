import PropTypes from 'prop-types';

export default function Alert({ type = 'info', message, onClose }) {
  const colorClasses = {
    info: 'bg-blue-100 text-blue-800 border-blue-500',
    success: 'bg-green-100 text-green-800 border-green-500',
    warning: 'bg-yellow-100 text-yellow-800 border-yellow-500',
    error: 'bg-red-100 text-red-800 border-red-500',
  };

  return (
    <div
      className={`border-l-4 p-4 mb-4 ${colorClasses[type]} flex justify-between items-center`}
      role="alert"
    >
      <span>{message}</span>
      {onClose && (
        <button
          onClick={onClose}
          aria-label="Close alert"
          className="font-bold text-xl leading-none focus:outline-none ml-4"
        >
          &times;
        </button>
      )}
    </div>
  );
}

Alert.propTypes = {
  type: PropTypes.oneOf(['info', 'success', 'warning', 'error']),
  message: PropTypes.string.isRequired,
  onClose: PropTypes.func,
};
