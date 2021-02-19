
var radii = [250,350, 350, 450, 450, 550, 550, 650, 650, 750];

var data;

var paddingLeft = 0;

var mouseDown = false;

var mouseX1;
var mouseY1;
var mouseX0;
var mouseY0;

var pressedSpotX;
var pressedSpotY;

var index = 99;

var rotations = [0,0,0,0,0];

function preload(){
		data = loadJSON('../denkring-data.json');
}

function redraw(){
	drawCircles();
	drawWords();
}


function setup(){
	createCanvas(windowWidth, windowHeight);

	for (var i = 0; i < rotations.length; i++){
		rotations[i] = random(-180,180);
	}

	drawCircles();
	drawWords();

	mouseX1 = mouseX;
	mouseX0 = mouseX;
	mouseY1 = mouseY;
	mouseY0 = mouseY;
}

function draw(){
	if (mouseDown){
		background(255);
		var initV = createVector(pwinMouseY-height/2, pwinMouseX-width/2);
		var newV = createVector(winMouseY-height/2, winMouseX-width/2)
		var v = createVector(0,1,0);
		var initAngle = initV.angleBetween(v);
		var newAngle = newV.angleBetween(v);
		var diff = newAngle - initAngle
		drawCircles();
		diff *= 30;
		rotations[index] += diff;
		// draw words but different
		for (var i = 0; i < data.data.length; i++){
			for (var j = 0; j < data.data[i].length; j++){
				push();
				translate(width/2, height/2);
				rotate(radians((j * 360 / data.data[i].length) + rotations[i]));
				text(data.data[i][j],radii[i*2]/2,0);
				pop();
			}
		}
	}
}

function windowResized(){
	resizeCanvas(windowWidth, windowHeight);
	drawCircles();
	drawWords();
}

function drawWords(){
	for (var i = 0; i < data.data.length; i++){
		for (var j = 0; j < data.data[i].length; j++){
			push();
			translate(width/2, height/2);
			rotate(radians((j * 360 / data.data[i].length) + rotations[i]));
			text(data.data[i][j],radii[i*2]/2,0);
			pop();
		}
	}
}

function drawCircles(){
	for (var i = 0; i < radii.length; i++){
		noFill();
		stroke(0);
		ellipse(width/2, height/2, radii[i] - paddingLeft, radii[i] - paddingLeft);
	}
}

function redraw(){
	drawCircles();
	drawWords();
}

function mousePressed(){
	pressedSpotY = mouseY;
	pressedSpotX = mouseX;
	index = 99;
	for (var i = 4; i >= 0; i--){
		if (dist(width/2, height/2, mouseX, mouseY) <= radii[i*2+1]/2){
			index = i;
		}
	}
	if (dist(width/2, height/2, mouseX, mouseY) < radii[0]/2) index = 99;
	if (index != 99) 	mouseDown = true;
}

function mouseReleased(){
	mouseDown = false;
}
