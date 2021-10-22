import React, { useState, useEffect } from 'react';
import oppositeHex from './utils';

const SingleColor = ({ rgb, weight, hexColor, index }) => {
  const [isAlert, setIsAlert] = useState(false);
  const bcg = rgb.join(',');
  const oppHex = oppositeHex(...rgb);
  const hexValue = `#${hexColor}`;

  useEffect(() => {
    const timeout = setTimeout(() => {
      setIsAlert(false);
    }, 3000);
    return () => {
      clearTimeout(timeout);
    };
  }, [alert]);

  return (
    <article
      className={`color ${index > 10 && 'color-light'}`}
      style={{ backgroundColor: `rgb(${bcg})` }}
      onClick={() => {
        setIsAlert(true);
        navigator.clipboard.writeText(hexValue);
      }}
    >
      {/* With white and black color */}
      <p className="percent-value">{weight}%</p>
      <p className="color-value">#{hexValue}</p>

      {/* With opposite color */}
      {/* <p className="percent-value" style={{ color: `#${oppHex}` }}>
        {weight}%
      </p>
      <p className="color-value" style={{ color: `#${oppHex}` }}>
        #{hexColor}
      </p> */}
      {isAlert && <p className="alert">coppied to clipboard</p>}
    </article>
  );
};

export default SingleColor;
