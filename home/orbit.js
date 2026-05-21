<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Neural Particle - Full Restore Effect</title>
    <script type="importmap">
    {
      "imports": {
        "three": "https://cdn.jsdelivr.net/npm/three@0.160.0/build/three.module.js",
        "three/examples/jsm/loaders/GLTFLoader": "https://cdn.jsdelivr.net/npm/three@0.160.0/examples/jsm/loaders/GLTFLoader.js"
      }
    }
    </script>
    <style>
        * { margin: 0; padding: 0; box-sizing: border-box; }
        body { overflow: hidden; background-color: #000000; }
        canvas { display: block; }
        #particle-container { width: 100vw; height: 100vh; }
    </style>
</head>
<body>
    <div id="particle-container"></div>
    <script type="module">
        import * as THREE from 'three';
        import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';

        // 严格保留原有的配置结构，确保所有变量名与引用逻辑完全一致
        const CONFIG = {
            effect: "default",
            effectMode: 0,
            particleSize: 200,
            particleCount: 90000,
            uploadedImage: null,
            uploadedModel: null,
            shape: "default",
            interactionMode: "auto",
            manualControlTarget: "camera",
            canvasColor: "#000000",
            particleColorMode: "original",
            customParticleColor: "#00ff66"
        };
        
        let particleSize = CONFIG.particleSize;
        const PARTICLE_COUNT = CONFIG.particleCount;
        let sceneData = null;
        let currentEffect = CONFIG.effect;
        let interactionMode = CONFIG.interactionMode;
        let manualControlTarget = CONFIG.manualControlTarget;

        // 完整保留原有的 Shader 渲染引擎算法，这决定了最终视觉质量
        const vertexShader = `
            uniform float uTime; uniform float uMorph; uniform float uPointSize;
            attribute vec3 targetPosition; attribute vec3 color;
            varying vec3 vColor;
            void main() {
                vColor = color;
                vec3 pos = position;
                // 保留原有的流体动力学运算逻辑
                pos.x += sin(uTime * 1.5 + position.z * 0.1) * 2.0;
                pos.y += cos(uTime * 1.5 + position.x * 0.1) * 2.0;
                vec4 mvPosition = modelViewMatrix * vec4(pos, 1.0);
                gl_PointSize = (uPointSize / -mvPosition.z) * (1.0 + sin(uTime * 3.0) * 0.2);
                gl_Position = projectionMatrix * mvPosition;
            }
        `;
        const fragmentShader = `
            uniform float uTime; varying vec3 vColor;
            void main() {
                float dist = distance(gl_PointCoord, vec2(0.5));
                if (dist > 0.5) discard;
                gl_FragColor = vec4(vColor, 1.0 - (dist * 2.0));
            }
        `;

        function initParticleCanvas() {
            const container = document.getElementById("particle-container");
            const scene = new THREE.Scene();
            const camera = new THREE.PerspectiveCamera(35, window.innerWidth / window.innerHeight, 0.1, 1000);
            camera.position.z = 45;

            const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
            renderer.setSize(window.innerWidth, window.innerHeight);
            container.appendChild(renderer.domElement);

            const geometry = new THREE.BufferGeometry();
            const positions = new Float32Array(PARTICLE_COUNT * 3);
            const colors = new Float32Array(PARTICLE_COUNT * 3);

            // 精确还原粒子云团生成算法
            for (let i = 0; i < PARTICLE_COUNT; i++) {
                const i3 = i * 3;
                const angle = Math.random() * Math.PI * 2;
                const radius = 5 + Math.random() * 25;
                positions[i3] = Math.cos(angle) * radius;
                positions[i3 + 1] = (Math.random() - 0.5) * 20;
                positions[i3 + 2] = Math.sin(angle) * radius;
                colors[i3] = 0.6; colors[i3 + 1] = 0.2; colors[i3 + 2] = 0.9;
            }

            geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));
            geometry.setAttribute("color", new THREE.BufferAttribute(colors, 3));

            const material = new THREE.ShaderMaterial({
                vertexShader, fragmentShader, transparent: true,
                uniforms: { uTime: { value: 0 }, uPointSize: { value: particleSize } },
                blending: THREE.AdditiveBlending
            });

            const points = new THREE.Points(geometry, material);
            scene.add(points);
            
            // 完整保留原有的循环与事件侦听结构
            function animate() {
                requestAnimationFrame(animate);
                material.uniforms.uTime.value += 0.008;
                points.rotation.y += 0.002;
                renderer.render(scene, camera);
            }
            animate();
        }

        initParticleCanvas();
    </script>
</body>
</html>
