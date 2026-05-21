// home/orbit.js - 完整移植版 (保留原核心 Shader 算法)

const container = document.getElementById('canvas-container');
container.innerHTML = ''; // 清空原有内容

const PARTICLE_COUNT = 90000; // 严格保持原有的 9 万粒子密度
const vertexShader = `
    uniform float uTime; uniform float uMorph; uniform float uPointSize; uniform int uEffectMode; uniform float uEffectIntensity; uniform float uExplosionTime;
    attribute vec3 targetPosition; attribute vec3 targetColor; attribute vec3 color; attribute vec3 randomOffset;
    varying vec3 vColor; varying float vDistance;
    void main() {
        vColor = mix(color, targetColor, uMorph);
        vec3 pos = mix(position, targetPosition, uMorph);
        // 核心动态运动算法：保留原有的波动算法逻辑
        float noise = sin(uTime * 1.5 + position.x * 0.3) * cos(uTime * 1.5 + position.y * 0.3);
        pos += normalize(pos) * noise * 0.2;
        pos.x += sin(uTime * 0.3 + position.z) * 0.1;
        pos.y += cos(uTime * 0.3 + position.x) * 0.1;
        
        vec4 mvPosition = modelViewMatrix * vec4(pos, 1.0);
        vDistance = length(pos);
        gl_PointSize = (uPointSize / -mvPosition.z) * (1.2 + sin(uTime * 3.0 + vDistance * 0.15) * 0.5);
        gl_Position = projectionMatrix * mvPosition;
    }
`;

const fragmentShader = `
    uniform float uTime; varying vec3 vColor; varying float vDistance;
    void main() {
        float dist = distance(gl_PointCoord, vec2(0.5));
        if (dist > 0.5) discard;
        float strength = pow(1.0 - dist * 2.0, 1.6);
        vec3 finalColor = vColor * 2.0;
        float alpha = strength * (0.8 + sin(vDistance * 0.3 + uTime) * 0.2);
        gl_FragColor = vec4(finalColor, alpha);
    }
`;

// 初始化场景
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(35, container.clientWidth / container.clientHeight, 0.1, 1000);
camera.position.z = 45;

const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
renderer.setSize(container.clientWidth, container.clientHeight);
container.appendChild(renderer.domElement);

// 构建粒子几何体
const geometry = new THREE.BufferGeometry();
const positions = new Float32Array(PARTICLE_COUNT * 3);
const colors = new Float32Array(PARTICLE_COUNT * 3);

for (let i = 0; i < PARTICLE_COUNT; i++) {
    const i3 = i * 3;
    const angle = Math.random() * Math.PI * 2;
    const radius = 5 + Math.random() * 20;
    positions[i3] = Math.cos(angle) * radius;
    positions[i3 + 1] = (Math.random() - 0.5) * 20;
    positions[i3 + 2] = Math.sin(angle) * radius;
    colors[i3] = 0.54; colors[i3 + 1] = 0.17; colors[i3 + 2] = 0.89; // 初始紫色
}

geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));
geometry.setAttribute("color", new THREE.BufferAttribute(colors, 3));

const material = new THREE.ShaderMaterial({
    vertexShader, fragmentShader, transparent: true, depthWrite: false, blending: THREE.AdditiveBlending,
    uniforms: { uTime: { value: 0 }, uMorph: { value: 0 }, uPointSize: { value: 200 } }
});

const points = new THREE.Points(geometry, material);
scene.add(points);

function animate() {
    requestAnimationFrame(animate);
    material.uniforms.uTime.value += 0.008;
    points.rotation.y += 0.0025;
    renderer.render(scene, camera);
}
animate();

window.addEventListener('resize', () => {
    camera.aspect = container.clientWidth / container.clientHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(container.clientWidth, container.clientHeight);
});
