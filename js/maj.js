//pointsControle contient des Vector3, methode est un string ('bernstein' ou 'decasteljau')
//addingPoint true ssi on ajoute un point à une courbe déjà affichée, si false alors on affiche une nouvelle courbe
function chargeDraw(pointsControle, methode, addingPoint = false) {
    let geometry;
    let drawing;

    let points = [];

    switch (methode) {
        case 'bernstein':
            points = createBernstein(pointsControle);
            break;
        case 'decasteljau':
            points = createDecastlejau(pointsControle);
            break;
    }

    let drawings = [];//tableau dont les éléments seront ajoutés 1 à 1 dans la scène

    ////////////////////////// LIGNES ENTRE POINTS DE CONTROLE /////////////////////////////

    geometry = new THREE.BufferGeometry().setFromPoints(pointsControle);  // on set le buffer depuis les points de contrôle
    drawing = new THREE.Line(geometry, material2); // on relie les points grâce à .Line de façon à dessiner la courbe paramétrique
    drawings.push(drawing);//il sera mis dans la scène plus tard

    ////////////////////////// POINTS DE CONTROLE /////////////////////////////

    //ils seront par la suite tous draggable
    for (let i = 0; i < pointsControle.length; i++) {//pour chaque point de contrôle

        //2 cas :
        // - on est en train d'afficher une nouvelle courbe (condition 1)
        // - on est en train d'ajouter un point ) la courbe déjà affichée (condition 2)
        if ((scene.getObjectById(planeID).children.length < pointsControle.length && !addingPoint) || (addingPoint && i===pointsControle.length-1)) {

            //on va ici les mettre chacun dans un tableau différent pour pouvoir les drag indépendamment les uns des autres
            const vertices = [];

            vertices.push(pointsControle[i].x, pointsControle[i].y, 0);

            geometry = new THREE.BufferGeometry();
            geometry.setAttribute('position', new THREE.Float32BufferAttribute(vertices, 3));
            drawing = new THREE.Points(geometry, materialPoints);//ce sont graphiquement des objects Points

            //on rajoute l'id du point de contrôle lié dans le userData pour pouvoir s'en resservir plus tard
            //sans avoir à utiliser des boucles for => optimisation de la mémoire
            //c'est le lien entre la data et les points graphiques, car aller de la data pour construire le graphique est trivial
            //mais update du graphique vers la data (drag&drop) est nettement moins évident, c'est pourquoi on utilise cette astuce
            drawing.userData = {id: scene.getObjectById(planeID).children.length};
            //on ajoute les points au plan, et non directement à la scène (très important pour pouvoir les update et les delete
            //sans toucher à tous les enfants de la scene, qui contient tous les segments des courbes et en a donc des centaines
            //encore une fois pour pouvoir optimiser la mémoire, également pour faciliter la liste d'Object3D passée en param de
            //DragControls car seuls les children du plan seront draggable
            scene.getObjectById(planeID).add(drawing);
        }
    }

    ////////////////////////// LIGNES ENTRE POINTS DE CONTROLE /////////////////////////////

    geometry = new THREE.BufferGeometry().setFromPoints(points);  // on set le buffer depuis les points retournés par
    //Decasteljau ou Bernstein
    drawing = new THREE.Line(geometry, material); // on relie les points grâce à .Line de façon à dessiner la courbe paramétrique
    drawings.push(drawing);//il sera mis dans la scène plus tard

    return drawings;
}

//ajoute chaque élément du array drawings à la scène
function miseAJour(drawings) {
    drawings.forEach(element => {
        scene.add(element);
    });
    // on fait le rendu
    renderer.render(scene, camera);
}

//on clear tous les enfants de la scène, sauf le plan (et donc ses enfants, les points draggable)
clearSceneChildren = () => scene.children = [scene.getObjectById(planeID)];

//création du plan et le retourne
configPlane = () => {
    //il fait la taille du renderer.domElement
    const geometry = new THREE.PlaneGeometry(
        renderer.domElement.width,
        renderer.domElement.height
    );
    //plan transparent
    const planeMaterial = new THREE.MeshBasicMaterial({opacity: 0, transparent: true});
    // const planeMaterial = new THREE.MeshBasicMaterial({color: new THREE.Color(1,1,1)});
    const plane = new THREE.Mesh(geometry, planeMaterial);
    //on save son id pour pouvoir le retrouver directement plutôt que faire une boucle for à chaque fois
    planeID = plane.id;
    return plane;
};

//fonction trigger chaque fois qu'il y a une update graphique
majGraphique = (addingPoint = false) => {
    clearSceneChildren();
    miseAJour(chargeDraw(tabPointsControle[IDSelectedCurve], methode, addingPoint));
}

//retourne une couleur aléatoire
function randomColor() {
    return parseInt('0x' + (('00000' + (Math.random() * (1 << 24) | 0).toString(16).toUpperCase()).slice(-6)));
}