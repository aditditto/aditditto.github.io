import * as THREE from "three";
import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
);

const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

const geometry = new THREE.BoxGeometry(1, 1, 1);
const material = new THREE.MeshBasicMaterial({ color: 0xffdfba });
const cube = new THREE.Mesh(geometry, material);

const lineMaterial = new THREE.LineBasicMaterial({ color: 0xbae1ff });
const points = [];
points.push(new THREE.Vector3(-5, 0, 0));
points.push(new THREE.Vector3(0, 5, 0));
points.push(new THREE.Vector3(5, 0, 0));
const lineGeometry = new THREE.BufferGeometry().setFromPoints(points);
const line = new THREE.Line(lineGeometry, lineMaterial);
const light = new THREE.AmbientLight(0x404040, 100); // soft white light
scene.add(light);

var beerBottle;
const loader = new GLTFLoader();
loader.load(
    "assets/gltf/beer_bottle/scene.gltf",
    function (gltf) {
        beerBottle = gltf;

        beerBottle.scene.scale.setScalar(0.1);
        beerBottle.scene.position.x = 3;
        scene.add(beerBottle.scene);
    },
    undefined,
    function (error) {
        console.log(error);
    }
);

scene.add(cube);
scene.add(line);

camera.position.z = 10;
camera.position.x = 2;
camera.position.y = -1;

function animate() {
    if (beerBottle) {
        beerBottle.scene.rotation.x += 0.02;
        beerBottle.scene.rotation.y += 0.02;
        beerBottle.scene.rotation.z += 0.02;
    }
    cube.rotation.x += 0.01;
    cube.rotation.y += 0.01;
    renderer.render(scene, camera);
}
renderer.setAnimationLoop(animate);
