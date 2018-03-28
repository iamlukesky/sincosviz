
var origin,
	radius;

var angle,
	angleInc;

var dir;

var animate;

var division;

function setup() {

	createCanvas(windowWidth, windowHeight);
	background(50);

	division = 5;

	origin = createVector(width / 2, height / 2);
	radius = height / division;

	angle = 0;
	angleInc = 0.01;

	animate = true;

}

function draw() {

	// update
	var target;
	if(animate){
		angle += angleInc;
		target = createVector(width / 2 + cos(angle) * radius,
							  height / 2 +  sin(angle) * radius);
	}else{
		target = createVector(mouseX, mouseY);
	}

  	dir = target.sub(origin);
  	dir.normalize();
  	dir.mult(radius);

  	// draw
	background(50);

	push();
		translate(origin.x, origin.y);

			// unit circle
			noFill();
			stroke(100);
			ellipse(0, 0, radius * 2);

			// baseline/x-axis
			stroke(100);
			line(-radius, 0, radius, 0);

			// origin
			noStroke();
			fill(255);
			ellipse(0, 0, 5);

			rotate(dir.heading());

				// line to P
				stroke(255);
				line(0, 0, dir.mag(), 0);

				translate(dir.mag(), 0);

					// P
					fill(255);
					noStroke();
					ellipse(0, 0, 5);

	pop();

	// adjacent and opposite (can be moved into the above chunk)
	push();
		translate(origin.x, origin.y);
			stroke(255);
			// opposite
			line(cos(dir.heading()) * radius,
				0,
				cos(dir.heading()) * radius,
				sin(dir.heading()) * radius);
			// adjacent
			line(0, 0, cos(dir.heading()) * radius, 0);
	pop();

	// "equator"
	push();
		translate(origin.x, origin.y);
			stroke(200, 0, 0);
			//translate(0, sin(dir.heading() * radius));

			line(-abs(cos(dir.heading()) * radius),
				sin(dir.heading()) * radius,
				abs(cos(dir.heading()) * radius),
				sin(dir.heading()) * radius);
	pop();

	// text
	textSize(18);
	textAlign(CENTER);
	fill(255);
	textFont("sans-serif");

	// sin
	var sine = sin(dir.heading());
	var spacer = sine < 0 ? "" : " ";
	sine = sine.toFixed(2);
	text("sin(θ) = opposite / hypotenuse = " +
		spacer +
		sine,
		width / 2, height / division);

	// cos
	var cosine = cos(dir.heading());
	var spacer = cosine < 0 ? "" : " ";
	cosine = cosine.toFixed(2);
	text("cos(θ) = adjacent / hypotenuse = " +
		spacer +
		cosine,
		width / 2, height - height / division);

	// angle
	var align = cos(dir.heading()) < 0 ? RIGHT : LEFT;
	textAlign(align);
	var head = dir.heading();
	head = degrees(head);
	push();
	translate(origin.x, origin.y);
	translate(cos(dir.heading()) * radius + 20, sin(dir.heading()) * radius + 20);
	text(head.toFixed(2), 0, 0);
	pop();

	// tooltip
	textAlign(CENTER);
	fill(100);
	var tooltip = animate ? "Click to enter manual mode" : "Click to enter automatic mode";
	text(tooltip, width / 2, height - height / 40);

}

function mousePressed(){
	if(animate){
		animate = false;
	}else{
		animate = true;
		angle = dir.heading();
		console.log(angle);
	}

}

function windowResized(){
	resizeCanvas(windowWidth, windowHeight);
	origin = createVector(width / 2, height / 2);
	radius = height / division;
}