import React from 'react';

const ThreeDChartSelector = ({ selected3DChartType, setSelected3DChartType }) => {
  return (
    <div className="mb-4">
      <label className="block text-sm font-medium text-gray-700 mb-1">Select 3D Chart Type:</label>
      <select
        className="border border-gray-300 rounded px-3 py-2 w-full"
        value={selected3DChartType}
        onChange={(e) => setSelected3DChartType(e.target.value)}
      >
        <option value="none">None</option>
        <option value="bar3d">3D Bar Chart</option>
        <option value="line3d">3D Line Chart</option>
        <option value="scatter3d">3D Scatter Plot</option>
        <option value="surface3d">3D Surface Plot</option>
      </select>
    </div>
  );
};

export default ThreeDChartSelector;
