import React from 'react';

const ColoredBlock = ({ color, width, height }) => {
  const blockStyle = {
    backgroundColor: color,
    width: width || '100px', // Default width if not provided
    height: height || '100px', // Default height if not provided
    borderRadius: '2px'
  };

  return <div style={blockStyle}></div>;
};

export default ColoredBlock;