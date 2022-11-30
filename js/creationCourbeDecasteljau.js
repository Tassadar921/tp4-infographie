function Decasteljau(pointsControle, k, j, t, dim) {//algorithme récursif de decasteljau
    if (k == 0) {//condition de sortie : si k vaut 0 (on se trouve à la base de la pyramide)
        switch (dim) {//permet juste de retourner la valeur de x ou y
            case "x":
                return (pointsControle[j].x);
                break
            case "y":
                return (pointsControle[j].y);
                break
        }
    }
    else {
        return ( (1-t)*Decasteljau(pointsControle, k - 1, j, t, dim) + t*Decasteljau(pointsControle, k - 1, j + 1, t, dim));//calcul des deux points précédant en appelant la fonction dans laquelle on se trouve
    }
}

function createDecastlejau(pointsControle) {
    let x = 0;                         
    let y = 0;
    let taille = pointsControle.length;
    //mise en place des variables utiles par la suite

    if(taille>=3){//si la courbe ne comporte pas 3 points ignore la suite
        let courbe = [];
        //création du tableau lié à la courbe
        for(let t = 0; t<1;t=t+0.005){//le t variant de 0 à 1 dans l'équation de bernstein pour pouvoir créer chaque point
            x = 0;
            y = 0;
            for(let i = 0; i<taille;i++){
                x = Decasteljau(pointsControle, pointsControle.length-1, 0, t, "x");//appel de l'agorythme récursif de decasteljau sur x et y
                y = Decasteljau(pointsControle, pointsControle.length-1, 0, t, "y");
            }
            courbe.push(new THREE.Vector3(x,y,0));//ajout des points à la courbe
        }        
        return courbe;//on retourne tous les points de la courbe
    }
    else {
        return "error";//retourne une erreur (utilisé pour du déboguage)
    }
}