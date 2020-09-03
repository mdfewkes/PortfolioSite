var PlayerClass = function() {
	this.ID = GetID();
	this.pos = {x: 0, y: 0}
	this.rot = 0;
	this.radius = 15;
	this.move = 150;
	this.speed = 15;
	this.drag = 0.97;
	this.color = "White";
	this.holding = false;
	this.held = false;

	var me = this;
	var heldItem = null;
	var vel = {x: 0, y: 0};
	var input = {f: 0, s: 0};
	// var direction = {x: 0, y: 0};

	this.Update = function() {
		if (Key.isDown(Key.UP) || Key.isDown(Key.W))    input.f += 1;
		if (Key.isDown(Key.DOWN) || Key.isDown(Key.S))  input.f -= 1;
		if (Key.isDown(Key.LEFT) || Key.isDown(Key.A))  input.s -= 1;
		if (Key.isDown(Key.RIGHT) || Key.isDown(Key.D)) input.s += 1;

		// if (Key.isDown(Key.UP) || Key.isDown(Key.W))    direction.x += 1;
		// if (Key.isDown(Key.DOWN) || Key.isDown(Key.S))  direction.x -= 1;
		// if (Key.isDown(Key.LEFT) || Key.isDown(Key.A))  direction.y -= 1;
		// if (Key.isDown(Key.RIGHT) || Key.isDown(Key.D)) direction.y += 1;

		me.rot = angleBetween2Points(me.pos, mousePos);

		me.pos.x += Math.cos(me.rot) * me.move * input.f * deltaTime;
		me.pos.y += Math.sin(me.rot) * me.move * input.f * deltaTime;
		me.pos.x += Math.cos(me.rot + pi/2) * me.move * deltaTime * input.s;
		me.pos.y += Math.sin(me.rot + pi/2) * me.move * deltaTime * input.s;
		input = {f: 0, s: 0};
		// direction = {x: 0, y: 0};

		if (this.held) HeldLogic();
		else NotHeldLogic();
	}

	this.Draw = function() {
		colorCircle(me.pos.x, me.pos.y, me.radius, me.color);
		drawBitmapCenteredAtLocationWithRotation(imageLoader.getImage("test"), me.pos.x, me.pos.y, me.rot, 0.06 * (me.radius/15));
	}

	function NotHoldingLogic() {
		if (mouseJustPressed || Key.isJustPressed(Key.SPACE)) {
			let closestEnt = null;
			let closestDist = 1000;
			for (var i = 0; i < entities.length; i++) {
				let distanceTo = distance(me.pos, entities[i].pos);
				if (entities[i].ID == me.ID) continue;
				if (distanceTo < me.radius + entities[i].radius && distanceTo < closestDist) {
					closestEnt = entities[i];
					closestDist = distanceTo;
				}
			}

			if (closestEnt) {
				me.holding = true;
				heldItem = closestEnt;
				heldItem.held = true;
				heldItem.holding = false;
			}
		}
	}

	function HoldingLogic() {
		heldItem.pos.x = me.pos.x;
		heldItem.pos.y = me.pos.y;
		heldItem.rot = me.rot;


		if (mouseJustPressed || Key.isJustPressed(Key.SPACE)) {
			
				me.holding = false;
				heldItem.rot = me.rot;
				heldItem.Throw();
				heldItem = null;
		}
	}

	function NotHeldLogic() {
		me.pos.x += vel.x * me.speed * deltaTime;
		me.pos.y += vel.y * me.speed * deltaTime;
		vel.x *= me.drag;
		vel.y *= me.drag;
		if (vel.x < 0.1 && vel.x > -0.1) vel.x = 0;
		if (vel.y < 0.1 && vel.y > -0.1) vel.y = 0;

		if (me.holding) HoldingLogic();
		else NotHoldingLogic();
	}

	function HeldLogic() {

	}

	this.Throw = function() {
		velX = Math.cos(me.rot) * me.speed;
		velY = Math.sin(me.rot) * me.speed;
		me.held = false;
	}
}