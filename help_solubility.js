
	function solubilityHelp(){
			
		trip = new Trip([
		{
			sel : $('#dropperWraper'),
			position : 'w',
			content : helpMsg_solubility[0],
			expose : false,
			delay : 6000
		}, 
		{
			sel : $('#testTube_1'),
			position : 'e',
			content :helpMsg_solubility[1],
			
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
		
	