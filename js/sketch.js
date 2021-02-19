
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
var startRot;

var img1;
var img2;
var img3;
var img4;

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
	drawLines();

	mouseX1 = mouseX;
	mouseX0 = mouseX;
	mouseY1 = mouseY;
	mouseY0 = mouseY;
}

function draw(){
	if (mouseDown){
		background(255);
		var initV = createVector(pwinMouseY-height/2, pwinMouseX-width/2);
		var newV = createVector(winMouseY-height/2, winMouseX-width/2);
		var v = createVector(0,1,0);
		var initAngle = initV.angleBetween(v) + radians(180);
		var newAngle = newV.angleBetween(v) + radians(180); 
		console.log("initAngle = " + degrees(initAngle));
		console.log("newAngle  = " + degrees(newAngle));
		var diff = newV.angleBetween(initV);
		console.log("diff = " + degrees(diff));
		drawCircles();
		drawLines();
		diff = degrees(diff);
		diff *= 1.2;
		rotations[index] += diff;
		rotations[index] %= 360;

		//snapping-------
		// var increment = 360 / data.data[index].length;

		// for (let i = 1; i < data.data[index].length; i++){
		// 	if (rotations[index] > (i-1) * increment && rotations[index] <= i * increment){
		// 		console.log("case 1");
		// 		if (diff > 0){
		// 			console.log("case 2");
		// 			console.log(rotations[index]);
		// 			console.log((i-1) * increment);
		// 			console.log(i * increment);
		// 			console.log("---------");
		// 			if (rotations[index] > (i-1) * increment + 0.4 * increment){
		// 				rotations[index] = i * increment;
		// 			}
		// 			if (rotations[index] < (i-1) * increment + 0.2 * increment && (i-1) * increment != startRot){
		// 				rotations[index] = (i-1) * increment;
		// 			}
		// 		} else if (diff < 0){
		// 			if (rotations[index] < (i) * increment - 0.3 * increment){
		// 				rotations[index] = (i-1) * increment;
		// 			}
		// 		}
		// 	}
		// }


		console.log(rotations[index]);
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
	drawLines();
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

function drawImages(){
	image(img1, width/2, height/2);
}

function drawLines(){
	line(width/2, height/2, width/2 + 2000, height/2);
}

function redraw(){
	drawCircles();
	drawLines();
	drawWords();
}

function mousePressed(){
	index = 99;
	for (var i = 4; i >= 0; i--){
		if (dist(width/2, height/2, mouseX, mouseY) <= radii[i*2+1]/2){
			index = i;
		}
	}
	if (dist(width/2, height/2, mouseX, mouseY) < radii[0]/2) index = 99;
	if (index != 99){
		mouseDown = true;
		startRot = rotations[index];
	}
}

function mouseReleased(){
	mouseDown = false;
}
