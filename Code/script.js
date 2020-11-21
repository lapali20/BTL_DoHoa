import Rect from './Rect.js'

var speed = 6;





var clock = new THREE.Clock();
var scene = new THREE.Scene();

var camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
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

const plane = new THREE.PlaneGeometry( 100, 100 );
const planeMaterial = new THREE.MeshBasicMaterial( {color: 0xffff00, side: THREE.DoubleSide} );
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
        obj:"models/Model_Final.obj",
        mtl:"models/Model_Final.mtl",
        mesh: new THREE.Mesh(),
        interactable: false,
        posX: 0,
        posY: 0,
        posZ: 0
    },
    khung_anh: {
        obj:"models/Khung_anh.obj",
        mtl:"models/Khung_anh.mtl",
        mesh: new THREE.Mesh(),
        interactable: true,
        posX: 0,
        posY: 1,
        posZ: 0
    },
    khung_anh_2: {
        obj:"models/Khung_anh_doc.obj",
        mtl:"models/Khung_anh_doc.mtl",
        mesh: new THREE.Mesh(),
        interactable: true,
        posX: 4,
        posY: 1,
        posZ: 0
    },
    Tu1 : {
        obj:"models/Tu_to_khong_kinh.obj",
        mtl:"models/Tu_to_khong_kinh.mtl",
        mesh: new THREE.Mesh(),
        interactable: true,
        posX: 1,
        posY: 0, 
        posZ: 0,
    },
    // Tu2 : {
    //     obj:"models/Tu_to_khong_kinh.obj",
    //     mtl:"models/Tu_to_khong_kinh.mtl",
    //     mesh: new THREE.Mesh(),
    //     posX: 1,
    //     posY: 0, 
    //     posZ: 0,
    // },
    Tu3 : {
        obj:"models/Tu_to_khong_kinh.obj",
        mtl:"models/Tu_to_khong_kinh.mtl",
        mesh: new THREE.Mesh(),
        interactable: true,
        posX: 4,
        posY: 0, 
        posZ: 6.5,
    },
    Tu4 : {
        obj:"models/Tu_to_khong_kinh.obj",
        mtl:"models/Tu_to_khong_kinh.mtl",
        mesh: new THREE.Mesh(),
        interactable: true,
        posX: -4,
        posY: 0, 
        posZ: 6.5,
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
                models[raycastTargetName].mesh.rotation.y += 0.01;
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

lights[0] = new THREE.PointLight(0xffffff, 0.8, 18);
lights[0].position.set(0, 2, 0);
lights[0].castShadow = true;
lights[0].shadow.camera.near = 0.1;
lights[0].shadow.camera.far = 25;

lights[1] = new THREE.AmbientLight(0xffffff, 0.2);

var InitLight = function() {
    for (var i = 0; i < lights.length; i++)
    {
        scene.add(lights[i]);
    }
}

// ------ test vi tri den 
const geometry = new THREE.BoxGeometry( 0.1, 0.1, 0.1 );
const material = new THREE.MeshPhongMaterial( {color: 0x00ff00} );
var cube = new THREE.Mesh( geometry, material );
cube.receiveShadow = true;
cube.castShadow = true;
cube.position.set(1, 1.5, 0);
scene.add( cube );


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

// ------- chặn di chuyển xuyên vật thể

var listBlock = [
    new Rect({x : 6, y : 0, z : 0}, 3, 17),     //
    new Rect({x : -6, y : 0, z : 0}, 3, 17),    // tuong
    new Rect({x : 0, y : 0, z : 8.5}, 15, 3),   //
    new Rect({x : 0, y : 0, z : -8.5}, 15, 3),  //
    new Rect({x : 1, y : 0, z : 0}, 2, 2),
]

var Block = function() {
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
    document.getElementById("info").style.display = "inline-block";

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
    // console.log(camera.position);
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