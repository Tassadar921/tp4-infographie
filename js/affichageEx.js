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
        document.getElementById('courbe' + i).checked = i === id;
    }
}

refresh = (checked) => {//met à jour l'affichage et si ui ou non une courbe est coché en paramètre
    material = new THREE.LineBasicMaterial({color: randomColor()});
    material2 = new THREE.LineBasicMaterial({color: randomColor()});
    materialPoints = new THREE.PointsMaterial({color: randomColor(), size : 0.15});//génère de nouvelles couleurs
    scene = new THREE.Scene();//création d'une nouvelle scène
    scene.add(configPlane());//ajout du plan des points à la scène
    renderer.render(scene, camera);//render de la scene
    if(checked) {//si la courbe n'est pas cochée ne l'affiche pas
        miseAJour(chargeDraw(tabPointsControle[IDSelectedCurve], methode));//affiche la courbe
        initializationDragging(false);//met en place le dragging
    }
    setupAffichagePoints();//affiche les coordonnées des points
};

document.getElementById("bernstein").style = "background-color: lightgrey;";//courbe bernstein de base grisé

document.getElementById("bernstein").addEventListener("click",(event)=>{//si on utilise la méthode de berntein
    clearSceneChildren();//remise à zero
    methode = "bernstein";//utilisation de la méthode de bernstein
    unCheckAll(IDSelectedCurve+1);
    document.getElementById("bernstein").style = "background-color: lightgrey;";//courbe bernstein de base grisé
    document.getElementById("decasteljau").style = "";//courbe decastlejau normal
    refresh(true);//refresh pour afficher correctement
});

document.getElementById("decasteljau").addEventListener("click",(event)=>{
    clearSceneChildren();//remise à zero
    methode = "decasteljau";//utilisation de la méthode de decasteljau
    unCheckAll(IDSelectedCurve+1);
    document.getElementById("bernstein").style = "";//courbe bernstein de base normal
    document.getElementById("decasteljau").style = "background-color: lightgrey;";//courbe decastlejau de base grisé
    refresh(true);//refresh pour afficher correctement
});

document.getElementById("displayPoints").addEventListener("mouseup",() => {
    majGraphique();
    majAffichagePoints();
});

document.getElementById("new").addEventListener("click",(event)=>{//fonction d'ajout d'une nouvelle courbe
    nbCourbes++;//augmentation du nombre de courbe
        
    let tmp = new Array;
    tmp.push(new THREE.Vector3(0,0,0));
    tmp.push(new THREE.Vector3(0,1,0));
    tmp.push(new THREE.Vector3(1,1,0));
    tabPointsControle.push(tmp)//création de trois points pour pouvoir avoir une courbe

    let clone1 = document.getElementById("courbe1").cloneNode();//clonage de champs existant pour plus de simplicité
    let clone2 = document.getElementById("select1").cloneNode();

    clone1.setAttribute("id","courbe" + nbCourbes);
    clone1.setAttribute("name","Courbe " + nbCourbes);
    document.getElementById("formCheckboxes").appendChild(clone1);//mise à jour des informations de clone

    clone2.setAttribute("id","select" + nbCourbes);
    clone2.setAttribute("for","Courbe" + nbCourbes);
    clone2.innerHTML = "courbe " + nbCourbes;
    document.getElementById("formCheckboxes").appendChild(clone2);//mise à jour des informations de clone


    eventListenerAffichagePoint((nbCourbes));//création des évent listeners pour les clones

    IDSelectedCurve = nbCourbes-1;//selectionne la nouvelle courbe

    unCheckAll(nbCourbes);//décoche les autre
    refresh(document.getElementById('courbe'+nbCourbes).checked);//coche la nouvelle courbe
});

document.getElementById("all").addEventListener("click",(event)=>{//fonction d'ajout d'une nouvelle courbe
    material = new THREE.LineBasicMaterial({color: randomColor()});
    material2 = new THREE.LineBasicMaterial({color: randomColor()});
    materialPoints = new THREE.PointsMaterial({color: randomColor(), size : 0.15});//génère de nouvelles couleurs

    scene = new THREE.Scene();//création d'une nouvelle scène
    scene.add(configPlane());//ajout du plan des points à la scène
    renderer.render(scene, camera);//render de la scene

    tabPointsControle.forEach(element => {
        miseAJour(chargeDrawAll(element, methode));//affiche la courbe            
    });
    initializationDragging(false);//met en place le dragging
    setupAffichagePoints();//affiche les coordonnées des points

    unCheckAll(99);
});

document.getElementById("printConsole").addEventListener("click",(event)=>{//fonction d'ajout d'une nouvelle courbe
    let string = "";
    string += "let tabPointControle = new Array;";
    for(let i = 0; i < tabPointsControle.length; i++){
        string += "let pointsControle"+(i+1)+" = new Array;";
        for(let j = 0; j < tabPointsControle[i].length; j++){
            string += "pointsControle"+(i+1)+".push(new THREE.Vector3("+tabPointsControle[i][j].x+","+tabPointsControle[i][j].y+",0));";
        }
        string += "tabPointControle.push(pointsControle"+(i+1)+");";
    }
    console.log(string);
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