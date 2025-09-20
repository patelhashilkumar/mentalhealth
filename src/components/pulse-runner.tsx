'use client';
import { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from './ui/button';
import { cn } from '@/lib/utils';
import { Heart, Rabbit, Turtle } from 'lucide-react';

const GAME_WIDTH = 600;
const GAME_HEIGHT = 400;
const PLAYER_SIZE = 40;
const OBSTACLE_WIDTH = 30;
const OBSTACLE_HEIGHT = 60;
const GRAVITY = 1;
const JUMP_IMPULSE = -20;
const PERFECT_INTERVAL = 500; // ms
const INTERVAL_TOLERANCE = 150; // ms

type GameStatus = 'waiting' | 'playing' | 'gameover';

const RhythmIndicator = ({ status }: { status: 'perfect' | 'fast' | 'slow' | 'miss' }) => {
  const statusConfig = {
    perfect: { icon: <Heart className="w-8 h-8 text-green-400" />, text: 'Perfect!', color: 'text-green-400' },
    fast: { icon: <Rabbit className="w-8 h-8 text-yellow-400" />, text: 'Too Fast!', color: 'text-yellow-400' },
    slow: { icon: <Turtle className="w-8 h-8 text-blue-400" />, text: 'Too Slow!', color: 'text-blue-400' },
    miss: { icon: null, text: '', color: '' },
  };

  const { icon, text, color } = statusConfig[status];

  return (
    <AnimatePresence>
      {status !== 'miss' && (
        <motion.div
          key={status + Date.now()}
          initial={{ opacity: 0, y: 20, scale: 0.8 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -20, scale: 0.8, transition: { duration: 0.2 } }}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center gap-2"
        >
          {icon}
          <p className={cn('text-xl font-bold', color)}>{text}</p>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default function PulseRunner() {
  const [status, setStatus] = useState<GameStatus>('waiting');
  const [obstacles, setObstacles] = useState<{ x: number; id: number }[]>([]);
  const [score, setScore] = useState(0);
  const [gameSpeed, setGameSpeed] = useState(5);
  
  const [rhythmDisplay, setRhythmDisplay] = useState<'perfect' | 'fast' | 'slow' | 'miss'>('miss');
  
  // Use refs for game state that changes every frame
  const playerY = useRef(GAME_HEIGHT - PLAYER_SIZE);
  const playerVelY = useRef(0);
  const lastTapTime = useRef(0);
  const rhythmStatus = useRef<'perfect' | 'fast' | 'slow' | 'miss'>('miss');
  const gameLoopRef = useRef<number>();
  const scoreIntervalRef = useRef<NodeJS.Timeout>();

  const [_, setTick] = useState(0);

  const resetGame = useCallback(() => {
    setStatus('waiting');
    playerY.current = GAME_HEIGHT - PLAYER_SIZE;
    playerVelY.current = 0;
    setObstacles([]);
    setScore(0);
    setGameSpeed(5);
    lastTapTime.current = 0;
    rhythmStatus.current = 'miss';
    setRhythmDisplay('miss');
    if (gameLoopRef.current) cancelAnimationFrame(gameLoopRef.current);
    if (scoreIntervalRef.current) clearInterval(scoreIntervalRef.current);
  }, []);

  const handlePulseTap = () => {
    if (status === 'waiting') {
      setStatus('playing');
      lastTapTime.current = Date.now();
      return;
    }
    if (status !== 'playing') return;

    const now = Date.now();
    const interval = now - lastTapTime.current;
    lastTapTime.current = now;

    if (interval < PERFECT_INTERVAL - INTERVAL_TOLERANCE) {
      rhythmStatus.current = 'fast';
      setGameSpeed(prev => Math.min(15, prev + 1));
    } else if (interval > PERFECT_INTERVAL + INTERVAL_TOLERANCE) {
      rhythmStatus.current = 'slow';
      setGameSpeed(prev => Math.max(3, prev - 1));
    } else {
      rhythmStatus.current = 'perfect';
      setGameSpeed(prev => Math.max(5, Math.min(10, prev + (prev < 7 ? 0.5 : -0.5))));
    }

    setRhythmDisplay(rhythmStatus.current);
    setTimeout(() => setRhythmDisplay('miss'), 500);

    // Jump only if on the ground
    if (playerY.current >= GAME_HEIGHT - PLAYER_SIZE) {
      playerVelY.current = JUMP_IMPULSE;
    }
  };

  useEffect(() => {
    const gameLoop = () => {
      if (status !== 'playing') return;

      // --- Physics Update using Refs ---
      playerVelY.current += GRAVITY;
      playerY.current += playerVelY.current;

      if (playerY.current > GAME_HEIGHT - PLAYER_SIZE) {
        playerY.current = GAME_HEIGHT - PLAYER_SIZE;
        playerVelY.current = 0;
      }
      
      setObstacles(prev => {
        const newObstacles = prev
          .map(obs => ({ ...obs, x: obs.x - gameSpeed }))
          .filter(obs => obs.x > -OBSTACLE_WIDTH);
          
        const lastObstacle = newObstacles[newObstacles.length - 1];
        if (!lastObstacle || lastObstacle.x < GAME_WIDTH - 200 - Math.random() * 200) {
          return [...newObstacles, { x: GAME_WIDTH, id: Date.now() }];
        }
        return newObstacles;
      });

      // --- Collision Detection ---
      const playerRect = { x: 50, y: playerY.current, width: PLAYER_SIZE, height: PLAYER_SIZE };
      for (const obs of obstacles) {
        const obsRect = { x: obs.x, y: GAME_HEIGHT - OBSTACLE_HEIGHT, width: OBSTACLE_WIDTH, height: OBSTACLE_HEIGHT };
        if (
          playerRect.x < obsRect.x + obsRect.width &&
          playerRect.x + playerRect.width > obsRect.x &&
          playerRect.y < obsRect.y + obsRect.height &&
          playerRect.y + playerRect.height > obsRect.y
        ) {
          setStatus('gameover');
          return;
        }
      }
      
      // Trigger a re-render
      setTick(tick => tick + 1);

      gameLoopRef.current = requestAnimationFrame(gameLoop);
    };

    if (status === 'playing') {
      scoreIntervalRef.current = setInterval(() => {
        setScore(prev => prev + 1);
      }, 100);
      gameLoopRef.current = requestAnimationFrame(gameLoop);
    } else {
      if (gameLoopRef.current) cancelAnimationFrame(gameLoopRef.current);
      if (scoreIntervalRef.current) clearInterval(scoreIntervalRef.current);
    }

    return () => {
      if (gameLoopRef.current) cancelAnimationFrame(gameLoopRef.current);
      if (scoreIntervalRef.current) clearInterval(scoreIntervalRef.current);
    };
  }, [status, gameSpeed, obstacles]);

  return (
    <div className="flex flex-col items-center gap-4">
       <div
        className="relative w-[600px] h-[400px] bg-black/50 rounded-lg overflow-hidden border-4 border-purple-500 shadow-2xl shadow-purple-500/50"
        style={{
          background: 'radial-gradient(ellipse at bottom, #1b2735 0%, #090a0f 100%)',
        }}
      >
        <AnimatePresence>
          {(status === 'waiting' || status === 'gameover') && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 z-10 flex flex-col items-center justify-center bg-black/60 backdrop-blur-sm"
            >
              <h2 className="text-5xl font-bold text-white mb-2 font-headline">
                {status === 'gameover' ? 'Game Over' : 'PulseRunner'}
              </h2>
              {status === 'gameover' && (
                <p className="text-2xl text-cyan-300 mb-6">Score: {score}</p>
              )}
              <Button onClick={resetGame} size="lg">
                {status === 'gameover' ? 'Try Again' : 'Start Game'}
              </Button>
               <p className="mt-4 text-sm text-gray-400">
                {status === 'waiting'
                  ? 'Tap the PULSE button to jump and find your rhythm.'
                  : 'Find a steady rhythm to run.'}
              </p>
            </motion.div>
          )}
        </AnimatePresence>
        
        <RhythmIndicator status={rhythmDisplay} />

        <div
          className="absolute bottom-0 w-full h-2 bg-gradient-to-r from-pink-500 via-purple-500 to-cyan-500"
        />

        <motion.div
          className="absolute w-10 h-10 rounded-full"
          style={{
            left: 50,
            background: 'radial-gradient(circle, #ff00ff, #ff80ff)',
            boxShadow: '0 0 20px #ff00ff',
          }}
          animate={{ y: playerY.current }}
        />

        {obstacles.map(obs => (
          <div
            key={obs.id}
            className="absolute bottom-0 w-8 h-16 bg-gradient-to-t from-cyan-400 to-blue-500 rounded-t-md"
            style={{
                left: obs.x,
                boxShadow: '0 0 15px #0ff',
            }}
          />
        ))}

        <div className="absolute top-4 right-4 text-2xl font-bold text-white">
          Score: {score}
        </div>
      </div>
      <Button
        onClick={handlePulseTap}
        className={cn(
          'w-48 h-16 text-2xl rounded-full font-bold transition-all duration-200',
          'bg-pink-600 hover:bg-pink-700 text-white',
          'shadow-[0_0_20px_theme(colors.pink.500)]',
           status === 'playing' && rhythmStatus.current === 'perfect' && 'animate-pulse'
        )}
      >
        PULSE
      </Button>
    </div>
  );
}
