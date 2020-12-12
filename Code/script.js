import Rect from './Rect.js'

var speed = 2;

var clock = new THREE.Clock();
var scene = new THREE.Scene();

var camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.x = 6;
camera.position.z = -3;
camera.lookAt(6, 0, 0);

var renderer = new THREE.WebGLRenderer();
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.BasicShadowMap;
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild( renderer.domElement);

const loader = new THREE.TextureLoader();
loader.load('./models/Texture/background.jpg' , function(texture)
            {
             scene.background = texture;  
            });

const plane = new THREE.PlaneGeometry( 16, 17 );
const planeMaterial = new THREE.MeshPhongMaterial( {color: 0xffffff, side: THREE.DoubleSide} );
const planeMesh = new THREE.Mesh( plane, planeMaterial );
planeMesh.rotation.x = Math.PI / 2;
scene.add( planeMesh );

// ------ danh sách models
var models = {
    Main: {
        obj:"models/Room.obj",
        mtl:"models/Room.mtl",
        mesh: new THREE.Mesh(),
        interactable: false,
        posX: 0,
        posY: 0,
        posZ: 0,
        rotate: 0,
    },
    Door: {
        obj:"models/Door.obj",
        mtl:"models/Door.mtl",
        mesh: new THREE.Mesh(),
        interactable: false,
        posX: 4.95,
        posY: 0,
        posZ: 4.5,
        rotate: 0
    },
    NguyenKimSon: {
        obj:"models/Khung_anh_doc.obj",
        mtl:"models/NguyenKimSon.mtl",
        mesh: new THREE.Mesh(),
        interactable: true,
        posX: 4.8,
        posY: 2,
        posZ: 2.5,
        rotate: -Math.PI / 2,
        info:"./info/NguyenKimSon.html"
    },
    PhungXuanNha: {
        obj:"models/Khung_anh_doc.obj",
        mtl:"models/PhungXuanNha.mtl",
        mesh: new THREE.Mesh(),
        interactable: true,
        posX: 4.8,
        posY: 2,
        posZ: 1,
        rotate: -Math.PI / 2,
        info:"./info/PhungXuanNha.html"
    },
    MaiTrongNhuan: {
        obj:"models/Khung_anh_doc.obj",
        mtl:"models/MaiTrongNhuan.mtl",
        mesh: new THREE.Mesh(),
        interactable: true,
        posX: 4.8,
        posY: 2,
        posZ: -0.5,
        rotate: -Math.PI / 2,
        info:"./info/MaiTrongNhuan.html"
    },
    DaoTrongThi: {
        obj:"models/Khung_anh_doc.obj",
        mtl:"models/DaoTrongThi.mtl",
        mesh: new THREE.Mesh(),
        interactable: true,
        posX: 4.8,
        posY: 2,
        posZ: -2,
        rotate: -Math.PI / 2,
        info:"./info/DaoTrongThi.html"
    },
    NguyenVanDao: {
        obj:"models/Khung_anh_doc.obj",
        mtl:"models/NguyenVanDao.mtl",
        mesh: new THREE.Mesh(),
        interactable: true,
        posX: 4.8,
        posY: 2,
        posZ: -3.5,
        rotate: -Math.PI / 2,
        info:"./info/NguyenVanDao.html"
    },
    be1 : {
        obj:"models/Tu.obj",
        mtl:"models/Tu.mtl",
        mesh: new THREE.Mesh(),
        interactable: false,
        posX: 0,
        posY: 0,
        posZ: -6,
        rotate: 0,
    },
    be_nhac : {
        obj:"models/GiaDo.obj",
        mtl:"models/GiaDo.mtl",
        mesh: new THREE.Mesh(),
        interactable: true,
        posX: 2.5,
        posY: 0,
        posZ: -6,
        rotate: - Math.PI / 2,
        info: "./info/Nhac.html"
    },
    be3 : {
        obj:"models/GiaDo.obj",
        mtl:"models/GiaDo.mtl",
        mesh: new THREE.Mesh(),
        interactable: false,
        posX: -2.5,
        posY: 0,
        posZ: -6,
        rotate: - Math.PI / 2,
    },
    Medal1 : {
        obj:"models/Star.obj",
        mtl:"models/Star.mtl",
        mesh: new THREE.Mesh(),
        interactable: true,
        posX: 0,
        posY: 1.25,
        posZ: -6,
        rotate: 0,
        info:"./info/ThanhTich.html"
    },
    note_1 : {
        obj:"models/note.obj",
        mtl:"models/note.mtl",
        mesh: new THREE.Mesh(),
        interactable: true,
        posX: 2.5,
        posY: 0.7,
        posZ: -5.8,
        rotate: Math.PI,
        info:"./info/Nhac.html"
    },
    note_2 : {
        obj:"models/note.obj",
        mtl:"models/note.mtl",
        mesh: new THREE.Mesh(),
        interactable: true,
        posX: 2.65,
        posY: 0.8,
        posZ: -5.8,
        rotate: 0,
        info:"./info/Nhac.html"
    },
    note_3 : {
        obj:"models/note.obj",
        mtl:"models/note.mtl",
        mesh: new THREE.Mesh(),
        interactable: true,
        posX: 2.9,
        posY: 0.7,
        posZ: -5.8,
        rotate: - Math.PI,
        info:"./info/Nhac.html"
    },
    VNU : {
        obj:"models/Logo-VNU.obj",
        mtl:"models/Logo-VNU.mtl",
        mesh: new THREE.Mesh(),
        interactable: true,
        posX: 0,
        posY: 2.7,
        posZ: 7.45,
        rotate: Math.PI,
        info:"./info/VNU.html"
    },
    HUS : {
        obj:"models/HUS.obj",
        mtl:"models/HUS.mtl",
        mesh: new THREE.Mesh(),
        interactable: true,
        posX: 4,
        posY: 2.6,
        posZ: 7.45,
        rotate: Math.PI,
        info: "./info/HUS.html"
    },
    USSH : {
        obj:"models/USSH.obj",
        mtl:"models/USSH.mtl",
        mesh: new THREE.Mesh(),
        interactable: true,
        posX: 4,
        posY: 1,
        posZ: 7.45,
        rotate: Math.PI,
        info: "./info/USSH.html"
    },
    ULIS : {
        obj:"models/ULIS.obj",
        mtl:"models/ULIS.mtl",
        mesh: new THREE.Mesh(),
        interactable: true,
        posX: 2.4,
        posY: 1,
        posZ: 7.45,
        rotate: Math.PI,
        info: "./info/ULIS.html"
    },
    UET : {
        obj:"models/UET.obj",
        mtl:"models/UET.mtl",
        mesh: new THREE.Mesh(),
        interactable: true,
        posX: 0.7,
        posY: 1,
        posZ: 7.45,
        rotate: Math.PI,
        info: "./info/UET.html"
    },
    UEB : {
        obj:"models/UEB.obj",
        mtl:"models/UEB.mtl",
        mesh: new THREE.Mesh(),
        interactable: true,
        posX: -0.7,
        posY: 1,
        posZ: 7.45,
        rotate: Math.PI,
        info: "./info/UEB.html"
    },
    UEd : {
        obj:"models/UED.obj",
        mtl:"models/UED.mtl",
        mesh: new THREE.Mesh(),
        interactable: true,
        posX: -2.4,
        posY: 1,
        posZ: 7.45,
        rotate: Math.PI,
        info: "./info/UED.html"
    },
    VJU : {
        obj:"models/VJU.obj",
        mtl:"models/VJU.mtl",
        mesh: new THREE.Mesh(),
        interactable: true,
        posX: -4,
        posY: 1,
        posZ: 7.45,
        rotate: Math.PI,
        info: "./info/VJU.html"
    },
    UMP : {
        obj:"models/UMP.obj",
        mtl:"models/UMP.mtl",
        mesh: new THREE.Mesh(),
        interactable: true,
        posX: -4,
        posY: 2.6,
        posZ: 7.45,
        rotate: Math.PI,
        info: "./info/UMP.html"
    },
    Rect : {
        obj:"models/Rect.obj",
        mtl:"models/Rect.mtl",
        mesh: new THREE.Mesh(),
        interactable: true,
        posX: -4.65, 
        posY: 2,
        posZ: 6,
        rotate: Math.PI / 2,
        info: "./info/VNU.html"
    }
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
                    object.rotation.set(0, models[key].rotate, 0);
                    models[key].mesh = object;
					scene.add(models[key].mesh);
				});
			});
			
		})(_key);
    }
}

var FixObject = function () {
    models["VNU"].mesh.scale.set(0.7, 0.7, 0.7);
}

var UpdateObject = function() {
    models["Medal1"].mesh.rotation.y += 0.02;
    NoteAnimation();
}

var isPlaying = false;
var angle = 0;
var NoteAnimation = function() {
    if (isPlaying)
    {
        angle += Math.PI * 0.005;
        models["note_1"].mesh.rotation.y -= 0.02;
        models["note_1"].mesh.position.y = 0.8 + 0.1 * Math.sin(angle);

        models["note_2"].mesh.rotation.y += 0.01;
        models["note_2"].mesh.position.y = 0.8 - 0.1 * Math.sin(angle);

        models["note_3"].mesh.rotation.y -= 0.02;
        models["note_3"].mesh.position.y = 0.8 + 0.1 * Math.sin(angle);
    }
}

// ------ tương tác với đồ vật
const raycaster = new THREE.Raycaster();
const mouse = new THREE.Vector2();

function onMouseMove( event ) {
	mouse.x = ( event.clientX / window.innerWidth ) * 2 - 1;
	mouse.y = - ( event.clientY / window.innerHeight ) * 2 + 1;
}

var UpdateRaycast = function () {
    raycaster.setFromCamera( mouse, camera );
	const intersects = raycaster.intersectObjects( scene.children, true );
    if (intersects.length > 0)
        raycastTargetName = intersects[0].object.species;   // select the first one
}

var distance = function(object) {
    var x = object.x - camera.position.x;
    var z = object.z - camera.position.z;
    return Math.sqrt(x * x + z * z);
}

var raycastTargetName;
var isAiming = false;
var IdentifyTarget = function() {
    if (raycastTargetName)
    {
        if (models[raycastTargetName].interactable)
        {
            if (distance(models[raycastTargetName].mesh.position) <= 2.5)
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


// ------ anh sang
var lights = [];
var lightTargets = [];

lights[0] = new THREE.AmbientLight(0xffffff, 0.6);

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
    let moveSpeed = 0.02;
    let scaleSpeed = 0.02;
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
        showTutorial();
    }

    if (keyboard['q']) {
        closeInfo();
    }

    if (keyboard['i']) {
        moveObj(moveSpeed, 0, 0);
    }

    if (keyboard['k']) {
        moveObj(-moveSpeed, 0, 0);
    }

    if (keyboard['l']) {
        moveObj(0, 0, moveSpeed);
    }

    if (keyboard['j']) {
        moveObj(0, 0, -moveSpeed);
    }

    if (keyboard['o']) {
        scaleObj(scaleSpeed);
    }

    if (keyboard['u']) {
        scaleObj(-scaleSpeed);
    }

    if (keyboard['r']) {
        if (isPlaying)
        {
            pauseMusic();
        }
        else
        {
            playMusic();
        }
    }
}

var door = new Rect({x: 5, y: 0, z: 4.5}, 0.3, 2);
var checkIn = function() {
    if (door.Contain(camera.position.x, camera.position.z))
    {
        closeInfo();
    }
}

// ------- chặn di chuyển xuyên vật thể

var listBlock = [
    new Rect({x : 5, y : 0, z : 6.5}, 1, 2),     //
    new Rect({x : 5, y : 0, z : -2}, 1, 11),     //
    new Rect({x : -5, y : 0, z : 0}, 1, 17),    // tuong
    new Rect({x : 0, y : 0, z : 7.5}, 11, 1),   //
    new Rect({x : 0, y : 0, z : -7.5}, 11, 1),  //
    new Rect({x : 0, y : 0, z : -6}, 1, 1),
    new Rect({x : 2.5, y : 0, z : -6}, 1, 1),
    new Rect({x : -2.5, y : 0, z : -6}, 1, 1),
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
    closeInfo();
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

var showTutorial = function () {
    document.getElementById("detail").src = "./info/HuongDan.html";
    document.getElementById("detail").style.display = "inline";
}

var showInfo = function () {
    if (isAiming)
    {
        document.getElementById("detail").src = models[raycastTargetName].info;
        document.getElementById("detail").style.display = "inline";
    }
}

var closeInfo = function () {
    document.getElementById("detail").style.display = "none";
}

var moveObj = function (x, y, z) {
    if (!isAiming) 
    {
        return;
    }
    models[raycastTargetName].mesh.position.x += x;
    models[raycastTargetName].mesh.position.y += y;
    models[raycastTargetName].mesh.position.z += z;
}

var rotateObj = function (x, y, z) {
    if (!isAiming) 
    {
        return;
    }
    models[raycastTargetName].mesh.rotation.x += x;
    models[raycastTargetName].mesh.rotation.y += y;
    models[raycastTargetName].mesh.rotation.z += z;
}

var scaleObj = function (x) {
    if (!isAiming) 
    {
        return;
    }
    models[raycastTargetName].mesh.scale.x += x;
    models[raycastTargetName].mesh.scale.y += x;
    models[raycastTargetName].mesh.scale.z += x;
}

var delay = 0;
var playMusic = function() {
    if (delay > 0)
    {
        return;
    }
    if (raycastTargetName == "note_1" || raycastTargetName == "note_2" || raycastTargetName == "note_3" || raycastTargetName == "be_nhac")
    document.getElementById("music").play();
    isPlaying = true;
    delay = 0.25;
}

var pauseMusic = function() {
    if (delay > 0)
    {
        return;
    }
    document.getElementById("music").pause();
    isPlaying = false;
    delay = 0.25;
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
    FixObject(); 
    Block();
    UpdateObject()
    UpdateRaycast();
    IdentifyTarget();
    if (delay <= 0)
    {
        return;
    }
    else {
        delay -= clock.getDelta();
    }
};

window.addEventListener( 'mousemove', onMouseMove, false );

Init();
GameLoop();

console.log("Done!");