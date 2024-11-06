import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import { OBJLoader } from "three/examples/jsm/loaders/OBJLoader.js";
import { MTLLoader } from "three/examples/jsm/loaders/MTLLoader.js";

const scene = new THREE.Scene();
scene.background = new THREE.Color(0xdddddd);
const hlight = new THREE.AmbientLight(0x404040, 1);
scene.add(hlight);

const camera = new THREE.PerspectiveCamera(
  100,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);

const renderer = new THREE.WebGLRenderer({ alpha: true });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setAnimationLoop(animate);
document.body.appendChild(renderer.domElement);

camera.position.z = 5;

const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
directionalLight.position.set(1, 1, 1).normalize();
scene.add(directionalLight);

// const pointLight = new THREE.PointLight(0xffffff, 1, 100);
// pointLight.position.set(10, 10, 10);
// scene.add(pointLight);

// Load the GLTF model (if needed)
const gltfLoader = new GLTFLoader();
gltfLoader.load(
  "./data/yellow_cup.glb",
  (gltf) => {
    console.log(gltf);
    gltf.scene.scale.set(0.8, 0.8, 0.8);
    gltf.scene.position.set(0, -1, 2);
    scene.add(gltf.scene);
  },
  undefined,
  (error) => {
    console.error(error);
  }
);

// const objLoader = new OBJLoader();
// objLoader.load("./data/airpodspro2.obj", (object) => {
//   console.log(object);
//   object.scale.set(0.5, 0.5, 0.5);
//   scene.add(object);
// });

// Load the MTL and OBJ models
const mtlLoader = new MTLLoader();
mtlLoader.load(
  "./data/airpodspro2.mtl",
  (materials) => {
    materials.preload();

    const objLoader = new OBJLoader();
    objLoader.setMaterials(materials);

    objLoader.load(
      "./data/airpodspro2.obj",
      (object) => {
        console.log(object);
        object.scale.set(0.5, 0.5, 0.5);
        scene.add(object);
      },
      undefined,
      (error) => {
        console.error(error);
      }
    );
  },
  undefined,
  (error) => {
    console.error(error);
  }
);

function animate() {
  scene.rotation.y += 0.005;
  renderer.render(scene, camera);
}
