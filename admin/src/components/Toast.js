import React, { useEffect } from "react";

const Toast = ({ type, message, onClose }) => {
  useEffect(() => {
    const timer = setTimeout(onClose, 3000);
    return () => clearTimeout(timer);
  }, [onClose]);

  const bgColor = type === "error" ? "bg-danger" : "bg-success";

  return (
    <div
      className={`position-fixed top-0 end-0 mt-4 me-4 text-white px-4 py-3 rounded shadow ${bgColor}`}
      style={{
        zIndex: 9999,
        left: "15px",
        bottom: "20px",
        minWidth: "250px",
        maxWidth: "300px",
        wordWrap: "break-word",
        fontWeight: "500",
        fontSize: "15px",
        boxShadow: "0 4px 12px rgba(0, 0, 0, 0.15)",
      }}
    >
      {message}
    </div>
  );
};

export default Toast;
