function Canvas(id, dim, border)
{
	var can = 0;
	var ctx = 0;
	var elemId = id;
	var bor = border;
	var canWidth = 0;
	var canHeight = 0;
	var dimension = dim;
	var canOffsetTop = 0;
	var canOffsetLeft = 0;

	this.init = function()
	{
		can = document.getElementById(elemId);
		canWidth = can.width;
		canHeight = can.height;
		canOffsetLeft = can.offsetLeft;
		canOffsetTop = can.offsetTop;

		ctx = can.getContext(dimension);
		ctx.globalAlpha = 1;
		ctx.font = "10pt Arial";
		ctx.fillStyle = "black";
	}

	this.getWidth = function()
	{
		return can.width;
	}

	this.getCanvas = function()
	{
		return can;
	}

	this.getContext = function()
	{
		return ctx;
	}

	this.getHeight = function()
	{
		return canHeight;
	}

	this.getOffsetLeft = function()
	{
		return canOffsetLeft;
	}

	this.getOffsetTop = function()
	{
		return canOffsetTop;
	}

	this.drawBorder = function(color, width)
	{
		ctx.strokeStyle = color;
		ctx.lineWidth = width;
		ctx.beginPath();
		ctx.rect(0,0,canWidth,canHeight);
		ctx.closePath();
		ctx.stroke();
	}

	this.clearCanvas = function()
	{
		ctx.clearRect(0, 0, canWidth, canHeight);
	}

	this.clearCanvasArea = function(x,y,w,h)
	{
		ctx.clearRect(x,y,w,h);
	}
}
