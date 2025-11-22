import PropTypes from 'prop-types';

export default function ProductDetails({ product }) {
  if (!product) {
    return <p className="text-gray-400 italic">Select a product to see its details.</p>;
  }

  const { name, sku, category, unit, reorderLevel } = product;

  return (
    <div className="bg-gray-800 rounded shadow p-4 text-white max-w-md">
      <h3 className="text-2xl font-semibold mb-3">{name}</h3>
      <dl className="space-y-2">
        <div>
          <dt className="font-medium">SKU Code:</dt>
          <dd>{sku}</dd>
        </div>
        <div>
          <dt className="font-medium">Category:</dt>
          <dd>{category || 'Not specified'}</dd>
        </div>
        <div>
          <dt className="font-medium">Unit:</dt>
          <dd>{unit || 'Not specified'}</dd>
        </div>
        <div>
          <dt className="font-medium">Reorder Level:</dt>
          <dd>{reorderLevel !== undefined ? reorderLevel : 'Not specified'}</dd>
        </div>
      </dl>
    </div>
  );
}

ProductDetails.propTypes = {
  product: PropTypes.shape({
    name: PropTypes.string.isRequired,
    sku: PropTypes.string.isRequired,
    category: PropTypes.string,
    unit: PropTypes.string,
    reorderLevel: PropTypes.number,
  }),
};
