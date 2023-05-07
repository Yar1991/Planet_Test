import * as THREE from "three";
import "./style.css";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";
import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";

const appCanvas = document.querySelector(".app-canvas");

const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  100
);
camera.position.z = 15;

const controls = new OrbitControls(camera, appCanvas as HTMLCanvasElement);
controls.update();
controls.autoRotate = true;
controls.autoRotateSpeed = 1;
controls.enableDamping = true;
controls.enablePan = false;
controls.enableZoom = false;

const light = new THREE.PointLight(0xffffff, 1.3);
light.position.set(-10, 10, 10);
scene.add(light);

const loader = new GLTFLoader();
loader.load(
  "/assets/saturn_model/scene.gltf",
  (obj) => {
    const model = obj.scene;
    scene.add(model);
    model.position.set(0, 0, 0);
    model.scale.set(3, 3, 3);
    model.rotation.set(0, 0, 10);
  },
  undefined,
  (err) => {
    console.log(err);
  }
);

const renderer = new THREE.WebGLRenderer({
  canvas: appCanvas as HTMLCanvasElement,
});
renderer.setPixelRatio(2);
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.render(scene, camera);

function loop() {
  controls.update();
  renderer.render(scene, camera);
}

renderer.setAnimationLoop(loop);

window.addEventListener("resize", () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});
