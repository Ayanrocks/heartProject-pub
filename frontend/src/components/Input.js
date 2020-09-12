import React from "react";

export default function Input({ type, title, onChange }) {
  return <input className="inputBar" type={type.toLowerCase()} placeholder={`Enter your ${title}`} onChange={onChange}/>;
}
