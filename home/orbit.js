// 获取挂载点
const container = document.getElementById('canvas-container');
const scene = new THREE.Scene();
scene.background = null; 

const camera = new THREE.PerspectiveCamera(60, container.clientWidth / container.clientHeight, 0.1, 1000);
camera.position.z = 25;

const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
renderer.setSize(container.clientWidth, container.clientHeight);
renderer.setPixelRatio(window.devicePixelRatio);
container.appendChild(renderer.domElement);

const group = new THREE.Group();

const sphereGeo = new THREE.SphereGeometry(7, 32, 32);
const sphereMat = new THREE.MeshBasicMaterial({ color: 0xffffff, transparent: true, opacity: 0.8, wireframe: true });
const sphere = new THREE.Mesh(sphereGeo, sphereMat);
group.add(sphere);

const ringGeo1 = new THREE.TorusGeometry(10, 0.03, 16, 100);
const ringMat1 = new THREE.MeshBasicMaterial({ color: 0x8A2BE2 });
const ring1 = new THREE.Mesh(ringGeo1, ringMat1);
ring1.rotation.x = Math.PI / 2.5;
group.add(ring1);

const ringGeo2 = new THREE.TorusGeometry(13, 0.02, 16, 100);
const ringMat2 = new THREE.MeshBasicMaterial({ color: 0x3b82f6 });
const ring2 = new THREE.Mesh(ringGeo2, ringMat2);
ring2.rotation.x = Math.PI / 2.2;
ring2.rotation.y = Math.PI / 8;
group.add(ring2);

const particlesGeo = new THREE.BufferGeometry();
const particlesCount = 400;
const posArray = new Float32Array(particlesCount * 3);
for(let i = 0; i < particlesCount * 3; i++) { posArray[i] = (Math.random() - 0.5) * 50; }
particlesGeo.setAttribute('position', new THREE.BufferAttribute(posArray, 3));
const particlesMat = new THREE.PointsMaterial({ size: 0.15, color: 0xcbd5e1, transparent: true, opacity: 0.8 });
const particles = new THREE.Points(particlesGeo, particlesMat);
group.add(particles);

scene.add(group);

let mouseX = 0, mouseY = 0, targetX = 0, targetY = 0;

container.addEventListener('mousemove', (event) => {
    const rect = container.getBoundingClientRect();
    mouseX = (event.clientX - rect.left - container.clientWidth / 2);
    mouseY = (event.clientY - rect.top - container.clientHeight / 2);
});

window.addEventListener('resize', () => {
    camera.aspect = container.clientWidth / container.clientHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(container.clientWidth, container.clientHeight);
});

const clock = new THREE.Clock();
function animate() {
    requestAnimationFrame(animate);
    const elapsedTime = clock.getElapsedTime();

    group.rotation.y = elapsedTime * 0.05;
    sphere.rotation.x = elapsedTime * 0.02;

    targetX = mouseX * 0.001;
    targetY = mouseY * 0.001;
    group.rotation.x += 0.05 * (targetY - group.rotation.x);
    group.rotation.y += 0.05 * (targetX - group.rotation.y);

    renderer.render(scene, camera);
}
animate();
