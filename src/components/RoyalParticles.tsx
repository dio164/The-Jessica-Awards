import React, { useEffect, useRef } from 'react';

interface RoyalParticlesProps {
  intensity?: 'ambient' | 'celebration';
  className?: string;
}

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  opacity: number;
  rotation: number;
  rotationSpeed: number;
  type: 'petal' | 'gold-spark' | 'pearl';
  color: string;
}

export const RoyalParticles: React.FC<RoyalParticlesProps> = ({
  intensity = 'ambient',
  className = '',
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', handleResize);

    // Check prefers-reduced-motion
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (mediaQuery.matches) {
      return () => window.removeEventListener('resize', handleResize);
    }

    const count = intensity === 'celebration' ? 120 : 36;
    const particles: Particle[] = [];

    const petalColors = ['#F8E4EA', '#F3CCD7', '#DE9EB0', '#C98598', '#FAF0F3', '#FFF9F2'];
    const goldColors = ['#E2C27F', '#C5A059', '#D4AF37', '#FFF1CA'];

    for (let i = 0; i < count; i++) {
      const isCelebration = intensity === 'celebration';
      const rand = Math.random();
      const type: 'petal' | 'gold-spark' | 'pearl' = 
        rand < 0.55 ? 'petal' : rand < 0.85 ? 'gold-spark' : 'pearl';

      particles.push({
        x: Math.random() * width,
        y: isCelebration ? (Math.random() * height * 0.5) : Math.random() * height,
        vx: (Math.random() - 0.5) * (isCelebration ? 2.5 : 0.8),
        vy: isCelebration ? Math.random() * 2.2 + 1.2 : Math.random() * 0.7 + 0.3,
        size: type === 'petal' ? Math.random() * 9 + 6 : type === 'pearl' ? Math.random() * 4 + 2 : Math.random() * 3 + 1.5,
        opacity: Math.random() * 0.6 + 0.3,
        rotation: Math.random() * Math.PI * 2,
        rotationSpeed: (Math.random() - 0.5) * 0.03,
        type,
        color: type === 'petal' 
          ? petalColors[Math.floor(Math.random() * petalColors.length)]
          : type === 'gold-spark'
          ? goldColors[Math.floor(Math.random() * goldColors.length)]
          : '#FFFFFF',
      });
    }

    const drawPetal = (p: Particle) => {
      ctx.save();
      ctx.translate(p.x, p.y);
      ctx.rotate(p.rotation);
      ctx.globalAlpha = p.opacity;
      ctx.fillStyle = p.color;

      ctx.beginPath();
      // Curved delicate rose petal shape
      ctx.moveTo(0, -p.size);
      ctx.bezierCurveTo(p.size * 0.8, -p.size * 0.8, p.size, p.size * 0.3, 0, p.size);
      ctx.bezierCurveTo(-p.size, p.size * 0.3, -p.size * 0.8, -p.size * 0.8, 0, -p.size);
      ctx.fill();
      ctx.restore();
    };

    const drawSparkle = (p: Particle) => {
      ctx.save();
      ctx.translate(p.x, p.y);
      ctx.rotate(p.rotation);
      ctx.globalAlpha = p.opacity;
      ctx.fillStyle = p.color;
      ctx.shadowColor = p.color;
      ctx.shadowBlur = 8;

      ctx.beginPath();
      // 4-point glittering star
      const s = p.size;
      ctx.moveTo(0, -s * 1.6);
      ctx.quadraticCurveTo(0, 0, s * 1.6, 0);
      ctx.quadraticCurveTo(0, 0, 0, s * 1.6);
      ctx.quadraticCurveTo(0, 0, -s * 1.6, 0);
      ctx.quadraticCurveTo(0, 0, 0, -s * 1.6);
      ctx.fill();
      ctx.restore();
    };

    const drawPearl = (p: Particle) => {
      ctx.save();
      ctx.translate(p.x, p.y);
      ctx.globalAlpha = p.opacity * 0.7;
      ctx.fillStyle = p.color;
      ctx.shadowColor = '#FAF0F3';
      ctx.shadowBlur = 4;

      ctx.beginPath();
      ctx.arc(0, 0, p.size, 0, Math.PI * 2);
      ctx.fill();

      // Delicate pearl highlight
      ctx.fillStyle = 'rgba(255, 255, 255, 0.9)';
      ctx.beginPath();
      ctx.arc(-p.size * 0.3, -p.size * 0.3, p.size * 0.35, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();
    };

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        p.x += p.vx + Math.sin(p.rotation) * 0.4;
        p.y += p.vy;
        p.rotation += p.rotationSpeed;

        if (p.type === 'petal') {
          drawPetal(p);
        } else if (p.type === 'gold-spark') {
          drawSparkle(p);
        } else {
          drawPearl(p);
        }

        // Wrap around boundaries
        if (p.y > height + 20) {
          p.y = -20;
          p.x = Math.random() * width;
        }
        if (p.x < -20) p.x = width + 20;
        if (p.x > width + 20) p.x = -20;
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, [intensity]);

  return (
    <canvas
      ref={canvasRef}
      className={`fixed inset-0 pointer-events-none z-10 ${className}`}
      aria-hidden="true"
    />
  );
};

