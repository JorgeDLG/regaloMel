var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1 , 1000);
var renderer = new THREE.WebGLRenderer({antialias: true});
renderer.setSize( window.innerWidth, window.innerHeight-100);
document.body.appendChild( renderer.domElement );

var movimRot = 0.03;

var geometry = new THREE.BoxGeometry( 1.5, 1.5, 1.5 );
const colorH = [0xFF6600,0xFF6600,0xFF0000,0xFF0000,0x33FF33,0x33FF33,0x6699FF,0x6699FF,
                0xCC00CC,0xCC00CC,0x330033,0x330033];
for (var i = 0; i < geometry.faces.length; i+=2) {
 geometry.faces[i].color.setHex(colorH[i]);
 geometry.faces[i+1].color.setHex(colorH[i]);
}
geometry.faces[0].color.setHex(0x131313);
geometry.faces[1].color.setHex(0x131313);

var material = new THREE.MeshBasicMaterial( { vertexColors: THREE.FaceColors } );
var cube = new THREE.Mesh( geometry, material );

scene.add( cube );
camera.position.z = 5;

//Con RAYCASTER:
var raycaster = new THREE.Raycaster();
var mouse = new THREE.Vector2();
var intersects = [];
var caraSelect = -1;

window.addEventListener("mousemove", function(event) {
  mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
  mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
}, false);

window.addEventListener("mousedown", function(event){
  raycaster.setFromCamera(mouse, camera);
  intersects = raycaster.intersectObject(cube);
  if (intersects.length === 0) return;
  
  caraSelect = intersects[0].faceIndex;
    console.log(caraSelect);
  if (caraSelect == 1 || caraSelect == 0) {
    window.open("https://jorgedlg.github.io/regaloMel/Asterion.html");
  }
}, false)

////////////////////////
function animate() {
	requestAnimationFrame( animate );
	renderer.render( scene, camera );
  cube.rotation.x += movimRot;
  cube.rotation.y += movimRot;
}
animate();
