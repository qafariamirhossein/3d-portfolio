import React, { useMemo, useCallback } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { useTheme } from '../../contexts/ThemeContext';

interface ParticlesProps {
  count?: number;
}

const Particles: React.FC<ParticlesProps> = ({ count = 2000 }) => {
  const { theme } = useTheme();
  
  // Create particles
  const particles = useMemo(() => {
    const temp = [];
    for (let i = 0; i < count; i++) {
      const time = Math.random() * 100;
      const factor = 20 + Math.random() * 100;
      const speed = 0.01 + Math.random() / 200;
      const x = Math.random() * 2000 - 1000;
      const y = Math.random() * 2000 - 1000;
      const z = Math.random() * 2000 - 1000;
      
      temp.push({ time, factor, speed, x, y, z });
    }
    return temp;
  }, [count]);

  const ref = React.useRef<THREE.Points>(null);

  useFrame((state) => {
    if (ref.current) {
      ref.current.rotation.x = state.clock.elapsedTime * 0.0005;
      ref.current.rotation.y = state.clock.elapsedTime * 0.001;
      
      particles.forEach((particle, i) => {
        if (ref.current) {
          const array = ref.current.geometry.attributes.position.array as Float32Array;
          const i3 = i * 3;
          
          array[i3] = particle.x + Math.cos((particle.time + state.clock.elapsedTime) * particle.speed) * particle.factor;
          array[i3 + 1] = particle.y + Math.sin((particle.time + state.clock.elapsedTime) * particle.speed) * particle.factor;
          array[i3 + 2] = particle.z + Math.cos((particle.time + state.clock.elapsedTime) * particle.speed) * particle.factor;
          
          if (ref.current.geometry.attributes.position) {
            ref.current.geometry.attributes.position.needsUpdate = true;
          }
        }
      });
    }
  });

  const points = useMemo(() => {
    return particles.map((p) => new THREE.Vector3(p.x, p.y, p.z));
  }, [particles]);

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={points.length}
          array={new Float32Array(points.map((p) => p.toArray()).flat())}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={2}
        color={theme === 'dark' ? '#915EFF' : '#4a5568'}
        sizeAttenuation={true}
        depthWrite={false}
      />
    </points>
  );
};

export default Particles;

