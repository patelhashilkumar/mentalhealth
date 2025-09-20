'use client';
import React, { useRef, useEffect } from 'react';

export default function FlappyBird() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Game constants
    const GRAVITY = 0.45;
    const FLAP_V = -8.5;
    const PIPE_GAP = 150;
    const PIPE_W = 60;
    const PIPE_INTERVAL = 1400; // ms between pipes
    const GROUND_H = 80;

    // State
    let lastTime = 0;
    let pipes: { x: number; top: number }[] = [];
    let running = false;
    let gameOver = false;
    let score = 0;
    let highScore = 0;
    let animationFrameId: number;

    // Bird
    const bird = {
      x: 110,
      y: canvas.height / 2,
      r: 16,
      vy: 0,
      rot: 0,
    };

    // Input
    function flap() {
      if (gameOver) return;
      bird.vy = FLAP_V;
      running = true;
    }

    function handleKeyDown(e: KeyboardEvent) {
      if (e.code === 'Space') {
        e.preventDefault();
        flap();
      }
      if (e.key === 'r' || e.key === 'R') reset();
    }

    function handleCanvasClick() {
      if(gameOver) {
        reset();
      } else {
        flap();
      }
    }

    window.addEventListener('keydown', handleKeyDown);
    canvas.addEventListener('mousedown', handleCanvasClick);
    canvas.addEventListener('touchstart', (e) => { e.preventDefault(); handleCanvasClick(); }, { passive: false });

    // Pipes generator
    let pipeTimer = 0;
    function spawnPipe() {
      const minTop = 60;
      const maxTop = canvas.height - GROUND_H - PIPE_GAP - 60;
      const top = minTop + Math.random() * Math.max(0, maxTop - minTop);
      pipes.push({ x: canvas.width, top: top });
    }

    // Reset game
    function reset() {
      pipes = [];
      bird.x = 110;
      bird.y = canvas.height / 2;
      bird.vy = 0;
      bird.rot = 0;
      lastTime = performance.now();
      pipeTimer = 0;
      running = false;
      gameOver = false;
      score = 0;
      if (!animationFrameId) {
        loop(performance.now());
      }
    }

    // Collision helpers
    function rectsOverlap(ax: number, ay: number, aw: number, ah: number, bx: number, by: number, bw: number, bh: number) {
      return ax < bx + bw && ax + aw > bx && ay < by + bh && ay + ah > by;
    }

    // Main loop
    function loop(t: number) {
      const dt = Math.min(34, t - lastTime);
      lastTime = t;

      if (!gameOver && running) {
        // Physics
        bird.vy += GRAVITY;
        bird.y += bird.vy;
        bird.rot = Math.max(-0.6, Math.min(1.0, bird.vy * 0.04));

        // Pipes movement
        const spd = 2.2 + Math.min(2, score * 0.03);
        for (let p of pipes) p.x -= spd;

        // Spawn pipes
        pipeTimer += dt;
        if (pipeTimer >= PIPE_INTERVAL) {
          pipeTimer = 0;
          spawnPipe();
        }

        // Remove offscreen & increase score
        if (pipes.length && pipes[0].x + PIPE_W < bird.x - bird.r && !pipes[0].passed) {
          pipes[0].passed = true;
          score++;
          if (score > highScore) highScore = score;
        }

        if (pipes.length && pipes[0].x + PIPE_W < 0) {
          pipes.shift();
        }


        // Collisions with pipes
        for (let p of pipes) {
          if (
            rectsOverlap(bird.x - bird.r, bird.y - bird.r, bird.r * 2, bird.r * 2, p.x, 0, PIPE_W, p.top) ||
            rectsOverlap(
              bird.x - bird.r,
              bird.y - bird.r,
              bird.r * 2,
              bird.r * 2,
              p.x,
              p.top + PIPE_GAP,
              PIPE_W,
              canvas.height - GROUND_H - (p.top + PIPE_GAP)
            )
          ) {
            gameOver = true;
          }
        }

        // Floor/ceiling collision
        if (bird.y + bird.r > canvas.height - GROUND_H || bird.y - bird.r < 0) {
          gameOver = true;
        }

        if (gameOver) running = false;
      }

      render();
      animationFrameId = requestAnimationFrame(loop);
    }

    // Draw functions
    function drawBackground() {
        ctx.save();
        ctx.globalAlpha = 0.9;
        ctx.fillStyle = '#74c27f';
        ctx.beginPath();
        ctx.ellipse(80, canvas.height - 150, 120, 60, 0, 0, Math.PI * 2);
        ctx.fill();
        ctx.beginPath();
        ctx.ellipse(380, canvas.height - 160, 140, 70, 0, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
    }

    function drawPipes() {
      ctx.fillStyle = '#3aa34a';
      for (let p of pipes) {
        ctx.fillRect(p.x, 0, PIPE_W, p.top);
        ctx.fillRect(p.x, p.top + PIPE_GAP, PIPE_W, canvas.height - GROUND_H - (p.top + PIPE_GAP));
        ctx.fillStyle = '#2b8a3a';
        ctx.fillRect(p.x - 8, p.top - 12, PIPE_W + 16, 12);
        ctx.fillRect(p.x - 8, p.top + PIPE_GAP, PIPE_W + 16, 12);
        ctx.fillStyle = '#3aa34a';
      }
    }

    function drawGround() {
      ctx.fillStyle = '#d5b280';
      ctx.fillRect(0, canvas.height - GROUND_H, canvas.width, GROUND_H);
      ctx.fillStyle = '#caa86b';
      for (let i = 0; i < canvas.width; i += 30) ctx.fillRect(i, canvas.height - GROUND_H, 18, 6);
    }

    function drawBird() {
      ctx.save();
      ctx.translate(bird.x, bird.y);
      ctx.rotate(bird.rot);
      ctx.fillStyle = '#ffdd57';
      ctx.beginPath();
      ctx.ellipse(0, 0, bird.r * 1.1, bird.r, 0, 0, Math.PI * 2);
      ctx.fill();
      ctx.fillStyle = '#f5c24a';
      ctx.beginPath();
      ctx.ellipse(-2, 0, bird.r * 0.6, bird.r * 0.35, -0.6, 0, Math.PI * 2);
      ctx.fill();
      ctx.fillStyle = '#222';
      ctx.beginPath();
      ctx.arc(bird.r * 0.35, -4, 3, 0, Math.PI * 2);
      ctx.fill();
      ctx.fillStyle = '#ff8a2c';
      ctx.beginPath();
      ctx.moveTo(bird.r * 0.9, 0);
      ctx.lineTo(bird.r * 1.9, -4);
      ctx.lineTo(bird.r * 1.9, 4);
      ctx.closePath();
      ctx.fill();
      ctx.restore();
    }

    function drawUI() {
      ctx.fillStyle = 'rgba(0,0,0,0.6)';
      ctx.font = '20px system-ui, Segoe UI, Roboto';
      ctx.textAlign = 'left';
      ctx.fillText('Score: ' + score, 12, 28);
      ctx.textAlign = 'right';
      ctx.fillText('High: ' + highScore, canvas.width - 12, 28);

      if (!running && !gameOver) {
        ctx.fillStyle = 'rgba(255,255,255,0.9)';
        ctx.textAlign = 'center';
        ctx.font = '28px system-ui, Segoe UI, Roboto';
        ctx.fillText('Click to flap', canvas.width / 2, canvas.height / 2 - 10);
        ctx.font = '16px system-ui, Segoe UI, Roboto';
        ctx.fillText('Game will start when you flap', canvas.width / 2, canvas.height / 2 + 18);
      }

      if (gameOver) {
        ctx.fillStyle = 'rgba(0,0,0,0.6)';
        ctx.fillRect(canvas.width / 2 - 150, canvas.height / 2 - 70, 300, 140);
        ctx.fillStyle = '#fff';
        ctx.font = '28px system-ui, Segoe UI, Roboto';
        ctx.textAlign = 'center';
        ctx.fillText('Game Over', canvas.width / 2, canvas.height / 2 - 18);
        ctx.font = '18px system-ui, Segoe UI, Roboto';
        ctx.fillText('Score: ' + score + '   High: ' + highScore, canvas.width / 2, canvas.height / 2 + 12);
        ctx.fillText('Press R or Click to Restart', canvas.width / 2, canvas.height / 2 + 42);
      }
    }

    function render() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      drawBackground();
      drawPipes();
      drawGround();
      drawBird();
      drawUI();
    }

    reset();
    loop(performance.now());
    
    // Responsive scaling
    function fit() {
        const margin = 20;
        if (!canvas) return;
        const w = window.innerWidth - margin*2;
        const h = window.innerHeight - margin*2;
        const scale = Math.min(w / canvas.width, h / canvas.height);
        canvas.style.width = Math.round(canvas.width * scale) + 'px';
        canvas.style.height = Math.round(canvas.height * scale) + 'px';
    }
    window.addEventListener('resize', fit);
    fit();

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('resize', fit);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
      <div>
        <div id="info" style={{position:'fixed', top:'12px', left:'12px', color:'#033', fontFamily:'system-ui,Segoe UI,Roboto', fontSize:'14px'}}>Space / Click / Tap = flap · R = restart</div>
        <canvas 
            ref={canvasRef} 
            id="c" 
            width="480" 
            height="640"
            style={{background: 'linear-gradient(#80d0ff,#bfe9ff)', borderRadius:'10px', boxShadow:'0 8px 24px rgba(0,0,0,0.2)'}}
        ></canvas>
    </div>
  );
}
