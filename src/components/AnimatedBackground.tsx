import { useEffect, useRef } from 'react';

interface Dot {
    x: number;
    y: number;
    pathIndex: number;
    progress: number;
    speed: number;
    icon: string | null;
    opacity: number;
    offsetX: number; // Distortion offset
    offsetY: number;
}

interface DistortionPoint {
    x: number;
    y: number;
    strength: number;
    decayRate: number;
}

const AnimatedBackground = () => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const dotsRef = useRef<Dot[]>([]);
    const animationFrameRef = useRef<number>();
    const distortionPointsRef = useRef<DistortionPoint[]>([]);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        // Set canvas size
        const resizeCanvas = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        };
        resizeCanvas();
        window.addEventListener('resize', resizeCanvas);

        // Tech icons - balanced 50/50 ratio of dots to icons
        const icons = [
            null,
            null,
            null,
            null,
            null,
            null,
            null,
            'laptop',
            'mobile',
            'robot',
            'code',
            'cloud',
        ];

        // Create zigzag paths (horizontal with vertical variation)
        const numPaths = 8;
        const paths: { y: number; amplitude: number; frequency: number; speed: number }[] = [];

        for (let i = 0; i < numPaths; i++) {
            paths.push({
                y: (canvas.height / (numPaths + 1)) * (i + 1),
                amplitude: 30 + Math.random() * 40,
                frequency: 0.003 + Math.random() * 0.002,
                speed: 0.3 + Math.random() * 0.5, // Parallax: different speeds
            });
        }

        // Initialize dots
        const numDotsPerPath = 15;
        dotsRef.current = [];

        paths.forEach((path, pathIndex) => {
            for (let i = 0; i < numDotsPerPath; i++) {
                dotsRef.current.push({
                    x: (canvas.width / numDotsPerPath) * i - Math.random() * 200,
                    y: path.y,
                    pathIndex,
                    progress: (i / numDotsPerPath) * canvas.width,
                    speed: path.speed,
                    icon: icons[Math.floor(Math.random() * icons.length)],
                    opacity: 0.3 + Math.random() * 0.4,
                    offsetX: 0,
                    offsetY: 0,
                });
            }
        });

        // Draw icon inside dot - ENHANCED VISIBILITY
        const drawIcon = (ctx: CanvasRenderingContext2D, icon: string, x: number, y: number, size: number) => {
            ctx.save();

            // Draw dark background circle for icon contrast
            ctx.fillStyle = 'rgba(10, 10, 10, 0.8)';
            ctx.beginPath();
            ctx.arc(x, y, size * 0.7, 0, Math.PI * 2);
            ctx.fill();

            // More subtle colors for better text focus
            ctx.strokeStyle = 'rgba(96, 165, 250, 0.7)'; // Reduced opacity
            ctx.fillStyle = 'rgba(96, 165, 250, 0.4)'; // Reduced fill
            ctx.lineWidth = 2.5; // Thicker lines
            ctx.lineCap = 'round';
            ctx.lineJoin = 'round';

            const iconSize = size * 0.6; // Larger icons

            switch (icon) {
                case 'laptop':
                    // Screen (filled rectangle)
                    ctx.fillStyle = 'rgba(96, 165, 250, 0.4)';
                    ctx.fillRect(x - iconSize * 0.6, y - iconSize * 0.4, iconSize * 1.2, iconSize * 0.7);
                    ctx.strokeRect(x - iconSize * 0.6, y - iconSize * 0.4, iconSize * 1.2, iconSize * 0.7);

                    // Base line (keyboard)
                    ctx.strokeStyle = 'rgba(96, 165, 250, 1)';
                    ctx.beginPath();
                    ctx.moveTo(x - iconSize * 0.8, y + iconSize * 0.5);
                    ctx.lineTo(x + iconSize * 0.8, y + iconSize * 0.5);
                    ctx.stroke();
                    break;

                case 'mobile':
                    // Phone outline (filled)
                    ctx.fillStyle = 'rgba(96, 165, 250, 0.4)';
                    ctx.fillRect(x - iconSize * 0.35, y - iconSize * 0.6, iconSize * 0.7, iconSize * 1.2);
                    ctx.strokeStyle = 'rgba(96, 165, 250, 1)';
                    ctx.strokeRect(x - iconSize * 0.35, y - iconSize * 0.6, iconSize * 0.7, iconSize * 1.2);

                    // Screen top bar
                    ctx.fillStyle = 'rgba(96, 165, 250, 1)';
                    ctx.fillRect(x - iconSize * 0.2, y - iconSize * 0.45, iconSize * 0.4, iconSize * 0.08);

                    // Home button
                    ctx.beginPath();
                    ctx.arc(x, y + iconSize * 0.45, iconSize * 0.12, 0, Math.PI * 2);
                    ctx.fill();
                    break;

                case 'robot':
                    // Head (filled circle)
                    ctx.fillStyle = 'rgba(96, 165, 250, 0.4)';
                    ctx.beginPath();
                    ctx.arc(x, y, iconSize * 0.55, 0, Math.PI * 2);
                    ctx.fill();
                    ctx.strokeStyle = 'rgba(96, 165, 250, 1)';
                    ctx.stroke();

                    // Antenna
                    ctx.beginPath();
                    ctx.moveTo(x, y - iconSize * 0.55);
                    ctx.lineTo(x, y - iconSize * 0.85);
                    ctx.stroke();
                    ctx.fillStyle = 'rgba(96, 165, 250, 1)';
                    ctx.beginPath();
                    ctx.arc(x, y - iconSize * 0.85, iconSize * 0.15, 0, Math.PI * 2);
                    ctx.fill();

                    // Eyes (larger and filled)
                    ctx.fillStyle = 'rgba(255, 255, 255, 0.9)';
                    ctx.beginPath();
                    ctx.arc(x - iconSize * 0.25, y - iconSize * 0.1, iconSize * 0.15, 0, Math.PI * 2);
                    ctx.fill();
                    ctx.beginPath();
                    ctx.arc(x + iconSize * 0.25, y - iconSize * 0.1, iconSize * 0.15, 0, Math.PI * 2);
                    ctx.fill();

                    // Smile
                    ctx.strokeStyle = 'rgba(96, 165, 250, 1)';
                    ctx.beginPath();
                    ctx.arc(x, y + iconSize * 0.15, iconSize * 0.3, 0.2, Math.PI - 0.2);
                    ctx.stroke();
                    break;

                case 'code':
                    // Code brackets < > with prominent style
                    ctx.lineWidth = 3;
                    ctx.strokeStyle = 'rgba(96, 165, 250, 1)';

                    // Left bracket <
                    ctx.beginPath();
                    ctx.moveTo(x - iconSize * 0.15, y - iconSize * 0.5);
                    ctx.lineTo(x - iconSize * 0.65, y);
                    ctx.lineTo(x - iconSize * 0.15, y + iconSize * 0.5);
                    ctx.stroke();

                    // Right bracket >
                    ctx.beginPath();
                    ctx.moveTo(x + iconSize * 0.15, y - iconSize * 0.5);
                    ctx.lineTo(x + iconSize * 0.65, y);
                    ctx.lineTo(x + iconSize * 0.15, y + iconSize * 0.5);
                    ctx.stroke();

                    // Slash in middle
                    ctx.lineWidth = 2.5;
                    ctx.beginPath();
                    ctx.moveTo(x - iconSize * 0.08, y + iconSize * 0.4);
                    ctx.lineTo(x + iconSize * 0.08, y - iconSize * 0.4);
                    ctx.stroke();
                    break;

                case 'cloud':
                    // Cloud shape (filled)
                    ctx.fillStyle = 'rgba(96, 165, 250, 0.4)';

                    // Draw cloud using multiple circles
                    ctx.beginPath();
                    ctx.arc(x - iconSize * 0.35, y + iconSize * 0.05, iconSize * 0.35, 0, Math.PI * 2);
                    ctx.fill();

                    ctx.beginPath();
                    ctx.arc(x + iconSize * 0.35, y + iconSize * 0.05, iconSize * 0.35, 0, Math.PI * 2);
                    ctx.fill();

                    ctx.beginPath();
                    ctx.arc(x, y - iconSize * 0.25, iconSize * 0.45, 0, Math.PI * 2);
                    ctx.fill();

                    // Outline
                    ctx.strokeStyle = 'rgba(96, 165, 250, 1)';
                    ctx.lineWidth = 2.5;
                    ctx.beginPath();
                    ctx.arc(x - iconSize * 0.35, y + iconSize * 0.05, iconSize * 0.35, Math.PI * 0.5, Math.PI * 1.5, false);
                    ctx.arc(x, y - iconSize * 0.25, iconSize * 0.45, Math.PI, 0, false);
                    ctx.arc(x + iconSize * 0.35, y + iconSize * 0.05, iconSize * 0.35, Math.PI * 1.5, Math.PI * 0.5, false);
                    ctx.closePath();
                    ctx.stroke();
                    break;
            }

            ctx.restore();
        };

        // Animation loop
        const animate = () => {
            ctx.fillStyle = 'rgba(10, 10, 10, 0.1)'; // Trail effect
            ctx.fillRect(0, 0, canvas.width, canvas.height);

            dotsRef.current.forEach((dot) => {
                const path = paths[dot.pathIndex];

                // Update position (move left to right)
                dot.progress += dot.speed;

                // Reset when dot goes off-screen
                if (dot.progress > canvas.width + 100) {
                    dot.progress = -100;
                }

                // Calculate base zigzag position
                const baseX = dot.progress;
                const baseY = path.y + Math.sin(dot.progress * path.frequency) * path.amplitude;

                // Apply distortion from click/touch points
                let totalOffsetX = 0;
                let totalOffsetY = 0;

                distortionPointsRef.current.forEach((distortion) => {
                    const dx = baseX - distortion.x;
                    const dy = baseY - distortion.y;
                    const distance = Math.sqrt(dx * dx + dy * dy);
                    const radius = 200; // Influence radius

                    if (distance < radius && distance > 0) {
                        // Push dots away (repulsion)
                        const force = ((radius - distance) / radius) * distortion.strength;
                        const angle = Math.atan2(dy, dx);
                        totalOffsetX += Math.cos(angle) * force;
                        totalOffsetY += Math.sin(angle) * force;
                    }
                });

                // Smoothly interpolate back to base position
                const restoreSpeed = 0.15;
                dot.offsetX += (totalOffsetX - dot.offsetX) * restoreSpeed;
                dot.offsetY += (totalOffsetY - dot.offsetY) * restoreSpeed;

                // Final position with distortion
                dot.x = baseX + dot.offsetX;
                dot.y = baseY + dot.offsetY;

                // Draw connecting line segment (dotted path)
                if (dot.progress > 0 && dot.progress < canvas.width) {
                    ctx.save();

                    // Draw subtle dotted path line
                    ctx.strokeStyle = `rgba(96, 165, 250, ${dot.opacity * 0.15})`;
                    ctx.lineWidth = 1;
                    ctx.setLineDash([3, 8]);

                    const nextX = dot.x + 20;
                    const nextY = path.y + Math.sin(nextX * path.frequency) * path.amplitude;

                    ctx.beginPath();
                    ctx.moveTo(dot.x, dot.y);
                    ctx.lineTo(nextX, nextY);
                    ctx.stroke();

                    ctx.restore();
                }

                // Draw dot
                if (dot.x > -50 && dot.x < canvas.width + 50) {
                    ctx.save();

                    // Glow effect
                    const gradient = ctx.createRadialGradient(dot.x, dot.y, 0, dot.x, dot.y, 12);
                    gradient.addColorStop(0, `rgba(96, 165, 250, ${dot.opacity * 0.4})`);
                    gradient.addColorStop(0.5, `rgba(96, 165, 250, ${dot.opacity * 0.2})`);
                    gradient.addColorStop(1, 'rgba(96, 165, 250, 0)');

                    ctx.fillStyle = gradient;
                    ctx.beginPath();
                    ctx.arc(dot.x, dot.y, 12, 0, Math.PI * 2);
                    ctx.fill();

                    // Main dot
                    ctx.fillStyle = `rgba(96, 165, 250, ${dot.opacity})`;
                    ctx.beginPath();
                    ctx.arc(dot.x, dot.y, 4, 0, Math.PI * 2);
                    ctx.fill();

                    // Draw icon if present (subtle size)
                    if (dot.icon) {
                        drawIcon(ctx, dot.icon, dot.x, dot.y, 20);
                    }

                    ctx.restore();
                }
            });

            // Update and decay distortion points
            distortionPointsRef.current = distortionPointsRef.current.filter((distortion) => {
                distortion.strength *= distortion.decayRate;
                return distortion.strength > 0.5; // Remove weak distortions
            });

            animationFrameRef.current = requestAnimationFrame(animate);
        };

        // Handle click/touch to create distortion
        const handleInteraction = (x: number, y: number) => {
            distortionPointsRef.current.push({
                x,
                y,
                strength: 300, // Increased from 150 for more visible effect
                decayRate: 0.94, // Slower decay (was 0.92) for longer-lasting ripple
            });
        };

        const handleClick = (e: MouseEvent) => {
            handleInteraction(e.clientX, e.clientY);
        };

        const handleTouch = (e: TouchEvent) => {
            // Don't prevent default to allow normal scrolling
            Array.from(e.touches).forEach(touch => {
                handleInteraction(touch.clientX, touch.clientY);
            });
        };

        // Listen on window to capture all clicks (canvas is behind content)
        window.addEventListener('click', handleClick);
        window.addEventListener('touchstart', handleTouch);

        animate();

        return () => {
            window.removeEventListener('resize', resizeCanvas);
            window.removeEventListener('click', handleClick);
            window.removeEventListener('touchstart', handleTouch);
            if (animationFrameRef.current) {
                cancelAnimationFrame(animationFrameRef.current);
            }
        };
    }, []);

    return (
        <canvas
            ref={canvasRef}
            className="fixed inset-0 opacity-50 cursor-pointer"
            style={{ background: '#0a0a0a' }}
        />
    );
};

export default AnimatedBackground;
