//on initialise le renderer
const renderer = new THREE.WebGLRenderer();
document.body.appendChild(renderer.domElement);
renderer.setSize(window.innerWidth, window.innerHeight);

//on crée la caméra
const camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.5, 1000);
camera.position.set( 0, 0, 5 );
camera.lookAt( 0, 0, 0 );

//puis la scène
let scene = new THREE.Scene();
scene.background = new THREE.Color(0, 0, 0);

//matrice de points de contrôles, chaque ligne correspond à une courbe
let tabPointsControle = initialisationCourbes();

//les materials qui serviront à construire les courbes
let material = new THREE.LineBasicMaterial({color: randomColor()});
let material2 = new THREE.LineBasicMaterial({color: randomColor()});
let materialPoints = new THREE.PointsMaterial({color: randomColor(), size : 0.15});

let nbCourbes = 3;
//on l'initialise dans configPlane
let planeID;
//indice de la ligne de tabPointsControle correspondant à la courbe affichée
let IDSelectedCurve = 0;

//remise à zero de tous les angles et translations
let angle = 0;
let transX = 0;
let transY = 0;
document.getElementById("curseurX").value = 500;
document.getElementById("curseurY").value = 250;
document.getElementById("curseurRot").value = 0;

//par défaut bernstein, mais switch avec decasteljau en fonction du bouton cliqué
let methode = "bernstein";

//on ajoute le plan contenant les points draggable à la scène
scene.add(configPlane());

//
miseAJour(chargeDraw(tabPointsControle[IDSelectedCurve], methode));
//chargement de la page, donc paramètre true
initializationDragging(true);
setupAffichagePoints();
unCheckAll(1);

//on construit un tableau contenant sur chaque ligne les 3 courbes de l'énoncé
function initialisationCourbes() {
    let pointsControle1 = new Array;
    pointsControle1.push(new THREE.Vector3(0,0,0));
    pointsControle1.push(new THREE.Vector3(0,1,0));
    pointsControle1.push(new THREE.Vector3(1,1,0));
    pointsControle1.push(new THREE.Vector3(1,0,0));
    
    let pointsControle2 = new Array;
    pointsControle2.push(new THREE.Vector3(0,0,0));
    pointsControle2.push(new THREE.Vector3(1,0,0));
    pointsControle2.push(new THREE.Vector3(0,1,0));
    pointsControle2.push(new THREE.Vector3(1,1,0));
    
    let pointsControle3 = new Array;
    pointsControle3.push(new THREE.Vector3(0,0,0));
    pointsControle3.push(new THREE.Vector3(1,1,0));
    pointsControle3.push(new THREE.Vector3(0,1,0));
    pointsControle3.push(new THREE.Vector3(1,0,0));
    
    let tabPointControle = new Array;
    tabPointControle.push(pointsControle1);
    tabPointControle.push(pointsControle2);
    tabPointControle.push(pointsControle3);

    return tabPointControle
}