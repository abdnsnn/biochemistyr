helpFunctions=[solubilityHelp,molischsHelp,fehlingsHelp,benedictsHelp,tollensHelp,iodineHelp,secondSceneHelp];
var trip;
$(document).ready(function() {
	$('#olabmenuBar li:first-child').bind('click',function(){
		$(".content").scrollTop(0);
		helpFunctions[testIndex]();

	});
		
	$('#Inference').bind('click  ',function(){
	 trip = new Trip([
   {
		sel : $('#Inference'),
		position : 'e',
		content : inferenceMsg,
		expose : false,
		delay : 10000
	},
		
		
	],
	
        {
        onTripStart : function() {
            helpclickFlag=true;console.log(helpclickFlag);
        },
        onTripEnd : function() {
            helpclickFlag=false;console.log(helpclickFlag);
        },
        onTripStop : function() {
            console.log("onTripStop");
        },
        backToTopWhenEnded : true,
        delay : 2000
	});
		trip.start(); 
		window.trip = trip;
	});
	
});