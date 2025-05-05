
	function secondSceneHelp(){
			
		trip = new Trip([
		{
			sel : $('#secondScene_testTube_1'),
			position : 'e',
			content : helpMsg_secondScene[0],
			expose : false,
			delay : 6000
		}, 
		{
			sel : $('#SwitchOff'),
			position : 'w',
			content : helpMsg_secondScene[1],
			expose : false,
			delay : 6000
		},
		
		],
		{
		onTripStart : function() {
		helpclickFlag=true;
		},
		onTripEnd : function() {
			helpclickFlag=false;
		},
		onTripStop : function() {
			helpclickFlag=false;
		},
	backToTopWhenEnded : false,
		delay : 4000
		});
		
		trip.start(); 
		window.trip = trip;
	}
		
	