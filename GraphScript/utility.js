function RotateText90(obj, txt, x, y)
{
	var canObj = obj;
	var can = canObj.getCanvas();
	var ctx = canObj.getContext();

	ctx.save();
	//ctx.translate(x,y);
	ctx.rotate(-Math.PI*90/180);
	ctx.textAlign = "center";

	ctx.fillText(txt, -y,x);
	ctx.restore();
}

function Point(nx,ny)
{
	this.x = nx;
	this.y = ny;
}

function doesPtLieInCircle(center, pt, radius)
{
	var x = Math.pow(Math.abs(center.x - pt.x),2);
	var y = Math.pow(Math.abs(center.y - pt.y),2);
	var len = Math.abs(Math.sqrt(x+y));
	return (len <= radius) ? true : false;
}

function arctan(p1, p2, type) //type->"rad"/"deg"
{
	// Returns the arcTan of points p1 and p2.
	var rat =  (p2.y-p1.y)/(p2.x-p1.x);
	inradians=Math.atan(rat);
	if(type=="rad")
		return inradians;
	else
	{
		var indegrees=180*inradians/Math.PI;
		return indegrees;
	}
}

function calculateAngle(p1, p2, type) //type->"rad"/"deg"
{
	// Returns the angle points p1 and p2 form with the horizontal.
	if (p2.x > p1.x) 
	{
		// quad 1 or 2
		if (p2.y > p1.y)
		{
			// quad 2
			return arctan(p1, p2, type);
		}
		// should be 1-90
		else 
		{
			if (p2.y==p1.y) 
			{
				return 0;
			}
			else 
			{
				// quad 1
				return 2*Math.PI+arctan(p1, p2, type);
				// 270-360
			}
		}
	}
	else 
	{    
		if (p2.x==p1.x) 
		{
			// atan undefined
			if (p2.y == p1.y) 
			{
				return 0;
			}
			else 
			{
				if (p2.y > p1.y) 
				{
					return Math.PI/2;
				}
				else 
				{
					return 1.5*Math.PI;
				}
			}
		}
		else 
		{
			// else { p2.x < p1.x
			// quad 3 or 4
			if (p2.y == p1.y) 
			{
				return Math.PI;
			}
			else 
			{
				if (p2.y > p1.y) 
				{
					// quad 3
					return Math.PI + arctan(p1, p2, type);
				}
					// 90-180
				else 
				{
					// quad 4
					return Math.PI+ arctan(p1, p2, type);
					// 180-270
				}
			}
		}
	}
}

/**
 * Draws a rounded rectangle using the current state of the canvas. 
 * If you omit the last three params, it will draw a rectangle 
 * outline with a 5 pixel border radius 
 * @param {CanvasRenderingContext2D} ctx
 * @param {Number} x The top left x coordinate
 * @param {Number} y The top left y coordinate 
 * @param {Number} width The width of the rectangle 
 * @param {Number} height The height of the rectangle
 * @param {Number} radius The corner radius. Defaults to 5;
 * @param {Boolean} fill Whether to fill the rectangle. Defaults to false.
 * @param {Boolean} stroke Whether to stroke the rectangle. Defaults to true.
 */
function roundRect(ctx, x, y, width, height, radius, fill, stroke) 
{
	if (typeof stroke == "undefined" ) 
	{
		stroke = true;
	}
	if (typeof radius === "undefined") 
	{
		radius = 5;
	}
	ctx.beginPath();
	ctx.moveTo(x + radius, y);
	ctx.lineTo(x + width - radius, y);
	ctx.quadraticCurveTo(x + width, y, x + width, y + radius);
	ctx.lineTo(x + width, y + height - radius);
	ctx.quadraticCurveTo(x + width, y + height, x + width - radius, y + height);
	ctx.lineTo(x + radius, y + height);
	ctx.quadraticCurveTo(x, y + height, x, y + height - radius);
	ctx.lineTo(x, y + radius);
	ctx.quadraticCurveTo(x, y, x + radius, y);
	ctx.closePath();
	if (stroke) 
	{
		ctx.stroke();
	}
	if (fill) 
	{
		ctx.fill();
	}        
}
