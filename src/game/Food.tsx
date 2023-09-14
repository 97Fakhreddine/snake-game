import React from 'react';
import Cell from './Cell';

interface FoodProps {
  food: { x: number; y: number };
}

const Food: React.FC<FoodProps> = ({ food }) => {
  return (
       <Cell
            x={food.x}
            y={food.y}
            size={20} // Adjust the cell size as needed
            color="red" // Adjust the cell color as needed
        />
  );
};

export default Food;
