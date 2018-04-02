export default function formatCurrency(number, options) {
  // default, grouping causes issues
  return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', useGrouping: false, ...options }).format(number);
}
