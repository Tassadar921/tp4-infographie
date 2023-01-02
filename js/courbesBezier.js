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

//par défaut bernstein, mais switch avec decasteljau en fonction du bouton cliqué
let methode = "bernstein";

//on ajoute le plan contenant les points draggable à la scène
scene.add(configPlane());

miseAJour(chargeDraw(tabPointsControle[IDSelectedCurve], methode));

//les points de contrôle sont affichés par défaut
document.getElementById("displayPoints").checked = true;

//chargement de la page, donc paramètre true
initializationDragging(true);
setupAffichagePoints();
unCheckAll(1);

//on construit un tableau contenant sur chaque ligne les 3 courbes de l'énoncé


function initialisationCourbes() {
    //ajout des courbes print depuis la Console ICI :
    let tabPointControle = new Array;
    let pointsControle1 = new Array;
    pointsControle1.push(new THREE.Vector3(-2.538300649140053,1.530933311699393,0));
    pointsControle1.push(new THREE.Vector3(-2.3129684083708044,1.8085448604179721,0));
    pointsControle1.push(new THREE.Vector3(-2.7975098873773008,1.7621530412788873,0));
    pointsControle1.push(new THREE.Vector3(-2.466139025422268,1.8424218854325969,0));
    pointsControle1.push(new THREE.Vector3(-2.9028087445576025,1.6568542503703854,0));
    pointsControle1.push(new THREE.Vector3(-2.710613522506402,1.4977962286458046,0));
    pointsControle1.push(new THREE.Vector3(-2.538300710222326,1.5309333265309588,0));
    tabPointControle.push(pointsControle1);
    let pointsControle2 = new Array;pointsControle2.push(new THREE.Vector3(-2.9094361847906782,0.16568542602711797,0));
    pointsControle2.push(new THREE.Vector3(-2.207669865342673,0.05301934394829241,0));
    pointsControle2.push(new THREE.Vector3(-2.935945877734418,1.6229771707015126,0));
    pointsControle2.push(new THREE.Vector3(-2.4595117429041586,1.5765852478432083,0));
    pointsControle2.push(new THREE.Vector3(-2.1406556903441554,1.557442994522837,0));
    pointsControle2.push(new THREE.Vector3(-2.9889650660842535,1.544188160526898,0));
    pointsControle2.push(new THREE.Vector3(-3.0817489040558264,1.5773252455167461,0));
    pointsControle2.push(new THREE.Vector3(-2.670849050181717,1.471286573549234,0));
    pointsControle2.push(new THREE.Vector3(-2.7106135521695336,0.33799826689644547,0));
    pointsControle2.push(new THREE.Vector3(-2.723868386165472,0.3313708498984763,0));
    pointsControle2.push(new THREE.Vector3(-2.7106135521695336,0.2916063479106589,0));
    pointsControle2.push(new THREE.Vector3(-2.8365344751309554,0.33137084989847565,0));
    pointsControle2.push(new THREE.Vector3(-3.326963332980701,0.47717402385380553,0));
    pointsControle2.push(new THREE.Vector3(-3.333590749978668,0.059646752981725754,0));
    pointsControle2.push(new THREE.Vector3(-2.816652224137046,0.16568542494923813,0));
    tabPointControle.push(pointsControle2);
    let pointsControle3 = new Array;
    pointsControle3.push(new THREE.Vector3(-1.8623042575720536,0.7621529141050616,0));
    pointsControle3.push(new THREE.Vector3(-1.8696715164648563,1.391017636235603,0));
    pointsControle3.push(new THREE.Vector3(-2.001479895320124,1.616349839776933,0));
    pointsControle3.push(new THREE.Vector3(-1.9757102807535372,1.6038349905592235,0));
    pointsControle3.push(new THREE.Vector3(-2.160537941338063,1.5905800795126845,0));
    pointsControle3.push(new THREE.Vector3(-2.1539105450196887,0.6627417187401631,0));
    pointsControle3.push(new THREE.Vector3(-2.1008911883563384,0.5434481938335006,0));
    pointsControle3.push(new THREE.Vector3(-2.1207735127478307,-0.27172410691748294,0));
    pointsControle3.push(new THREE.Vector3(-1.8888138444213134,0.47054660685583577,0));
    pointsControle3.push(new THREE.Vector3(-1.6435994086294117,-0.053019350395946074,0));
    pointsControle3.push(new THREE.Vector3(-1.1399156795558094,0.19219509617475639,0));
    pointsControle3.push(new THREE.Vector3(-0.636232050109408,0.7091336093209464,0));
    pointsControle3.push(new THREE.Vector3(-1.5508155588207844,0.8880738273851885,0));
    pointsControle3.push(new THREE.Vector3(-1.6303445901235423,1.610462427139282,0));
    pointsControle3.push(new THREE.Vector3(-1.424894719776993,1.3453656376925058,0));
    pointsControle3.push(new THREE.Vector3(-1.4514043311783653,1.0405044497576301,0));
    pointsControle3.push(new THREE.Vector3(-2.1075186471132485,1.8689315949442877,0));
    pointsControle3.push(new THREE.Vector3(-1.2128172428593662,0.8085448976458902,0));
    pointsControle3.push(new THREE.Vector3(-0.7886625939339932,-0.5765852761286481,0));
    pointsControle3.push(new THREE.Vector3(-1.0736415521738063,0.3777627773877392,0));
    pointsControle3.push(new THREE.Vector3(-1.013994793383304,0.6627416767813489,0));
    pointsControle3.push(new THREE.Vector3(-0.8947013175416144,-0.2452144050312639,0));
    pointsControle3.push(new THREE.Vector3(-0.7091336035121698,-0.8549368017804846,0));
    pointsControle3.push(new THREE.Vector3(-0.8151722821468372,1.0471318850403062,0));
    pointsControle3.push(new THREE.Vector3(-0.5103111088436543,2.0677541033664903,0));
    pointsControle3.push(new THREE.Vector3(-0.808544873752282,2.081008937362429,0));
    pointsControle3.push(new THREE.Vector3(-0.8217997077482204,2.0611266863685223,0));
    pointsControle3.push(new THREE.Vector3(-0.9013287117238545,0.13917575695736015,0));
    pointsControle3.push(new THREE.Vector3(-0.8284271247461896,0.7754077887624335,0));
    pointsControle3.push(new THREE.Vector3(-1.146543140648727,0.6826239507908614,0));
    pointsControle3.push(new THREE.Vector3(-1.279091480608117,1.8490493424334955,0));
    pointsControle3.push(new THREE.Vector3(-1.7098735854761362,1.7827751724538006,0));
    pointsControle3.push(new THREE.Vector3(-1.623717164502532,0.6627416997969521,0));
    pointsControle3.push(new THREE.Vector3(-1.3122285655979646,0.6428594488030435,0));
    pointsControle3.push(new THREE.Vector3(-1.9550880144010079,0.7820352057604032,0));
    tabPointControle.push(pointsControle3);
    let pointsControle4 = new Array;
    pointsControle4.push(new THREE.Vector3(-0.5036836354746782,1.5574429751602488,0));
    pointsControle4.push(new THREE.Vector3(-0.7754077246463944,1.6163498927144224,0));
    pointsControle4.push(new THREE.Vector3(-0.5905800197081653,1.8947013558474135,0));
    pointsControle4.push(new THREE.Vector3(-0.298233779220881,1.8689316022699456,0));
    pointsControle4.push(new THREE.Vector3(-0.27835151746779874,1.6966187250310791,0));
    pointsControle4.push(new THREE.Vector3(-0.35125310089238426,1.5441881605268983,0));
    pointsControle4.push(new THREE.Vector3(-0.543448193833501,1.5508155775248682,0));
    tabPointControle.push(pointsControle4);
    let pointsControle5 = new Array;
    pointsControle5.push(new THREE.Vector3(-0.31811599266743207,-0.17894026610130326,0));
    pointsControle5.push(new THREE.Vector3(-0.231959597943072,-0.4116397753946795,0));
    pointsControle5.push(new THREE.Vector3(-0.0007400009044985292,1.7422708410667085,0));
    pointsControle5.push(new THREE.Vector3(-0.25846926615445176,1.5375607775428342,0));
    pointsControle5.push(new THREE.Vector3(-0.6561142827989824,1.3254833995939035,0));
    pointsControle5.push(new THREE.Vector3(-0.6494868658010127,1.2260721446243612,0));
    pointsControle5.push(new THREE.Vector3(-0.4838014408517752,0.788662622758373,0));
    pointsControle5.push(new THREE.Vector3(-0.3645079348883231,0.7356432867746168,0));
    pointsControle5.push(new THREE.Vector3(-1.0603867196751229,-0.3048611819065979,0));
    pointsControle5.push(new THREE.Vector3(-0.3247434329005067,-0.1921950929411163,0));
    tabPointControle.push(pointsControle5);
    let pointsControle6 = new Array;
    pointsControle6.push(new THREE.Vector3(0.07952900397563463,-0.4374095218659882,0));
    pointsControle6.push(new THREE.Vector3(-0.013254833995939228,1.8880738777279154,0));
    pointsControle6.push(new THREE.Vector3(0.821059763431549,1.7820352432078232,0));
    pointsControle6.push(new THREE.Vector3(0.9344657767122382,1.0670141216220252,0));
    pointsControle6.push(new THREE.Vector3(1.0073673836913668,0.7025062017847689,0));
    pointsControle6.push(new THREE.Vector3(1.7761477739796667,-1.9882250415225953,0));
    pointsControle6.push(new THREE.Vector3(0.3578805178903541,-1.5574429945228374,0));
    pointsControle6.push(new THREE.Vector3(0.7091336338534318,0.2452144217187774,0));
    pointsControle6.push(new THREE.Vector3(0.9212109627177637,0.8019174567543121,0));
    pointsControle6.push(new THREE.Vector3(0.33137082688287256,0.04639191815239247,0));
    pointsControle6.push(new THREE.Vector3(0.4374095218659882,-0.05301933598375629,0));
    pointsControle6.push(new THREE.Vector3(0.3976450198781713,-0.3976450198781711,0));
    pointsControle6.push(new THREE.Vector3(0.38439018588223206,-0.7091336187827386,0));
    pointsControle6.push(new THREE.Vector3(0.05964675298172506,-0.40427243687614084,0));
    tabPointControle.push(pointsControle6);
    let pointsControle7 = new Array;
    pointsControle7.push(new THREE.Vector3(0.2584692601261739,0.5699578992727988,0));
    pointsControle7.push(new THREE.Vector3(0.2650966757268246,1.2916064027844074,0));
    pointsControle7.push(new THREE.Vector3(0.4499243605440244,0.708393609911025,0));
    pointsControle7.push(new THREE.Vector3(0.6428594862504636,1.2459543024583493,0));
    pointsControle7.push(new THREE.Vector3(0.7488981416500265,0.9410932102781571,0));
    pointsControle7.push(new THREE.Vector3(0.7157610820510435,0.8019174503066585,0));
    pointsControle7.push(new THREE.Vector3(0.5434481938335005,0.715761035780708,0));
    pointsControle7.push(new THREE.Vector3(0.25184184592284165,0.5765852788233481,0));
    tabPointControle.push(pointsControle7);

    return tabPointControle
}
