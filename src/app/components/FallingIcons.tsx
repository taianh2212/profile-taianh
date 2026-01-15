import { useEffect, useState } from 'react';
import { motion, useAnimationFrame } from 'motion/react';
import { Code, Camera, Terminal, Aperture, Cpu, Image, Laptop, SunMedium, Binary, Focus } from 'lucide-react';

interface Icon {
  id: number;
  Icon: any;
  x: number;
  y: number;
  speed: number;
  size: number;
  rotation: number;
  rotationSpeed: number;
}

export function FallingIcons() {
  const [icons, setIcons] = useState<Icon[]>([]);

  const seIcons = [Code, Terminal, Cpu, Laptop, Binary];
  const photographerIcons = [Camera, Aperture, Image, SunMedium, Focus];
  const allIcons = [...seIcons, ...photographerIcons];

  useEffect(() => {
    const newIcons: Icon[] = Array.from({ length: 20 }, (_, i) => ({
      id: i,
      Icon: allIcons[Math.floor(Math.random() * allIcons.length)],
      x: Math.random() * 100,
      y: Math.random() * -100 - 10,
      speed: 0.3 + Math.random() * 0.5,
      size: 20 + Math.random() * 30,
      rotation: Math.random() * 360,
      rotationSpeed: -1 + Math.random() * 2,
    }));
    setIcons(newIcons);
  }, []);

  useAnimationFrame((time, delta) => {
    setIcons((prevIcons) =>
      prevIcons.map((icon) => {
        let newY = icon.y + icon.speed;
        let newRotation = icon.rotation + icon.rotationSpeed;

        // Reset position when icon goes off screen
        if (newY > 110) {
          newY = -10;
          return {
            ...icon,
            y: newY,
            x: Math.random() * 100,
            rotation: newRotation,
          };
        }

        return {
          ...icon,
          y: newY,
          rotation: newRotation,
        };
      })
    );
  });

  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
      {icons.map((icon) => {
        const IconComponent = icon.Icon;
        return (
          <motion.div
            key={icon.id}
            className="absolute"
            style={{
              left: `${icon.x}vw`,
              top: `${icon.y}vh`,
              rotate: icon.rotation,
            }}
          >
            <IconComponent
              size={icon.size}
              className="text-emerald-400/30"
              strokeWidth={1.5}
            />
          </motion.div>
        );
      })}
    </div>
  );
}