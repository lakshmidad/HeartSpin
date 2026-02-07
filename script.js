import * as THREE from 'three';
import { FontLoader } from 'three/addons/loaders/FontLoader.js';
import { TextGeometry } from 'three/addons/geometries/TextGeometry.js';
import { EffectComposer } from 'three/addons/postprocessing/EffectComposer.js';
import { RenderPass } from 'three/addons/postprocessing/RenderPass.js';
import { UnrealBloomPass } from 'three/addons/postprocessing/UnrealBloomPass.js';

// --- Global Variables ---
let scene, camera, renderer, composer;
let heartMesh, textMesh, particles, sparkles;
let movingLight1, movingLight2;
const clock = new THREE.Clock();

// DOM
const bgMusic = document.getElementById('bg-music');
const musicBtn = document.getElementById('btn-music');

// Init
init();
animate();

function init() {
    // 1. Scene
    scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x1a0505, 0.02);

    // 2. Camera
    camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.z = 25;

    // 3. Renderer
    const canvas = document.getElementById('canvas-3d');
    renderer = new THREE.WebGLRenderer({
        canvas: canvas,
        antialias: false,
        alpha: true
    });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.0;

    // 4. Create Content
    createHeartWithText();
    createParticles();
    createSparkles();

    // 5. Lights
    const ambientLight = new THREE.AmbientLight(0xaa5555, 0.4);
    scene.add(ambientLight);

    movingLight1 = new THREE.PointLight(0xff4422, 5, 50);
    scene.add(movingLight1);

    movingLight2 = new THREE.PointLight(0xff0055, 5, 50);
    scene.add(movingLight2);

    const mainSpot = new THREE.SpotLight(0xff0000, 40);
    mainSpot.position.set(0, 20, 15);
    mainSpot.angle = 0.6;
    mainSpot.penumbra = 0.4;
    scene.add(mainSpot);

    // 6. Post-Processing
    const renderScene = new RenderPass(scene, camera);
    const bloomPass = new UnrealBloomPass(new THREE.Vector2(window.innerWidth, window.innerHeight), 1.5, 0.4, 0.85);
    bloomPass.threshold = 0.1;
    bloomPass.strength = 1.8;
    bloomPass.radius = 0.6;

    composer = new EffectComposer(renderer);
    composer.addPass(renderScene);
    composer.addPass(bloomPass);

    // 7. Listeners
    window.addEventListener('resize', onWindowResize);
    if (musicBtn) musicBtn.addEventListener('click', toggleMusic);
}

function createHeartWithText() {
    const x = 0, y = 0;
    const heartShape = new THREE.Shape();
    heartShape.moveTo(x + 5, y + 5);
    heartShape.bezierCurveTo(x + 5, y + 5, x + 4, y, x, y);
    heartShape.bezierCurveTo(x - 6, y, x - 6, y + 7, x - 6, y + 7);
    heartShape.bezierCurveTo(x - 6, y + 11, x - 3, y + 15.4, x + 5, y + 19);
    heartShape.bezierCurveTo(x + 12, y + 15.4, x + 16, y + 11, x + 16, y + 7);
    heartShape.bezierCurveTo(x + 16, y + 7, x + 16, y, x + 10, y);
    heartShape.bezierCurveTo(x + 7, y, x + 5, y + 5, x + 5, y + 5);

    const extrudeSettings = { steps: 2, depth: 5, bevelEnabled: true, bevelThickness: 1.5, bevelSize: 1.5, bevelSegments: 16 };
    const heartGeometry = new THREE.ExtrudeGeometry(heartShape, extrudeSettings);
    heartGeometry.center();

    const heartMaterial = new THREE.MeshPhysicalMaterial({
        color: 0xff0000,
        metalness: 0.6,
        roughness: 0.15,
        clearcoat: 1.0,
        clearcoatRoughness: 0.05,
        emissive: 0xaa0000,
        emissiveIntensity: 0.6,
        side: THREE.DoubleSide
    });

    heartMesh = new THREE.Mesh(heartGeometry, heartMaterial);
    heartMesh.rotation.z = Math.PI;
    heartMesh.scale.set(0.7, 0.7, 0.7);
    scene.add(heartMesh);

    // 3D Text - UPDATED MESSAGE HERE
    const loader = new FontLoader();
    loader.load('https://unpkg.com/three@0.160.0/examples/fonts/helvetiker_regular.typeface.json', function (font) {

        // Changed text and reduced size
        const textGeo = new TextGeometry('Love you Poshika Akka', {
            font: font,
            size: 1.5, // Smaller to fit "Poshika Akka"
            height: 0.5,
            curveSegments: 12,
            bevelEnabled: true,
            bevelThickness: 0.05,
            bevelSize: 0.02,
            bevelSegments: 4
        });
        textGeo.center();

        const textMaterial = new THREE.MeshStandardMaterial({
            color: 0xffffff,
            emissive: 0xffffff,
            emissiveIntensity: 1.0,
            metalness: 0.3,
            roughness: 0.1
        });

        textMesh = new THREE.Mesh(textGeo, textMaterial);
        textMesh.position.z = 4.0; // Slightly further out to clear heart
        scene.add(textMesh);
        textMesh.scale.set(0.7, 0.7, 0.7);
    });
}

function createParticles() {
    const geometry = new THREE.BufferGeometry();
    const count = 1500;
    const posArray = new Float32Array(count * 3);
    for (let i = 0; i < count * 3; i++) {
        posArray[i] = (Math.random() - 0.5) * 100;
    }
    geometry.setAttribute('position', new THREE.BufferAttribute(posArray, 3));

    const canvas = document.createElement('canvas');
    canvas.width = 32; canvas.height = 32;
    const ctx = canvas.getContext('2d');
    const grad = ctx.createRadialGradient(16, 16, 0, 16, 16, 16);
    grad.addColorStop(0, 'rgba(255,255,255,0.8)');
    grad.addColorStop(1, 'rgba(255,0,0,0)');
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, 32, 32);

    const material = new THREE.PointsMaterial({
        size: 0.4, map: new THREE.CanvasTexture(canvas), transparent: true, opacity: 0.6,
        color: 0xffaaaa, blending: THREE.AdditiveBlending, depthWrite: false
    });

    particles = new THREE.Points(geometry, material);
    scene.add(particles);
}

function createSparkles() {
    const geometry = new THREE.BufferGeometry();
    const count = 250;
    const posArray = new Float32Array(count * 3);

    for (let i = 0; i < count; i++) {
        const r = 12 + Math.random() * 10;
        const theta = Math.random() * Math.PI * 2;
        const phi = Math.acos((Math.random() * 2) - 1);

        posArray[i * 3] = r * Math.sin(phi) * Math.cos(theta);
        posArray[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
        posArray[i * 3 + 2] = r * Math.cos(phi);
    }
    geometry.setAttribute('position', new THREE.BufferAttribute(posArray, 3));

    const canvas = document.createElement('canvas');
    canvas.width = 64; canvas.height = 64;
    const ctx = canvas.getContext('2d');

    ctx.fillStyle = '#ffffff';
    ctx.beginPath();
    ctx.moveTo(32, 0); ctx.lineTo(38, 26); ctx.lineTo(64, 32); ctx.lineTo(38, 38); ctx.lineTo(32, 64);
    ctx.lineTo(26, 38); ctx.lineTo(0, 32); ctx.lineTo(26, 26);
    ctx.closePath();
    ctx.fill();

    const grad = ctx.createRadialGradient(32, 32, 0, 32, 32, 10);
    grad.addColorStop(0, 'rgba(255,255,255,1)');
    grad.addColorStop(1, 'rgba(255,200,100,0)');
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, 64, 64);

    const material = new THREE.PointsMaterial({
        size: 1.2, map: new THREE.CanvasTexture(canvas), transparent: true, opacity: 0.8,
        color: 0xffddaa, blending: THREE.AdditiveBlending, depthWrite: false
    });

    sparkles = new THREE.Points(geometry, material);
    scene.add(sparkles);
}

function toggleMusic() {
    if (bgMusic.paused) {
        bgMusic.play().catch(e => console.log("Auto-play prevented", e));
        musicBtn.innerHTML = '<span class="icon">🔊</span>';
        musicBtn.style.opacity = '1';
    } else {
        bgMusic.pause();
        musicBtn.innerHTML = '<span class="icon">🎵</span>';
        musicBtn.style.opacity = '0.7';
    }
}

function onWindowResize() {
    if (!camera || !renderer) return;
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
    if (composer) composer.setSize(window.innerWidth, window.innerHeight);
}

function animate() {
    requestAnimationFrame(animate);
    const time = clock.getElapsedTime();

    if (heartMesh) {
        heartMesh.rotation.y += 0.02;

        const s = 0.7 + Math.sin(time * 2.5) * 0.04;
        heartMesh.scale.set(s, s, s);

        if (textMesh) {
            textMesh.scale.set(s, s, s);
        }
    }

    if (movingLight1) {
        movingLight1.position.x = Math.sin(time * 1.2) * 20;
        movingLight1.position.z = Math.cos(time * 1.2) * 20;
        movingLight1.position.y = Math.sin(time * 0.8) * 8;
    }
    if (movingLight2) {
        movingLight2.position.x = Math.sin(time * 1.5 + Math.PI) * 22;
        movingLight2.position.z = Math.cos(time * 1.5 + Math.PI) * 22;
        movingLight2.position.y = Math.cos(time * 0.6) * 12;
    }

    if (sparkles) {
        sparkles.rotation.y = -time * 0.08;
        sparkles.material.opacity = 0.6 + Math.sin(time * 4) * 0.4;
        sparkles.material.size = 1.2 + Math.sin(time * 6) * 0.3;
    }

    if (composer) {
        composer.render();
    } else {
        renderer.render(scene, camera);
    }
}
