import './style.css'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import * as dat from 'lil-gui'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'
// import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader.js'
import {SphereGeometry, TextureLoader , CubeTextureLoader} from 'three'
import CANNON from 'cannon'
import $ from "./Jquery"
import gsap from "gsap";
import { ARButton } from 'three/examples/jsm/webxr/ARButton.js';

import {createSingleSetProper} from './createSingleSet.js'
// import createSinglesetProper from './createSingleSet.js'
const textureLoader = new THREE.TextureLoader()
const raycaster = new THREE.Raycaster()


const createMacaroon = (intersect)=>{
    
  let random = Math.floor(Math.random()*(macaroonMaterial.length-1))
  let newMacaroon = macaroon.clone();
  newMacaroon.children[0].material=macaroonMaterial[random]
  newMacaroon.children[1].material=macaroonMaterial[random]
  newMacaroon.children[2].material=macaroonMaterial[random]
  
  let newMacaroonGroup = new THREE.Group();
  newMacaroon.position.x=0;
  newMacaroon.position.y=0;
  newMacaroon.position.z=0;

  newMacaroon.rotation.x = Math.PI * 0.5
  
  newMacaroonGroup.add(newMacaroon)
  scene.add(newMacaroonGroup)
  
  // const macaroonCin = new THREE.CylinderGeometry(.067,.067,.047,8,3,false,0,Math.PI*2)
  const macaroonGeo = new CANNON.Cylinder(.067,.067,.047,8)
  const macaroonBody = new CANNON.Body({mass:.5})
  macaroonBody.quaternion.setFromAxisAngle(new CANNON.Vec3(-1,0,0),Math.PI *0.5)

  macaroonBody.addShape(macaroonGeo,new CANNON.Vec3(0,0,0));
  macaroonBody.position=new CANNON.Vec3(intersect.point.x, .23, intersect.point.z)
  macaroonBody.material=defaultMaterial;
  world.add(macaroonBody)
  macaroonBody.sleepSpeedLimit = 1.0;
  intersectObjectMacaroon.push({newMacaroonGroup,macaroonBody})




}

let cups ={
  1:"",
  2:"",
  3:"",
  4:"",
  5:"",
  6:"",
}
let plates ={
  1:"",
  2:"",
  3:"",
  4:"",
  5:"",
  6:"",
}

let teaSetTriggers={
1:"on",
2:"on",
3:"on",
4:"on",
5:"on",
6:"on",
}
let objectsToUpdate=[]
let currentTrigger = null 

let singleSetDisplay = "off"

let createSinglesetProperTrigger = "off"
let intersects=null
let plateIntersects = []
let intersectObjectMacaroon=[]
let dance="off"
let singleSet = null
let tableCloth = null
let mixer = null
let teaset = null
let singleCup= null
let singlePlate = null
let singleGroup = null
let play = "off"
let macaroon=null
let macaroonTrigger = "off"
let plateArray = [];

let nesseSet = "off"
let whaleboySet = "off"
let rocksSet = "on"
let rock1Geo, rock2Geo, rock3Geo;
let fishGroup = null;
    let camera, scene, renderer;
let createBubble=null;
let reticle= null
    let loader;
let loader2;
let loader3;
let nesse;
let nesseGroup

let swim=null;
let whaleGroup;
let mixer2;
let whaleanimation;
let whale;
// const rockMaterial = new THREE.MeshBasicMaterial({color:"rgb(71,54,43)"})

const rockMaterial=new THREE.MeshPhongMaterial({
        color: 0xffffff * Math.random()
      });
// console.log(gsap)

let bubbles = [];


//     $('.nesseB').click(()=>{
//       console.log("nesseB")
//       nesseSet = 'on'
//       rocksSet= 'off'
//       whaleboySet = 'off'
//       $('.buttonS').removeClass('on')
//       $('.nesseB').addClass('on')
  
  
  
//     })
//       $('.whaleboyB').click(()=>{
//       console.log("wb")
//       nesseSet = 'off'
//       rocksSet = 'off'
//       whaleboySet = 'on'
//       $('.buttonS').removeClass('on')
//       $('.whaleboyB').addClass('on')
  
  
  
//     })
//       $('.rocksB').click(()=>{
//       console.log("rnesseB")
//       nesseSet = 'off'
//       rocksSet = 'on'
//       whaleboySet = 'off'
//       $('.buttonS').removeClass('on')
//       $('.rocksB') .addClass('on')
  
  
  
//     })

const world = new CANNON.World()



    init();
    animate();

    function init() {
      scene = new THREE.Scene();

      const ambientLight = new THREE.AmbientLight('#7FFFD4', .5)
scene.add(ambientLight)
const directionalLight = new THREE.DirectionalLight('#F5F5DC', 1)
directionalLight.castShadow = true
directionalLight.shadow.mapSize.set(1024, 1024)
directionalLight.shadow.camera.far = 15
directionalLight.shadow.camera.left = - 7
directionalLight.shadow.camera.top = 7
directionalLight.shadow.camera.right = 7
directionalLight.shadow.camera.bottom = - 7
directionalLight.position.set(- 5, 5, 0)
scene.add(directionalLight)
// const directionalLight2 = new THREE.DirectionalLight('#5F9EA0', 1)
// directionalLight2.castShadow = true
// directionalLight2.shadow.mapSize.set(1024, 1024)
// directionalLight2.shadow.camera.far = 15
// directionalLight2.shadow.camera.left = - 7
// directionalLight2.shadow.camera.top = 7
// directionalLight2.shadow.camera.right = 7
// directionalLight2.shadow.camera.bottom = - 7
// directionalLight2.position.set(5, 5, 0)
// scene.add(directionalLight2)
      
    world.broadphase = new CANNON.SAPBroadphase(world)
    world.allowSleep = true
    world.gravity.set(0, - 9.82, 0)

const defaultMaterial = new CANNON.Material('default')
const defaultContactMaterial = new CANNON.ContactMaterial(
    defaultMaterial,
    defaultMaterial,
    {
        friction: .6,
        restitution: 0.01
    }
)

const tableGeo = new CANNON.Box(new CANNON.Vec3(.175,.005,.09))
const tablebody = new CANNON.Body({mass:0})
tablebody.addShape(tableGeo,new CANNON.Vec3(0,.003,0));
tablebody.material=defaultMaterial;
world.add(tablebody)
const floorShape = new CANNON.Plane()
const floorBody = new CANNON.Body()
floorBody.mass = 0
floorBody.position=new CANNON.Vec3(0, -.3, -.5)
floorBody.quaternion.setFromAxisAngle(
    new CANNON.Vec3(-1,0,0),
    Math.PI *0.5
)
floorBody.addShape(floorShape)
tablebody.position.y-=.1
tablebody.position.z-=.5

world.addBody(floorBody)
const floorTexture = textureLoader.load('/checker1.jpg')
floorTexture.repeat.set(6,6)
floorTexture.wrapT = THREE.MirroredRepeatWrapping
floorTexture.wrapS = THREE.MirroredRepeatWrapping

const floorMaterial = new THREE.MeshBasicMaterial({map:floorTexture})
const floor = new THREE.Mesh(
  new THREE.PlaneGeometry(1, 1),
floorMaterial
)
floor.receiveShadow = true
floor.rotation.x = - Math.PI * 0.5
floor.position.y = -.05
scene.add(floor)
floor.visible=false
floor.position.copy(floorBody.position)

        const container = document.createElement('div');
        document.body.appendChild(container);

       

  camera = new THREE.PerspectiveCamera(70, window.innerWidth / window.innerHeight, 0.01, 100);

  renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
  renderer.setPixelRatio(window.devicePixelRatio);
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.xr.enabled = true; // we have to enable the renderer for webxr
  const controller= renderer.xr.getController(0);
  scene.add(controller)
  container.appendChild(renderer.domElement);
  
  

  
const placeNesse = ()=>{
  if(nesseGroup!=null){
  nesseGroup.scale.set(.25,.25,.25)
  nesseGroup.position.setFromMatrixPosition(reticle.matrix);

  scene.add(nesseGroup)
      
  whaleanimation.play()
  }
}  

   const placeWhaleboy = ()=>{
  if(whaleGroup!=null){
  
  whaleGroup.scale.set(.25,.25,.25)
  whaleGroup.position.setFromMatrixPosition(reticle.matrix);

  scene.add(whaleGroup)
      
  swim.play()
  }
}  

const createSingleSet = function(){
  console.log("singleset")
  const cupbow = new CANNON.Cylinder(.0155,.01,.013,8)
  const plateDrop = new CANNON.Cylinder(.03,.015,.005,8)

  const cupHandle = new CANNON.Cylinder(.01,.01,.001,8)
  // cupHandle.quaternion.setClearColor(new CANNON.Vec3())
  
  const cupbody = new CANNON.Body({mass:1})
  const platebody = new CANNON.Body({mass:1})
  cupbody.quaternion.setFromAxisAngle(new CANNON.Vec3(-1,0,0),Math.PI *0.5)
  platebody.quaternion.setFromAxisAngle(new CANNON.Vec3(-1,0,0),Math.PI *0.5)
  cupbody.position=new CANNON.Vec3(0, .05, -.5)
  platebody.position=new CANNON.Vec3(0, .04, -.5)





  cupbody.material=defaultMaterial;
  platebody.material=defaultMaterial
  cupbody.addShape(cupbow,new CANNON.Vec3(0,0,0))
  cupbody.addShape(cupHandle,new CANNON.Vec3(.115,0,0))
  platebody.addShape(plateDrop,new CANNON.Vec3(0,0,0))



  const singleFakeCup = new THREE.Group()
  // singleplateMesh.rotation.x =  Math.PI * 0.5
  const singleCup= singleGroup.children[1].clone()
  const newsingleplate= singleGroup.children[0].clone()
  newsingleplate.rotation.x =  Math.PI * 0.5
  newsingleplate.position.z+=.03

  singleCup.rotation.x +=  Math.PI * 0.5
  singleCup.position.z +=.01
  singleCup.position.y-=.07;
  singleFakeCup.add(singleCup)
  const plateMesh = new THREE.Group();
  plateMesh.add(newsingleplate)
  // console.log(singleGroup)
  cupbody.sleepSpeedLimit = 1.0;
  platebody.sleepSpeedLimit = 1.0;
  plateArray.push(plateMesh)
  
  
  plateMesh.scale.set(.1,.1,.1)
  singleFakeCup.scale.set(.1,.1,.1)
  singleFakeCup.position.set(0,0,-.5).applyMatrix4(controller.matrixWorld);
  plateMesh.position.set(0,-.01,-.5).applyMatrix4(controller.matrixWorld);
  platebody.position.copy(plateMesh.position)
  cupbody.position.copy(singleFakeCup.position)
  world.add(platebody)
  scene.add(plateMesh)
  world.addBody(cupbody)
  scene.add(singleFakeCup)
 




  objectsToUpdate.push({singleFakeCup,cupbody,plateMesh,platebody})
  
}
  
const createGraffiti =()=>{
  

  let randTag= Math.floor(Math.random()*3+1)
  console.log(randTag)
  let tag;
  const tagTexture1 = textureLoader.load('/teapot1.png')
  tagTexture1.repeat=false
  const tagMaterial1 = new THREE.MeshStandardMaterial({map:tagTexture1})
  tagMaterial1.transparent=true
  // tagMaterial1.alphaMap=tagTexture1

  const tagTexture2 = textureLoader.load('/teapot2.png')
  tagTexture1.repeat=false
  const tagMaterial2 = new THREE.MeshStandardMaterial({map:tagTexture2})
  tagMaterial2.transparent=true
  // tagMaterial2.alphaMap=tagTexture2

  const tagTexture3 = textureLoader.load('/teapots3.png')
  tagTexture3.repeat=false
  const tagMaterial3 = new THREE.MeshStandardMaterial({map:tagTexture3})
  tagMaterial3.transparent=true
  // tagMaterial3.alphaMap=tagTexture3



  const tagGeo = new THREE.PlaneGeometry(1, 1).rotateX(-Math.PI/2)
  


  switch(randTag){
    case 1: tag= new THREE.Mesh(tagGeo, tagMaterial1)
      break;
      
    case 2: tag= new THREE.Mesh(tagGeo, tagMaterial2)
      break;
    
    case 3: tag= new THREE.Mesh(tagGeo, tagMaterial3)
      
      
  }
 
  tag.position.setFromMatrixPosition(reticle.matrix);
  tag.quaternion.setFromRotationMatrix(reticle.matrix);
  tag.scale.x=.2
  tag.scale.y=.2
  tag.scale.z=.2


  
  scene.add(tag)
}
  
  
  
// }
  // else{
// console.log("createbubble")
// let randomBubbleNumber = Math.floor(Math.random()*5)+1

// for(let i=0;i<randomBubbleNumber;i++){
// let randomBubbleScale=Math.random();
// let randomBubbleHeight = Math.random()
// let randomBubbleLeft = Math.random()
// let randomBubbleDepth = Math.random()*-10
// const newBubbleMaterial = new THREE.MeshBasicMaterial({color:"white"});
// const newBubbleGeometry = new THREE.SphereGeometry(1,10,10)
// newBubbleMaterial.transparent=true;
// newBubbleMaterial.opacity=.5;
// const newBubble = new THREE.Mesh(newBubbleGeometry, newBubbleMaterial)
// bubbles.push(newBubble)
   
// // console.log(newBubble)
// newBubble.scale.set(randomBubbleScale, randomBubbleScale, randomBubbleScale)
// newBubble.position.set(randomBubbleHeight,randomBubbleLeft,-10).applyMatrix4(controller.matrixWorld);
// scene.add(newBubble);
// setTimeout(() => {
//    scene.remove(newBubble)
// }, 1000);
// }
//   }
// }


//fish in the sea

const fishGeometry1 = new THREE.BufferGeometry()
const count = 100
const positions1 = new Float32Array(count *3)
for(let i = 0; i <count; i++)
{
const i3 = i * 3
positions1[i3    ] = Math.sin(i*10)+Math.random()*.1
positions1[i3 + 1] = i*.02+Math.random()*.1
positions1[i3 + 2] = Math.cos(i*10)+Math.random()*.1
}

fishGeometry1.setAttribute(
'position',
new THREE.BufferAttribute(positions1,3)
)


const fishGeometry2 = new THREE.BufferGeometry()
const count2 = 150
const positions2 = new Float32Array(count *3)
for(let i = 0; i <count2; i++)
{
const i3 = i * 3
positions2[i3    ] = Math.sin(i*10)+Math.random()*.18
positions2[i3 + 1] = i*.01+Math.random()*.1
positions2[i3 + 2] = Math.cos(i*10)+Math.random()*.18
}

fishGeometry2.setAttribute(
'position',
new THREE.BufferAttribute(positions2,3)
)


const fishGeometry3 = new THREE.BufferGeometry()
const count3 = 120
const positions3 = new Float32Array(count *3)
for(let i = 0; i <count3; i++)
{
const i3 = i * 3
positions3[i3    ] = Math.sin(i*10)+Math.random()*.14
positions3[i3 + 1] = i*.005
positions3[i3 + 2] = Math.cos(i*10)+Math.random()*.14
}

fishGeometry3.setAttribute(
'position',
new THREE.BufferAttribute(positions3,3)
)
const fishMaterial = new THREE.PointsMaterial()
const fishMaterial2 = new THREE.PointsMaterial()
const fishMaterial3 = new THREE.PointsMaterial()
const fishTexture1 = textureLoader.load('/teapot1.png')
const fishTexture2 = textureLoader.load('/teapot2.png')
const fishTexture3 = textureLoader.load('/teapots3.png')



fishMaterial.transparent=true
fishMaterial.alphaMap=fishTexture1
fishMaterial.depthWrite=false;
fishMaterial2.transparent=true
fishMaterial2.alphaMap=fishTexture1
fishMaterial2.depthWrite=false;
fishMaterial3.transparent=true
fishMaterial3.alphaMap=fishTexture1
fishMaterial3.depthWrite=false;

// ...

fishMaterial.map = fishTexture1
fishMaterial2.map = fishTexture2
fishMaterial3.map = fishTexture3
// fishMaterial.size=6;
fishMaterial.sizeAttenuation=true
fishMaterial2.sizeAttenuation=true
fishMaterial3.sizeAttenuation=true
const schoolOfFish = new THREE.Points(fishGeometry1, fishMaterial)
const schoolOfFish2 = new THREE.Points(fishGeometry2, fishMaterial2)
const schoolOfFish3 = new THREE.Points(fishGeometry3, fishMaterial3)

fishGroup=new THREE.Group()
fishGroup.add(schoolOfFish, schoolOfFish2, schoolOfFish3)
fishGroup.scale.x=15;
fishGroup.scale.y=15;
fishGroup.scale.z=15;
fishGroup.position.y-=10;
  
scene.add(fishGroup)









controller.addEventListener('select', ()=>{
  
  raycaster.setFromCamera(new THREE.Vector3(0,0,-.05).applyMatrix4(controller.matrixWorld), camera)
  intersects = raycaster.intersectObject(tableCloth.children[0])
  if(intersects.length>0){

    createSingleSet()

  }

  else if(reticle.visible){
    createGraffiti()
  }


  plateIntersects = raycaster.intersectObjects(plateArray)
 
})


        var light = new THREE.HemisphereLight(0xffffff, 0xbbbbff, 1);
        light.position.set(0.5, 1, 0.25);
        scene.add(light);
  
 

  // Add a GLTF model to the scene
  // const modelUrl = '/saury.gltf';
  
  //       loader = new GLTFLoader();
  //       loader.load(
  //           modelUrl,
  //           function (gltf) {
  

  //  nesse=gltf.scene
  //  console.log(gltf)
  //   // console.log(boy)
    

  //   nesse.position.x+=10
  //   // nesse.scale.set(0.25, 0.25, 0.25)
  //   nesseGroup = new THREE.Group()
  //   nesseGroup.add(nesse)
  
  //   // Animation
  //   mixer = new THREE.AnimationMixer(nesse)
  //   swim = mixer.clipAction(gltf.animations[0]) 
  //   console.log(swim)

  //   swim.timeScale=1.25
    
  //   scene.add(nesseGroup)
      
  //   swim.play()
      
  //           },
  //   )
    
  //   const modelUrl2 = "/whale.glb"
  // loader2 = new GLTFLoader();
  //       loader2.load(
  //           modelUrl2,
  //           function (gltf) {
  

  //      whale=gltf.scene;
  //     whaleGroup = new THREE.Group;

  //   whale.position.y+=10;
  //   whale.position.x+=10   
  //   whaleGroup.add(whale)
  //   mixer2 = new THREE.AnimationMixer(whale)
  //   whaleanimation= mixer2.clipAction(gltf.animations[0])

  //   scene.add(whaleGroup)
  //   whaleanimation.play()
      
  //           },
  //           function (xhr) {
  //         // console.log((xhr.loaded / xhr.total * 100) + '% loaded' );
  //     },
  //           function (error) {
  //               console.error(error);
  //           }
  //       );
  
          const modelUrl3 = "/rocks.glb"
  loader3 = new GLTFLoader();
        loader3.load(
            modelUrl3,
            function (gltf) {
  

       var rocks=gltf.scene;
      rock1Geo = rocks.children[0].geometry
      rock2Geo = rocks.children[1].geometry
      rock3Geo = rocks.children[2].geometry
      // rock1Geo.computeVertexNormals()
      // rock2Geo.computeVertexNormals()
      // rock3Geo.computeVertexNormals()



      
            },
            function (xhr) {
          // console.log((xhr.loaded / xhr.total * 100) + '% loaded' );
      },
            function (error) {
                console.error(error);
            }
        );
        const gltfLoader = new GLTFLoader()
        // gltfLoader.setDRACOLoader(dracoLoader)
        
        gltfLoader.load(
            '/tableandcloth.glb',
            (gltf) =>
            {
                tableCloth=gltf.scene
                tableCloth.scale.set(0.1, 0.1, 0.1)
                tableCloth.position.y-=.1
                tableCloth.position.z-=.5
                scene.add(tableCloth)
            }
        )
        
        gltfLoader.load(
            '/singleset.glb',
            (gltf) =>
            {       
                singleSet=gltf.scene
                singleCup=singleSet.children[0]
                singlePlate= singleSet.children[1]
                singleCup.position.y+=.07;
                singleGroup=new THREE.Group();
                singleGroup.add(singlePlate,singleCup)
                singleGroup.scale.set(.1,.1,.1)
                scene.add(singleGroup)
                singleGroup.position.y-=.1
                singleGroup.position.z-=.5
                
            }
        )
        gltfLoader.load(
            '/macaroon.glb',
            (gltf) =>
            {       
                macaroon=gltf.scene
                // macaroon.children[0].material=basicTexture
                // macaroon.children[1].material=basicTexture
                // macaroon.children[2].material=basicTexture
                macaroon.position.y+=1
                macaroon.scale.x=.07
                macaroon.scale.y=.07
                macaroon.scale.z=.07
                
                // const macaroonCin = new THREE.CylinderGeometry(.067,.067,.047,8,3,false,0,Math.PI*2)
                // const macaroonMesh = new THREE.Mesh(macaroonCin, macaroonMaterial[2])
                // macaroonMesh.position.y+=1;
                // scene.add(macaroonMesh)
                
                
            }
        )
        
        gltfLoader.load(
            '/teaset2.glb',
            (gltf) =>
            {
                teaset=gltf.scene
                console.log(teaset)
                // teaset.scale.set(0.25, 0.25, 0.25)
                cups[1]=teaset.children[4]
                cups[2]=teaset.children[2]
                cups[3]=teaset.children[3]
                cups[4]=teaset.children[7]
                cups[5]=teaset.children[5]
                cups[6]=teaset.children[6]
                plates[1]=teaset.children[13]
                plates[2]=teaset.children[12]
                plates[3]=teaset.children[10]
                plates[4]=teaset.children[9]
                plates[5]=teaset.children[8]
                plates[6]=teaset.children[14] 
                teaset.scale.set(.1,.1,.1)
                teaset.position.y-=.1
                teaset.position.z-=.5
                scene.add(teaset)
            }
        )
  
  addReticleToScene()
  
  const button = ARButton.createButton(renderer, {
    requiredFeatures: ["hit-test"]
  });

        document.body.appendChild(button);

        window.addEventListener('resize', onWindowResize, false);
    }





    function onWindowResize() {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();

        renderer.setSize(window.innerWidth, window.innerHeight);
    }

let rotationPos = 0

// setInterval(() => {
//     if(nesseGroup){
//         gsap.to(nesseGroup.rotation,{duration:2,y:rotationPos+.5})
//         rotationPos+=.5
//     }
// }, 2200);

  let hitTestSource = null;
  let localSpace = null;
  let hitTestSourceInitialized = false;

  // This function gets called just once to initialize a hitTestSource
  // The purpose of this function is to get a) a hit test source and b) a reference space
  async function initializeHitTestSource() {
    const session = renderer.xr.getSession();
    
    // Reference spaces express relationships between an origin and the world.

    // For hit testing, we use the "viewer" reference space,
    // which is based on the device's pose at the time of the hit test.
    const viewerSpace = await session.requestReferenceSpace("viewer");
    hitTestSource = await session.requestHitTestSource({ space: viewerSpace });

    // We're going to use the reference space of "local" for drawing things.
    // which gives us stability in terms of the environment.
    // read more here: https://developer.mozilla.org/en-US/docs/Web/API/XRReferenceSpace
    localSpace = await session.requestReferenceSpace("local");

    // set this to true so we don't request another hit source for the rest of the session
    hitTestSourceInitialized = true;
    
    // In case we close the AR session by hitting the button "End AR"
    session.addEventListener("end", () => {
      hitTestSourceInitialized = false;
      hitTestSource = null;
    });
  }
//add reticle to scene

function addReticleToScene(){
  
  const geometry = new THREE.RingBufferGeometry(0.15,0.2,32).rotateX(-Math.PI/2);
  const material = new THREE.MeshBasicMaterial();
  reticle = new THREE.Mesh(geometry, material);
  
  reticle.matrixAutoUpdate = false;
  reticle.visible = false;
  scene.add(reticle);
}





    function animate() {
        renderer.setAnimationLoop(render);
     if(mixer)
{
}
    }

let oldElapsedTime=null;

const clock = new THREE.Clock()
let previousTime = 0

    function render(timestamp, frame) {
   const elapsedTime = clock.getElapsedTime()
const deltaTime = elapsedTime - oldElapsedTime
oldElapsedTime = elapsedTime


for(const object of objectsToUpdate)
{
    object.singleFakeCup.position.copy(object.cupbody.position)
    object.singleFakeCup.quaternion.copy(object.cupbody.quaternion)
    object.plateMesh.position.copy(object.platebody.position)
    object.plateMesh.quaternion.copy(object.platebody.quaternion)
    // object.body.applyForce(new CANNON.Vec3(- 10, 0, 0), object.body.position)
}

for(const macaroon of intersectObjectMacaroon)
{

    macaroon.newMacaroonGroup.position.copy(macaroon.macaroonBody.position)
    macaroon.newMacaroonGroup.quaternion.copy(macaroon.macaroonBody.quaternion)
}
  
  if(frame){
    
    if(!hitTestSourceInitialized){
      initializeHitTestSource();
    }
  }
  
  if(hitTestSourceInitialized){
    const hitTestResults = frame.getHitTestResults(hitTestSource);
    // console.log(hitTestResults)
    
    if(hitTestResults.length>0){
      const hit = hitTestResults[0]
      
      const pose = hit.getPose(localSpace)
      reticle.visible = true;
      reticle.matrix.fromArray(pose.transform.matrix)
    }
    else{
      reticle.visible=false
    }
  }
  
    if(bubbles.length>0){
    bubbles.forEach(element => {

        element.position.y+=.1
    
    });
    }
       
  
  if(fishGroup){

fishGroup.children[0].rotation.y+=.002
fishGroup.children[1].rotation.y+=.003
fishGroup.children[2].rotation.y+=.001


}

  if(whaleGroup){

whaleGroup.rotation.y-=.005
    whaleGroup.children[0].position.x+=Math.sin(elapsedTime)*.01
}
  

  // rotateModel();
        renderer.render(scene, camera);
  if(mixer){
          mixer.update(deltaTime)
  }
   if(mixer2){
          mixer2.update(deltaTime)
  }
  
  world.step(1 / 60, deltaTime, 3)


    }

let degrees = 0; // the angle to rotate our model

function rotateModel() {
  if (model !== undefined) {
    // valid degrees range from 0-360
    // Once over 360 three.js will treat 360 as 0, 361 as 1, 362 as 2 and so on
    degrees = degrees + 0.2; 
    model.rotation.y = THREE.Math.degToRad(degrees); // we convert degrees to a radian value
    
    // more math utility functions can be found here:
    // https://threejs.org/docs/#api/en/math/MathUtils
  }
}