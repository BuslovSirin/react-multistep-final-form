import React, { useState } from "react";
import { Field } from "react-final-form";

const WizardPage = ({ children }) => {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        width: "40%",
        alignItems: "center",
        margin: "auto",
        gap: "1rem",
      }}
    >
      {children}
    </div>
  );
};

export default WizardPage;
