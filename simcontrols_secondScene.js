var timeLimitOne,timeLimitTwo,timeLimitThree;
var sceneTwo=false;
var clockinterval;
var clockAngle;
function secondScene(){
	sceneTwo=true;
	timeLimitOne=0;timeLimitTwo=0;timeLimitThree=0;
	$("#minutLabel").html(benedictsTxt[2]);
	var tLeft,soluBgColor,soluBgColor_1;
	$("#fehlingsWrapArea").hide();
	$("#benedictsWrapArea").hide();
	$("#tollensWrapArea").hide();
	$("#secondSceneWrapArea").show();
	$("#nextButton").hide();
	$("#testtubeStand,#labelImg_1,#glucoseTxt,#labelImg_2,#lactoseTxt,#labelImg_3,#sucroseTxt,#labelImg_4,#starchTxt").hide();
	function resetExperiment(){
		$("#dragDisable").hide();
		if(testIndex==2){
			inferenceMsg=fehlingsTxt[3];
			dropedCount=0;
			soluBgColor='rgb(249, 79, 10)';
			soluBgColor_1='rgb(50, 208, 236)';
			$(".tubeSolutions_1").css({
				'top':'150px',
				'height':'121px',
				'width':'45px',
				'opacity':'1',
				'background-color':'rgb(6, 13, 168)'
			});
		}else if(testIndex==3){
			inferenceMsg=benedictsTxt[1];
			dropedCount=0;
			soluBgColor='rgb(181, 58, 9)';
			soluBgColor_1='rgba(34, 137, 212, 0.72)';
			$(".tubeSolutions_1").css({
				'top':'165px',
				'height':'106px',
				'width':'45px',
				'opacity':'1',
				'background-color':'rgb(12, 151, 244)'
			});
		}else if(testIndex==4){
			inferenceMsg=tollensTxt[1];
			dropedCount=0;
			$(".tubeSolutions_1").css({
				'top':'165px',
				'height':'106px',
				'width':'45px',
				'opacity':'0.2',
				'background-color':'#fff'
			});
			$("#secondScene_starch").css({
				'opacity':'0.6'
			});
			
		}
	}
function waterbath(){
	boilingEffect();
	setTimeout(function(){boilingEffectTwo()},700);
	setTimeout(function(){boilingEffectThree()},1400);
	setTimeout(function(){
		$("#dragDisable").show();
		if(testIndex==4){
			$("#morroe_1,#morroe_2").animate({'opacity':'1'},10000,function(){
				$("#Inference").show();
			});
		}else{
			$("#secondScene_glucose").animate({'background-color':soluBgColor},10000,function(){
				$("#Inference").show();
			});
			$("#secondScene_lactose").animate({'background-color':soluBgColor},10000);
			$("#secondScene_sucrose").animate({'background-color':soluBgColor_1},10000);
			$("#secondScene_starch").animate({'background-color':soluBgColor_1},10000);
		}	
	},3400);
}
waterbath();
clockinterval=setInterval(clockRotation,10);
clockAngle=0;
$("#clockBody,#needle,#minutLabel").show();
function clockRotation(){
	clockAngle++;
	if(clockAngle>=1050){
		$("#clockBody,#needle,#minutLabel").hide();
		clearInterval(clockinterval);
		clockAngle=0;
	}
	document.getElementById("needle").style.webkitTransformOrigin='3px 25px';
	document.getElementById("needle").style.webkitTransform = 'rotate(' + clockAngle + 'deg)';
	document.getElementById("needle").style.MozTransformOrigin='3px 25px';
	document.getElementById("needle").style.MozTransform ='rotate('+ clockAngle +'deg)';
}
function boilingEffect(){
	timeLimitOne++;
	var left_1=Math.floor((Math.random() * 192) + 1);
	$('#boilingWrap').append('<div id="buble_1" class="buble"></div>');
	$('#buble_1').css({'left':left_1});
	$('#buble_1').animate({'top':'0'},500,function(){
		$('#buble_1').remove();
		if(timeLimitOne<=20){
			boilingEffect();
		}
	});
}
	function boilingEffectTwo(){
	timeLimitTwo++;
	var left_1=Math.floor((Math.random() * 192) + 1);
	$('#boilingWrap').append('<div id="buble_2" class="buble"></div>');
	$('#buble_2').css({'left':left_1});
	$('#buble_2').animate({'top':'0'},500,function(){
		$('#buble_2').remove();
		if(timeLimitTwo<=20){
			boilingEffectTwo();
		}
	});
}
	function boilingEffectThree(){
	timeLimitThree++;
	var left_1=Math.floor((Math.random() * 192) + 1);
	$('#boilingWrap').append('<div id="buble_3" class="buble"></div>');
	$('#buble_3').css({'left':left_1});
	$('#buble_3').animate({'top':'0'},500,function(){
		$('#buble_3').remove();
		if(timeLimitThree<=20){
			boilingEffectThree();
		}else{
			$("#SwitchOff").show();
			$("#lightOff").show();
			$("#SwitchOff").unbind('click');
		}
	});
}
resetExperiment();
}