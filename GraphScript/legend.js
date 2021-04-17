function Legend(obj, colname, coor, event)
{
	var can;
	var ctx;
	var canObj = obj;

	var leColNameList = colname; //[["green","orange", "blue"], ["Oil", "Gas", "Nuclear"]]
	var leCoor = coor; //[x,y,orientation,spacing,width,height] [50,100,1,10,100,50]
						//orientation=0  --> x-axis
						//orientation=1  --> y-axis

	var leEvent = event; //caller method to be called on mouse click

	var leX = -1;
	var leY = -1;
	var orientation = -1;
	var graphHeight=-1;
	var graphWidth=-1;
	var leSpacing=-1;
	var lePadding=20;
	var leBoxHeight=10;
	var leBoxWidth=30;
	var leTextHeight=20;

	function getGraphSize()
	{
		if(orientation==0)
		{
			graphHeight = lePadding + leBoxHeight + leTextHeight + lePadding;
			graphWidth = (leColNameList[0].length+1)*lePadding + leColNameList[0].length * leBoxWidth;
		}
		else
		{
			graphWidth = lePadding + leBoxWidth + lePadding;
			graphHeight = (leColNameList[0].length+1)*lePadding + leColNameList[0].length * leBoxWidth;
		}
	} 

	function init()
	{
		can = canObj.getCanvas();
		ctx = canObj.getContext()

		leX = leCoor[0];
		leY = leCoor[1];
		orientation = leCoor[2];
		leSpacing = leCoor[3];
		lePadding = leSpacing;
		graphWidth = leCoor[4];
		graphHeight = leCoor[5];
	}

	function drawLegend()
	{
		//outer box
		ctx.textAlign = "left";
		ctx.fillStyle = "white";
		ctx.strokeStyle = "rgb(255, 0, 0)";
		roundRect(ctx, leX, leY, graphWidth, graphHeight, 10, false, true);

		for(var i=0; i<leColNameList[0].length; i++)
		{
			ctx.fillStyle = leColNameList[0][i];
			var x=0;
			var y=0;
			if(orientation==0)
			{
				x = leX+(i+1)*lePadding+i*leBoxWidth;
				y = leY+lePadding;
			}
			else
			{
				x = leX+lePadding;
				y = leY+(i+1)*lePadding+i*leBoxHeight+i*leTextHeight;
			}

			ctx.strokeStyle = "rgb(255, 0, 0)";
			roundRect(ctx, x, y, leBoxWidth, leBoxHeight, 2, true, true);

			ctx.fillStyle = "black";
			if(orientation==0)
				ctx.fillText(leColNameList[1][i], x, y+leBoxHeight+15);
			else
				ctx.fillText(leColNameList[1][i], x, y+leBoxHeight+15);
		}
	}

	this.draw = function()
	{
		init();
		drawLegend();
	}
}