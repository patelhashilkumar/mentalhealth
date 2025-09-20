'use client';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useKeyPress } from '@/hooks/use-key-press';
import { Button } from './ui/button';
import { cn } from '@/lib/utils';
import { ArrowUp, ArrowDown, ArrowLeft, ArrowRight, Award } from 'lucide-react';

const affirmations = [
  'You are capable of amazing things.',
  'Your calm mind is your ultimate weapon.',
  'You are resilient, strong, and brave.',
  'Every day is a new opportunity to grow.',
  'You are in control of your thoughts and feelings.',
  'Breathing in, you feel calm. Breathing out, you release tension.',
];

const BOARD_WIDTH = 9;
const BOARD_HEIGHT = 9;
const CELL_SIZE = 40;

const MindfulMaze = () => {
  const [playerPos, setPlayerPos] = useState({ x: 1, y: 7 });
  const [goalPos] = useState({ x: 7, y: 6 });
  const [isFinished, setIsFinished] = useState(false);
  const [affirmation, setAffirmation] = useState('');

  const arrowUp = useKeyPress('ArrowUp');
  const arrowDown = useKeyPress('ArrowDown');
  const arrowLeft = useKeyPress('ArrowLeft');
  const arrowRight = useKeyPress('ArrowRight');

  useEffect(() => {
    if (isFinished) return;
    if (arrowUp) move('up');
    if (arrowDown) move('down');
    if (arrowLeft) move('left');
    if (arrowRight) move('right');
  }, [arrowUp, arrowDown, arrowLeft, arrowRight, isFinished]);

  const move = (direction: 'up' | 'down' | 'left' | 'right') => {
    if (isFinished) return;
    setPlayerPos(prevPos => {
      const newPos = { ...prevPos };
      if (direction === 'up') newPos.y--;
      if (direction === 'down') newPos.y++;
      if (direction === 'left') newPos.x--;
      if (direction === 'right') newPos.x++;

      // Wall collision check
      if (
        newPos.y < 0 ||
        newPos.y >= BOARD_HEIGHT ||
        newPos.x < 0 ||
        newPos.x >= BOARD_WIDTH
      ) {
        return prevPos;
      }

      if (newPos.x === goalPos.x && newPos.y === goalPos.y) {
        setIsFinished(true);
        setAffirmation(
          affirmations[Math.floor(Math.random() * affirmations.length)]
        );
      }
      return newPos;
    });
  };

  const restartGame = () => {
    setPlayerPos({ x: 1, y: 7 });
    setIsFinished(false);
  };

  return (
    <div className="flex flex-col items-center gap-6">
      <p className="text-muted-foreground">
        Use arrow keys or buttons to find the exit.
      </p>
      <div
        className="relative bg-card p-2 rounded-lg shadow-inner"
        style={{
          width: CELL_SIZE * BOARD_WIDTH + 4,
          height: CELL_SIZE * BOARD_HEIGHT + 4,
        }}
      >
        <AnimatePresence>
          {isFinished && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              className="absolute inset-0 bg-background/80 z-10 flex flex-col items-center justify-center p-4 text-center rounded-lg"
            >
              <Award className="w-16 h-16 text-primary mb-4" />
              <h2 className="text-2xl font-bold mb-2">Congratulations!</h2>
              <p className="text-muted-foreground mb-6">{affirmation}</p>
              <Button onClick={restartGame}>Play Again</Button>
            </motion.div>
          )}
        </AnimatePresence>
        <div
          className="relative bg-black rounded-md"
          style={{
            width: '100%',
            height: '100%',
          }}
        >
          {/* Goal */}
          <div
            className="absolute bg-muted rounded-full"
            style={{
              width: 32,
              height: 32,
              left: goalPos.x * CELL_SIZE + (CELL_SIZE - 32) / 2,
              top: goalPos.y * CELL_SIZE + (CELL_SIZE - 32) / 2,
            }}
          />

          {/* Player */}
          <motion.div
            className="absolute bg-primary rounded-full shadow-lg"
            animate={{
              x: playerPos.x * CELL_SIZE + (CELL_SIZE - 32) / 2,
              y: playerPos.y * CELL_SIZE + (CELL_SIZE - 32) / 2,
            }}
            transition={{ type: 'spring', stiffness: 500, damping: 30 }}
            style={{
              width: 32,
              height: 32,
            }}
          />
        </div>
      </div>
      <div className="flex flex-col items-center gap-2">
        <Button
          variant="outline"
          className="p-4 h-auto"
          onClick={() => move('up')}
        >
          <ArrowUp />
        </Button>
        <div className="flex gap-2">
          <Button
            variant="outline"
            className="p-4 h-auto"
            onClick={() => move('left')}
          >
            <ArrowLeft />
          </Button>
          <Button
            variant="outline"
            className="p-4 h-auto"
            onClick={() => move('down')}
          >
            <ArrowDown />
          </Button>
          <Button
            variant="outline"
            className="p-4 h-auto"
            onClick={() => move('right')}
          >
            <ArrowRight />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default MindfulMaze;
