const SettingsInput = ({ type, name, value, onChange, placeholder, readOnly = false }) => (
  <input
    type={type}
    name={name}
    value={value}
    onChange={onChange}
    placeholder={placeholder}
    readOnly={readOnly}
    className={`w-full p-2 rounded-lg border ${
      readOnly ? "bg-gray-100 border-gray-300" : "border-blue-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
    }`}
    required={!readOnly}
  />
);

export default SettingsInput;
