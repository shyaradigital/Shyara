import React from 'react';

const FancyText = ({ text, weight = 600 }) => (
  <span style={{ color: 'var(--color-primary)', fontWeight: weight }}>{text}</span>
);
 
export default FancyText; 