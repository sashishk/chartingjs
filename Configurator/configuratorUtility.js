function drawGrid(canName)
{
	var can = new Canvas(canName, "2d");
	can.init();
	var ctx = can.getContext();
	ctx.fillStyle = "black";
	ctx.strokeStyle = "#dbfafd";

	for(var i=0; i<can.getWidth(); )
	{
		ctx.moveTo(i, 0);
		ctx.lineTo(i, can.getHeight());
		ctx.stroke();
		i +=10;
	}

	for(var j=0; j<can.getHeight(); )
	{
		ctx.moveTo(0, j);
		ctx.lineTo(can.getWidth(), j);
		ctx.stroke();
		j +=10;
	}
}

function nameTheCanvas(canName)
{
	var can = new Canvas(canName, "2d");
	can.init();
	var ctx = can.getContext();
	ctx.fillStyle = "black";
	ctx.fillText(canName, 20, can.getHeight()-10);
}

function mouseMove(e)
{
	var x, y;
	var can = objCan.getCanvas();
	var ctx = objCan.getContext();

	if (e.pageX != undefined && e.pageY != undefined)
	{
		x = e.pageX;
		y = e.pageY;
	}
	else
	{
		x = e.clientX + document.body.scrollLeft + document.documentElement.scrollLeft;
		y = e.clientY + document.body.scrollTop + document.documentElement.scrollTop;
	}

	x -= can.offsetLeft;
	y -= can.offsetTop;

	var cell = "X=" + x + "::" + "Y="+ y;
	ctx.clearRect(2, 2, 80, 30);
	ctx.fillText(cell, 40, 20);
}