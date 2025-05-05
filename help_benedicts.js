
	function benedictsHelp(){
			
		trip = new Trip([
		{
			sel : $('#benedicts_dropperWraper'),
			position : 'w',
			content : helpMsg_benedicts[0],
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
		
	