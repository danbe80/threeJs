import * as THREE from 'three';

// 1. 장면을 만들고
// 2. 브라우저에 렌더링

// 1 장면 만들기
const scene = new THREE.Scene();

// 2 브라우저에 렌더링
let renderer = new THREE.WebGLRenderer(
    // 어디에 렌더링?
    {
        canvas : document.querySelector('#canvas')
        // 테두리 계단 현상 시 antialias: ture
    });


// 3D model 보여줄때 필요한 것들
// 1. 카메라, 2. 조명, 3. 배경

// 1. 카메라
const camera = new THREE.PerspectiveCamera(30, 1);

// 카메라 위치 셋팅
camera.position.set(0,0,5);
// 카메라 종류 
// PerspectiveCamera (원근법 O)
// OrthographicCamera (원근법 무시)


// 색상 정보를 RGB로 바꿔야 브라우저에서 잘 보임
renderer.outputEncoding = THREE.sRGBEncoding;

// 2. 조명
// 조명 종류
// AmbientLight
// PointLight
// DirectionalLight
const light = new THREE.DirectionalLight(0xffff00, 10);
scene.add(light);

// 3. 배경
scene.background = new THREE.Color('white');


 // GLTE 파일 가져오는 법
let loader = new GLTFLoader();
// 로딩하는데 시간이 조금 걸리므로 끝났을 때 
// 특정 코드를 실행 하고 싶다면 callback fn
loader.load('../shiba/scene.gltf', (gltf) => {
    scene.add(gltf.scene);
    // 1초에 60번 실행됨
    function animate() {
        requestAnimationFrame(animate)
        gltf.scene.rotation.y -= 0.01;
        renderer.render(scene, camera);
    }

    animate();

});


// 마우스 컨트롤 => OrbitControl

