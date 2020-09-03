var canvas, canvasContext;

var deltaTime = 0;
var now = window.performance.now();
var lastFrameTime = window.performance.now();

//Scenes
const GAME_MODE = 0;
const TITLE_SCREEN = 1;
const CREDITS_SCREEN = 2;
const MAIN_MENU = 3;
var mode = GAME_MODE;


window.onload = function() {
	canvas = document.getElementById('gameCanvas');
	canvasContext = canvas.getContext('2d');
	canvasContext.textAlign = "center";
	
	InputInit();

	window.addEventListener('blur', function () {
	});
	window.addEventListener('focus', function () {
	});

	imageLoader.loadImages().then(applicationStart);
}

function applicationStart() {

	InitializeGame();

	window.requestAnimationFrame(frameLoop);
}

function frameLoop() {

	now = window.performance.now();
	deltaTime = (now - lastFrameTime) / 1000;

	update();

	lastFrameTime = now;

	window.requestAnimationFrame(frameLoop);
}

function update() {

	switch (mode) {
		case GAME_MODE:
			prevMode=MAIN_MENU
			modeGame();
			break;
		case TITLE_SCREEN:
			modeTitle();
			break;
		case CREDITS_SCREEN:
			modeCredits();
			break;
		case MAIN_MENU:
			modeMainMenu();
			break;
	}

	if (Key.isJustPressed(Key.BRACKET_LEFT)){
		turnMusicVolumeDown()
	}
	if (Key.isJustPressed(Key.BRACKET_RIGHT)){
		turnMusicVolumeUp();
	}

	if (Key.isJustPressed(Key.MINUS)){
		turnEffectsVolumeDown()
	}
	if (Key.isJustPressed(Key.PLUS)){
		turnEffectsVolumeUp();
	}

	Key.update();
}

var IDcount = 0;
function GetID() {
	return IDcount++;
}