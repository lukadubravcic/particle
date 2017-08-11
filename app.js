// http://jsfiddle.net/epistemex/k8y3dw0g/

var c=document.getElementById("myCanvas");
var ctx=c.getContext("2d");
var cx = [];
var cy = [];
c.width = window.innerWidth;
c.height = window.innerHeight;

var maxDistanceThreshold = (c.width+c.height)*0.05;
console.log(maxDistanceThreshold);

for (var i = 0; i < 10; i++) {

	cx.push(Math.random()*c.width);
	cy.push(Math.random()*c.height);
	//console.log(cx);

}

for (i = 0; i < cx.length-1; i++) {
						
	ctx.beginPath();
	ctx.arc(cx[i],cy[i],3,0,2*Math.PI);
	ctx.fillStyle = "#f2f2f2";
	ctx.lineWidth = 0;
	ctx.fill();
	//ctx.stroke();
		
	// ctx.beginPath();
	// ctx.moveTo(cx[i+1] , cy[i+1]);
	// ctx.lineTo( cx[i], cy[i]);
	// ctx.stroke();
}	


function createDistanceMatrix(arrX, arrY) {

	var matDims = arrX.length;
	(distMatx = []).length = matDims;
	// (arr = []).length = matDims;
	
	for(var i = 0; i < matDims; i++){
		(distMatx[i] = []).length = matDims
		distMatx[i].fill(0);	
	}

	

	for (i = 0; i < matDims; i++) {
		for (var j = i; j < matDims; j++) {
			distMatx[i][j] = Math.round(distanceBetweenPoints(arrX[i], arrY[i], arrX[j], arrY[j]));
		}
	}
}

function distanceBetweenPoints(x1, y1, x2, y2) {
	return Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2));
}

createDistanceMatrix(cx, cy);

console.log(distMatx);