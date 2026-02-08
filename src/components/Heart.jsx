import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

const Heart = (props) => {
    const meshRef = useRef();

    const geometry = useMemo(() => {
        try {
            const x = 0, y = 0;
            const shape = new THREE.Shape();
            shape.moveTo(x + 5, y + 5);
            shape.bezierCurveTo(x + 5, y + 5, x + 4, y, x, y);
            shape.bezierCurveTo(x - 6, y, x - 6, y + 7, x - 6, y + 7);
            shape.bezierCurveTo(x - 6, y + 11, x - 3, y + 15.4, x + 5, y + 19);
            shape.bezierCurveTo(x + 12, y + 15.4, x + 16, y + 11, x + 16, y + 7);
            shape.bezierCurveTo(x + 16, y + 7, x + 16, y, x + 10, y);
            shape.bezierCurveTo(x + 7, y, x + 5, y + 5, x + 5, y + 5);

            const extrudeSettings = {
                steps: 2,
                depth: 4,
                bevelEnabled: true,
                bevelThickness: 1,
                bevelSize: 1,
                bevelSegments: 2,
            };

            const geo = new THREE.ExtrudeGeometry(shape, extrudeSettings);
            geo.center();
            return geo;
        } catch (error) {
            console.error('Heart geometry error:', error);
            return new THREE.BoxGeometry(1, 1, 1);
        }
    }, []);

    useFrame((state, delta) => {
        if (meshRef.current) {
            meshRef.current.rotation.y += delta * 0.5;

            const t = state.clock.getElapsedTime();
            const pulse = 0.95 + Math.sin(t * 2.5) * 0.08 + Math.cos(t * 5) * 0.03;

            meshRef.current.scale.set(0.1 * pulse, 0.1 * pulse, 0.1 * pulse);
        }
    });

    return (
        <mesh ref={meshRef} geometry={geometry} rotation={[Math.PI, 0, 0]} {...props}>
            <meshPhysicalMaterial
                color="#ff4d6d"
                emissive="#5e0222"
                emissiveIntensity={0.5}
                roughness={0.1}
                metalness={0.1}
                transmission={0.9}
                thickness={2}
                ior={1.5}
                clearcoat={1}
                clearcoatRoughness={0.1}
                flatShading={true}
            />
        </mesh>
    );
};

export default Heart;
