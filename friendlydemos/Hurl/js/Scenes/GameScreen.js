//Game

var player;

var entities = [];
var rubble = [];
var enemies = [];

var worldWidth = 1000;
var worldHeight = 1000;
var camX = 0;
var camY = 0;

var dragLow = 0.93;
var dragHigh = 0.999;
var speedLow = 15;
var speedHigh = 25;

function InitializeGame() {
	player = new PlayerClass();
	player.pos.x = 0;
	player.pos.y = 0;
	player.radius = rndInt(10, 20);
	player.rot = rndFloat(0, 2*pi);
	player.speed = rndInt(speedLow, speedHigh);
	player.drag = rndFloat(dragLow, dragHigh);
	player.color = fullColorHex(scale(dragLow, dragHigh, 0, 255, player.drag), scale(speedLow, speedHigh, 0, 255, player.speed), scale(10, 20, 200, 50, player.radius));
	entities.push(player);

	for (var i = 0; i < 20; i++) {
		enemies[i] = new EnemyClass();
		entities.push(enemies[i]);
		enemies[i].pos.x = rndInt(-worldWidth/2, worldWidth/2);
		enemies[i].pos.y = rndInt(-worldHeight/2, worldHeight/2);
		enemies[i].radius = rndInt(10, 15);
		enemies[i].rot = rndFloat(0, 2*pi);
		enemies[i].speed = rndInt(speedLow, speedHigh);
		enemies[i].drag = rndFloat(dragLow, dragHigh);
		enemies[i].color = fullColorHex(scale(dragLow, dragHigh, 0, 255, enemies[i].drag), scale(speedLow, speedHigh, 0, 255, enemies[i].speed), scale(1, 15, 200, 50, enemies[i].radius));
	}

	for (var i = 0; i < 200; i++) {
		rubble[i] = new RubbleClass();
		entities.push(rubble[i]);
		rubble[i].pos.x = rndInt(-worldWidth/2, worldWidth/2);
		rubble[i].pos.y = rndInt(-worldHeight/2, worldHeight/2);
		rubble[i].radius = rndInt(5, 10);
		rubble[i].rot = rndFloat(0, 2*pi);
		rubble[i].speed = rndInt(speedLow, speedHigh);
		rubble[i].drag = rndFloat(dragLow, dragHigh);
		rubble[i].color = fullColorHex(scale(dragLow, dragHigh, 0, 255, rubble[i].drag), scale(speedLow, speedHigh, 0, 255, rubble[i].speed), scale(5, 10, 200, 50, rubble[i].radius));
	}
}

function modeGame() {
	mouseX -= camX;
	mouseY -= camY;
	mousePos.x = mouseX;
	mousePos.y = mouseY;

	for (var i = 0; i < entities.length; i++) {
		entities[i].Update();
	}

	//Camera logic
	canvasContext.setTransform(1,0,0,1,0,0);//reset the transform matrix as it is cumulative
	canvasContext.clearRect(0, 0, canvas.width, canvas.height);//clear the viewport AFTER the matrix is reset
	colorRect(-0,-0,800,800,"Black");

	//Clamp the camera position to the world bounds while centering the camera around the player
	camX = -player.pos.x + canvas.width/2;
	camY = -player.pos.y + canvas.height/2;

	canvasContext.translate(camX, camY);

	for (var i = 0; i < entities.length; i++) {
		entities[i].Draw();
	}

	colorText(deltaTime, 15 - camX, 10 - camY, "White", "10px Arial");

}

function Jumble() {
	for (var i = 0; i < entities.length; i++) {
		entities[i].rot = rndFloat(0, 2*pi); 
		entities[i].Throw();
	}
}

function ToCenter() {
	for (var i = 0; i < entities.length; i++) {
		entities[i].rot = angleBetween2Points(entities[i].pos, {x:0, y:0}); 
	}
}