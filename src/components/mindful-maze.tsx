'use client';
import React, { useState, useEffect, useCallback } from 'react';
import { Button } from './ui/button';
import { ArrowUp, ArrowDown, ArrowLeft, ArrowRight, RefreshCw } from 'lucide-react';
import { Card, CardContent } from './ui/card';
import { cn } from '@/lib/utils';

// Maze generation using recursive backtracking
const generateMaze = (width: number, height: number) => {
  const maze = Array(height)
    .fill(0)
    .map(() => Array(width).fill(1));
  const stack = [[0, 0]];
  maze[0][0] = 0;

  const carve = (cx: number, cy: number) => {
    const directions = [
      [1, 0], // right
      [-1, 0], // left
      [0, 1], // down
      [0, -1], // up
    ];
    // Randomize directions
    directions.sort(() => Math.random() - 0.5);

    for (const [dx, dy] of directions) {
      const nx = cx + dx * 2;
      const ny = cy + dy * 2;

      if (ny >= 0 && ny < height && nx >= 0 && nx < width && maze[ny][nx] === 1) {
        maze[cy + dy][cx + dx] = 0;
        maze[ny][nx] = 0;
        stack.push([nx, ny]);
        carve(nx, ny);
      }
    }
  };
  
  carve(0, 0);

  // Set entrance and exit
  maze[0][0] = 2; // Player start
  maze[height - 1][width - 1] = 3; // Exit

  return maze;
};

const MAZE_WIDTH = 15;
const MAZE_HEIGHT = 15;

const MindfulMaze: React.FC = () => {
  const [maze, setMaze] = useState(generateMaze(MAZE_WIDTH, MAZE_HEIGHT));
  const [playerPos, setPlayerPos] = useState({ x: 0, y: 0 });
  const [isFinished, setIsFinished] = useState(false);

  const movePlayer = useCallback(
    (dx: number, dy: number) => {
      if (isFinished) return;
      const newX = playerPos.x + dx;
      const newY = playerPos.y + dy;

      if (
        newY >= 0 &&
        newY < MAZE_HEIGHT &&
        newX >= 0 &&
        newX < MAZE_WIDTH &&
        maze[newY][newX] !== 1 // Not a wall
      ) {
        setPlayerPos({ x: newX, y: newY });
        if (maze[newY][newX] === 3) {
          setIsFinished(true);
        }
      }
    },
    [playerPos, maze, isFinished]
  );

  const restartGame = () => {
    setMaze(generateMaze(MAZE_WIDTH, MAZE_HEIGHT));
    setPlayerPos({ x: 0, y: 0 });
    setIsFinished(false);
  };
  
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      switch (e.key) {
        case 'ArrowUp':
          movePlayer(0, -1);
          break;
        case 'ArrowDown':
          movePlayer(0, 1);
          break;
        case 'ArrowLeft':
          movePlayer(-1, 0);
          break;
        case 'ArrowRight':
          movePlayer(1, 0);
          break;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [movePlayer]);

  return (
    <div className="flex flex-col items-center gap-4">
      <Card className="p-2 bg-card border-4 border-primary/20 shadow-lg">
        <CardContent className="p-0">
          <div className="grid" style={{ gridTemplateColumns: `repeat(${MAZE_WIDTH}, 1fr)` }}>
            {maze.map((row, y) =>
              row.map((cell, x) => (
                <div
                  key={`${x}-${y}`}
                  className={cn(
                    'w-6 h-6 flex items-center justify-center transition-colors duration-300',
                    cell === 1 && 'bg-secondary', // Wall
                    cell === 0 && 'bg-background', // Path
                    cell === 3 && 'bg-green-500', // Exit
                  )}
                >
                  {playerPos.x === x && playerPos.y === y && (
                    <div className="w-4 h-4 rounded-full bg-primary shadow-lg animate-pulse" />
                  )}
                </div>
              ))
            )}
          </div>
        </CardContent>
      </Card>

      {isFinished && (
        <div className="text-center p-4 rounded-lg bg-primary/20 text-primary-foreground">
          <p className="font-bold text-lg">You found the exit!</p>
          <p>Take a deep breath. You navigated the path.</p>
        </div>
      )}

      <div className="flex flex-col items-center gap-2">
        <Button size="icon" onClick={() => movePlayer(0, -1)} disabled={isFinished}><ArrowUp/></Button>
        <div className="flex gap-2">
            <Button size="icon" onClick={() => movePlayer(-1, 0)} disabled={isFinished}><ArrowLeft/></Button>
            <Button size="icon" onClick={() => movePlayer(0, 1)} disabled={isFinished}><ArrowDown/></Button>
            <Button size="icon" onClick={() => movePlayer(1, 0)} disabled={isFinished}><ArrowRight/></Button>
        </div>
      </div>
      
      <Button onClick={restartGame} variant="outline">
        <RefreshCw className="mr-2"/> New Maze
      </Button>
    </div>
  );
};

export default MindfulMaze;
