import {
  Bar,
  Line,
  Pie,
  Doughnut,
  Radar,
  PolarArea,
  Scatter,
  Bubble,
} from "react-chartjs-2";

function ChartRenderer({ fileData, xAxis, yAxis, chartType, isSmall = false }) {
  if (!fileData || !xAxis || !yAxis || chartType === "none") return null;

  const canRenderChart = (chartType, xAxis, yAxis) => {
    if (chartType === "none") return true;
    if (!xAxis || !yAxis) return false;
    if (
      (chartType === "pie" || chartType === "doughnut") &&
      yAxis !== "numeric"
    ) {
      return false;
    }
    return true;
  };

  const labels = fileData.data.map((row) => row[xAxis]);
  const values = fileData.data.map((row) => row[yAxis]);

  const data = {
    labels,
    datasets: [
      {
        label: `${yAxis} by ${xAxis}`,
        data: values,
        backgroundColor: "#42A5F5",
        borderColor: "#1E88E5",
        borderWidth: 2,
        fill: chartType === "area" || chartType === "line",
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { position: "top" },
    },
  };

  if (!canRenderChart(chartType, xAxis, yAxis)) {
    return (
      <div className="text-gray-500">
        {`Cannot render a ${chartType} chart with the selected axes. Please choose a different chart type or axes.`}
      </div>
    );
  }

  const chartWrapper = (chartComponent) => (
    <div className="w-full max-w-full overflow-x-auto">
      <div
        className={`${
          isSmall
            ? "w-[200px] h-[150px] md:w-[300px] md:h-[200px]"
            : "w-[200px] md:w-[450px] lg:w-[800px] h-[300px] sm:h-[350px] md:h-[400px] lg:h-[500px]"
        }`}
      >
        {chartComponent}
      </div>
    </div>
  );

  switch (chartType) {
    case "bar":
      return chartWrapper(<Bar data={data} options={options} />);
    case "line":
      return chartWrapper(<Line data={data} options={options} />);
    case "area":
      return chartWrapper(
        <Line
          data={data}
          options={{
            ...options,
            elements: { line: { tension: 0.4 }, point: { radius: 3 } },
          }}
        />
      );
    case "pie":
      return chartWrapper(<Pie data={data} options={options} />);
    case "doughnut":
      return chartWrapper(<Doughnut data={data} options={options} />);
    case "polar":
      return chartWrapper(<PolarArea data={data} options={options} />);
    case "radar":
      return chartWrapper(<Radar data={data} options={options} />);
    case "scatter":
      return chartWrapper(
        <Scatter
          data={{
            datasets: [
              {
                label: `${yAxis} vs ${xAxis}`,
                data: fileData.data.map((row) => ({
                  x: row[xAxis],
                  y: row[yAxis],
                })),
                backgroundColor: "#42A5F5",
                borderColor: "#1E88E5",
              },
            ],
          }}
          options={options}
        />
      );
    case "bubble":
      return chartWrapper(
        <Bubble
          data={{
            datasets: [
              {
                label: `${yAxis} vs ${xAxis}`,
                data: fileData.data.map((row) => ({
                  x: row[xAxis],
                  y: row[yAxis],
                  r: 5,
                })),
                backgroundColor: "#42A5F5",
                borderColor: "#1E88E5",
              },
            ],
          }}
          options={options}
        />
      );
    case "funnel":
      return chartWrapper(
        <Bar
          data={{
            labels: labels,
            datasets: [
              {
                label: `${yAxis} by ${xAxis}`,
                data: values,
                funnel: { dynamicHeight: true },
                backgroundColor: [
                  "#42A5F5",
                  "#64B5F6",
                  "#90CAF9",
                  "#BBDEFB",
                  "#E3F2FD",
                ],
              },
            ],
          }}
          options={{
            responsive: true,
            maintainAspectRatio: false,
            indexAxis: "y",
            plugins: { legend: { display: false } },
          }}
        />
      );
    case "waterfall":
      const cumulative = [];
      const deltas = [];
      let runningTotal = 0;
      values.forEach((val) => {
        cumulative.push(runningTotal);
        deltas.push(val);
        runningTotal += val;
      });

      return chartWrapper(
        <Bar
          data={{
            labels: labels,
            datasets: [
              {
                label: "Base",
                data: cumulative,
                backgroundColor: "transparent",
                stack: "stack1",
              },
              {
                label: "Change",
                data: deltas,
                backgroundColor: "#42A5F5",
                stack: "stack1",
              },
            ],
          }}
          options={{
            responsive: true,
            maintainAspectRatio: false,
            plugins: { legend: { display: false } },
            scales: {
              x: { stacked: true },
              y: { stacked: true },
            },
          }}
        />
      );
    default:
      return chartWrapper(<Bar data={data} options={options} />);
  }
}

export default ChartRenderer;
