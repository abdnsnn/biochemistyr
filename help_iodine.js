
	function iodineHelp(){
			
		trip = new Trip([
		{
			sel : $('#iodine_dropperWraper'),
			position : 'w',
			content : helpMsg_iodine[0],
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
		
	