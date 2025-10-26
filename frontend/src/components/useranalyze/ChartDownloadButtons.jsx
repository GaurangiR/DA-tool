import html2canvas from "html2canvas";
import { useTranslation } from "react-i18next";

export function Download2DChartButton({ chartRef }) {
  const { t } = useTranslation();

  const handle2DownloadChart = async () => {
    if (!chartRef.current) return;
    const canvas = await html2canvas(chartRef.current, {
      backgroundColor: "#ffffff",
      useCORS: true,
    });
    const link = document.createElement("a");
    link.download = "chart.png";
    link.href = canvas.toDataURL("image/png");
    link.click();
  };

  return (
    <button
      onClick={handle2DownloadChart}
      className="mb-6 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
    >
      {t("analyze.download2D")}
    </button>
  );
}

export function Download3DChartButton({ canvasRef }) {
  const { t } = useTranslation();

  const handle3Download = () => {
    if (!canvasRef.current) return;
    const link = document.createElement("a");
    link.download = "3d_chart.png";
    link.href = canvasRef.current.toDataURL("image/png");
    link.click();
  };

  return (
    <button
      onClick={handle3Download}
      className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
    >
      {t("analyze.download3D")}
    </button>
  );
}
