import React, { useState, Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import * as THREE from 'three';
import confetti from 'canvas-confetti';
import Heart from './components/Heart';
import Particles from './components/Particles';
import Explosion from './components/Explosion';
import Overlay from './components/Overlay';
import Message3D from './components/Message3D';

function TestBox() {
  return (
    <mesh position={[0, 0, 0]}>
      <boxGeometry args={[2, 2, 2]} />
      <meshStandardMaterial color="#ff4d6d" emissive="#5e0222" wireframe={false} />
    </mesh>
  );
}

function App() {
  const [explode, setExplode] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [message, setMessage] = useState('I love you');

  const handleYes = () => {
    setExplode(true);
    setTimeout(() => setExplode(false), 3500);

    setTimeout(() => {
      setIsSuccess(true);
      try {
        confetti({
          particleCount: 100,
          spread: 70,
          origin: { y: 0.6 },
        });
        setTimeout(() => {
          confetti({
            particleCount: 50,
            spread: 100,
            origin: { y: 0.5, x: 0.2 },
          });
        }, 100);
        setTimeout(() => {
          confetti({
            particleCount: 50,
            spread: 100,
            origin: { y: 0.5, x: 0.8 },
          });
        }, 200);
      } catch (e) {
        console.error('Confetti error:', e);
      }
    }, 500);
  };

  return (
    <div style={{ width: '100%', height: '100vh', position: 'relative', background: '#0a0000' }}>
      <Canvas 
        camera={{ position: [0, 0, 5], fov: 45 }} 
        style={{ display: 'block' }}
      >
        <ambientLight intensity={0.8} />
        <pointLight position={[10, 10, 10]} intensity={1} />

        <Suspense fallback={null}>
          <TestBox />
          {/* Show 3D message near heart */}
          <Message3D text={message} position={[0, -2.5, 4]} />
        </Suspense>

        <OrbitControls enableZoom={false} enablePan={false} enableRotate={false} />
      </Canvas>

      <Overlay onYes={handleYes} isSuccess={isSuccess} message={message} setMessage={setMessage} />
    </div>
  );
}

export default App;
