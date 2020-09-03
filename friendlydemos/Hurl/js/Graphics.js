const imageLoader = new (function() {
	const IMAGE_DEFS = [
		{id: "test", src: "./images/test.png"},
	];
	const images = {};

	this.loadImages = function() {
		return Promise.all(IMAGE_DEFS.map(function(imageDef) {
			return new Promise(function(resolve, reject) {
				const image = new Image();
				image.onload = function() {
					resolve({id: imageDef.id, image: image});
				}
				image.onerror = function() {
					reject(image);
				}
				image.src = imageDef.src;
			});
		})).then(function(values) {
			values.forEach(function(value) {
				images[value.id] = value.image;
			});
			Object.freeze(images);
		});
	}

	this.getImage = function(id) {
		if (images[id]!=0)
		{
			return images[id];
		} else {
			return false
		}
	}

	this.getAllImages = function() {
		return images;
	}
})();

function colorRect(topLeftX, topLeftY, boxWidth, boxHeight, fillColor) {
	canvasContext.fillStyle = fillColor;
	canvasContext.fillRect(topLeftX, topLeftY, boxWidth, boxHeight);
}

function colorCircle(centerX, centerY, radius, fillColor) {
	canvasContext.fillStyle = fillColor;
	canvasContext.beginPath();
	canvasContext.arc(centerX, centerY, radius, 0, Math.PI*2, true);
	canvasContext.fill();
}

function colorEmptyCircle(centerX, centerY, radius, strokeColor) {
	canvasContext.beginPath();
	canvasContext.arc(centerX, centerY, radius, 0, 2 * Math.PI);
	canvasContext.strokeStyle = strokeColor;
	canvasContext.stroke();
}

function colorLine(startX, startY, endX, endY, lineWidth, fillColor) {
	canvasContext.strokeStyle = fillColor;
	canvasContext.lineWidth = lineWidth;
	canvasContext.beginPath();
	canvasContext.moveTo(startX, startY);
	canvasContext.lineTo(endX, endY);
	canvasContext.stroke();
}

function drawBitmapCenteredAtLocationWithRotation(graphic, atX, atY, withAngle) {
	canvasContext.save(); // allows us to undo translate movement and rotate spin
	canvasContext.translate(atX,atY); // sets the point where our graphic will go
	canvasContext.rotate(withAngle); // sets the rotation
	canvasContext.drawImage(graphic,-graphic.width/2,-graphic.height/2); // center, draw
	canvasContext.restore(); // undo the translation movement and rotation since save()
}

function drawBitmapCenteredAtLocationWithRotation(graphic, atX, atY, withAngle, scale) {
	canvasContext.save(); // allows us to undo translate movement and rotate spin
	canvasContext.translate(atX,atY); // sets the point where our graphic will go
	canvasContext.rotate(withAngle); // sets the rotation
	canvasContext.transform(scale, 0, 0, scale, 0, 0);
	canvasContext.drawImage(graphic,-graphic.width/2,-graphic.height/2); // center, draw
	canvasContext.restore(); // undo the translation movement and rotation since save()
}

function colorText(showWords, textX,textY, fillColor, font = "30px Arial", shadow = false) {
	canvasContext.font = font;
	if (shadow) {
		canvasContext.fillStyle = 'black';
		canvasContext.fillText(showWords, textX+1, textY+1);    
	}
	canvasContext.fillStyle = fillColor;
	canvasContext.fillText(showWords, textX, textY);
}

function colorRoundedRect(topLeftX, topLeftY, boxWidth, boxHeight, fillColor) {
	canvasContext.beginPath()
	canvasContext.fillStyle = fillColor;
	canvasContext.arc(topLeftX, topLeftY+boxHeight/2, boxHeight/2, 0,2 * Math.PI)
	canvasContext.fillRect(topLeftX, topLeftY, boxWidth, boxHeight);
	canvasContext.arc(topLeftX+boxWidth, topLeftY+ boxHeight/2, boxHeight/2, 0,2 * Math.PI)
	canvasContext.closePath()
	canvasContext.fill()
}
