var compoundIndex=0;
var testIndex=0;
var solventIndex=0;
var helpclickFlag=false;
var inferenceMsg;
var gt=$;
function hideAllTest(){
	$('#Solubility_molischsArea,#solubilityWrap,#molischWrap,#fehlingsWrapArea,#secondSceneWrapArea,#benedictsWrapArea,#tollensWrapArea,#iodineWrapArea').hide();
	if(helpclickFlag==true){
		$('.trip-block').hide();
		trip.stop();
	}
	$("#nextButton").hide();
	clearInterval(clockinterval);
	clockAngle=0;
}
window.onload = function init(){
	//var gt = new Gettext({ 'domain' : 'messages' });
	$('#olabmenuBar li:first-child a').html(gt.gettext("HELP"));
	//$('#olabmenuBar li:nth-child(2) a').html(gt.gettext("FULL SCREEN"));
	//$('#olabmenuBar li:last-child a').html(gt.gettext("EXIT"));
	//$(".labName").html(gt.gettext("Developed by CDAC Mumbai & Amrita University <br> Under research grant from department of IT"));
	document.getElementById("expName").innerHTML=gt.gettext("Qualitative Analysis of Carbohydrates");
	carbohydrateFun=[solubilityTest,molischsTest,fehlingsTest,benedictsTest,tollensTest,iodineTest];
	solubilityTxt=[gt.gettext("Glucose"),gt.gettext("Lactose"),gt.gettext("Sucrose"),gt.gettext("Starch"),gt.gettext("Water"),gt.gettext("Glucose, lactose and sucrose are soluble in water,<br>whereas starch is insoluble in water.")];
	molischsTxt=[gt.gettext("Molisch’s Reagent"),gt.gettext("Conc. H<sub>2</sub>SO<sub>4</sub>"),gt.gettext("Carbohydrates undergo dehydration by Conc. H<sub>2</sub>SO<sub>4</sub> to form furfural<br>(furfuraldehyde) or its derivative.  The furfurals further react with α-naphthol<br>present in the Molisch’s reagent to form a red-violet (purple) coloured<br>product that appears as a purple ring at the interface between<br>the acid and the test layers.")]
	tollensTxt=[gt.gettext("Tollen’s Reagent"),gt.gettext("Reducing sugars (glucose & lactose) reduce silver ions in the test reagent to<br>elemental silver.  Elemental silver, accumulated on the inner surface of<br>the reaction vessel, produces a silver mirror on the inner surface of the vessel.")]
	iodineTxt=[gt.gettext("Iodine Solution"),  gt.gettext("Iodine reacts with starch to form a starch/iodine complex,<br>which gives a characteristic blue colour to the reaction mixture.<br>Glucose, lactose and sucrose do not give this reaction.")]
	fehlingsTxt=[gt.gettext("Fehling’s solution A"),gt.gettext("Fehling’s solution B"),gt.gettext("Place test tubes in waterbath"),gt.gettext("Reducing sugars (glucose & lactose) reduce the deep blue solution of<br>copper (II) in the test reagent to red precipitate of insoluble cuprous oxide.")]
	benedictsTxt=[gt.gettext("Benedict’s Reagent"),gt.gettext("Reducing sugars (glucose & lactose) reduce blue copper (II)<br>ions in the Benedict’s reagent to red precipitate of cuprous oxide."),gt.gettext("20 Minutes")]
	helpMsg_solubility=[gt.gettext("Drag the dropper towards the test tubes to drop water into test tubes A, B, Cand D respectively."),gt.gettext("Drag the test tubes A, B, C and D respectively to shake the test tubes well.")];
	helpMsg_molischs=[gt.gettext("Drag the dropper towards the test tubes to drop<br>Molisch’s reagent into test tubes A, B, C<br>and D respectively."),gt.gettext("Drag test tube A towards the reagent bottles<br>to place it in slanting position."),gt.gettext("Drag the dropper towards test tube A to drop Conc. H<sub>2</sub>SO<sub>4</sub><br>slowly along the side of the test tube."),gt.gettext("Drag the test tube B towards the reagent bottles<br>to place it in slanting position."),gt.gettext("Drag the dropper towards test tube B to drop Conc. H<sub>2</sub>SO<sub>4</sub><br>slowly along the side of the test tube."),gt.gettext("Drag the test tube C towards the reagent bottles<br>to place it in slanting position."),gt.gettext("Drag the dropper towards test tube C to drop Conc. H<sub>2</sub>SO<sub>4</sub><br>slowly along the side of the test tube."),gt.gettext("Drag test tube D towards the reagent bottles<br>to place it in slanting position."),gt.gettext("Drag the dropper towards test tube D to drop Conc. H<sub>2</sub>SO<sub>4</sub><br>slowly along the side of the test tube.")];
	helpMsg_fehlings=[gt.gettext("Drag the dropper towards the test tubes<br>to drop Fehling’s solution A into test tubes A, B, C<br>and D respectively."),gt.gettext("Drag the dropper towards the tests tubes to drop Fehling’s<br>solution B into the test tubes A, B, C and D respectively.")];
	helpMsg_benedicts=[gt.gettext("Drag the dropper towards the tests tubes to drop Benedict’s<br>reagent into the test tubes A, B, C and D respectively.")];
	helpMsg_tollens=[gt.gettext("Drag the dropper towards the tests tubes to drop<br>Tollen’s reagent into the test tubes A, B, C and D respectively.")];
	helpMsg_iodine=[gt.gettext("Drag the dropper towards the test tubes to drop iodine<br>solution into test tubes A, B, C and D respectively.")];
	helpMsg_secondScene=[gt.gettext("Drag the test tubes A, B, C and D respectively towards<br>the beaker to place them in the water bath."),gt.gettext("Click on the switch of the hot plate to<br>heat the water bath.")]
	
	$("#reset").attr('value',gt.gettext('Reset')); /** Reset */
	//---------------Onloading events--------------
	$(document).ready(function() {
		$('#canvasBox').mousedown(function(event){	event.preventDefault();	});	
		$('#DropboxTestLbl').html(gt.gettext("Select the test:"));
		tests=[gt.gettext("Solubility test"),gt.gettext("Molisch’s test"),gt.gettext("Tollen’s test"),gt.gettext("Iodine test")]
		$("#nextBtnLb").html(fehlingsTxt[2]);
		//---------Add values into combobox--------	
		addintoDropDown($('#DropboxTest'),tests);
		//-------Function to add values into combobox------
		function addintoDropDown(getId,valueSet){
			$.each(valueSet, function(val, text) {
				getId.append(
					$('<option ></option>').val(val).html(text) 
				);
			});
		}
		hideAllTest();	
		solubilityTest();
		//carboFunctions[compoundIndex][testIndex][solventIndex]();
	//----------------Combobox change function-------------------
		$("#DropboxTest").change(function(){
			commonReset();
			testIndex=$('#DropboxTest option:selected').val();
			$("#Inference").hide();
			hideAllTest();
			$('.cabohydrate').hide();
			carbohydrateFun[testIndex]();
			
		});
		
	});
	function commonReset(){
		$("#testtubeStand,#labelImg_1,#glucoseTxt,#labelImg_2,#lactoseTxt,#labelImg_3,#sucroseTxt,#labelImg_4,#starchTxt").show();
		$(".tubeSolutions_1").css({'width':'27px'});
		dropedCount=0;
		angle=0;
		timeLimitOne=70;timeLimitTwo=70;timeLimitThree=70;
		droped=false;
		sceneTwo=false;
		$(".drop").attr('src',simPath+"images/drop.png");
		$(".dropAreaTubes").hide();
		$(".drop").css({'z-index':'0'});
		$(".solutionFlow").css({
			'top':'7px',
			'height':'0px'
		});
		$(".redVioletRing").css({
			'top':'160px',
			'height':'0px'
		});
		$(".testTubes").css({
			'-ms-transform': 'rotate(0deg)',
			'-webkit-transform': 'rotate(0deg)',
			'transform': 'rotate(0deg)',
			'z-index':'0',
			'top':'126px'
		});
		$("#testTube_1").css({
			'left':'63px'
		});
		$("#testTube_2").css({
			'left':'130px'
		});
		$("#testTube_3").css({
			'left':'198px'
		});
		$("#testTube_4").css({
			'left':'264px'
		});
		$(".bottleSolution").css({
			'width':' 57px',
			'height':'95px',
			'top':'207px',
			'border-radius':'20px 20px 7px 7px'
		});
		$("#dropperWraper").stop();
		$(".tubeSolutions").stop();
		$("#tempBG").hide();
		$(".drop").hide();
		$(".drop").stop();
		clearTimeout(clrDfall_1);
		clearTimeout(clrDfall_2);
		clearTimeout(clrDfall_3);
		clearTimeout(clrDrop);secondScene_testTube_4
		clearTimeout(clrTimeOutTube);
		$("#secondScene_glucose,#secondScene_lactose,#secondScene_sucrose,#secondScene_starch,#morroe_1,#morroe_2").stop();
		$("#secondScene_testTube_1,#secondScene_testTube_2,#secondScene_testTube_3,#secondScene_testTube_4").stop();
		$("#morroe_1").css({'opacity':'0'});
		$("#morroe_2").css({'opacity':'0'});
		$(".molisch").css({'opacity':'0','top':'130px'});
		if ($("#testTube_1").data('ui-draggable')) {
			$("#testTube_1").draggable('disable');
		}
		if ($("#testTube_2").data('ui-draggable')) {
			$("#testTube_2").draggable('disable');
		}
		if ($("#testTube_3").data('ui-draggable')) {
			$("#testTube_3").draggable('disable');
		}
		if ($("#testTube_4").data('ui-draggable')) {
			$("#testTube_4").draggable('disable');
		}
	}
}

// Function to handle experiment selection change
function changeTest(testId) {
    testId = parseInt(testId);
    hideAllTest();
    carbohydrateFun[testId]();
}