let ctx,
	cvs,
	img;

const gameWidth = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth,
	gameHeight = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;

let player = {
	x: 1,
	y: 1
}

const 
	TILE_HEIGHT = 55,
	TILE_WIDTH = 80,
	MAP_WIDTH = 20,
	MAP_HEIGHT = 20,
	MAP = [
		10, 10, 10, 10, 10, 10, 10, 30, 23, 20, 20, 20, 20, 20, 20, 21, 30, 10, 10, 10,
		10, 10, 10, 10, 10, 10, 10, 30, 23, 20, 20, 20, 20, 20, 37, 33, 30, 10, 10, 10,
		10, 10, 10, 10, 10, 10, 10, 30, 32, 36, 37, 24, 24, 24, 33, 30, 30, 10, 10, 10,
		10, 10, 10, 10, 10, 10, 10, 10, 30, 32, 33, 30, 30, 30, 30, 30, 10, 10, 10, 10,
		10, 10, 10, 10, 10, 10, 10, 10, 10, 30, 30, 30, 10, 10, 10, 10, 10, 10, 10, 10,
		10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10,
		10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10,
		10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10,
		10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10,
		10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10,
		10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10,
		10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10,
		10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10,
		10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10,
		10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10,
		10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10,
		10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10,
		10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10,
		10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10,
		10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10,
	],
	TILES = {
		10: {
			type: 'light-grass',
			x: 0,
			y: 0
		},
		11: {
			type: 'dark-grass',
			x: 80,
			y: 0
		},
		20: {
			type: 'water',
			x: 0,
			y: 55
		},
		21: {
			type: 'ne-water',
			x: 0,
			y: 110
		},
		22: {
			type: 'se-water',
			x: 0,
			y: 165
		},
		23: {
			type: 'sw-water',
			x: 0,
			y: 220
		},
		24: {
			type: 'nw-water',
			x: 0,
			y: 275
		},
		30: {
			type: 'sand',
			x: 80,
			y: 55
		},
		31: {
			type: 'top-sand',
			x: 80,
			y: 110
		},				
		32: {
			type: 'right-sand',
			x: 80,
			y: 165
		},	
		33: {
			type: 'bot-sand',
			x: 80,
			y: 220
		},	
		34: {
			type: 'left-sand',
			x: 80,
			y: 275
		},
		35: {
			type: 'top-sand-spot',
			x: 160,
			y: 110
		},				
		36: {
			type: 'right-sand-spot',
			x: 160,
			y: 165
		},	
		37: {
			type: 'bot-sand-spot',
			x: 160,
			y: 220
		},	
		38: {
			type: 'left-sand-spot',
			x: 160,
			y: 275
		},
	};

window.onload = function() {
	cvs = document.getElementById('game');

	cvs.height = gameHeight - 40;
	cvs.width = gameWidth - 40;

	ctx = cvs.getContext('2d');

	img = new Image();
	img.src = 'tiles.png';

	img.onload = function() {
		update()
	}
}	

function update() {
	clearScreen();
	drawMap();
	
	requestAnimationFrame(update);
}

function drawMap() {
	for(let i = 0; i < MAP_HEIGHT; i++) {
		for(let j = 0; j < MAP_WIDTH; j++) {


			let x = (i-j) * TILE_WIDTH/2 + gameWidth/2;
			let y = (i+j) * TILE_WIDTH/4;

			ctx.drawImage(
				img,
				TILES[MAP[getIndex(i,j)]].x,
				TILES[MAP[getIndex(i,j)]].y,
				TILE_WIDTH,
				TILE_HEIGHT,
				x,
				y,
				TILE_WIDTH,
				TILE_HEIGHT
			);

			if(i === player.x && j === player.y) {
				drawPlayer(ctx, player, x, y);
			}

		}
	}
}

document.onkeypress = function(e) {
	console.log("player", player);
	if(e.keyCode === 37 && !isCollision(player.x - 1, player.y)) player.x -= 1;
	if(e.keyCode === 39 && !isCollision(player.x + 1, player.y)) player.x += 1;
	if(e.keyCode === 40 && !isCollision(player.x, player.y + 1)) player.y += 1;
	if(e.keyCode === 38 && !isCollision(player.x, player.y - 1)) player.y -= 1;
}

const isCollision = (nextX, nextY) => {
	return nextX < 0 || nextY < 0 || nextX > MAP_WIDTH - 1 || nextY > MAP_HEIGHT - 1 || MAP[getIndex(nextX, nextY)] !== 10;
}

const drawPlayer = (ctx, player, x, y) => ctx.drawImage(img, TILES[11].x, TILES[11].y, TILE_WIDTH, TILE_HEIGHT, x, y, TILE_WIDTH, TILE_HEIGHT);

const clearScreen = () => ctx.clearRect(0, 0, cvs.width, cvs.height);

function getIndex(row, col) {
	return row * MAP_WIDTH + col;
}

function getMap() {
	let map = [];
	for(let i = 0; i < MAP_WIDTH * MAP_HEIGHT; i++) {
		map.push(Math.round(Math.random()));
	}

	return map;
}