import React from 'react'
import './Button.css';

function Button(props) {
  return (
    <>
      <button
        className={`btn ${props.className}`}
        type={props.type}
        onClick={props.onClick}
      >
        {props.name}
      </button>
    </>
  );
}

export default Button;
