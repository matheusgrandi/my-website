import * as THREE from 'three'
import { STLLoader } from 'three/examples/jsm/loaders/STLLoader.js'
import { AsciiEffect } from 'three/examples/jsm/effects/AsciiEffect.js';

const clock = new THREE.Clock()
const stlLoader = new STLLoader()

//Environment
const scene = new THREE.Scene()
const mesh = new THREE.Mesh()
const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
}

//Lightning
let pointLight1 = new THREE.PointLight(0xffffff, 1);
pointLight1.position.set(100, 100, 400);
scene.add(pointLight1);

let pointLight2 = new THREE.PointLight(0xffffff, .5);
pointLight2.position.set(-500, 100, -400);
scene.add(pointLight2);

//Material
const material = new THREE.MeshStandardMaterial()
material.flatShading = true
material.side = THREE.DoubleSide;

//Camera
const camera = new THREE.PerspectiveCamera(45, sizes.width / sizes.height, 0.1, 2000)

stlLoader.load(
    './assets/models/spaceship',
    function (geometry) {

        mesh.material = material;
        mesh.geometry = geometry;

        var tempGeometry = new THREE.Mesh(geometry, material)
        mesh.position.copy = (tempGeometry.position)

        geometry.computeVertexNormals();
        mesh.geometry.center()

        mesh.rotation.x = -90 * Math.PI / 180;

        mesh.geometry.computeBoundingBox();
        var bbox = mesh.geometry.boundingBox;

        mesh.position.y = ((bbox.max.z - bbox.min.z) / 5)

        camera.position.x = ((bbox.max.x * 4));
        camera.position.y = ((bbox.max.y));
        camera.position.z = ((bbox.max.z * 3));

        scene.add(mesh)





        function tick() {
            if (rotateModel == true) {
                const elapsedTime = clock.getElapsedTime()
                mesh.rotation.z = (elapsedTime) / 3
                render()
                window.requestAnimationFrame(tick)
            } else {
                render()
                window.requestAnimationFrame(tick)
            }
        }

        function render() {
            effect.render(scene, camera);
        }

        tick()

        document.getElementById('file-selector').addEventListener('change', openFile, false);


        function openFile(evt) {
            const fileObject = evt.target.files[0];

            const reader = new FileReader();
            reader.readAsArrayBuffer(fileObject);
            reader.onload = function () {
                if (userUploaded == false) {
                    userUploaded = true;
                }
                const geometry = stlLoader.parse(this.result);
                tempGeometry = geometry;
                mesh.geometry = geometry;
                mesh.geometry.center()

                mesh.rotation.x = -90 * Math.PI / 180;

                mesh.geometry.computeBoundingBox();
                var bbox = mesh.geometry.boundingBox;

                // camera.position.x = ((bbox.max.x * 4));
                // camera.position.y = ((bbox.max.y));
                // camera.position.z = ((bbox.max.z * 3));

                mesh.position.y = ((bbox.max.z - bbox.min.z) / 6)

                scene.add(mesh);
            };
        };
    }
)

