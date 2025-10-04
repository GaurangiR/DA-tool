import FileSelector from "../useranalyze/FileSelector";
import AxisSelector from "../useranalyze/AxisSelector";
import ChartTypeSelector from "../useranalyze/ChartTypeSelector";
import { motion } from "framer-motion";

export default function FileAndAxisSelectors({
  files,
  selectedFileId,
  setSelectedFileId,
  localFile,
  fileData,
  xAxis,
  yAxis,
  setXAxis,
  setYAxis,
  chartType,
  setChartType,
  fadeUp,
}) {
  return (
    <>
      <motion.div variants={fadeUp} custom={0.2}>
        <FileSelector
          files={files}
          selectedFileId={selectedFileId}
          setSelectedFileId={setSelectedFileId}
          isLocal={!!localFile}
        />
      </motion.div>

      {fileData && (
        <>
          <motion.div variants={fadeUp} custom={0.3}>
            <AxisSelector
              headers={fileData.headers}
              xAxis={xAxis}
              yAxis={yAxis}
              setXAxis={setXAxis}
              setYAxis={setYAxis}
            />
          </motion.div>

          <motion.div variants={fadeUp} custom={0.4}>
            <ChartTypeSelector
              chartType={chartType}
              setChartType={setChartType}
            />
          </motion.div>
        </>
      )}
    </>
  );
}
