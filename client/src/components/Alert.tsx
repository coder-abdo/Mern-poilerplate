import React from "react";
import { IAlert } from "../customTypes";
export const Alert = ({ msg, removeAlert }: IAlert) => {
  return (
    <div className="alert alert-primary mx-5">
      <button type="button" className="close" onClick={removeAlert}>
        &times;
      </button>
      <p>
        <strong>{msg}</strong>
      </p>
    </div>
  );
};
