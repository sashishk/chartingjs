function SingleBar(obj, dat, col, coor, xaxis, yaxis)
{
	var can;
	var ctx;
	var canObj = obj;

	var barData = dat; //[20,40,30,70,50]
	var barColor = col; //["black","green","orange","blue","red"]
	var barCoor = coor; //[x,y,orientation,barWidth,barSpacing]
						//orientation=0  --> x-axis
						//orientation=1  --> y-axis

	var barX = -1;
	var barY = -1;
	var barWidth = -1;
	var barSpacing = -1;
	var orientation = -1;
	var graphHeight=-1;
	var graphWidth=-1;
	var barAnim=-1;

	var xAxis = xaxis;
	var yAxis = yaxis;

	var animHg;

	function getGraphSize()
	{
		graphHeight = Math.max.apply(Math, barData) + barSpacing;
		graphWidth = (barData.length+1)*barSpacing + barData.length*barWidth;
	} 

	function drawAxes(xaxis, yaxis)
	{
		var axCoor = [barX, barY, barSpacing+barWidth/2, 10];
		var axis = new Axis(objCan, axCoor, xAxis, yAxis);
		axis.draw(xaxis, yaxis, barSpacing+barWidth/2, 10, graphHeight);
	}

	function init()
	{
		can = canObj.getCanvas();
		ctx = canObj.getContext()

		barX = barCoor[0];
		barY = barCoor[1];
		orientation = barCoor[2];
		barWidth = barCoor[3];
		barSpacing = barCoor[4];
	}

	function drawBars()
	{
		//if(orientation==0)
		{
			for(var j=0; j<barData.length; j++)
			{
				ctx.fillStyle = barColor[j];
				if(barAnim)
				{
					if(animHg[j]<barData[j])
						animHg[j] += 2;
					else
						animHg[j] = barData[j];
					ctx.fillRect(barX+(j+1)*barSpacing+j*barWidth/2, barY, barWidth, -1*animHg[j]);
				}
				else
					ctx.fillRect(barX+(j+1)*barSpacing+j*barWidth/2, barY, barWidth, -1*barData[j]);
			}
		}
	}

	this.draw = function(animate, xaxis, yaxis)
	{
		init();
		getGraphSize();
		drawAxes(xaxis, yaxis);
		
		barAnim = animate;
		if(barAnim)
		{
			animHg = new Array();
			for(var i=0; i<barData.length; i++) animHg[i]=0;
			setInterval(drawBars, 5);
		}
		else
			drawBars();
	}
}