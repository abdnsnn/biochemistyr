
	function molischsHelp(){
			
		trip = new Trip([
		{
			sel : $('#molisch_dropperWraper'),
			position : 'w',
			content : helpMsg_molischs[0],
			expose : false,
			delay : 6000
		}, 
		{
			sel : $('#testTube_1'),
			position : 'e',
			content :helpMsg_molischs[1],
			
			expose : false,
			delay : 6000
		},
		{
			sel : $('#molisch_dropperWraper_1'),
			position : 'w',
			content :helpMsg_molischs[2],
			
			expose : false,
			delay : 6000
		},
		{
			sel : $('#testTube_2'),
			position : 'e',
			content :helpMsg_molischs[3],
			
			expose : false,
			delay : 6000
		},
		{
			sel : $('#molisch_dropperWraper_1'),
			position : 'w',
			content :helpMsg_molischs[4],
			
			expose : false,
			delay : 6000
		},
		{
			sel : $('#testTube_3'),
			position : 'n',
			content :helpMsg_molischs[5],
			
			expose : false,
			delay : 6000
		},
		{
			sel : $('#molisch_dropperWraper_1'),
			position : 'w',
			content :helpMsg_molischs[6],
			
			expose : false,
			delay : 6000
		},
		{
			sel : $('#testTube_4'),
			position : 'n',
			content :helpMsg_molischs[7],
			
			expose : false,
			delay : 6000
		},
		{
			sel : $('#molisch_dropperWraper_1'),
			position : 'w',
			content :helpMsg_molischs[8],
			
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
		
	