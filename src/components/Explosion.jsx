import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

const Explosion = () => {
    const points = useRef();

    // Create 5000 particles
    const count = 5000;

    const [positions, vs, colors] = useMemo(() => {
        const pos = new Float32Array(count * 3);
        const v = new Float32Array(count * 3);
        const col = new Float32Array(count * 3);
        const color = new THREE.Color();

        for (let i = 0; i < count; i++) {
            // Start at center
            pos[i * 3] = (Math.random() - 0.5) * 2;
            pos[i * 3 + 1] = (Math.random() - 0.5) * 2;
            pos[i * 3 + 2] = (Math.random() - 0.5) * 2;

            // Random velocity outward
            const theta = Math.random() * Math.PI * 2;
            const phi = Math.acos(Math.random() * 2 - 1);
            const speed = 0.1 + Math.random() * 0.5;

            v[i * 3] = speed * Math.sin(phi) * Math.cos(theta);
            v[i * 3 + 1] = speed * Math.sin(phi) * Math.sin(theta);
            v[i * 3 + 2] = speed * Math.cos(phi);

            // Colors: gold, pink, red
            if (i % 3 === 0) color.set('#ff0066'); // Pink
            else if (i % 3 === 1) color.set('#ffd700'); // Gold
            else color.set('#ffffff'); // White

            col[i * 3] = color.r;
            col[i * 3 + 1] = color.g;
            col[i * 3 + 2] = color.b;
        }
        return [pos, v, col];
    }, []);

    useFrame(() => {
        if (!points.current) return;

        // Update positions
        const positionsAttr = points.current.geometry.attributes.position;
        const array = positionsAttr.array;

        for (let i = 0; i < count; i++) {
            // Add velocity
            array[i * 3] += vs[i * 3];
            array[i * 3 + 1] += vs[i * 3 + 1];
            array[i * 3 + 2] += vs[i * 3 + 2];

            // Gravity or drag? Maybe slight drag
            vs[i * 3] *= 0.98;
            vs[i * 3 + 1] *= 0.98;
            vs[i * 3 + 2] *= 0.98;
        }

        positionsAttr.needsUpdate = true;
    });

    return (
        <points ref={points}>
            <bufferGeometry>
                <bufferAttribute
                    attach="attributes-position"
                    count={count}
                    array={positions}
                    itemSize={3}
                />
                <bufferAttribute
                    attach="attributes-color"
                    count={count}
                    array={colors}
                    itemSize={3}
                />
            </bufferGeometry>
            <pointsMaterial
                size={0.15}
                vertexColors
                transparent
                opacity={0.8}
                sizeAttenuation
                depthWrite={false}
                blending={THREE.AdditiveBlending}
            />
        </points>
    );
};

export default Explosion;
