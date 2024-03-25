import React from "react";

const Button = ({ children, textOnly = false, className = "", ...props }) => {
  const cssClasses = `${textOnly ? "text-button" : "button"} ${className}`;
  return (
    <button className={cssClasses} {...props}>
      {children}
    </button>
  );
};

export default Button;
