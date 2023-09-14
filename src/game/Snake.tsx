import React from 'react';
import Cell from './Cell';

interface SnakeProps {
  snake: { x: number; y: number }[];
}

const Snake: React.FC<SnakeProps> = ({ snake }) => {
  return (
    <div>
      {/* Render the snake's body */}
      {snake.map((segment, index) => (
        <Cell
            key={index}
            x={segment.x}
            y={segment.y}
            size={20} // Adjust the cell size as needed
            color="green" // Adjust the cell color as needed
        />
        ))}
    </div>
  );
};

export default Snake;
