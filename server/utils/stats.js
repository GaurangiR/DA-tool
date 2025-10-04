export const linearRegression = (x, y) => {
  const n = x.length;
  const meanX = x.reduce((a, b) => a + b, 0) / n;
  const meanY = y.reduce((a, b) => a + b, 0) / n;

  let num = 0;
  let den = 0;

  for (let i = 0; i < n; i++) {
    num += (x[i] - meanX) * (y[i] - meanY);
    den += (x[i] - meanX) ** 2;
  }

  const slope = num / den;
  const intercept = meanY - slope * meanX;

  const ssTot = y.reduce((sum, yi) => sum + (yi - meanY) ** 2, 0);
  const ssRes = y.reduce((sum, yi, i) => {
    const predicted = slope * x[i] + intercept;
    return sum + (yi - predicted) ** 2;
  }, 0);

  const rSquared = 1 - ssRes / ssTot;

  return { slope, intercept, rSquared };
};

// 🔥 Add this helper!
export const getTrendDirection = (slope) => {
  if (slope > 0.01) return "increasing";
  if (slope < -0.01) return "decreasing";
  return "stable";
};