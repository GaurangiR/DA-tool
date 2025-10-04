export const detectDataType = (data, key) => {
  const sampleValues = data.map(item => item[key]).filter(Boolean).slice(0, 10);

  const isNumeric = sampleValues.every(val => !isNaN(parseFloat(val)));
  const isDate = sampleValues.every(val => !isNaN(Date.parse(val)));

  if (isDate) return 'date';
  if (isNumeric) return 'numeric';
  return 'categorical';
};

export const suggestChart = (xType, yType) => {
  let suggestedChart = 'bar';
  const alternatives = [];

  if (xType === 'date' && yType === 'numeric') {
    suggestedChart = 'line';
    alternatives.push('area', 'bar');
  } else if (xType === 'categorical' && yType === 'numeric') {
    suggestedChart = 'bar';
    alternatives.push('pie', 'doughnut');
  } else if (xType === 'numeric' && yType === 'numeric') {
    suggestedChart = 'scatter';
    alternatives.push('bubble');
  } else {
    suggestedChart = 'bar';
    alternatives.push('line');
  }

  return { suggestedChart, alternatives };
};
