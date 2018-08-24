'use strict'

class particleSimulation {

	constructor(canvas, nodeNumber) {

		this.ctx = canvas.getContext("2d");;
		this.nodeNumber = nodeNumber;
		this.maxDistanceThreshold = (window.innerWidth + window.innerHeight) * 0.05;

		canvas.width = window.innerWidth;
		canvas.height = window.innerHeight;

		this.cx = [];
		this.cy = [];
		this.offsetX = [];
		this.offsetY = [];
		this.distMatx = [];

		this.randDots();
	}

	start() {
		setInterval(() => {
			this.drawDots();
			this.createDistanceMatrix();
			this.drawLinesBetweenPoints();
			this.offsetDots();
		}, 28);
	}

	randDots() {
		for (let i = 0; i < this.nodeNumber; i++) {
			this.cx.push(Math.random() * c.width);
			this.cy.push(Math.random() * c.height);
			this.offsetX.push(Math.random() * 3 + 1);
			this.offsetY.push(Math.random() * 4 + 1);
		}
	}

	offsetDots() {
		let newCx = this.cx.map((val, i) => {
			if (val > window.innerWidth || val < 0) this.offsetX[i] *= -1;

			return val + this.offsetX[i];
		});

		let newCy = this.cy.map((val, i) => {
			if (val > window.innerHeight || val < 0) this.offsetY[i] *= -1;

			return val + this.offsetY[i];
		});

		this.cx = newCx;
		this.cy = newCy;

		// let newCy = 
	}

	drawDots() {

		this.ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);

		for (let i = 0; i < this.cx.length; i++) {
			this.ctx.beginPath();
			this.ctx.arc(this.cx[i], this.cy[i], 2, 0, 2 * Math.PI);
			this.ctx.fillStyle = "#f2f2f2";
			this.ctx.lineWidth = 0;
			this.ctx.fill();
		}
	}

	createDistanceMatrix() {
		this.matDims = this.cx.length;

		for (let i = 0; i < this.matDims; i++) {
			(this.distMatx[i] = []).length = this.matDims;
			this.distMatx[i].fill(0);
		}

		for (let i = 0; i < this.matDims; i++) {
			for (let j = i; j < this.matDims; j++) {
				this.distMatx[i][j] = Math.round(this.distanceBetweenPoints(this.cx[i], this.cy[i], this.cx[j], this.cy[j]));
			}
		}
	}

	distanceBetweenPoints(x1, y1, x2, y2) {
		return Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2));
	}

	drawLinesBetweenPoints() {

		for (let i = 0; i < this.cx.length; i++) {
			for (let j = i; j < this.cx.length; j++) {
				if ((this.distMatx[i][j] != 0) && (this.distMatx[i][j] < this.maxDistanceThreshold)) {
					this.ctx.beginPath();

					this.ctx.lineWidth = 0.5 - ((this.distMatx[i][j] / this.maxDistanceThreshold) * 0.5).toFixed(4);
					// console.log(this.ctx.lineWidth);

					// if (this.distMatx[i][j] < 0.25 * this.maxDistanceThreshold) this.ctx.lineWidth = "1";
					// else if (this.distMatx[i][j] < 0.5 * this.maxDistanceThreshold) this.ctx.lineWidth="0.15";
					// else if (this.distMatx[i][j] < 0.75 * this.maxDistanceThreshold) this.ctx.lineWidth="0.1";
					// else if (this.distMatx[i][j] > 0.75 * this.maxDistanceThreshold) this.ctx.lineWidth="0.05";

					this.ctx.strokeStyle = "#f2f2f2";
					this.ctx.moveTo(this.cx[i], this.cy[i]);
					this.ctx.lineTo(this.cx[j], this.cy[j]);
					this.ctx.stroke();
				}
			}
		}
	}
}

let c = document.getElementById("myCanvas");
let particle = new particleSimulation(c, 100);
particle.start();
