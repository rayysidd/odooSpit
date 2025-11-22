export function formatDate(dateInput, options = {}) {
  if (!dateInput) return '';
  const date = typeof dateInput === 'string' ? new Date(dateInput) : dateInput;

  const defaultOptions = {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  };

  return date.toLocaleDateString(undefined, { ...defaultOptions, ...options });
}

// Example usage:
// formatDate('2025-11-22') -> "Nov 22, 2025"
// formatDate(new Date(), { weekday: 'short' }) -> "Sat, Nov 22, 2025"
