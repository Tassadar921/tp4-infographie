function Bernstein(n, i, t) {
    //fonction pour appeler l'équation de bernstein 
    return (fact(n)/(fact(i)*fact(n-i)))*Math.pow(t,i)*Math.pow((1-t), n-i); 
}

function createBernstein(pointsControle) {
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
                let Bern = Bernstein(taille-1, i, t); //appel du polynome de bernstein soit la fonction de base
                x = x + pointsControle[i].x * Bern;//courbe de bezier sur x
                y = y + pointsControle[i].y * Bern;//courbe de bezier sur y
            }
            courbe.push(new THREE.Vector3(x,y,0));//ajout des points à la courbe
        }
       
        return courbe;//on retourne tous les points de la courbe
    }
    else {
        return "error";//retourne une erreur (utilisé pour du déboguage)
    }
}

function fact(x){//fonction permettant le calcul de factoriels
	let result = 1;
	while (x>0){
		result = result*x;
		x--;
	}
	return result;
}