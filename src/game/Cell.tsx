import React from 'react';

interface CellProps {
  x: number;
  y: number;
  size: number;
  color: string;
}

const Cell: React.FC<CellProps> = ({ x, y, size, color }) => {
  return (
    <div
      style={{
        position: 'absolute',
        left: `${x * size}px`,
        top: `${y * size}px`,
        width: `${size}px`,
        height: `${size}px`,
        backgroundColor: color,
      }}
    ></div>
  );
};

export default Cell;
