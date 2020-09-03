var EnemyClass = function() {
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
	var target = null;
	var timer = rndFloat(0.1, 1);

	this.Update = function() {
		me.pos.x += Math.cos(me.rot) * me.move * deltaTime;
		me.pos.y += Math.sin(me.rot) * me.move * deltaTime;
		me.rot += rndFloat(-0.1, 0.1);

		timer -= deltaTime;

		if (this.held) HeldLogic();
		else NotHeldLogic();
	}

	this.Draw = function() {
		colorCircle(me.pos.x, me.pos.y, me.radius, me.color);
		drawBitmapCenteredAtLocationWithRotation(imageLoader.getImage("test"), me.pos.x, me.pos.y, me.rot, 0.06 * (me.radius/15));
	}

	function NotHoldingLogic() {
		if (target == null || Math.random() < deltaTime){
			target = player;
			let closestDist = distance(me.pos, player.pos);
			for (var i = 0; i < entities.length; i++) {
				let distanceTo = distance(me.pos, entities[i].pos);
				if (entities[i].ID == me.ID) continue;
				if (distanceTo < closestDist) {
					target = entities[i];
					closestDist = distanceTo;
				}
			}
		}

		if (Math.random() < deltaTime) me.rot = angleBetween2Points(me.pos, target.pos); 

		if (distance(me.pos, target.pos) < me.radius + target.radius) {
				me.holding = true;
				heldItem = target;
				heldItem.held = true;
				heldItem.holding = false;
				target = null;

				timer = rndFloat(0.1, 1);
		}


	}

	function HoldingLogic() {
		heldItem.pos.x = me.pos.x;
		heldItem.pos.y = me.pos.y;
		heldItem.rot = me.rot;


		if (target == null || Math.random() < deltaTime){
			target = player;
			let closestDist = distance(me.pos, player.pos);
			for (var i = 0; i < enemies.length; i++) {
				let distanceTo = distance(me.pos, enemies[i].pos);
				if (enemies[i].ID == me.ID) continue;
				if (enemies[i].ID == target.ID) continue;
				if (distanceTo < closestDist) {
					target = enemies[i];
					closestDist = distanceTo;
				}
			}
		}

		if (Math.random() < deltaTime) me.rot = angleBetween2Points(me.pos, target.pos);

		if (distance(me.pos, target.pos) < 100) {
			me.holding = false;
			heldItem.rot = me.rot;
			heldItem.Throw();
			heldItem = false;
			heldItem.held = false
			target = null;

			timer = rndFloat(0.1, 1);
		}
	}

	function NotHeldLogic() {
		me.pos.x += vel.x * me.speed * deltaTime;
		me.pos.y += vel.y * me.speed * deltaTime;
		vel.x *= me.drag;
		vel.y *= me.drag;
		if (vel.x < 0.1 && vel.x > -0.1) vel.x = 0;
		if (vel.y < 0.1 && vel.y > -0.1) vel.y = 0;

		if (timer > 0) return;
		if (me.holding) HoldingLogic();
		else NotHoldingLogic();
	}

	function HeldLogic() {
		target = null;
	}

	this.Throw = function() {
		vel.x = Math.cos(me.rot) * me.speed;
		vel.y = Math.sin(me.rot) * me.speed;
		me.held = false;
	}
}