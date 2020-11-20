


var clock = new THREE.Clock();

var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.z = 1;
camera.position.y = -1.5;
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

// var mesh;
// let mtlLoader = new THREE.MTLLoader();
// let objLoader = new THREE.OBJLoader();
// mtlLoader.load('models/Room_Model.mtl', (materials) => {
//   materials.preload();
//   objLoader.setMaterials(materials);
//   objLoader.load('models/Room_Model.obj', (object) => {
//     mesh = object;
//     scene.add(object);
//   })
// });

// ------ danh sách models
var models = {
    Main: {
        obj:"models/Main.obj",
        mtl:"models/Main.mtl",
        mesh: new THREE.Mesh(),
        posX: 0,
        posY: 0,
        posZ: 0
    },
    tu: {
        obj:"models/test.obj",
        mtl:"models/test.mtl",
        mesh: new THREE.Mesh(),
        posX: 0,
        posY: 2,
        posZ: 3
    },
}



var loadObjects = function() {
    for( var _key in models ){
		(function(key){
            var mtlLoader = new THREE.MTLLoader();
			mtlLoader.load(models[key].mtl, (materials) => {
				materials.preload();
				
				var objLoader = new THREE.OBJLoader();
				
                objLoader.setMaterials(materials);
				objLoader.load(models[key].obj, (object) => {
                    object.position.set(models[key].posX, models[key].posY, models[key].posZ);
                    models[key].mesh = object;
					scene.add(models[key].mesh);
				});
			});
			
		})(_key);
    }
}

// ------ điều khiển đồ vật
var moveObject = function(objId, moveX, moveZ) {
    if (objId == null) return;
    models[objId].mesh.position.x += moveX;
    models[objId].mesh.position.z += moveZ;
}

// ------ anh sang
const light = new THREE.DirectionalLight( 0xffffff, 1, 100 );
light.position.set( 1, 1, 1 ); //default; light shining from top
light.castShadow = true; // default false
scene.add( light );

var light2 = light.clone();
light2.position.set( -1, 1, -1);
scene.add( light2 );

var update = function() {
    
};

// ------ phần điều khiển camera
var controls = new THREE.PointerLockControls(camera, renderer.domElement);

controls.getObject().position.y += 2;

let startBtn = document.querySelector("#start-btn");    // nhan de bat dau khoa con tro
startBtn.addEventListener('click', ()=> {
    controls.lock();
    startBtn.style.display = "none";
})

controls.addEventListener('unlock', ()=> {
    startBtn.style.display = "inline-block";
})

let keyboard = []
addEventListener('keydown', (e) => {
    keyboard[e.key] = true;
})

addEventListener('keyup', (e) => {
    keyboard[e.key] = false;
})

function processKeyboard() {
    let speed = 2;
    let actualSpeed = speed * clock.getDelta();
    if (keyboard['w']) {
        controls.moveForward(actualSpeed);
        
    }
    if (keyboard['s']) {
        controls.moveForward(-actualSpeed);
    }

    if (keyboard['d']) {
        controls.moveRight(actualSpeed);
    }
    if (keyboard['a']) {
        controls.moveRight(-actualSpeed);
    }
}


// ---------
var render = function() {
    renderer.render( scene, camera );
};

var GameLoop = function() {
    requestAnimationFrame( GameLoop );
    // console.log(camera.position);
    processKeyboard()
    update();
    render();
};

loadObjects();
GameLoop();