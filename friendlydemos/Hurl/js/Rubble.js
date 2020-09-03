var RubbleClass = function() {
	this.ID = GetID();
	this.pos = {x: 0, y: 0}
	this.rot = 0;
	this.radius = 15;
	this.speed = 15;
	this.drag = 0.99;
	this.color = "Grey";
	this.holding = false;
	this.held = false;

	var me = this;
	var vel = {x: 0, y: 0};

	this.Update = function() {

		if (this.held) HeldLogic();
		else NotHeldLogic();
	}

	this.Draw = function() {
		colorCircle(this.pos.x, this.pos.y, this.radius, this.color);
		//drawBitmapCenteredAtLocationWithRotation(imageLoader.getImage("test"), this.pos.x, this.pos.y, this.rotation, 0.1);
	}

	this.Throw = function() {
		vel.x = Math.cos(me.rot) * me.speed;
		vel.y = Math.sin(me.rot) * me.speed;
		me.held = false;
	}

	function NotHeldLogic() {
		me.pos.x += vel.x * me.speed * deltaTime;
		me.pos.y += vel.y * me.speed * deltaTime;
		vel.x *= me.drag;
		vel.y *= me.drag;
		if (vel.x < 0.1 && vel.x > -0.1) vel.x = 0;
		if (vel.y < 0.1 && vel.y > -0.1) vel.y = 0;
	}

	function HeldLogic() {

	}
}