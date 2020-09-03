

function InputInit() {
	window.addEventListener('keyup',    function (event) { Key.onKeyup(event); event.preventDefault() }, false);
	window.addEventListener('keydown',  function (event) { Key.onKeydown(event); event.preventDefault() }, false);

	document.addEventListener('pointerdown', mouseDown);
	document.addEventListener('pointerup', mouseUp);
	canvas.addEventListener('contextmenu', evt => evt.preventDefault());

	document.addEventListener('mousemove', mouseMove);
	document.getElementById('gameCanvas').addEventListener('pointermove', calculateMousePos);
	document.addEventListener('wheel', mouseWheel);
}

var mouseX = 0;
var mouseY = 0;
var nextMouseX = 0;
var nextMouseY = 0;
var mousePos = {x: 0, y: 0};
var mouseMovementX = 0;
var mouseMovementY = 0;
var mouseScrollY = 0;
var mouseButtonDown = false;
var mouseJustPressed = false;

function mouseDown(evt) {
	calculateMousePos(evt);	
	mouseButtonDown = true;
	mouseJustPressed = true;
	mouseMovementX = 0;
	mouseMovementY = 0;
}

function mouseUp(evt) {
	mouseButtonDown = false;
}

function mouseMove(evt) {
	if ((mouseX > 0 && mouseX < canvas.width) &&
		(mouseY > 0 && mouseY < canvas.height)) {	
		mouseMovementX = evt.movementX;
		mouseMovementY = evt.movementY;
	}
}

function mouseWheel(evt) {
	mouseScrollY = evt.deltaY;	
}

function calculateMousePos(evt) {
	focus = true;
	var rect = canvas.getBoundingClientRect(),
	root = document.documentElement;
	nextMouseX = evt.clientX - rect.left - root.scrollLeft;
	nextMouseY = evt.clientY - rect.top - root.scrollTop;
	if ((nextMouseX < 0 && nextMouseX > canvas.width) ||
		(nextMouseY < 0 && nextMouseY > canvas.height)) {	
		mouseMovementX = 0;
		mouseMovementY = 0;
	}
}

function isMouseInArea(x, y, width, height) {
	if (mouseX >= x &&
		mouseX <= x + width &&
		mouseY >= y &&
		mouseY <= y + height &&
		focus)
	{
		return true;
	} else {
		return false;
	}
}


const Key = {

	_down: {},
	_pressed: {},
	_released: {},

	ENTER: 13,
	CTRL: 17,
	ALT: 18,
	TAB: 9,
	SPACE: 32,
	LEFT: 37,
	UP: 38,
	RIGHT: 39,
	DOWN: 40,
	ZERO: 48,
	ONE: 49,
	TWO: 50,
	THREE: 51,
	FOUR: 52,
	FIVE: 53,
	SIX: 54,
	SEVEN: 55,
	EIGHT: 56,
	NINE: 57,
	A: 65,
	B: 66,
	C: 67,
	D: 68,
	E: 69,
	F: 70,
	G: 71,
	H: 72,
	I: 73,
	J: 74,
	K: 75,
	L: 76,
	M: 77,
	N: 78,
	O: 79,
	P: 80,
	Q: 81,
	R: 82,
	S: 83,
	T: 84,
	U: 85,
	V: 86,
	W: 87,
	X: 88,
	Y: 89,
	Z: 90,
	COMMA: 188,
	PERIOD: 190,
	BRACKET_LEFT: 219,
	BRACKET_RIGHT: 221,
	PLUS:187,
	MINUS:189,

	isDown(keyCode) {
		return this._down[keyCode];
	},

	isJustReleased(keyCode) {
		return this._released[keyCode];
	},

	isJustPressed(keyCode) {
		return this._pressed[keyCode];
	},

	onKeydown(event) {
		if (this._down[event.keyCode] != true) {
			this._pressed[event.keyCode] = true;
		}
		this._down[event.keyCode] = true;
	},

	onKeyup(event) {
		this._released[event.keyCode] = true;
		delete this._down[event.keyCode];
	},

	update() {
		this._pressed = {};
		this._released = {};
		mouseJustPressed = false;

		if (mouseScrollY > 0.1) {
			mouseScrollY -= 0.1;
		}
		else if (mouseScrollY < -0.1) {
			mouseScrollY += 0.1;
		}
		mouseMovementX = 0;
		mouseMovementY = 0;

		mouseX = nextMouseX;
		mouseY = nextMouseY;
		mousePos.x = mouseX;
		mousePos.y = mouseY;
	}
};
