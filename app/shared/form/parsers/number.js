export default function number(val) {
  const parsedValue = parseInt(val, 10);

  if (isNaN(parsedValue)) {
    return null;
  }

  return parsedValue;
}
