import Rect from './Rect.js'

var speed = 6;

var clock = new THREE.Clock();
var scene = new THREE.Scene();

var camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.x = 6;
camera.position.z = -3;
camera.lookAt(0, 0, 0);

var renderer = new THREE.WebGLRenderer();
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.BasicShadowMap;
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild( renderer.domElement);

const loader = new THREE.TextureLoader();
loader.load('background.jpg' , function(texture)
            {
             scene.background = texture;  
            });

const plane = new THREE.PlaneGeometry( 16, 17 );
const planeMaterial = new THREE.MeshPhongMaterial( {color: 0xffffff, side: THREE.DoubleSide} );
const planeMesh = new THREE.Mesh( plane, planeMaterial );
planeMesh.rotation.x = Math.PI / 2;
scene.add( planeMesh );

window.addEventListener( 'resize', function () {
    var width = window.innerWidth;
    var height = window.innerHeight;
    renderer.setSize( width, height);
    camera.aspect = width / height;
    camera.updateProjectionMatrix();
})

// ------ danh sách models
var models = {
    Main: {
        obj:"models/Room.obj",
        mtl:"models/Room.mtl",
        mesh: new THREE.Mesh(),
        interactable: false,
        posX: 0,
        posY: 0,
        posZ: 0
    },
    khung_anh: {
        obj:"models/Khung_anh_doc.obj",
        mtl:"models/Khung_anh_doc.mtl",
        mesh: new THREE.Mesh(),
        interactable: true,
        posX: 4,
        posY: 2,
        posZ: 0
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
                    object.traverse(function(node){     // set up từng mesh thành phần trong object
                        if (node instanceof THREE.Mesh)
                        {
                            node.castShadow = true;
                            node.receiveShadow = true;
                            node.species = key;
                        }
                    })
                    object.position.set(models[key].posX, models[key].posY, models[key].posZ);
                    models[key].mesh = object;
					scene.add(models[key].mesh);
				});
			});
			
		})(_key);
    }
}

var distance = function(object) {
    var x = object.x - camera.position.x;
    var z = object.z - camera.position.z;
    return Math.sqrt(x * x + z * z);
}

var raycastTargetName;
var isAiming = false;
var UpdateObjects = function() {
    if (raycastTargetName)
    {
        if (models[raycastTargetName].interactable)
        {
            if (distance(models[raycastTargetName].mesh.position) <= 2)
            {
                if (isAiming == false)
                {
                    isAiming = true;
                    swapPointer(true);
                }
                // models[raycastTargetName].mesh.rotation.y += 0.01;
            }
        }
        else
        {
            isAiming = false;
            swapPointer(false);
        }
    }
}

// ------ tương tác với đồ vật
const raycaster = new THREE.Raycaster();
const mouse = new THREE.Vector2();

function onMouseMove( event ) {
	mouse.x = ( event.clientX / window.innerWidth ) * 2 - 1;
	mouse.y = - ( event.clientY / window.innerHeight ) * 2 + 1;
}

var updateRaycast = function () {
    raycaster.setFromCamera( mouse, camera );
	const intersects = raycaster.intersectObjects( scene.children, true );
    if (intersects.length > 0)
        raycastTargetName = intersects[0].object.species;   // select the first one
}

// ------ anh sang
var lights = [];
var lightTargets = [];

lights[0] = new THREE.AmbientLight(0xffffff, 0.4);

for (var i = 1; i <= 6; i++)
{
    lights[i] = new THREE.DirectionalLight( 0xffffff, 0.1);
    lightTargets[i] = new THREE.Object3D();
    scene.add(lightTargets[i]);
    lights[i].target = lightTargets[i];
}

lights[1].position.set(4, 3.5, 6.5);
lightTargets[1].position.set(4, 0, 6.5);

lights[2].position.set(-4, 3.5, 6.5);
lightTargets[2].position.set(-4, 0, 6.5);

lights[3].position.set(4, 3.5, -6.5);
lightTargets[3].position.set(4, 0, -6.5);

lights[4].position.set(-4, 3.5, -6.5);
lightTargets[4].position.set(-4, 0, -6.5);

lights[5].position.set(4, 3.5, 0);
lightTargets[5].position.set(4, 0, 0);

lights[6].position.set(-4, 3.5, 0);
lightTargets[6].position.set(-4, 0, 0);

var InitLight = function() {
    for (var i = 0; i < lights.length; i++)
    {
        if (i > 0)
        {
            lights[i].castShadow = true;
        }
        scene.add(lights[i]);
    }
}

// ------ phần điều khiển camera
var controls = new THREE.PointerLockControls(camera, renderer.domElement);

controls.getObject().position.y = 1.6;        // chieu cao 1m6

let keyboard = []
addEventListener('keydown', (e) => {
    keyboard[e.key] = true;
})

addEventListener('keyup', (e) => {
    keyboard[e.key] = false;
})

addEventListener('mousedown', (e) => {
    showInfo();
});

function processKeyboard() {
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

    if (keyboard['e']) {
        showInfo();
    }

    if (keyboard['h']) {
        showTutorial(true);
    }

    if (keyboard['q']) {
        closeInfo();
        showTutorial(false);
    }
}

const geometry = new THREE.BoxGeometry( 0.3, 2.5, 2 );
const material = new THREE.MeshPhongMaterial( {color: 0x352315} );
var cube = new THREE.Mesh( geometry, material );
cube.receiveShadow = true;
cube.castShadow = true;
cube.position.set(5, 1.25, 4.5);
scene.add( cube );
var door = new Rect({x: 5, y: 0, z: 4.5}, 0.3, 2);
var checkIn = function() {
    if (door.Contain(camera.position.x, camera.position.z))
    {
        showTutorial(false);
    }
}

// ------- chặn di chuyển xuyên vật thể

var listBlock = [
    new Rect({x : 5, y : 0, z : 6.5}, 1, 2),     //
    new Rect({x : 5, y : 0, z : -2}, 1, 11),     //
    new Rect({x : -5, y : 0, z : 0}, 1, 17),    // tuong
    new Rect({x : 0, y : 0, z : 7.5}, 11, 1),   //
    new Rect({x : 0, y : 0, z : -7.5}, 11, 1),  //
]

var Block = function() {
    checkIn();
    var tempX, tempZ;
    var block;
    for (var i = 0; i < listBlock.length; i++)
    {
        block = listBlock[i];
        tempX = camera.position.x;
        tempZ = camera.position.z;

        if (block.Contain(tempX, tempZ))
        {
            if (block.PushDirection(tempX, tempZ))
            {
                camera.position.x = block.PushX(tempX);
            }
            else 
            {
                camera.position.z = block.PushZ(tempZ);
            }
        }
    }
}


// ------- set up UI
let startBtn = document.querySelector("#start-btn");    // nhan de bat dau khoa con tro
startBtn.addEventListener('click', ()=> {
    controls.lock();
    startBtn.style.display = "none";
})

controls.addEventListener('unlock', ()=> {
    startBtn.style.display = "inline-block";
})

var swapPointer = function (aim) {
    if (aim)
    {
        document.querySelector("#pointer").setAttribute("src", "kinhlup.png");
    }
    else
    {
        document.querySelector("#pointer").setAttribute("src", "pointer.png")
    }
}

var showTutorial = function (isShowed) {
    document.getElementById("tutorial").style.display = (isShowed == true) ? "inline-block" : "none";
}

var showInfo = function () {
    if (isAiming)
    {
        document.getElementById("info").style.display = "inline-block";
        document.getElementById("info-image").src = models[raycastTargetName].img;
        document.getElementById("info-text").innerHTML = models[raycastTargetName].text;
    }
}

var closeInfo = function () {
    document.getElementById("info").style.display = "none";
}

// ---------
var Init = function () {
    loadObjects();
    InitLight();
}

var render = function() {
    renderer.render( scene, camera );
};

var GameLoop = function() {
    requestAnimationFrame( GameLoop );
    processKeyboard()
    update();
    render();
};

var update = function() {    
    Block();
    updateRaycast();
    UpdateObjects();
};

window.addEventListener( 'mousemove', onMouseMove, false );

Init();
GameLoop();
console.log("Done!");