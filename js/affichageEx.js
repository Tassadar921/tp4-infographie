function eventListenerAffichagePoint(id){//fonction de création des eventslisteners lors de la création de nouvelles courbes
    document.getElementById("courbe"+id).addEventListener("click",(event) => {
        if(document.getElementById('courbe'+id).checked) {//si la courbe est coché sseulemnt pour permettre de la décocher
            IDSelectedCurve = id-1;//mets en place la variable donnant la courbe courante
            unCheckAll(id);//décoche toutes les autres
        }
        refresh(document.getElementById('courbe'+id).checked);//met à jour le graph
    });
}

function unCheckAll(id) {//décoche toutes les courbes sauf celle passé en paramètre
    for(let i = 1; i <= tabPointsControle.length; i++) {
        if(i != id) {
            document.getElementById('courbe'+i).checked = false;
        } else {
            document.getElementById('courbe'+i).checked = true;
        }
    }
}

refresh = (checked) => {//met à jour l'affichage et si ui ou non une courbe est coché en paramètre
    material = new THREE.LineBasicMaterial({color: randomColor()});
    material2 = new THREE.LineBasicMaterial({color: randomColor()});
    materialPoints = new THREE.PointsMaterial({color: randomColor(), size : 0.15});//génère de nouvelles couleurs
    scene = new THREE.Scene();//création d'une nouvelle scène
    scene.add(configPlane());//ajout du plan des points à la scène
    renderer.render(scene, camera);//render de la scene
    if(checked) {//si la courbe n'est pas coché ne l'affiche pas
        miseAJour(chargeDraw(tabPointsControle[IDSelectedCurve], methode));//affiche la courbe
        initializationDragging(false);//met en place le dragging
    }
    setupAffichagePoints();//affiche les coordonnées des points
};

document.getElementById("bernstein").style = "background-color: lightgrey;";//courbe bernstein de base grisé

document.getElementById("bernstein").addEventListener("click",(event)=>{//si on utilise la méthode de berntein
    clearSceneChildren();//remise à zero
    methode = "bernstein";//utilisation de la méthode de bernstein
    for(let i = 0; i < nbCourbes; i++){
        if(document.getElementById("courbe"+(i+1)).checked) miseAJour(chargeDraw(tabPointsControle[i], methode));//met à jour la courbe à dessiner
    }
    document.getElementById("bernstein").style = "background-color: lightgrey;";//courbe bernstein de base grisé
    document.getElementById("decasteljau").style = "";//courbe decastlejau normal
    refresh(true);//refresh pour afficher correctement
});

document.getElementById("decasteljau").addEventListener("click",(event)=>{
    clearSceneChildren();//remise à zero
    methode = "decasteljau";//utilisation de la méthode de decasteljau
    for(let i = 0; i < nbCourbes; i++){
        if(document.getElementById("courbe"+(i+1)).checked) miseAJour(chargeDraw(tabPointsControle[i], methode));//met à jour la courbe à dessiner
    }
    document.getElementById("bernstein").style = "";//courbe bernstein de base normal
    document.getElementById("decasteljau").style = "background-color: lightgrey;";//courbe decastlejau de base grisé
    refresh(true);//refresh pour afficher correctement
});

document.getElementById("new").addEventListener("click",(event)=>{//fonction d'ajout d'une nouvelle courbe
    nbCourbes++;//augmentation du nombre de courbe
        
    let tmp = new Array;
    tmp.push(new THREE.Vector3(0,0,0));
    tmp.push(new THREE.Vector3(0,1,0));
    tmp.push(new THREE.Vector3(1,1,0));
    tabPointsControle.push(tmp)//création de trois points pour pouvoir avoir une courbe

    let clone1 = document.getElementById("courbe1").cloneNode();//clonage de champs éxistant pour plus de simplicité
    let clone2 = document.getElementById("select1").cloneNode();

    clone1.setAttribute("id","courbe" + nbCourbes);
    clone1.setAttribute("name","courbe " + nbCourbes);
    document.getElementById("formCheckboxes").appendChild(clone1);//mise à jour des informations de clones

    clone2.setAttribute("id","select" + nbCourbes);
    clone2.setAttribute("for","courbe" + nbCourbes);
    clone2.innerHTML = "courbe " + nbCourbes;
    document.getElementById("formCheckboxes").appendChild(clone2);//mise à jour des informations de clones


    eventListenerAffichagePoint((nbCourbes));//création des évent listeners pour les clones

    IDSelectedCurve = nbCourbes-1;//selectionne la nouvelle courbe

    unCheckAll(nbCourbes);//décoche les autre
    refresh(document.getElementById('courbe'+nbCourbes).checked);//coche la nouvelle courbe
});

document.getElementById("courbe1").addEventListener("click",(event)=>{//event listener pour sélectionner les courbes
    if(document.getElementById('courbe1').checked) {//si la courbe est coché sseulemnt pour permettre de la décocher
        IDSelectedCurve = 0;//mets en place la variable donnant la courbe courante
        unCheckAll(1);//décoche toutes les autres
    }
    refresh(document.getElementById('courbe1').checked);//met à jour le graph
});
document.getElementById("courbe2").addEventListener("click",(event)=>{//event listener pour sélectionner les courbes
    if(document.getElementById('courbe2').checked) {//si la courbe est coché sseulemnt pour permettre de la décocher
        IDSelectedCurve = 1;//mets en place la variable donnant la courbe courante
        unCheckAll(2);//décoche toutes les autres
    }
    refresh(document.getElementById('courbe2').checked);//met à jour le graph
});
document.getElementById("courbe3").addEventListener("click",(event)=>{//event listener pour sélectionner les courbes
    if(document.getElementById('courbe3').checked) {//si la courbe est coché sseulemnt pour permettre de la décocher
        IDSelectedCurve = 2;//mets en place la variable donnant la courbe courante
        unCheckAll(3);//décoche toutes les autres
    }
    refresh(document.getElementById('courbe3').checked);//met à jour le graph
});

document.getElementById("curseurX").addEventListener("mousemove",(event)=>{//fonction de translation sur x
    transX = -transX;
    tabPointsControle[IDSelectedCurve] = translation("x",transX, tabPointsControle[IDSelectedCurve]);//remet à zero la translation
    transX = (document.getElementById("curseurX").value - 500)/100;
    tabPointsControle[IDSelectedCurve] = translation("x",transX, tabPointsControle[IDSelectedCurve]);//applique la nouvelle translation

    scene = new THREE.Scene();//création d'une nouvelle scène
    scene.add(configPlane());//ajout du plan des points à la scène
    renderer.render(scene, camera);//render de la scene
    miseAJour(chargeDraw(tabPointsControle[IDSelectedCurve], methode));//affiche la courbe
    initializationDragging(false);//met en place le dragging
    setupAffichagePoints();//affiche les coordonnées des points
});
document.getElementById("curseurY").addEventListener("mousemove",(event)=>{//fonction de translation sur y
    transY = -transY;
    tabPointsControle[IDSelectedCurve] = translation("y",transY, tabPointsControle[IDSelectedCurve]);//remet à zero la translation
    transY = (document.getElementById("curseurY").value - 250)/100;
    tabPointsControle[IDSelectedCurve] = translation("y",transY, tabPointsControle[IDSelectedCurve]);//applique la nouvelle translation

    scene = new THREE.Scene();//création d'une nouvelle scène
    scene.add(configPlane());//ajout du plan des points à la scène
    renderer.render(scene, camera);//render de la scene
    miseAJour(chargeDraw(tabPointsControle[IDSelectedCurve], methode));//affiche la courbe
    initializationDragging(false);//met en place le dragging
    setupAffichagePoints();//affiche les coordonnées des points
});

document.getElementById("curseurRot").addEventListener("mousemove",(event)=>{//fonction de rotation sur x
    angle = -angle;
    tabPointsControle[IDSelectedCurve] = rotation(angle, tabPointsControle[IDSelectedCurve]);//remise à zero de la rotaion
    angle = Math.PI * (document.getElementById("curseurRot").value)/100;
    tabPointsControle[IDSelectedCurve] = rotation(angle, tabPointsControle[IDSelectedCurve]);//application de la nouvelle rotation

    scene = new THREE.Scene();//création d'une nouvelle scène
    scene.add(configPlane());//ajout du plan des points à la scène
    renderer.render(scene, camera);//render de la scene
    miseAJour(chargeDraw(tabPointsControle[IDSelectedCurve], methode));//affiche la courbe
    initializationDragging(false);//met en place le dragging
    setupAffichagePoints();//affiche les coordonnées des points
});