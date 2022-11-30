function setupAffichagePoints() {   //cette fonction affiche les coordonnées des points de controle sur la page html (à droite)
    document.getElementById('points').innerHTML = "";   // on va chercher l'id 'points' dans l'html 

    let newUl = document.createElement('ul');   //on crée un élément 'ul' dans l'html
    newUl.setAttribute('id', 'newUl');  // on attribue un id 'newUl' à l'élément 'ul' qu'on vient de créer
    newUl.style = 'padding: 10px;'; // on lui met un padding de 10px 
    newUl.innerHTML = '<p id="nomCourbe"> Courbe n°' + (IDSelectedCurve + 1) + '</p>';  // on affiche dans l'html le n° de la courbe
    for (let i = 0; i < tabPointsControle[IDSelectedCurve].length; i++) {   // pour chaque point de controle...
        newUl.appendChild(createNewLi(i));  // on créé un élément li
    }

    document.getElementById('points').appendChild(newUl);   

    document.getElementById('points').appendChild(createNewButton('sauvegarder'));  // on ajoute un bouton 'sauvegarder' dans l'html
    document.getElementById('points').appendChild(createNewButton('ajouter'));  // on ajoute un bouton 'ajouter' dans l'html

    initEventListenersAffichagePoints();    //on appelle la fonction 'initEventListenersAffichagePoints()'
}

//trigger après une permutation de points, un update de coordonnées à la main ou un delete de points
let updateAfterMovementInTabPointsControle = () => {
    //clear des enfants du plan (les points draggable)
    scene.getObjectById(planeID).children = [];
    //pour les fonctions suivantes, aller voir leur définition, tout y est décrit
    majAffichagePoints();
    majGraphique();
    initializationDragging(false);
};

function createArrowsButtonEvents(way, id) {    // cette fonction sert à modifier l'ordre des points de controle (intervertir)
    document.getElementById('arrow' + way + id).addEventListener('click', (event) => {  //quand on clique sur un bouton en forme de flèche...
        event.preventDefault(); // sécurité pour éviter des comportements inattendus
        switch (way) {  // on énumère les différents cas (click sur la flèche du haut ou click sur la flèche du bas)
            case 'Up':
                if (id !== 0) { // si ce n'est pas le premier point de controle...
                    let tmp = tabPointsControle[IDSelectedCurve][id - 1].x; // on stocke son x dans 'tmp'
                    tabPointsControle[IDSelectedCurve][id - 1].x = tabPointsControle[IDSelectedCurve][id].x;    // on transfère le x du point à bouger au x du point d'avant
                    tabPointsControle[IDSelectedCurve][id].x = tmp; // on transfère le x du point d'avant avec le x du point à bouger

                    tmp = tabPointsControle[IDSelectedCurve][id - 1].y; // on stocke son y dans 'tmp'
                    tabPointsControle[IDSelectedCurve][id - 1].y = tabPointsControle[IDSelectedCurve][id].y;    // on transfère le y du point à bouger au y du point d'avant
                    tabPointsControle[IDSelectedCurve][id].y = tmp; // on transfère le y du point d'avant avec le y du point à bouger
                }
                updateAfterMovementInTabPointsControle();   //appelle la fonction 'updateAfterMovementInTabPointsControle()'
                break;

            case 'Down':
                if (id + 1 !== tabPointsControle[IDSelectedCurve].length) { // si ce n'est pas le dernier point de controle...
                    let tmp = tabPointsControle[IDSelectedCurve][id + 1].x; // on stocke son x dans 'tmp'
                    tabPointsControle[IDSelectedCurve][id + 1].x = tabPointsControle[IDSelectedCurve][id].x;    // on transfère le x du point à bouger au x du point d'après
                    tabPointsControle[IDSelectedCurve][id].x = tmp; // on transfère le x du point d'après avec le x du point à bouger

                    tmp = tabPointsControle[IDSelectedCurve][id + 1].y; // on stocke son y dans 'tmp'
                    tabPointsControle[IDSelectedCurve][id + 1].y = tabPointsControle[IDSelectedCurve][id].y;    // on transfère le y du point à bouger au y du point d'après
                    tabPointsControle[IDSelectedCurve][id].y = tmp; // on transfère le y du point d'après avec le y du point à bouger
                }
                updateAfterMovementInTabPointsControle();   //appelle la fonction 'updateAfterMovementInTabPointsControle()'
                break;
        }
    });
}

function createDeleteButtonEvents(id){  // cette fonction créé un bouton delete pour supprimer un point
    document.getElementById('delete'+id).addEventListener("click", () => {  //quand on clique sur le bouton supprimer...
        deletePoint(id);    // on appelle la fonction 'deletePoint()'
    })
}

//fonction qui delete le point de contrôle tabPointsControle[IDSelectedCurve][id]
let deletePoint = (id) => {
    if(tabPointsControle[IDSelectedCurve].length > 3){
        //on delete le point du côté data
        tabPointsControle[IDSelectedCurve].splice(id,1);

        //on delete le point dans le panneau de contrôle des points
        document.getElementById("li"+id).remove();

        //on update threeJS, qui prendra en compte qu'un point a été supprimé
        setupAffichagePoints();
        updateAfterMovementInTabPointsControle();
    } else {//on ne peut pas avoir moins de 3 points de contrôle
        alert("Il n'y a pas assez de point pour en suprimer");
    }
}

function initEventListenersAffichagePoints() {  //cette fonction créé les différents boutons dans l'html
    document.getElementById('sauvegarderButton').addEventListener('click', (event) => { // quand on clique sur le bouton 'sauvegarder'...
        event.preventDefault(); //sécurité pour éviter les comportements inattendus
        for (let i = 0; i < tabPointsControle[IDSelectedCurve].length; i++) {   // pour chaque points de controle....
            tabPointsControle[IDSelectedCurve][i].x = document.getElementById('x' + i).value;   // on sauvegarde les modifications de coordonnées faites en x 
            tabPointsControle[IDSelectedCurve][i].y = document.getElementById('y' + i).value;   // on sauvegarde les modifications de coordonnées faites en y
        }
        updateAfterMovementInTabPointsControle();   // appelle la fonction 'updateAfterMovementInTabPointsControle()'
    });

    document.getElementById('ajouterButton').addEventListener('click', (event) => { // quand on clique sur le bouton 'ajouter'
        event.preventDefault(); // sécurité pour éviter les comportements inattendus

        tabPointsControle[IDSelectedCurve].push(new THREE.Vector3(0, 0, 0));    // on ajoute un nouveau point de controle dns le tableau des points de controle de la courbe
        let id = tabPointsControle[IDSelectedCurve].length - 1; // on fixe un id au nouveau point de controle créé

        document.getElementById('newUl').appendChild(createNewLi(id));  // on créé une nouvelle ligne dans le tableau de point de l'html pour afficher le point

        createArrowsButtonEvents('Up', id); //on créé un bouton flèche vers le haut
        createArrowsButtonEvents('Down', id);   // on créé un bouton flèche vers le bas
        createDeleteButtonEvents(id);   // on créé un bouton supprimer

        majAffichagePoints();   // on appelle la fonction 'majAffichagePoints()' pour afficher la courbe avec le nouveau point de controle créé
        majGraphique(true); // on appelle la fonction 'majGraphique'
    });

    for (let i = 0; i < tabPointsControle[IDSelectedCurve].length; i++) {   // pour chaque points de controle...
        createArrowsButtonEvents('Up', i);  // on créé un bouton flèche vers le haut
        createArrowsButtonEvents('Down', i);    // on créé un bouton flèche vers le bas
        createDeleteButtonEvents(i);    // on créé un bouton supprimer
    }
}

function createNewLi(id) {  // cette fonction créé une nouvelle ligne dans le tableau de point de controle
    let newLi = document.createElement('li');   // créé une nouvelle ligne dans le tableau de point de controle
    newLi.setAttribute("id","li"+id);   // on attribue un id à la ligne créée
    let letters = ['x', 'y'];   
    for (let j = 0; j < letters.length; j++) { // pour chaque lettre(coordonnées) (x et y)...
        newLi.innerHTML += letters[j] + ' : ';  // on ajoute ' :' pour l'affichage dans l'html
        let newInput = document.createElement('input'); // on stocke un champs input dans 'newInput'
        newInput.style = 'width : 30px;';   
        newInput.setAttribute('type', 'text');  // on ajoute le type 'text'
        newInput.setAttribute('name', letters[j] + IDSelectedCurve);    // on ajoute un nom pour ce champs
        newInput.setAttribute('id', letters[j] + id);   // on ajoute un id à ce champs
        newInput.setAttribute('value', tabPointsControle[IDSelectedCurve][id].getComponent(j)); // on ajoute une valeur à ce champs
        newLi.appendChild(newInput);    // on ajoute ce champs dans l'html
        newLi.innerHTML += ' ';
    }
    //on fait un appel vers bootsrap pour l'estéthique des boutons
    newLi.innerHTML += '<button id="arrowUp' + id + '"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-arrow-up" viewBox="0 0 16 16"><path fill-rule="evenodd" d="M8 15a.5.5 0 0 0 .5-.5V2.707l3.146 3.147a.5.5 0 0 0 .708-.708l-4-4a.5.5 0 0 0-.708 0l-4 4a.5.5 0 1 0 .708.708L7.5 2.707V14.5a.5.5 0 0 0 .5.5z"/></svg></button>';
    newLi.innerHTML += '<button id="arrowDown' + id + '"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-arrow-down" viewBox="0 0 16 16"><path fill-rule="evenodd" d="M8 1a.5.5 0 0 1 .5.5v11.793l3.146-3.147a.5.5 0 0 1 .708.708l-4 4a.5.5 0 0 1-.708 0l-4-4a.5.5 0 0 1 .708-.708L7.5 13.293V1.5A.5.5 0 0 1 8 1z"/></svg></button>';
    newLi.innerHTML += '<button id="delete' + id + '"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-x" viewBox="0 0 16 16"><path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z"/></svg></button>'
    return newLi;  
}

function createNewButton(name) {    //cette fonction ajoute des boutons
    let newButtonAdd = document.createElement('button');    // on stocke un bouton dans 'newButtonAdd'
    newButtonAdd.setAttribute('id', name + 'Button');   // on donne un id à ce bouton
    newButtonAdd.innerHTML = name; 

    return newButtonAdd;
}

function majAffichagePoints() { // cette fonction met à jour les points de controle
    document.getElementById("nomCourbe").innerHTML = 'Courbe n°' + (IDSelectedCurve + 1);   // on affiche le n° de la courbe en question
    for (let i = 0; i < tabPointsControle[IDSelectedCurve].length; i++) {   // pour chaque point de controle...
        let letters = ['x', 'y'];
        for (let j = 0; j < letters.length; j++) {  // pour chaque lettre(coordonnées) ( x et y)
            document.getElementById(letters[j] + i).value = tabPointsControle[IDSelectedCurve][i].getComponent(j);  // on met à jour le champs de chaque coordonnées en mettant les nouvelles coordonnées du point de controle
            for (let j = 0; j < letters.length; j++) {
                document.getElementById(letters[j] + i).value = tabPointsControle[IDSelectedCurve][i].getComponent(j);
            }
        }
    }
}