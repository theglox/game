document.addEventListener('keydown', function(evento){
	if(evento.keyCode == 32){
		console.log("salta");
		if(nivel.muerto==false)
		saltar();else{
		nivel.velocidad=9;

		graundg.velocidad=2;
		fondg.velocidad=0.5;
		obs.x=ancho;
		graundg.x=0;
		fondg.x=0;
		nivel.marcador=0;

		nivel.muerto=false;


	}

	}
});

//borrar tablero
var ancho = 700;
var alto = 300;
var canvas,ctx;
//cargar las imagenes
var ichamp, itree, icloud, fondo, graund;
var suelo = 240;
var champ = {y: suelo, vy:0, gravedad:5, salto: 28, vymax: 9, saltando:false}
var obs ={x: ancho, y:suelo}
var rand=50  ;
var graundg ={x: 0, y:suelo ,velocidad:2}
var fondg={x:0, y:suelo,velocidad:0.5}
var cloud = {x:400, y:rand }
var fond =('sprites/fondo3/1.png','sprites/fondo3/2.png','sprites/fondo3/3.png','sprites/fondo3/4.png','sprites/fondo3/5.png','sprites/fondo3/6.png','sprites/fondo3/7.png','sprites/fondo3/8.png');
var nivel  = {velocidad: 9, marcador:0, muerto:false}

//intento se ciclo
var width = 700;
var heigth = 300;
var x =0,y=0;

var srcX=30;
var srcY=690;

var Hojawidth = 828;
var Hojaheigth=1080;
var cols=8;
var rows =2;
var widthF = Hojawidth/cols;
var heigthF =Hojaheigth/rows;
var currentframe =0;

//fin aniimacion 


function cargaImagenes(){
	ichamp = new Image();
	itree = new Image();
	icloud = new Image();
	fondo = new Image();
	igraund = new Image();
	

	ichamp.src = 'sprites/champ1.png';
	itree.src = 'sprites/virus1.png';
	icloud.src = 'sprites/clouds.png';
	fondo.src = 'sprites/fondo4.png';
	igraund.src = 'sprites/graund2.png';
	
}


//funcion que dibuja al champ
function drawchamp(){
	//ctx.drawImage(ichamp,0,0,80,100,100,champ.y,50,50);
	ctx.drawImage(ichamp,srcX,srcY,widthF,widthF,100,champ.y,50,50);
	//0,0 recorte 64,69 dimensiones de la imagen  100 600 posicion  50 50 reescalar la imagen
}

function drawobs(){
	ctx.drawImage(itree,0,0,88,104,obs.x,obs.y,60,60);

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

	
	ctx.drawImage(fondo,fondg.x,0,1200,1050,0,0,700,300);
	//ctx.drawImage(myGif.image,0,0);}


}
function drawgraund(){
	ctx.drawImage(igraund,graundg.x,0,900,900,0,suelo,800,400);
}
function logicaprueba(){

	currentframe=++currentframe%cols;
	srcX= currentframe*widthF-63;
	srcY=690;
	

}
function logicaobs(){
	if (obs.x < -100) {
		obs.x = ancho +100;
		//ME LO CAMBIA DE LUGAR
		nivel.marcador++;

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

function logicafondo(){
	if (fondg.x > 700) {
		fondg.x=0;
		

	}else{
		fondg.x += fondg.velocidad;
	}

}


function logicagraund(){
	if (graundg.x > 3030) {
		graundg.x=0;
		

	}else{
		graundg.x += graundg.velocidad;
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

function colision(){

//obsx
//obsy
if(obs.x >=100 && obs.x <=150){
	if(champ.y >=suelo-25){
		nivel.muerto=true;
		nivel.velocidad=0;
		graundg.velocidad=0;
		fondg.velocidad=0;
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

function puntuacion(){
	ctx.font = "30px impact";
	ctx.fillStyle = '#555555';
	ctx.fillText('puntuacion:'+`${nivel.marcador}`,500,50);
	if(nivel.muerto== true){
		ctx.font = "60px Courier New";
		ctx.fillText('JUEGO TERMINADO ',50,150);
	}
}








// bucle del juego

var FPS = 25;
setInterval(function(){
	principal();
},1000/FPS);

function principal(){
	borrarCanvas();
	gravedad();
	colision();

	
	logicagraund();
	logicaprueba();
	logicaobs();
	//logicacloud();
	logicafondo();


	drawfondo();
	drawgraund();
	drawobs();
	drawchamp();
	puntuacion();
	//drawcloud();

}