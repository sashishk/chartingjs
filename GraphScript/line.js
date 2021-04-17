function LineChart(obj, dat, col, coor, xaxis, yaxis)
{
	var can;
	var ctx;
	var canObj = obj;

	var arData = dat; //[[20,40,30,70,50], [30,50,80,90,20], [10,40,30,70,55]]
	var arColor = col; //["green","orange", "blue"]
	var arCoor = coor; //[x,y,orientation,axis spacing]
						//orientation=0  --> x-axis
						//orientation=1  --> y-axis

	var arX = -1;
	var arY = -1;
	var orientation = -1;
	var graphHeight=-1;
	var graphWidth=-1;
	var arPadding=20;
	var arSpacing=20;

	var xAxis = xaxis;
	var yAxis = yaxis;

	function getGraphSize()
	{
		var maxDat = new Array();

		for(var i=0; i<arData.length; i++)
		{
			maxDat[i] = Math.max.apply(Math, arData[i]);
		}

		graphHeight = Math.max.apply(Math, maxDat) + arPadding;
		graphWidth = (arData[0].length+2)*arSpacing;
	} 

	function drawAxes(xaxis, yaxis)
	{
		var axCoor = [arX, arY, arSpacing, 10];
		var axis = new Axis(objCan, axCoor, xAxis, yAxis);
		axis.draw(xaxis, yaxis, 0, 10, graphHeight);
	}

	function init()
	{
		can = canObj.getCanvas();
		ctx = canObj.getContext()

		arX = arCoor[0];
		arY = arCoor[1];
		orientation = arCoor[2];
		arSpacing = arCoor[3];
	}

	function drawLine()
	{
		for(var i=0; i<arData.length; i++)
		{
			ctx.globalAlpha = 0.4;
			ctx.fillStyle = arColor[i];
			ctx.strokeStyle = arColor[i];

			ctx.moveTo(arX,arY);
			var temp = arData[i]
			for(var j=0; j<temp.length; j++)
			{
				var x = arX+(j+1)*arSpacing;
				var y = arY-temp[j];
				ctx.lineTo(x,y);
			}
			ctx.stroke();
		}
		ctx.globalAlpha = 1;
	}

	this.draw = function(xaxis, yaxis)
	{
		arSpacing = 10;
		init();
		getGraphSize();
		drawAxes(xaxis, yaxis);

		drawLine();
	}
}