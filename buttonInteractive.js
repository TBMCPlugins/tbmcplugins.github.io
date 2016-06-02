//Canvas Variables
var canvas = document.getElementById('buttonCanvas');
var canvasContext = canvas.getBoundingClientRect();
var diamondImage = new Image();
diamondImage.src = "diamond.png";
var grayDiamondImage = new Image();
grayDiamondImage.src = "grayDiamond.png";

//From Server Variables
var minimumTime = 59;
var diamondIsAvailable = false;
var participants = 0;
var fullPresserProbabilities;
var todaysAggregatePresserProbabilities = [];
var preseserProbabilitiesAdjusted

//Time Control Variables
var fps = 30;
var dateObject = new Date();
var defaultTime = dateObject.getTime();
var buttonAdjustment = 0;
var buttonTime = 0;
var buttonTimeCountingDown = 60000 - buttonTime;
var buttonHasBeenReset = false;

//Button Press Variables
var buttonPress = false;
var mouseIsHeld = false;
var outerRingRedEffect = 234;
var outerRingGeneralEffect = 234;
var currentSecond = 60;
var presserMillisecondRandomness = 0;

//Mouse Position Calculator
function calculateMousePos(evt){
	var rect = canvas.getBoundingClientRect();
	var root = document.documentElement;
	var mouseX = evt.clientX - rect.left - root.scrollLeft;
	var mouseY = evt.clientY - rect.top - root.scrollTop;
	return {
		x:mouseX,
		y:mouseY
	}
}


//Main Loop
window.onload = function(){
	
	
	//Canvas Initialization
	canvas = document.getElementById('buttonCanvas');
	canvasContext = canvas.getContext('2d');
	canvasContext.fillStyle = "black";
	
	//Prevents click-through
	var canvas = document.getElementById('buttonCanvas');
	canvas.onselectstart = function () { return false; }
	
	//Inner Main Loop
    setInterval(function() {
		main();
	},1000/fps);
	
	//Button Event Listener - MouseDown
	canvas.addEventListener("mousedown",function(evt){
        var mousePos = calculateMousePos(evt);
		mouseIsHeld = true;
		if (mousePos.x > 45 && mousePos.y > 75 && mousePos.x < 170+45 && mousePos.y < 40+75) {
            buttonPress = true;
        }
		
	});
	
	//Button Event Listener - MouseUp
	canvas.addEventListener("mouseup", function(evt){
		
		//Mouse Position On Button?
		var mousePos = calculateMousePos(evt);
		if (mousePos.x > 45 && mousePos.y > 75 && mousePos.x < 170+45 && mousePos.y < 40+75 && buttonPress == true) {
			//Button Is Pressed
            pressNumber = buttonTimeCountingDown
			resetButton();
			
        }
		//Reset Button Reaction
		mouseIsHeld = false;
		buttonPress = false;
	});
	
	//Button Event Listener - Mouse Off Screen
	canvas.addEventListener("mouseleave",function(evt){
		
		//Handles bug where button remains pressed
		//if mouse holds button and leaves element
		buttonPress = false;
		buttonHold = false;
	});
}

//Does Everything
function main(){
	
	//Draws Non-timed Elements
    drawBackground();
	drawTitle();
    drawParticipants();
	
	//Time Control Methods
	setButtonTimes();
	presserSimulator();
	minimumTimeHandler();
	
	
	//Draws Timed Elements
	drawCounter();   //Counter is seen
	drawButton();    //Button is pressed
	drawPieChart();  //Pie chart is updated
	
	
	//Draws Remaining Non-timed Elements
	drawDiamond();
	
}
function presserSimulator(args) {
	
    if (buttonTimeCountingDown <= (currentSecond+presserMillisecondRandomness)*1000) {
		currentSecond--;
		console.log("PING", currentSecond);
		if(Math.random() <= 20.0/100.0) {
			console.log("PRESS!");
           resetButton();
        }
		presserMillisecondRandomness = Math.random()*.9;
    }
}
//Sets Button Times
function setButtonTimes() {
    var nowTimeObject = new Date;
	buttonTime = nowTimeObject.getTime() - defaultTime - buttonAdjustment;
	buttonTimeCountingDown = 60000 - buttonTime;
}


//Resets Button if it reaches the Minimum Time Value
function minimumTimeHandler(a) {
    if(buttonTimeCountingDown < (minimumTime*1000)){
        resetButton();
    }
}


//Draws Background
function drawBackground(){
    canvasContext.fillStyle = "#FAFAFA";
    canvasContext.fillRect(0,0,canvas.width, canvas.height);
}


//Draws "the button" to the left
function drawTitle(){
	
	//Adjustment for text
	var Xadj = -1;
	var Yadj = 20;
	
	//Draws Text
	canvasContext.fillStyle = "black";
	canvasContext.font = "25px georgia";
	canvasContext.fillText("the button",25+Xadj,25+Yadj);
	
}


//Draws the Pressable Button
function drawButton(){
	
	//Outer Button
	
	canvasContext.fillStyle = "rgb(234,234,234)";
	fillRoundRect(canvasContext,35,65,190,60,3);

	//Press Detector
	var buttonDepth = 2;
	if (buttonPress == true) {
        buttonDepth = 0;
	}else if(buttonPress == false){
		buttonDepth = 2;
	}else{
		console.log("DRAWBUTTON ERROR: buttonPress is not True or False");
	}
	
	//Inner Button
	canvasContext.fillStyle = "#1A7FB5";
	canvasContext.fillStyle = "#777777";
	fillRoundRect(canvasContext,35+10,65+10,190-20,60-20,3);
	//canvasContext.fillStyle = "#2DAAEB";
	canvasContext.fillStyle = "#AAAAAA";
	fillRoundRect(canvasContext,35+10,65+10-buttonDepth,190-20,60-20-buttonDepth,3);
	
}


//Draws the Pie Chart Timer that ticks down
function drawPieChart(){
	
	//Center coordinate = 295,100
	//Outer Circle Radius = 50
	
	if (diamondIsAvailable) {
		
		//Creates Cyan Flash Effect
        if (outerRingRedEffect > 234) {
			outerRingRedEffect = 234;
		}else if (outerRingRedEffect < 234) {
			outerRingRedEffect += 10;
		}
		canvasContext.fillStyle = "rgb("+outerRingRedEffect+",234,234)";
		
    }else{
		if (outerRingGeneralEffect > 234) {
			outerRingGeneralEffect = 234
        }else if (outerRingGeneralEffect < 234) {
			outerRingGeneralEffect += 5;
		}
		canvasContext.fillStyle = "rgb("+outerRingGeneralEffect+","+outerRingGeneralEffect+","+outerRingGeneralEffect+")";
	}
	
	
	canvasContext.beginPath();
	canvasContext.arc(292.5,100-2,50,0,Math.PI*2,true);
	canvasContext.fill();
	
	//Inner Circle Colouring
	if (diamondIsAvailable) {
        canvasContext.fillStyle = "#FFFFFF";
    }else if (diamondIsAvailable == false) {
        canvasContext.fillStyle = "#C8C8C8";
    }
	
	//Inner Circle Radius = 35
	canvasContext.beginPath();
	canvasContext.arc(292.5,100-2,35,0,Math.PI*2,true);
	canvasContext.fill();
	
	//Pie Countdown Colouring
	if (diamondIsAvailable) {
        canvasContext.fillStyle = "#00EEEE";
    }else if (diamondIsAvailable == false) {
        canvasContext.fillStyle = "#6A6A6A";
    }
	
	//Pie Drawing
	canvasContext.beginPath();
	canvasContext.moveTo(292.5,100-2);
	canvasContext.lineTo(292.5,65-2);
	canvasContext.arc(292.5,100-2,35, 3*Math.PI/2, 3/2*Math.PI + 2*Math.PI*((buttonTime)/60000),true);
	canvasContext.lineTo(292.5,100-2);
	canvasContext.fill();
}

//Draws the text based counter to the right of the circle
function drawCounter(){
		
	//Outer Box
	canvasContext.fillStyle = "#EAEAEA";
	fillRoundRect(canvasContext,360,65,190,60,3);
	
	//Inner Boxes with numbers
	canvasContext.font = ("bold 24px Verdana");
	canvasContext.fillStyle = "black";
	
	//X and Y adjustment for text
	var Xadj = 1.5;
	var Yadj = 29.5;
	
	//Time Setting
	var tenSecondDigit = Math.floor(buttonTimeCountingDown/10000);
	var oneSecondDigit = Math.floor((buttonTimeCountingDown%10000)/1000);
	var tenthSecondDigit = Math.floor((buttonTimeCountingDown%1000)/100);
	var hundrethSecondDigit = Math.floor((buttonTimeCountingDown%100)/10);
	
	//10 second display
	canvasContext.fillStyle = "white";
	fillRoundRect(canvasContext,410,75,20,40,3);
	canvasContext.fillStyle = "black";
	canvasContext.fillText(tenSecondDigit.toString(),410+Xadj,75+Yadj);
	
	//1 second display
	canvasContext.fillStyle = "white";
	fillRoundRect(canvasContext,435,75,20,40,3);
	canvasContext.fillStyle = "black";
	canvasContext.fillText(oneSecondDigit.toString(),435+Xadj,75+Yadj);
	
	//0.1 second display
	canvasContext.fillStyle = "white";
	fillRoundRect(canvasContext,460,75,20,40,3);
	canvasContext.fillStyle = "grey";
	canvasContext.fillText(tenthSecondDigit.toString(),460+Xadj,75+Yadj);
	
	//0.01 second display
	canvasContext.fillStyle = "white";
	fillRoundRect(canvasContext,485,75,20,40,3);
	canvasContext.fillStyle = "grey";
	canvasContext.fillText(hundrethSecondDigit.toString(),485+Xadj,75+Yadj);
}


//Draws the Participants count to the right
function drawParticipants(){
	
	//Participants
	canvasContext.fillStyle = "black"
	canvasContext.font = "13px Georgia";
	canvasContext.textAlign = "right";
	canvasContext.fillText(buttonTime + " participants", 435+110,35+15);
	canvasContext.textAlign = "left";
	
}



//Draws the diamond in the center of the screen
function drawDiamond() {
	
	//Gray diamond slot, or diamond itself?
	if (diamondIsAvailable) {
		canvasContext.drawImage(diamondImage, 292.5-17.5,100-21);
    }else if (diamondIsAvailable == false) {
		canvasContext.drawImage(grayDiamondImage, 292.5-17.5,100-21);
    }else{
		console.log("DRAW DIAMOND ERROR: Impossible");
	}
	
}



//Function made to round corners of rectangles
function fillRoundRect(ctx, x, y, width, height, radius) {
	if (typeof radius === 'undefined') {
		radius = 5;
	}
	if (typeof radius === 'number') {
		radius = {tl: radius, tr: radius, br: radius, bl: radius};
	} else {
		var defaultRadius = {tl: 0, tr: 0, br: 0, bl: 0};
		for (var side in defaultRadius) {
			radius[side] = radius[side] || defaultRadius[side];
		}
	}
	ctx.beginPath();
	ctx.moveTo(x + radius.tl, y);
	ctx.lineTo(x + width - radius.tr, y);
	ctx.quadraticCurveTo(x + width, y, x + width, y + radius.tr);
	ctx.lineTo(x + width, y + height - radius.br);
	ctx.quadraticCurveTo(x + width, y + height, x + width - radius.br, y + height);
	ctx.lineTo(x + radius.bl, y + height);9
	ctx.quadraticCurveTo(x, y + height, x, y + height - radius.bl);
	ctx.lineTo(x, y + radius.tl);
	ctx.quadraticCurveTo(x, y, x + radius.tl, y);
	ctx.closePath();
  
	ctx.fill();

}


//Resets the Button
function resetButton() {
    buttonAdjustment += buttonTime;
	currentSecond = 60;
	buttonHasBeenReset = true;
	if (diamondIsAvailable) {
        outerRingRedEffect = 0;
    }else{
		outerRingGeneralEffect = 150;
    }
	
}
