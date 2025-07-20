import React, { useRef, useEffect } from 'react';

const DOTS = 32;
const COLORS = ['#3772ff22', '#e6e6e622', '#35394522'];
const MIN_RADIUS = 8;
const MAX_RADIUS = 22;
const SPEED = 0.12;

function randomBetween(a, b) {
  return a + Math.random() * (b - a);
}

function createDot(width, height) {
  const angle = Math.random() * 2 * Math.PI;
  return {
    x: randomBetween(0, width),
    y: randomBetween(0, height),
    r: randomBetween(MIN_RADIUS, MAX_RADIUS),
    color: COLORS[Math.floor(Math.random() * COLORS.length)],
    dx: Math.cos(angle) * randomBetween(0.1, SPEED),
    dy: Math.sin(angle) * randomBetween(0.1, SPEED),
    opacity: randomBetween(0.18, 0.32),
  };
}

const FloatingDotsBackground = () => {
  const canvasRef = useRef(null);
  const dotsRef = useRef([]);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    let width = window.innerWidth;
    let height = window.innerHeight;
    canvas.width = width;
    canvas.height = height;

    function resize() {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width;
      canvas.height = height;
      dotsRef.current = Array.from({ length: DOTS }, () => createDot(width, height));
    }

    window.addEventListener('resize', resize);
    dotsRef.current = Array.from({ length: DOTS }, () => createDot(width, height));

    function animate() {
      ctx.clearRect(0, 0, width, height);
      for (let dot of dotsRef.current) {
        ctx.beginPath();
        ctx.arc(dot.x, dot.y, dot.r, 0, 2 * Math.PI);
        ctx.fillStyle = dot.color;
        ctx.globalAlpha = dot.opacity;
        ctx.shadowColor = dot.color;
        ctx.shadowBlur = 16;
        ctx.fill();
        ctx.globalAlpha = 1;
        ctx.shadowBlur = 0;
        dot.x += dot.dx;
        dot.y += dot.dy;
        // Bounce off edges
        if (dot.x < -dot.r || dot.x > width + dot.r) dot.dx *= -1;
        if (dot.y < -dot.r || dot.y > height + dot.r) dot.dy *= -1;
      }
      requestAnimationFrame(animate);
    }
    animate();
    return () => {
      window.removeEventListener('resize', resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="floating-dots-bg"
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        zIndex: 0,
        pointerEvents: 'none',
      }}
      aria-hidden="true"
    />
  );
};

export default FloatingDotsBackground; 