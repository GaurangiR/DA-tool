import { useLocalFile } from "../../context/LocalFileContext";
import { useTranslation } from "react-i18next";

function FileSelector({ files, selectedFileId, setSelectedFileId, isLocal }) {
  const { t } = useTranslation();
  const { localFile } = useLocalFile();

  return (
    <div className="mb-6">
      <label className="font-medium text-gray-700">{t("analyze.selectFile")}</label>
      <select
        value={selectedFileId || (isLocal ? "local" : "")}
        onChange={(e) => setSelectedFileId(e.target.value)}
        className="w-full border mt-2 px-3 py-2 rounded"
      >
        <option value="">{t("analyze.chooseFilePlaceholder")}</option>

        {localFile && (
          <option value="local">
            ({t("analyze.local")}) {localFile.fileName}
          </option>
        )}

        {files.map((file) => (
          <option key={file._id} value={file._id}>
            {file.fileName}
          </option>
        ))}
      </select>
    </div>
  );
}

export default FileSelector;
