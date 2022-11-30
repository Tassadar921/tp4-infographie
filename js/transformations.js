function rotation(angle, pointsControle){   // cette fonction prend en paramètre un angle afin d'effectuer une rotation
    let nbPoints = pointsControle.length;   // je regarde combien de points de controle possède la courbe affichée 
    for(let i =0; i < nbPoints; i++ ){  // pour chaque points de controle...
        let tmpX = pointsControle[i].x; //on stocke le x de chaque point de controle dans tmpX
        let tmpY = pointsControle[i].y; //on stocke le y de chaque point de controle dans tmpY
        pointsControle[i].x = tmpX * Math.cos(angle) - tmpY * Math.sin(angle);  //je modifie x en fonction de l'angle 'angle' avec la formule de la rotation pour avoir le nouveau x après rotation 
        pointsControle[i].y = tmpX * Math.sin(angle) + tmpY * Math.cos(angle);  //je modifie y en fonction de l'angle 'angle' avec la formule de la rotation pour avoir le nouveau y après rotation
    }
    return pointsControle;  // je return les nouveaux points de controle après rotation
}

function translation(axe, constante, pointsControle){   // cette fonction prend en parametre l'axe selon lequel nous souhaitons faire une translation ainsi que la valeur de cette translation 
    for(let i = 0; i < pointsControle.length; i++ ) {   // pour chaque points de controle...
        switch(axe){    // on énumère les différents cas (translation selon x OU selon y)
            case 'x' :
                pointsControle[i].x = pointsControle[i].x + constante;  // x = x + valeur de la translation
            break;

            case 'y' :
                pointsControle[i].y = pointsControle[i].y + constante;  // y = y + valeur de la translation
            break;
        }
    }
    return pointsControle;  // je return les nouveaux points de controle après translation
}