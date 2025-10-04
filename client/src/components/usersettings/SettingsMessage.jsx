const SettingsMessage = ({ message }) =>
  message ? (
    <p className="mb-4 text-sm text-green-600 text-center">{message}</p>
  ) : null;

export default SettingsMessage;
