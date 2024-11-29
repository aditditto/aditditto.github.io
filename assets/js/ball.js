import * as THREE from "three";

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

scene.add(cube);
scene.add(line);

camera.position.z = 10;
camera.position.x = 2;
camera.position.y = -1;

function animate() {
    cube.rotation.x += 0.01;
    cube.rotation.y += 0.01;
    renderer.render(scene, camera);
}
renderer.setAnimationLoop(animate);
