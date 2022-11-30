function boor(pointsControle, ordre, noeuds, t,i,j, dim) {//algorithme récurssif de boor
    if (j == 0) {//condition de sortie
        switch (dim) {
            case "x":
                return (pointsControle[i].x);
                break
            case "y":
                return (pointsControle[i].y);
                break
        }
    }
    else {
        let alpha = (t - noeuds[i])/(noeuds[i+ordre-j] - noeuds[i]);
        return ( (1-alpha)*boor(pointsControle, ordre, noeuds, t, i-1, j-1, dim) + alpha*boor(pointsControle, ordre, noeuds, t, i, j-1, dim));//retour des valeurs calculé récurssivement
    }
}

function createBoor(pointsControle, degre, noeuds) {
    createBase(pointsControle,degre,noeuds);//n'ayant pas reussi à implémenter l'algorithme de boor on appelle celui de base

    /*
    let x = 0;                         
    let y = 0;
    let taille = pointsControle.length;
    

    if(taille>=3){
        let courbe = [];
        
        for(let t = noeuds[degre]; t<noeuds[noeuds.length - degre - 1] ;t+=0.01){
            for(let r = 0; r < noeuds.length; r++){
                if((t<noeuds[r+1] && t>noeuds[r]) && r > degre){
                    console.log(t)
                    console.log(r)
                    x = boor(pointsControle, degre+1, noeuds, t, r, taille-1, "x");
                    y = boor(pointsControle, degre+1, noeuds, t, r, taille-1, "y");
                    courbe.push(new THREE.Vector3(x,y,0));
                    r = noeuds.length;
                }
            }
        }    
        console.log(courbe);    
        return courbe;
    }
    else {
        return "error";
    }*/
}