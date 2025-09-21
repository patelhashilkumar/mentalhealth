
'use client';
import React, { useState, useEffect, useRef, useCallback } from 'react';
import {
  ArrowUp,
  ArrowDown,
  ArrowLeft,
  ArrowRight,
  RotateCw,
} from 'lucide-react';
import { Button } from './ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from './ui/card';

const GRID_SIZE = 20;
const CANVAS_WIDTH = 500;
const CANVAS_HEIGHT = 500;
const CELL_SIZE = CANVAS_WIDTH / GRID_SIZE;

const getRandomCoordinate = (snake: { x: number; y: number }[]) => {
  let coordinate;
  do {
    coordinate = {
      x: Math.floor(Math.random() * GRID_SIZE),
      y: Math.floor(Math.random() * GRID_SIZE),
    };
  } while (snake.some(segment => segment.x === coordinate.x && segment.y === coordinate.y));
  return coordinate;
};

const SnakeGame: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [snake, setSnake] = useState([{ x: 10, y: 10 }]);
  const [food, setFood] = useState(getRandomCoordinate(snake));
  const [obstacles] = useState([
    { x: 5, y: 5 },
    { x: 15, y: 15 },
    { x: 5, y: 15 },
    { x: 15, y: 5 },
  ]);
  const [direction, setDirection] = useState({ x: 0, y: -1 });
  const [speed, setSpeed] = useState<number | null>(200);
  const [gameOver, setGameOver] = useState(false);
  const [score, setScore] = useState(0);

  const resetGame = useCallback(() => {
    const initialSnake = [{ x: 10, y: 10 }];
    setSnake(initialSnake);
    setFood(getRandomCoordinate(initialSnake));
    setDirection({ x: 0, y: -1 });
    setSpeed(200);
    setGameOver(false);
    setScore(0);
  }, []);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      switch (e.key) {
        case 'ArrowUp':
          if (direction.y === 0) setDirection({ x: 0, y: -1 });
          break;
        case 'ArrowDown':
          if (direction.y === 0) setDirection({ x: 0, y: 1 });
          break;
        case 'ArrowLeft':
          if (direction.x === 0) setDirection({ x: -1, y: 0 });
          break;
        case 'ArrowRight':
          if (direction.x === 0) setDirection({ x: 1, y: 0 });
          break;
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [direction]);

  useEffect(() => {
    if (gameOver) {
      setSpeed(null);
      return;
    }

    const gameInterval = setInterval(() => {
      setSnake(prevSnake => {
        const newSnake = [...prevSnake];
        const head = { ...newSnake[0] };
        head.x += direction.x;
        head.y += direction.y;

        // Wall collision
        if (head.x < 0 || head.x >= GRID_SIZE || head.y < 0 || head.y >= GRID_SIZE) {
          setGameOver(true);
          return prevSnake;
        }

        // Self collision
        for (const segment of newSnake) {
          if (head.x === segment.x && head.y === segment.y) {
            setGameOver(true);
            return prevSnake;
          }
        }
        
        // Obstacle collision
        for (const obstacle of obstacles) {
            if (head.x === obstacle.x && head.y === obstacle.y) {
              setGameOver(true);
              return prevSnake;
            }
        }

        newSnake.unshift(head);

        // Food collision
        if (head.x === food.x && head.y === food.y) {
          setScore(s => s + 10);
          setFood(getRandomCoordinate(newSnake));
        } else {
          newSnake.pop();
        }

        return newSnake;
      });
    }, speed ?? undefined);

    return () => clearInterval(gameInterval);
  }, [snake, direction, speed, gameOver, food, obstacles]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
    
    // Draw grid
    ctx.strokeStyle = 'hsl(var(--border) / 0.1)';
    for (let i = 0; i < GRID_SIZE; i++) {
        for (let j = 0; j < GRID_SIZE; j++) {
            ctx.strokeRect(i * CELL_SIZE, j * CELL_SIZE, CELL_SIZE, CELL_SIZE);
        }
    }

    // Draw snake
    ctx.fillStyle = 'hsl(var(--primary))';
    snake.forEach(segment => {
      ctx.fillRect(segment.x * CELL_SIZE, segment.y * CELL_SIZE, CELL_SIZE, CELL_SIZE);
    });

    // Draw food
    ctx.fillStyle = 'hsl(var(--destructive))';
    ctx.beginPath();
    ctx.arc(food.x * CELL_SIZE + CELL_SIZE / 2, food.y * CELL_SIZE + CELL_SIZE / 2, CELL_SIZE / 2.5, 0, 2 * Math.PI);
    ctx.fill();
    
    // Draw obstacles
    ctx.fillStyle = 'hsl(var(--muted-foreground))';
    obstacles.forEach(obstacle => {
        ctx.fillRect(obstacle.x * CELL_SIZE, obstacle.y * CELL_SIZE, CELL_SIZE, CELL_SIZE);
    });

  }, [snake, food, obstacles]);

  return (
    <div className="flex flex-col items-center gap-4">
        <p className="text-xl font-bold text-foreground">Score: {score}</p>
      <Card className="p-2 border-4 border-primary/20 shadow-lg bg-card overflow-hidden">
        <CardContent className="p-0 relative">
          <canvas
            ref={canvasRef}
            width={CANVAS_WIDTH}
            height={CANVAS_HEIGHT}
            className="rounded-md bg-background"
          />
          {gameOver && (
            <div className="absolute inset-0 bg-background/80 flex items-center justify-center">
              <Card className="text-center animate-in fade-in-50">
                <CardHeader>
                  <CardTitle>Game Over</CardTitle>
                  <CardDescription>Your score: {score}</CardDescription>
                </CardHeader>
                <CardContent>
                  <Button onClick={resetGame}>
                    <RotateCw className="mr-2 h-4 w-4" />
                    Play Again
                  </Button>
                </CardContent>
              </Card>
            </div>
          )}
        </CardContent>
      </Card>
      
      {!gameOver && (
        <div className="flex flex-col items-center gap-2">
          <Button size="icon" onClick={() => direction.y === 0 && setDirection({ x: 0, y: -1 })}>
            <ArrowUp />
          </Button>
          <div className="flex gap-2">
            <Button size="icon" onClick={() => direction.x === 0 && setDirection({ x: -1, y: 0 })}>
              <ArrowLeft />
            </Button>
            <Button size="icon" onClick={() => direction.y === 0 && setDirection({ x: 0, y: 1 })}>
              <ArrowDown />
            </Button>
            <Button size="icon" onClick={() => direction.x === 0 && setDirection({ x: 1, y: 0 })}>
              <ArrowRight />
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default SnakeGame;
