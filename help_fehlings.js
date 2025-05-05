
	function fehlingsHelp(){
			
		trip = new Trip([
		{
			sel : $('#fehlings_dropperWraper'),
			position : 'n',
			content : helpMsg_fehlings[0],
			expose : false,
			delay : 6000
		}, 
		{
			sel : $('#fehlings_dropperWraper_1'),
			position : 'w',
			content :helpMsg_fehlings[1],
			
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
		
	