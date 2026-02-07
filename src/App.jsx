import React, { useState, Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';

function App() {
  return (
    <div className="relative w-full h-screen bg-black text-white">
      <div className="absolute inset-0 flex items-center justify-center z-10 pointer-events-none">
        <h1>Debug Mode: visible?</h1>
      </div>
      <Canvas>
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} />
        <mesh>
          <boxGeometry />
          <meshStandardMaterial color="orange" />
        </mesh>
        <OrbitControls />
      </Canvas>
    </div>
  );
}

export default App;
