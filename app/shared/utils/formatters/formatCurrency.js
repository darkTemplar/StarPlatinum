export default function formatCurrency(number, options) {
  // default
  return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', ...options}).format(number);
}
