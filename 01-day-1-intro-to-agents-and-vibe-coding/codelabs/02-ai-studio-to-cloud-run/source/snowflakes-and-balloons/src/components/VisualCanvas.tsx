import { useEffect, useRef, useState } from "react";

type BaseParticle = {
  id: string;
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  createdAt: number;
  life: number;
  opacity: number;
};

type SnowflakeParticle = BaseParticle & {
  type: "snowflake";
  rotation: number;
  rotationSpeed: number;
  driftFrequency: number;
};

type BalloonParticle = BaseParticle & {
  type: "balloon";
  hue: number;
  swaySpeed: number;
  swayRange: number;
  stringWaviness: number;
};

type Particle = SnowflakeParticle | BalloonParticle;

interface VisualCanvasProps {
  snowflakeTrigger: number;
  balloonTrigger: number;
  clearTrigger: number;
  reducedMotion: boolean;
  onActiveCountsChange?: (snowflakes: number, balloons: number) => void;
}

export default function VisualCanvas({
  snowflakeTrigger,
  balloonTrigger,
  clearTrigger,
  reducedMotion,
  onActiveCountsChange,
}: VisualCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const particlesRef = useRef<Particle[]>([]);
  const requestRef = useRef<number | null>(null);

  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });

  // Handle ResizeObserver according to the framework guidelines
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const resizeObserver = new ResizeObserver((entries) => {
      if (!entries || entries.length === 0) return;
      const { width, height } = entries[0].contentRect;
      setDimensions({ width, height });
    });

    resizeObserver.observe(container);
    return () => {
      resizeObserver.disconnect();
    };
  }, []);

  // Update canvas sizing
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    canvas.width = dimensions.width;
    canvas.height = dimensions.height;
  }, [dimensions]);

  // Clean clearing of all particles without page reloads
  useEffect(() => {
    if (clearTrigger > 0) {
      particlesRef.current = [];
      if (onActiveCountsChange) {
        onActiveCountsChange(0, 0);
      }
    }
  }, [clearTrigger, onActiveCountsChange]);

  const lastSnowflakeTriggerRef = useRef(0);

  // Handle high-volume snowflake spawn trigger safely.
  // This effect depends ONLY on snowflakeTrigger and reducedMotion.
  // It reads latest dimensions live from canvasRef when triggered,
  // preventing zoom / preview resizing from ever spawning unwanted particles.
  useEffect(() => {
    if (snowflakeTrigger === 0) return;
    if (snowflakeTrigger <= lastSnowflakeTriggerRef.current) return;
    lastSnowflakeTriggerRef.current = snowflakeTrigger;

    const width = canvasRef.current?.width || window.innerWidth;
    const count = reducedMotion
      ? Math.floor(Math.random() * 3) + 6  // gentle count
      : Math.floor(Math.random() * 15) + 35; // default rich count
    const now = Date.now();

    const newSnowflakes: SnowflakeParticle[] = Array.from({ length: count }).map(() => {
      const size = Math.random() * 8 + 8; // 8px to 16px (medium)
      return {
        id: `snowflake-${now}-${Math.random()}`,
        type: "snowflake",
        x: Math.random() * width,
        y: -10 - Math.random() * 40, // stagger initial start above screen
        vx: reducedMotion ? 0 : (Math.random() - 0.5) * 0.8, // minimal drift in reduced motion
        vy: reducedMotion ? (Math.random() * 0.4 + 0.6) : (Math.random() * 1.5 + 1.2), // gentle falling speed
        size,
        rotation: Math.random() * Math.PI * 2,
        rotationSpeed: reducedMotion ? 0 : (Math.random() - 0.5) * 0.02,
        driftFrequency: Math.random() * 0.002 + 0.001,
        createdAt: now,
        life: 5000 + Math.random() * 600, // around 5 seconds duration
        opacity: Math.random() * 0.4 + 0.5, // nice gentle brightness
      };
    });

    const existingSnowflakes = particlesRef.current.filter((p) => p.type === "snowflake");
    const existingBalloons = particlesRef.current.filter((p) => p.type === "balloon");

    // Enforce high elegant caps for rich, lag-free additive builds
    const MAX_SNOWFLAKES = reducedMotion ? 50 : 250;
    let safeSnowflakes = existingSnowflakes;
    if (existingSnowflakes.length + count > MAX_SNOWFLAKES) {
      const keepCount = Math.max(0, MAX_SNOWFLAKES - count);
      safeSnowflakes = existingSnowflakes.slice(existingSnowflakes.length - keepCount);
    }

    particlesRef.current = [...existingBalloons, ...safeSnowflakes, ...newSnowflakes];
  }, [snowflakeTrigger, reducedMotion]);

  const lastBalloonTriggerRef = useRef(0);

  // Handle high-volume balloon spawn trigger safely.
  // Decoupled from dimension changes so browser zoom or panel resizing never fires it.
  useEffect(() => {
    if (balloonTrigger === 0) return;
    if (balloonTrigger <= lastBalloonTriggerRef.current) return;
    lastBalloonTriggerRef.current = balloonTrigger;

    const width = canvasRef.current?.width || window.innerWidth;
    const height = canvasRef.current?.height || window.innerHeight;
    const count = reducedMotion
      ? Math.floor(Math.random() * 2) + 4 // gentle count
      : Math.floor(Math.random() * 8) + 18; // default rich count
    const now = Date.now();

    // Palette of highly vibrant colors
    const premiumHues = [
      340, // Hot Pink/Rose
      14,  // Sunset orange
      42,  // Warm Gold/Yellow
      145, // Emerald Mint Green
      195, // Sky Blue
      265, // Lavender Purple
      310, // Bright violet
    ];

    const newBalloons: BalloonParticle[] = Array.from({ length: count }).map(() => {
      const size = Math.random() * 10 + 24; // medium width (24px to 34px)
      const hue = premiumHues[Math.floor(Math.random() * premiumHues.length)];
      return {
        id: `balloon-${now}-${Math.random()}`,
        type: "balloon",
        x: Math.random() * (width - 60) + 30, // avoid starting too close to side borders
        y: height + 20 + Math.random() * 60, // stagger bottom entry
        vx: 0,
        vy: reducedMotion ? -(Math.random() * 0.5 + 0.8) : -(Math.random() * 1.4 + 1.8), // gentle speed if reduced motion
        size,
        createdAt: now,
        life: 5000 + Math.random() * 500, // around 5 seconds
        opacity: Math.random() * 0.15 + 0.85, // semi-solid bold colors
        hue,
        swaySpeed: reducedMotion ? 0 : (Math.random() * 1.5 + 1),
        swayRange: reducedMotion ? 0 : (Math.random() * 12 + 10), // sway amplitude
        stringWaviness: Math.random() * 0.1 + 0.05,
      };
    });

    const existingSnowflakes = particlesRef.current.filter((p) => p.type === "snowflake");
    const existingBalloons = particlesRef.current.filter((p) => p.type === "balloon");

    const MAX_BALLOONS = reducedMotion ? 30 : 120;
    let safeBalloons = existingBalloons;
    if (existingBalloons.length + count > MAX_BALLOONS) {
      const keepCount = Math.max(0, MAX_BALLOONS - count);
      safeBalloons = existingBalloons.slice(existingBalloons.length - keepCount);
    }

    particlesRef.current = [...existingSnowflakes, ...safeBalloons, ...newBalloons];
  }, [balloonTrigger, reducedMotion]);

  // Main Canvas drawing loop
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const tick = () => {
      const now = Date.now();
      const currentParticles = particlesRef.current;

      // Filter and delete expired particles (DOM & Memory clean, no permanent files/state leaks)
      const activeParticles = currentParticles.filter((p) => {
        return now - p.createdAt < p.life;
      });

      // Update counters via props back smoothly if changed
      if (onActiveCountsChange) {
        const snowflakeCount = activeParticles.filter((p) => p.type === "snowflake").length;
        const balloonCount = activeParticles.filter((p) => p.type === "balloon").length;
        // Run asynchronously or on tick update to avoid render conflicts
        onActiveCountsChange(snowflakeCount, balloonCount);
      }

      particlesRef.current = activeParticles;

      // Draw background clear
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Render individual items
      activeParticles.forEach((p) => {
        const age = now - p.createdAt;
        // Interpolate smooth fade-out during the last 1.2 seconds of the 5-second lifetime
        let opacityMultiplier = 1;
        const fadeDuration = 1200;
        if (p.life - age < fadeDuration) {
          opacityMultiplier = Math.max(0, (p.life - age) / fadeDuration);
        }

        const finalOpacity = p.opacity * opacityMultiplier;

        if (p.type === "snowflake") {
          // Snowflake mechanics
          p.x += p.vx + Math.sin(now * p.driftFrequency + parseFloat(p.id.split("-")[2] || "0")) * 0.35;
          p.y += p.vy;
          p.rotation += p.rotationSpeed;

          drawSnowflake(ctx, p.x, p.y, p.size, p.rotation, finalOpacity);
        } else {
          // Balloon mechanics
          // We apply physical sine-wave sway relative to starting spot or dynamic drift
          const randomFactor = parseFloat(p.id.split("-")[2] || "0");
          const swayOffset = Math.sin(now * 0.0015 * p.swaySpeed + randomFactor) * p.swayRange;
          
          p.y += p.vy; // Floating up
          const renderX = p.x + swayOffset;

          drawBalloon(ctx, renderX, p.y, p.size, p.size * 1.3, p.hue, finalOpacity, now * p.stringWaviness);
        }
      });

      requestRef.current = requestAnimationFrame(tick);
    };

    requestRef.current = requestAnimationFrame(tick);

    return () => {
      if (requestRef.current) {
        cancelAnimationFrame(requestRef.current);
      }
    };
  }, [onActiveCountsChange]);

  // Custom high-fidelity renderer for crystal snowflakes
  const drawSnowflake = (
    ctx: CanvasRenderingContext2D,
    x: number,
    y: number,
    size: number,
    rotation: number,
    opacity: number
  ) => {
    ctx.save();
    ctx.translate(x, y);
    ctx.rotate(rotation);
    ctx.strokeStyle = `rgba(255, 255, 255, ${opacity * 0.85})`;
    ctx.lineWidth = Math.max(1.2, size * 0.09);
    ctx.lineCap = "round";

    // Standard 6-arm crystal snowflake pattern
    for (let i = 0; i < 6; i++) {
      ctx.beginPath();
      ctx.moveTo(0, 0);
      ctx.lineTo(0, -size);
      ctx.stroke();

      // Side needles branching off main arm
      ctx.save();
      ctx.translate(0, -size * 0.45);
      ctx.beginPath();
      ctx.moveTo(0, 0);
      ctx.lineTo(-size * 0.25, -size * 0.15);
      ctx.moveTo(0, 0);
      ctx.lineTo(size * 0.25, -size * 0.15);
      ctx.stroke();
      ctx.restore();

      ctx.save();
      ctx.translate(0, -size * 0.75);
      ctx.beginPath();
      ctx.moveTo(0, 0);
      ctx.lineTo(-size * 0.18, -size * 0.12);
      ctx.moveTo(0, 0);
      ctx.lineTo(size * 0.18, -size * 0.12);
      ctx.stroke();
      ctx.restore();

      ctx.rotate(Math.PI / 3);
    }
    ctx.restore();
  };

  // High-fidelity balloon with glossy radial highlight and physical knotted tethering
  const drawBalloon = (
    ctx: CanvasRenderingContext2D,
    x: number,
    y: number,
    width: number,
    height: number,
    hue: number,
    opacity: number,
    timeFactor: number
  ) => {
    ctx.save();
    ctx.translate(x, y);

    // Render dangling string
    ctx.beginPath();
    ctx.moveTo(0, height / 2);
    ctx.bezierCurveTo(
      Math.sin(timeFactor) * 8,
      height / 2 + 12,
      Math.cos(timeFactor) * -4,
      height / 2 + 25,
      Math.sin(timeFactor * 0.8) * 3,
      height / 2 + 38
    );
    ctx.strokeStyle = `rgba(218, 224, 233, ${opacity * 0.45})`;
    ctx.lineWidth = 1.2;
    ctx.stroke();

    // Create 3D spherical gradient highlight
    // Balloon main capsule path
    ctx.beginPath();
    ctx.moveTo(0, height / 2);
    // Draw balloon contours dynamically using cubic bezier curves
    ctx.bezierCurveTo(-width * 0.65, height * 0.45, -width * 0.65, -height * 0.55, 0, -height * 0.5);
    ctx.bezierCurveTo(width * 0.65, -height * 0.55, width * 0.65, height * 0.45, 0, height / 2);
    ctx.closePath();

    const radialGradient = ctx.createRadialGradient(
      -width * 0.18,
      -height * 0.18,
      width * 0.08,
      0,
      0,
      height * 0.55
    );
    radialGradient.addColorStop(0, `hsla(${hue}, 98%, 78%, ${opacity})`);
    radialGradient.addColorStop(0.35, `hsla(${hue}, 90%, 54%, ${opacity})`);
    radialGradient.addColorStop(1, `hsla(${hue}, 95%, 32%, ${opacity})`);

    ctx.fillStyle = radialGradient;
    ctx.fill();

    // Drop glossy reflection bubble
    ctx.beginPath();
    ctx.ellipse(
      -width * 0.18,
      -height * 0.2,
      width * 0.12,
      height * 0.09,
      Math.PI / 4,
      0,
      Math.PI * 2
    );
    ctx.fillStyle = `rgba(255, 255, 255, ${opacity * 0.45})`;
    ctx.fill();

    // Triangular knot at balloon release point
    ctx.beginPath();
    ctx.moveTo(0, height / 2);
    ctx.lineTo(-width * 0.12, height / 2 + 4);
    ctx.lineTo(width * 0.12, height / 2 + 4);
    ctx.closePath();
    ctx.fillStyle = `hsla(${hue}, 88%, 38%, ${opacity})`;
    ctx.fill();

    ctx.restore();
  };

  return (
    <div
      ref={containerRef}
      className="absolute inset-0 pointer-events-none w-full h-full overflow-hidden"
    >
      <canvas ref={canvasRef} className="block w-full h-full" id="animation-particle-canvas" />
    </div>
  );
}
