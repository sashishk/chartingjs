function StackBar(obj, dat, col, coor, xaxis, yaxis)
{
	var can;
	var ctx;
	var canObj = obj;

	var barData = dat; //[[20,40,30,70,50], [30,50,80,90,20], [10,40,30,70,55]]
	var barColor = col; //["black","green","orange"]
	var barCoor = coor; //[x,y,orientation,barWidth,barGrpSpacing]
						//orientation=0  --> x-axis
						//orientation=1  --> y-axis

	var barX = -1;
	var barY = -1;
	var barWidth = -1;
	var barGrpSpacing = -1;
	var orientation = -1;
	var graphHeight=-1;
	var graphWidth=-1;
	var barAnim=-1;

	var xAxis = xaxis;
	var yAxis = yaxis;

	var barInGrp=-1; //total number of bars in group
	var barGrp=-1; //total number of groups to be plotted

	function getGraphSize()
	{
		barInGrp = barData.length;
		barGrp = barData[0].length;

		var maxDat = new Array();

		for(var i=0; i<barData.length; i++)
		{
			maxDat[i] = Math.max.apply(Math, barData[i]);
		}

		graphHeight = Math.max.apply(Math, maxDat) + barGrpSpacing;
		graphWidth = (barGrp+1)*barGrpSpacing + barInGrp*barGrp*barWidth;
	} 

	function addAxesLabels()
	{
		ctx.font = "10pt Arial";
		ctx.textAlign = "center";
		//x-axis labels
		ctx.fillText(xAxis[0], barX + graphWidth/2, barY+barGrpSpacing);
		for(var i=1; i<xAxis.length; i++)
		{
			ctx.fillText("|", barX+i*(barGrpSpacing+barInGrp*barWidth/2), barY+5);
			ctx.fillText(xAxis[i], barX+i*(barGrpSpacing+barInGrp*barWidth/2), barY+10+10);
		}

		//y-axis labels
		//ctx.fillText(yAxis[0], barX-3*barGrpSpacing, barY-graphHeight/2);
		RotateText90(canObj, yAxis[0], barX-barGrpSpacing-10, barY-graphHeight/2);
		for(var j=1; j<yAxis.length; j++)
		{
			ctx.fillText("-", barX-5, barY-j*(graphHeight/yAxis.length));
			ctx.fillText(yAxis[j], barX-barGrpSpacing+10, barY-j*(graphHeight/yAxis.length));
		}
	}

	function drawAxes()
	{
		ctx.strokeStyle = "black";
		ctx.lineWidth = 2;

		//y-axis
		ctx.beginPath();
		ctx.moveTo(barX,barY);
		ctx.lineTo(barX,barY-graphHeight);
		ctx.stroke();
		
		//x-axis
		ctx.moveTo(barX,barY);
		ctx.lineTo(barX+graphWidth, barY);
		ctx.stroke();
		addAxesLabels();
	}

	function init()
	{
		can = canObj.getCanvas();
		ctx = canObj.getContext()

		barX = barCoor[0];
		barY = barCoor[1];
		orientation = barCoor[2];
		barWidth = barCoor[3];
		barGrpSpacing = barCoor[4];
	}

	function drawBars()
	{
		var grpX = barX;
		for(var i=0; i<barInGrp; i++)
		{
			var tempDat = barData[i];
			for(var j=0; j<barGrp; j++)
			{
				//start x = base X + group Spacing + bar X in group
				grpX = barX+(j+1)*barGrpSpacing+j*(barInGrp*barWidth)/2+i*barWidth;
				ctx.fillStyle = barColor[i];
				if(barAnim)
				{
					if(animHg[i+j]<tempDat[j])
						animHg[i+j] += 2;
					else
						animHg[i+j] = tempDat[j];
					ctx.fillRect(grpX, barY, barWidth, -1*animHg[i+j]);
				}
				else
					ctx.fillRect(grpX, barY, barWidth, -1*tempDat[j]);
			}
		}
	}

	this.draw = function(animate)
	{
		init();
		getGraphSize();
		drawAxes();
		barAnim = animate;
		if(barAnim)
		{
			animHg = new Array();
			for(var i=0; i<barInGrp*barInGrp; i++) animHg[i]=0;
			setInterval(drawBars, 2);
		}
		else
			drawBars();
	}
}