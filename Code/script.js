
import DirectionalLight from "./light.js";
import Test from "./light.js";

var clock = new THREE.Clock();

var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
var interactableObjList = [];

var renderer = new THREE.WebGLRenderer();
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap;
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild( renderer.domElement);

const loader = new THREE.TextureLoader();
loader.load('background.jpg' , function(texture)
            {
             scene.background = texture;  
            });

window.addEventListener( 'resize', function () {
    var width = window.innerWidth;
    var height = window.innerHeight;
    renderer.setSize( width, height);
    camera.aspect = width / height;
    camera.updateProjectionMatrix();
})

var controls = new THREE.FirstPersonControls(camera, renderer.domElement);
    controls.lookSpeed = 0.2;
    controls.movementSpeed = 10;
    controls.noFly = true;
    controls.lookVertical = true;
    controls.constrainVertical = true;
    controls.verticalMin = 1.0;
    controls.verticalMax = 2.0;
    controls.lon = -150;
    controls.lat = 120;

var geometry = new THREE.BoxGeometry( 1, 1, 1);

var cubeMaterials = 
[
    new THREE.MeshBasicMaterial({map: new THREE.TextureLoader().load('models/pink.png'), side: THREE.DoubleSide}),
    new THREE.MeshBasicMaterial({map: new THREE.TextureLoader().load('models/pink.png'), side: THREE.DoubleSide}),
    new THREE.MeshBasicMaterial({map: new THREE.TextureLoader().load('models/blue.png'), side: THREE.DoubleSide}),
    new THREE.MeshBasicMaterial({map: new THREE.TextureLoader().load('models/blue.png'), side: THREE.DoubleSide}),
    new THREE.MeshBasicMaterial({map: new THREE.TextureLoader().load('models/gray.png'), side: THREE.DoubleSide}),
    new THREE.MeshBasicMaterial({map: new THREE.TextureLoader().load('models/gray.png'), side: THREE.DoubleSide})
]

var material = new THREE.MeshFaceMaterial( cubeMaterials );
var cube = new THREE.Mesh( geometry, material);
scene.add(cube);

var cube1 = new THREE.Mesh( geometry, material);
scene.add(cube1);
cube1.position.x = 2

// var room = new THREE.GLTFLoader();

// var dracoLoader = new THREE.DRACOLoader();
// // dracoLoader.setDecoderPath( '/js/libs/draco/' );
// room.setDRACOLoader( dracoLoader );

// room.load(
// 	'models/room.gltf',
// 	function ( gltf ) {

// 		scene.add( gltf.scene );

// 		gltf.animations; 
// 		gltf.scene;
// 		gltf.scenes;
// 		gltf.cameras;
// 		gltf.asset;

// 	},
// 	function ( xhr ) {

// 		console.log( ( xhr.loaded / xhr.total * 100 ) + '% loaded' );

// 	},
// 	function ( error ) {

// 		console.log( 'An error happened' );

// 	}
// );

var mesh;
let mtlLoader = new THREE.MTLLoader();
let objLoader = new THREE.OBJLoader();
mtlLoader.load('models/Room_Model.mtl', (materials) => {
  materials.preload();
  objLoader.setMaterials(materials);
  objLoader.load('models/Room_Model.obj', (object) => {
    mesh = object;
    scene.add(object);
  })
});

camera.position.z = 3;

const light = new THREE.DirectionalLight( 0xffffff, 1, 100 );
light.position.set( 0, 0, 0 ); //default; light shining from top
light.castShadow = true; // default false
scene.add( light );

var directionalLight = new DirectionalLight(scene, 0, 0, 0);

var update = function() {
    camera.position.y = 2;
    light.position.y += 0.01;
};

var render = function() {
    
    var delta = clock.getDelta();
    renderer.render( scene, camera );
    controls.update(delta);
};

var GameLoop = function() {
    requestAnimationFrame( GameLoop );
    // console.log(camera.position);
    update();
    render();
};

GameLoop();