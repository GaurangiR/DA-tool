import { useTranslation } from "react-i18next";

function ChartTypeSelector({ chartType, setChartType }) {
  const { t } = useTranslation();

  return (
    <div className="mb-4">
      <label className="block mb-2 font-medium">{t("analyze.chartType")}</label>
      <select
        value={chartType}
        onChange={(e) => setChartType(e.target.value)}
        className="w-full border px-3 py-2 rounded"
      >
        <option value="none">{t("analyze.chartTypes.none")}</option>
        <option value="bar">{t("analyze.chartTypes.bar")}</option>
        <option value="line">{t("analyze.chartTypes.line")}</option>
        <option value="area">{t("analyze.chartTypes.area")}</option>
        <option value="pie">{t("analyze.chartTypes.pie")}</option>
        <option value="doughnut">{t("analyze.chartTypes.doughnut")}</option>
        <option value="polar">{t("analyze.chartTypes.polar")}</option>
        <option value="radar">{t("analyze.chartTypes.radar")}</option>
        <option value="scatter">{t("analyze.chartTypes.scatter")}</option>
        <option value="bubble">{t("analyze.chartTypes.bubble")}</option>
        <option value="funnel">{t("analyze.chartTypes.funnel")}</option>
        <option value="waterfall">{t("analyze.chartTypes.waterfall")}</option>
      </select>
    </div>
  );
}

export default ChartTypeSelector;
