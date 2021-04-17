function Axis(obj, coor, xaxis, yaxis)
{
	var can;
	var ctx;
	var canObj = obj;

	var axCoor = coor; //[x,y,spacingX, spacingY]
	var xAxis = xaxis; //X-Axis legends to be displayed, 1st element the name of axes
	var yAxis = yaxis; //Y-Axis legends to be displayed, 1st element the name of axes
	var axisHeight=100; //Height of Y-axis line
	var axisWidth=100; //Width of X-axis line
	var startX=100; //Start x of axis
	var startY=100; //Start y of axis
	var spacingX=10; //Spacing between two data points across x-axis
	var spacingY=10; //Spacing between two data points across y-axis
	var padding=10;
	
	function drawXAxes()
	{
		ctx.font = "10pt Arial";
		ctx.textAlign = "center";
		ctx.strokeStyle = "black";
		ctx.lineWidth = 2;

		//x-axis
		ctx.beginPath();
		ctx.moveTo(startX,startY);
		ctx.lineTo(startX+axisWidth, startY);
		ctx.stroke();

		//x-axis labels
		ctx.fillText(xAxis[0], startX + axisWidth/2, startY+5*padding);
		for(var i=1; i<xAxis.length; i++)
		{
			ctx.fillText("|", startX+i*(spacingX), startY+padding);
			ctx.fillText(xAxis[i], startX+i*(spacingX), startY+3*padding);
		}
	}

	function drawYAxes()
	{
		ctx.font = "10pt Arial";
		ctx.textAlign = "center";
		ctx.strokeStyle = "black";
		ctx.lineWidth = 2;

		//y-axis
		ctx.beginPath();
		ctx.moveTo(startX,startY);
		ctx.lineTo(startX,startY-axisHeight);
		ctx.stroke();

		//y-axis labels
		RotateText90(objCan, yAxis[0], startX-spacingY-2*padding, startY-axisHeight/2);
		for(var j=1; j<yAxis.length; j++)
		{
			ctx.fillText("-", startX-padding/2, startY-j*(axisHeight/yAxis.length));
			ctx.fillText(yAxis[j], startX-2*padding, startY-j*(axisHeight/yAxis.length));
		}
	}
	
	function init()
	{
		can = canObj.getCanvas();
		ctx = canObj.getContext()

		startX = axCoor[0];
		startY = axCoor[1];
		spacingX = axCoor[2];
		spacingY = axCoor[3];

		axisHeight = elemHeight + spacingY;
		axisWidth = (xAxis.length+1)*(spacingX) + 2*padding;// + xAxis.length*elemWidth;
	}

	//xDraw=true --> draw x-Axis
	//yDraw=true --> draw y-Axis
	//width --> width of graph elements to be drawn to be considered
	//height --> height of graph elements to be drawn to be considered
	this.draw = function(xDraw, yDraw, spacingx, spacingy, height)
	{
		spacingX = spacingx;
		spacingY = spacingy;
		elemHeight = height;

		init();

		if(xDraw)
			drawXAxes();
		if(yDraw)
			drawYAxes();
	}
}