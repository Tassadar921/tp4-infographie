//booléen détectant si le curseur est au dessus de la poubelle pour delete les points de façon graphique
let onTrash = false;

//save des coordonnées initiales du point en train d'être drag
const objectCooBeforeDrag = new THREE.Vector3(
    0,
    0,
    0,
);

//trigger chaque fois qu'on charge une courbe, first est un booléen qui est true au chargement de la page, false sinon
initializationDragging = (first) => {
    const position = new THREE.Vector3();
    if(!first){//quand on charge une courbe on désactive le draggable des anciens points
        draggable.deactivate();
    }else{//au chargement de la page ajoute un event qui trigger à chaque mouvement de pointer et qui check si le curseur est sur
        //la hitbox de la trash ou non
        document.addEventListener('mousemove', (e) => {
            onTrash = (e.clientX>renderer.domElement.width-(20+50)&&e.clientX<renderer.domElement.width-20
            && e.clientY>20 && e.clientY<20+29)
        })
    }
    //initialisation de draggable, qui permet de rendre draggable tous les enfants du plan
    draggable = new DragControls(scene.getObjectById(planeID).children, camera, renderer.domElement);

    //trigger quand on pick un point
    draggable.addEventListener('dragstart', (e) => {
        //on affiche la poubelle
        document.getElementById('trash').style.display="block";
        //on save les coordonnées du point avant de le bouger
        objectCooBeforeDrag.x = tabPointsControle[IDSelectedCurve][e.object.userData.id].x;
        objectCooBeforeDrag.y = tabPointsControle[IDSelectedCurve][e.object.userData.id].y;
    });

    //trigger chaque fois que l'object bouge
    draggable.addEventListener('drag', (e) => {
        //position est le placement actuel du point par rapport à sa position initiale, sous forme de Vector3
        position.setFromMatrixPosition(e.object.matrixWorld);
        //on update en temps réel x et y du point de contrôle lié au point graphique qu'on drag
        tabPointsControle[IDSelectedCurve][e.object.userData.id].x = e.object.geometry.attributes.position.array[0] + position.x;
        tabPointsControle[IDSelectedCurve][e.object.userData.id].y = e.object.geometry.attributes.position.array[1] + position.y;
        //on fait toutes les updates graphiques
        majAffichagePoints();
        majGraphique();
    });

    //trigger quand on lâche le point qui était en train d'être drag
    draggable.addEventListener('dragend', (e) => {
        //si on est sur la poubelle on delete le point
        if(onTrash){
            deletePoint(e.object.userData.id);
        }
        //on cache la poubelle
        document.getElementById('trash').style.display="none";
        //on update graphiquement
        renderer.render(scene, camera);
    });
};