import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

const Particles = ({ count = 2000 }) => {
    const mesh = useRef();

    const dummy = useMemo(() => new THREE.Object3D(), []);

    const particles = useMemo(() => {
        const temp = [];
        for (let i = 0; i < count; i++) {
            const t = Math.random() * 100;
            const factor = 20 + Math.random() * 100;
            const speed = 0.01 + Math.random() / 200;
            const x = (Math.random() - 0.5) * 2; // -1 to 1
            const y = (Math.random() - 0.5) * 2;
            const z = (Math.random() - 0.5) * 2;

            temp.push({ t, factor, speed, x, y, z, mx: 0, my: 0 });
        }
        return temp;
    }, [count]);

    useFrame((state) => {
        if (!mesh.current) return;

        particles.forEach((particle, i) => {
            let { t, factor, speed, x, y, z } = particle;
            t = particle.t += speed / 2;
            const a = Math.cos(t) + Math.sin(t * 1) / 10;
            const b = Math.sin(t) + Math.cos(t * 2) / 10;
            const s = Math.cos(t);

            particle.mx += (state.mouse.x * 10 - particle.mx) * 0.02;
            particle.my += (state.mouse.y * 10 - particle.my) * 0.02;

            dummy.position.set(
                (particle.mx / 10) * a + x * factor + Math.cos((t / 10) * factor) + (Math.sin(t * 1) * factor) / 10,
                (particle.my / 10) * b + y * factor + Math.sin((t / 10) * factor) + (Math.cos(t * 2) * factor) / 10,
                (particle.my / 10) * b + z * factor + Math.cos((t / 10) * factor) + (Math.sin(t * 3) * factor) / 10
            );
            dummy.scale.set(s, s, s);
            dummy.rotation.set(s * 5, s * 5, s * 5);
            dummy.updateMatrix();

            mesh.current.setMatrixAt(i, dummy.matrix);
        });
        mesh.current.instanceMatrix.needsUpdate = true;
    });

    return (
        <instancedMesh ref={mesh} args={[null, null, count]}>
            <dodecahedronGeometry args={[0.2, 0]} />
            <meshPhongMaterial color="#ffbdc8" />
        </instancedMesh>
    );
};

export default Particles;
