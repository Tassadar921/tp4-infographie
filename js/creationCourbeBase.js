function fctBSpline(m, i, t, noeuds) {
    //fonction récurssive de base B-spline
    if (m == 0) {//condition de sortie : si m vaut 0 (on se trouve à la base de la pyramide)
        if(noeuds[i] <= t && noeuds[i+1] > t) {
            return 1;
        }
        else {
            return 0;
        }
    }
    else {
        return ((t-noeuds[i])/(noeuds[i+m]-noeuds[i])*fctBSpline(m-1, i, t, noeuds) + (noeuds[i+m+1]-t)/(noeuds[i+m+1]-noeuds[i+1])*fctBSpline(m-1, i+1, t, noeuds));//retour des valeurs calculé récurssivement
    }
}

function createBase(pointsControle, degre, noeuds) {
    let x = 0;                   
    let y = 0;
    let taille = pointsControle.length;

    //mise en place des variables utiles par la suite

    if(taille>=3){//si la courbe ne comporte pas 3 points ignore la suite
        let courbe = [];
        //création du tableau lié à la courbe
        for(let t = noeuds[degre]; t<noeuds[noeuds.length - degre - 1] ;t+=0.01){//le t variant entre les noeuds pour créer chaque point
            x = 0;
            y = 0;
            for(let i = 0; i<taille;i++){
                let bSpline = fctBSpline(degre, i, t, noeuds); //appel de la fonction de base B-spline
                x = x + pointsControle[i].x * bSpline;//courbe de base sur x
                y = y + pointsControle[i].y * bSpline;//courbe de base sur y
            }
            courbe.push(new THREE.Vector3(x,y,0));//ajout des points à la courbe
        }
        return courbe;//on retourne tous les points de la courbe
    }
    else {
        return "error";//retourne une erreur (utilisé pour du déboguage)
    }
}