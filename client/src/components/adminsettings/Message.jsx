const Message = ({ message }) => {
  if (!message) return null;

  return (
    <p
      className={`text-center mb-4 font-medium text-sm ${
        message.startsWith("✅") ? "text-green-600" : "text-red-600"
      }`}
    >
      {message}
    </p>
  );
};

export default Message;
