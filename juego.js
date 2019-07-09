document.addEventListener('keydown', function(evento){
	if(evento.keyCode == 32){
		console.log("salta");
		saltar();
	}
});
//borrar tablero
var ancho = 700;
var alto = 300;
var canvas,ctx;
var g =0;
//cargar las imagenes
var ichamp, itree, icloud, fondo, graund;
var suelo = 200;
var champ = {y: 100, vy:0, gravedad:2, salto: 28, vymax: 9, saltando:false}
var obs ={x: ancho, y:suelo}
var rand=50  ;
var graund ={x: ancho, y:suelo-150}
var cloud = {x:400, y:rand }
var fond =('sprites/fondo3/1.png','sprites/fondo3/2.png','sprites/fondo3/3.png','sprites/fondo3/4.png','sprites/fondo3/5.png','sprites/fondo3/6.png','sprites/fondo3/7.png','sprites/fondo3/8.png');
var nivel  = {velocidad: 9, puntuacion:0}
function cargaImagenes(){
	ichamp = new Image();
	itree = new Image();
	icloud = new Image();
	fondo = new Image();
	igraund = new Image();

	ichamp.src = 'sprites/champ.png';
	itree.src = 'sprites/obs.png';
	icloud.src = 'sprites/clouds.png';
	fondo.src = 'sprites/fondo2.jpg';
	igraund.src = 'sprites/ground.png';
}


//funcion que dibuja al rex
function drawchamp(){
	ctx.drawImage(ichamp,0,0,80,100,100,champ.y,50,50);
	//0,0 recorte 64,69 dimensiones de la imagen  100 600 posicion  50 50 reescalar la imagen
}
function drawobs(){
	ctx.drawImage(itree,0,0,200,200,obs.x,obs.y,50,50);

}
function drawcloud(){
rand  = Math.floor(Math.random() * (50)) + 100;
	ctx.drawImage(icloud,0,500,500,430,cloud.x,cloud.y+50,150,100);
	ctx.drawImage(icloud,0,500,500,430,cloud.x+30,cloud.y,150,100);
	ctx.drawImage(icloud,0,500,500,430,cloud.x-200,cloud.y-50,150,100);
	ctx.drawImage(icloud,500,600,500,430,cloud.x+170,cloud.y+50,150,100);
	ctx.drawImage(icloud,500,600,500,430,cloud.x+80,cloud.y,180,150);
	ctx.drawImage(icloud,500,600,500,430,cloud.x-150,cloud.y-70,150,100);

}

function drawfondo(){

	for(i = 0 ; i<8; i++){
	ctx.drawImage(fondo,0,0,900,620,0,0,700,300);
	//ctx.drawImage(myGif.image,0,0);}
}

}
function drawgraund(){
	//ctx.drawImage(igraund,20,0,900,620,0,50,800,400);
	ctx.drawImage(igraund,210,0,900,620,graund.x,graund.y,800,400);
	ctx.drawImage(igraund,210,0,900,620,graund.x-200,graund.y,800,400);
	ctx.drawImage(igraund,210,0,900,620,graund.x-600,graund.y,800,400);
}
function logicaground(){
if (graund.x < -100) {
		graund.x = ancho +100;

	}else{
		graund.x -= nivel.velocidad;
	}



}
function logicaobs(){
	if (obs.x < -100) {
		obs.x = ancho +100;

	}else{
		obs.x -= nivel.velocidad;
	}

}

function logicacloud(){
	if (cloud.x < -100) {
		cloud.x = ancho +100;

	}else{
		cloud.x -= 0.08;
	}

}
function saltar(){
	champ.saltando = true;
	champ.vy = champ.salto;

}
function gravedad(){
	if(champ.saltando == true){
		if(champ.y-champ.vy - champ.gravedad > suelo){
			champ.saltando = false;
			champ.vy =0;
			champ.y = suelo;

		}
		else{
		champ.vy -= champ.gravedad;
		champ.y -= champ.vy;
	}

}
}




function inicializa(){
	canvas = document.getElementById('canvas');
	ctx = canvas.getContext('2d')
	cargaImagenes();

   
}

function borrarCanvas(){
	canvas.width =ancho;
	canvas.height = alto;
}
// bucle del juego

var FPS = 50;
setInterval(function(){
	principal();
},1000/FPS);

function principal(){



	borrarCanvas();
	drawfondo();
	logicaground();
	drawgraund();
	gravedad();

	//logicaobs();
	logicacloud();
	drawobs();
	drawchamp();
	drawcloud();

}