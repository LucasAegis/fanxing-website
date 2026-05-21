<!-- 在你的 HTML 中保留这个容器 -->
<div id="canvas-container" style="width: 100%; height: 100%;"></div>

<script src="https://cdn.jsdelivr.net/npm/three@0.160.0/build/three.min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/three@0.160.0/examples/jsm/loaders/GLTFLoader.js"></script>

<script>
// ==================== 配置 ====================
const CONFIG = {
    particleCount: 60000,           // 可根据性能调整（建议 40000~80000）
    particleSize: 180,
    canvasColor: "#000000",
    customParticleColor: "#00ff66",
    particleColorMode: "original",  // "original" 或 "custom"
    effect: "default"               // default, scatter, explode, vortex, pulse, wave
};

// ==================== 主要代码 ====================
const container = document.getElementById('canvas-container');

const scene = new THREE.Scene();
scene.background = null;

const camera = new THREE.PerspectiveCamera(35, container.clientWidth / container.clientHeight, 0.1, 1000);
camera.position.z = 45;

const renderer = new THREE.WebGLRenderer({ 
    alpha: true, 
    antialias: true,
    powerPreference: "high-performance"
});
renderer.setSize(container.clientWidth, container.clientHeight);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
container.appendChild(renderer.domElement);

// ==================== 保留的球体 ====================
const sphereGeo = new THREE.SphereGeometry(7, 32, 32);
const sphereMat = new THREE.MeshBasicMaterial({ 
    color: 0xffffff, 
    transparent: true, 
    opacity: 0.15, 
    wireframe: true 
});
const sphere = new THREE.Mesh(sphereGeo, sphereMat);
scene.add(sphere);

// ==================== 大型粒子系统 ====================
let points, material, geometry;
let morphFactor = 0;
let effectIntensity = 0;
let targetEffectIntensity = 0;
let explosionTime = 0;
let explosionTriggered = false;

const vertexShader = `...`;   // （太长，下面单独给出）
const fragmentShader = `...`; // （下面单独给出）

// 初始化粒子
function initParticles() {
    geometry = new THREE.BufferGeometry();
    
    const positions = new Float32Array(CONFIG.particleCount * 3);
    const targetPositions = new Float32Array(CONFIG.particleCount * 3);
    const colors = new Float32Array(CONFIG.particleCount * 3);
    const targetColors = new Float32Array(CONFIG.particleCount * 3);
    const randomOffsets = new Float32Array(CONFIG.particleCount * 3);

    const green = new THREE.Color(0x00ff66);
    const white = new THREE.Color(0xffffff);

    for (let i = 0; i < CONFIG.particleCount; i++) {
        const i3 = i * 3;
        const t = (Math.random() - 0.5) * 8;
        const angle = Math.random() * Math.PI * 2;
        const radius = 12 + Math.random() * 8;

        positions[i3]     = radius * Math.cos(angle);
        positions[i3 + 1] = t * 3;
        positions[i3 + 2] = radius * Math.sin(angle);

        targetPositions[i3] = positions[i3];
        targetPositions[i3 + 1] = positions[i3 + 1];
        targetPositions[i3 + 2] = positions[i3 + 2];

        randomOffsets[i3]     = (Math.random() - 0.5) * 3;
        randomOffsets[i3 + 1] = (Math.random() - 0.5) * 3;
        randomOffsets[i3 + 2] = (Math.random() - 0.5) * 3;

        const col = Math.random() > 0.6 ? green : white;
        colors[i3] = col.r; colors[i3+1] = col.g; colors[i3+2] = col.b;
        targetColors[i3] = col.r; targetColors[i3+1] = col.g; targetColors[i3+2] = col.b;
    }

    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute('targetPosition', new THREE.BufferAttribute(targetPositions, 3));
    geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));
    geometry.setAttribute('targetColor', new THREE.BufferAttribute(targetColors, 3));
    geometry.setAttribute('randomOffset', new THREE.BufferAttribute(randomOffsets, 3));

    material = new THREE.ShaderMaterial({
        vertexShader: vertexShader,
        fragmentShader: fragmentShader,
        transparent: true,
        depthWrite: false,
        blending: THREE.AdditiveBlending,
        uniforms: {
            uTime: { value: 0 },
            uMorph: { value: 0 },
            uPointSize: { value: CONFIG.particleSize },
            uEffectMode: { value: 0 },
            uEffectIntensity: { value: 0 },
            uExplosionTime: { value: 0 },
            uCanvasLightness: { value: 0.1 },
            uParticleColorMode: { value: CONFIG.particleColorMode === "custom" ? 1 : 0 },
            uCustomParticleColor: { value: new THREE.Vector3(0.0, 1.0, 0.4) }
        }
    });

    points = new THREE.Points(geometry, material);
    scene.add(points);
}

// ==================== Shader（核心）===================
const vertexShader = `
uniform float uTime; uniform float uMorph; uniform float uPointSize;
uniform int uEffectMode; uniform float uEffectIntensity; uniform float uExplosionTime;
uniform float uCanvasLightness; uniform float uParticleColorMode; uniform vec3 uCustomParticleColor;

attribute vec3 targetPosition; attribute vec3 targetColor; attribute vec3 color; attribute vec3 randomOffset;

varying vec3 vColor; varying float vDistance;

vec3 mod289(vec3 x){return x-floor(x*(1./289.))*289.;}
vec2 mod289(vec2 x){return x-floor(x*(1./289.))*289.;}
vec3 permute(vec3 x){return mod289(((x*34.)+1.)*x);}
float snoise(vec2 v){
    const vec4 C=vec4(0.211324865405187,0.366025403784439,-0.577350269189626,0.024390243902439);
    vec2 i=floor(v+dot(v,C.yy)); vec2 x0=v-i+dot(i,C.xx);
    vec2 i1=(x0.x>x0.y)?vec2(1.,0.):vec2(0.,1.);
    vec4 x12=x0.xyxy+C.xxzz; x12.xy-=i1;
    i=mod289(i); vec3 p=permute(permute(i.y+vec3(0.,i1.y,1.))+i.x+vec3(0.,i1.x,1.));
    vec3 m=max(0.5-vec3(dot(x0,x0),dot(x12.xy,x12.xy),dot(x12.zw,x12.zw)),0.);
    m=m*m; m=m*m;
    vec3 x=2.*fract(p*C.www)-1.; vec3 h=abs(x)-0.5; vec3 ox=floor(x+0.5);
    vec3 a0=x-ox; m*=1.79284291400159-0.85373472095314*(a0*a0+h*h);
    vec3 g; g.x=a0.x*x0.x+h.x*x0.y; g.yz=a0.yz*x12.xz+h.yz*x12.yw;
    return 130.*dot(m,g);
}

void main(){
    vec3 mixedBase = mix(color, targetColor, uMorph);
    vColor = mix(mixedBase, uCustomParticleColor, uParticleColorMode);
    vec3 pos = mix(position, targetPosition, uMorph);
    vec3 originalPos = pos;

    float effectMix = uEffectIntensity;
    int mode = uEffectMode;

    if(mode == 0){ // default
        float noise = sin(uTime*1.5+pos.x*0.3)*cos(uTime*1.5+pos.y*0.3);
        pos += normalize(pos)*noise*(0.2*(1.-uMorph));
    } else if(mode == 1){ // scatter
        // ... (省略部分，可根据需要完整保留)
    } // 其他特效可继续添加

    vec4 mvPosition = modelViewMatrix * vec4(pos, 1.0);
    vDistance = length(pos);
    gl_PointSize = (uPointSize / -mvPosition.z) * (1.2 + sin(uTime*3.+vDistance*0.15)*0.5);
    gl_Position = projectionMatrix * mvPosition;
}
`;

const fragmentShader = `
uniform float uTime; uniform float uCanvasLightness;
varying vec3 vColor; varying float vDistance;

void main(){
    float dist = distance(gl_PointCoord, vec2(0.5));
    if(dist > 0.5) discard;
    float strength = pow(1.0 - dist*2.0, 1.6);
    vec3 finalColor = vColor * 2.0;
    float alpha = strength * (0.8 + sin(vDistance*0.3 + uTime)*0.2);
    gl_FragColor = vec4(finalColor, alpha);
}
`;

// ==================== 动画循环 ====================
const clock = new THREE.Clock();

function animate() {
    requestAnimationFrame(animate);
    const elapsed = clock.getElapsedTime();

    if (points) {
        points.rotation.y = elapsed * 0.03;
        material.uniforms.uTime.value = elapsed;
        material.uniforms.uMorph.value = morphFactor;
        material.uniforms.uEffectIntensity.value = effectIntensity;
    }

    sphere.rotation.x = elapsed * 0.015;
    sphere.rotation.y = elapsed * 0.02;

    renderer.render(scene, camera);
}

// ==================== 窗口调整 ====================
window.addEventListener('resize', () => {
    camera.aspect = container.clientWidth / container.clientHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(container.clientWidth, container.clientHeight);
});

// ==================== 初始化 ====================
initParticles();
animate();

// ==================== 暴露控制接口（方便后续调用）===================
window.particleSystem = {
    setEffect: (effectName) => {
        const modes = {default:0, scatter:1, explode:2, vortex:3, pulse:4, wave:5};
        material.uniforms.uEffectMode.value = modes[effectName] || 0;
        targetEffectIntensity = 1;
    },
    explode: () => {
        explosionTriggered = true;
        explosionTime = 0;
        targetEffectIntensity = 1;
    },
    setMorph: (value) => { morphFactor = value; },
    loadImage: (imgUrl) => { /* 调用 processImage */ }
};
</script>
