import React, { useEffect, useState } from "react";

const Toast = ({ type, message, onClose }) => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    setVisible(true);
    const timer = setTimeout(() => {
      setVisible(false);
      setTimeout(onClose, 3000);
    }, 3000);
    return () => clearTimeout(timer);
  }, [onClose]);

  const customClass = type === "error" ? "toast-error" : "toast-success";

  return (
    <div
      className={`position-fixed top-0 end-0 mt-4 me-4 text-white px-4 py-3 rounded shadow ${customClass}`}
      style={{
        zIndex: 9999,
        left: visible ? "15px" : "-350px",
        bottom: "20px",
        minWidth: "250px",
        maxWidth: "300px",
        wordWrap: "break-word",
        fontWeight: "500",
        fontSize: "15px",
        boxShadow: "0 4px 12px rgba(0, 0, 0, 0.15)",
        transition: "left 0.4s ease-in-out",
      }}
    >
      {message}
    </div>
  );
};

export default Toast;
