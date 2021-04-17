function Pie(obj, dat, col, coor) 
{
	var can;
	var ctx;
	var canObj = obj;
	var pieData = dat; //[20,40,30,70,50]
	var pieColor = col; //["black","green","orange","blue","red"]
	var pieCoor = coor; //[x,y,radius,ease out delta]

	var pt;
	var ctx;
	var pieX=-1;
	var pieY=-1;
	var pieRad=-1;
	var pieDelta=-1;
	var piePieces=-1;
	var pieTotalCount=-1;
	var pieCircumTotal=-1;

	function piePiece(start, end)
	{
		this.start = start;
		this.end = end;
	}
	
	function mouseMove(e)
	{
		var x, y;

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

		var cell = x + "::" + y;
		ctx.clearRect(2, 2, can.width-1, 65);
		ctx.fillText(cell, 10, 15);

		/*doesPtLieInCircle(e) ? ctx.fillText("Inside Circle", 10, 30) : ctx.fillText("Outside Circle", 10, 30);

		var ang = "::Degree::" + calculateAngle(e, "deg");
		ctx.fillText(ang, 10, 45);

		for(var j=0; j<piePieces.length; j++)
		{
			var angl = calcAngle(e, "rad");
			if(doesPtLieInCircle(e)) 
			{
				if(angl>piePieces[j].start && angl<piePieces[j].end)
				{
					ctx.fillText(myColor[j], 10, 60);
				}
			}
			else
			{
				ctx.clearRect(2, 50, 250, 10);
				ctx.fillText("Outside Region", 10, 60);	
			}
		}*/
	}

	function getPieInfo()
	{
		if(pieData.length < pieColor.length) //data points mismatch with colors
			return 1;
		if(pieCoor < 4) //minimum specified data missing in pieCoor
			return 2;

		can = canObj.getCanvas();
		ctx = canObj.getContext()

		pieX = pieCoor[0];
		pieY = pieCoor[1];
		pieRad = pieCoor[2];
		pieDelta = pieCoor[3];

		pt = new Point(pieX, pieY);

		pieTotalCount = pieData.length;
		for (var j = 0; j < pieData.length; j++)
		{
			pieCircumTotal += (typeof pieData[j] == 'number') ? pieData[j] : 0;
		}

		return 0;
	}

	function drawPie()
	{
		var lastend = 0;
		var nextend = 0;

		piePieces = new Array();

		for (var i = 0; i < pieData.length; i++)
		{
			ctx.fillStyle = pieColor[i];
			ctx.beginPath();
			ctx.moveTo(pieX,pieY);

			nextend = lastend+(Math.PI*2*(pieData[i]/pieCircumTotal));
			ctx.arc(pieX, pieY, pieRad, lastend, nextend,false);

			ctx.lineTo(pieX,pieY);
			ctx.fill();

			piePieces[i] = new piePiece(lastend, nextend);
			lastend = nextend;
		}
	}

	function drawPiePieces()
	{
		var lastend = 0;
		var nextend = 0;
		for (var i = 0; i < pieData.length; i++)
		{
			ctx.fillStyle = pieColor[i];
			ctx.beginPath();
			ctx.moveTo(pieX,pieY);

			nextend = lastend+(Math.PI*2*(pieData[i]/pieCircumTotal));
			ctx.arc(pieX, pieY, pieRad, lastend, nextend,false);

			ctx.lineTo(pieX,pieY);
			ctx.fill();

			lastend = nextend;
		}
	}

	function pieClickFunc(e)
	{
		alert("pieClick");
		var pieceNo = findPiePiece(e);
		return pieceNo;
	}

	this.givePiePieceColor = function(pieNo)
	{
		return pieColor[pieNo];
	}

	this.findPiePiece = function(e)
	{
		var j=0;
		var found = false;
		var scaledPt = new Point(e.x-canObj.getOffsetLeft(), e.y-canObj.getOffsetTop());

		for(; j<piePieces.length; j++)
		{
			var angl = calculateAngle(pt, scaledPt, "rad");
			if(doesPtLieInCircle(pt, scaledPt, pieRad)) 
			{
				if(angl>piePieces[j].start && angl<piePieces[j].end)
				{
					found = true;
					break;
				}
			}
		}
		return found ? j:-1;
	}

	this.addAnimation = function(event, pieClickFunc)
	{
		can.addEventListener(event, pieClickFunc, false);
	}

	this.draw = function()
	{
		switch (getPieInfo())
		{
			case 1: return 1;//minimum specified data missing in pieCoor
			case 2: return 2;//data points mismatch with colors
		}
		drawPie();
		return 0;
	}
}
