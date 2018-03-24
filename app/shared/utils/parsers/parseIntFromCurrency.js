export default function parseIntFromCurrency(currencyString) {
  if (typeof currencyString === 'number') {
    return currencyString;
  }

  if (!currencyString || typeof currencyString !== 'string') {
    return 0;
  }

  return parseInt(currencyString.replace(/[^0-9.-]+/g, ''), 10);
}
