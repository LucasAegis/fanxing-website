// 获取挂载点，保持与原代码一致
const container = document.getElementById('canvas-container');
const scene = new THREE.Scene();
scene.background = null; 

// 相机设置
const camera = new THREE.PerspectiveCamera(60, container.clientWidth / container.clientHeight, 0.1, 1000);
camera.position.z = 30;

// 渲染器
const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
renderer.setSize(container.clientWidth, container.clientHeight);
renderer.setPixelRatio(window.devicePixelRatio);
container.appendChild(renderer.domElement);

// --- 核心：创建粒子云团背景 ---
const particlesCount = 2000; // 粒子数量，你可以根据需要调整
const particlesGeo = new THREE.BufferGeometry();
const posArray = new Float32Array(particlesCount * 3);

for(let i = 0; i < particlesCount * 3; i++) {
    // 创建一个范围内的随机分布，呈现云团效果
    posArray[i] = (Math.random() - 0.5) * 60;
}
particlesGeo.setAttribute('position', new THREE.BufferAttribute(posArray, 3));

// 材质：使用 AdditiveBlending 增加发光质感
const particlesMat = new THREE.PointsMaterial({ 
    size: 0.12, 
    color: 0x8A2BE2, // 这里的颜色就是你想要的紫色系
    transparent: true, 
    opacity: 0.7, 
    blending: THREE.AdditiveBlending 
});

const particles = new THREE.Points(particlesGeo, particlesMat);
scene.add(particles);

// 响应式处理
window.addEventListener('resize', () => {
    camera.aspect = container.clientWidth / container.clientHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(container.clientWidth, container.clientHeight);
});

// 动画循环
function animate() {
    requestAnimationFrame(animate);
    
    // 简单的粒子漂浮动画
    particles.rotation.y += 0.001;
    particles.rotation.x += 0.0005;
    
    renderer.render(scene, camera);
}
animate();
