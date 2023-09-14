import React, { useState, useEffect, useCallback } from 'react';
import Snake from './Snake';
import Food from './Food';


/**
 * @function SnakeGame
 * The main game component for the Snake game.
 */
const SnakeGame: React.FC = () => {
  // Define game state (snake position, food position, etc.)
  const [snake, setSnake] = useState<{ x: number; y: number }[]>([
    { x: 5, y: 5 }, // Initial snake position
  ]);
  const [food, setFood] = useState<{ x: number; y: number }>({
    x: Math.floor(Math.random() * 20), // Initial food position (random)
    y: Math.floor(Math.random() * 20),
  });
  const [direction, setDirection] = useState<string>('RIGHT'); // Initial direction
  const [gameOver, setGameOver] = useState<boolean>(false);
  const speed = 100; // Snake movement speed in milliseconds

  /**
   * @function handleKeyPress
   * Handles user keyboard input to change the snake's direction.
   * @param {KeyboardEvent} event - The keyboard event.
   */
  const handleKeyPress = (event: KeyboardEvent) => {
    // Handle arrow key presses to set the snake's direction
    switch (event.key) {
      case 'ArrowUp':
        if (direction !== 'DOWN') setDirection('UP');
        break;
      case 'ArrowDown':
        if (direction !== 'UP') setDirection('DOWN');
        break;
      case 'ArrowLeft':
        if (direction !== 'RIGHT') setDirection('LEFT');
        break;
      case 'ArrowRight':
        if (direction !== 'LEFT') setDirection('RIGHT');
        break;
      default:
        break;
    }
  };

 useEffect(() => {
    // Add event listener for arrow key input using useEffect
    window.addEventListener('keydown', handleKeyPress);

    // Start the game loop
    const gameInterval = setInterval(() => {
      updateGame();
    }, speed);

    return () => {
      // Cleanup: Remove event listener and stop the game loop
       window.removeEventListener('keydown', handleKeyPress);
      clearInterval(gameInterval);
    };
  }, [direction,snake]);

  const updateGame = () => {
    if (gameOver) return;

    // Create a new head for the snake based on the current direction
    let newSnake = [...snake];
    let head = { ...newSnake[0] };
    switch (direction) {
      case 'UP':
        head.y -= 1;
        break;
      case 'DOWN':
        head.y += 1;
        break;
      case 'LEFT':
        head.x -= 1;
        break;
      case 'RIGHT':
        head.x += 1;
        break;
      default:
        break;
    }

    // Check if the snake touches itself or the wall
    if (
      head.x < 0 ||
      head.x >= 20 ||
      head.y < 0 ||
      head.y >= 20 ||
      newSnake.some((segment) => segment.x === head.x && segment.y === head.y)
    ) {
      handleGameOver();
      return;
    }

    // Move the snake
    newSnake.unshift(head);

    // Check if the snake eats the food
    if (head.x === food.x && head.y === food.y) {
      // Generate new food position
      const newFood = {
        x: Math.floor(Math.random() * 20),
        y: Math.floor(Math.random() * 20),
      };
      setFood(newFood);
    } else {
      // Remove the tail segment if the snake doesn't eat food
      newSnake.pop();
    }

    setSnake(newSnake);
  };

  const handleGameOver = () => {
    // Handle game over condition
    setGameOver(true);
  };

  return (
    <div>
      <h1>Snake Game</h1>
      {gameOver ? (
        <p>Game Over!</p>
      ) : (
        <div style={{
            display: 'flex',
            justifyContent:'center',
            alignItems: 'center',
            width:'100%',
            flexDirection:'column'
          }}>
          <Snake snake={snake} />
          <Food food={food} />
        </div>
      )}
    </div>
  );
};

export default SnakeGame;
