var clrrotateTestTube;

function rotateTestTube(ID,degree){//console.log(counter);

	$(ID).css({
		'-ms-transform': 'rotate('+angle+'deg)',
		'-webkit-transform': 'rotate('+angle+'deg)',
		'transform': 'rotate('+angle+'deg)',
	});
	if(degree==angle)
		clearTimeout(clrrotateTestTube);
	else{
		angle++;
		clrrotateTestTube=setTimeout(function(){rotateTestTube(ID,degree)},10);
	}
	
}
	function molischsDragDrop(tTubeID,tubeLeft){//Test tubes drag and drops
		$(tTubeID).draggable({containment:"#canvasBox",
			revert:function(){
				if(!droped){
					$(tTubeID).css({'z-index':'0'});
					$(tTubeID).animate({
						left:tubeLeft,
						top:'126px',					
					});	
				}
			},
			start:function(){
				tLeft=$(tTubeID).css('left');
				tTop=$(tTubeID).css('top');
				$(tTubeID).css({
					'z-index':'10'
				});
			},
			stop:function(){
				if(droped){
					$(tTubeID).css({
						'z-index':'5'
					});
				}
			}
		});
		$(tTubeID).draggable('enable');
		//$("#testTube_1").draggable('disable');
		$("#testTubeDropArea").droppable({accept:tTubeID,
			drop:function(){
				dropedCount++;
				droped=true;
				$(tTubeID).draggable('disable');
				$(tTubeID).css({
					top:'100px',
					left:'376px'
				});
				angle=0;
				rotateTestTube(tTubeID,45);
				$(tTubeID).css({'z-index':'5'});
				$(tTubeID+' #triangleMask').animate({'border-top-width':'28px'},1000);
				$("#molisch_dropperWraper_1").draggable('enable');
				tubeSolutionID="#"+$(tTubeID+' div:first-child').attr('id');
				testTubeID=tTubeID;
			}
		});
	}
	var tubeSolutionID;
	var testTubeID,tLeft,tTop;
function molischsTest(){
	$('#Solubility_molischsArea').show();
	$("#molischWrap").show();
	$("#molisch_bottleTxt").html(molischsTxt[0]);
	$("#molisch_bottleTxt_1").html(molischsTxt[1]);
	$('.tubeSolutions').css({
		'height':'30px',
		'top':'130px'
	});
	$('#starchSolution').css({
		'opacity':'0.6'
	});
	function resetExperiment(){
		dropedCount=0;
		molishDroped=false;
		droperInintLeft='392px'
		$("#molisch_dropperWraper").draggable('enable');
		$(".drop").attr('src',simPath+"images/dropMolisch.png");
		$(".triangleMask").css({'top':'93px','border-top-width':'0'});
		//$("#molisch_dropperWraper_1").draggable('enable');
	}
	dragDrop('#molisch_dropperWraper','#dropAreaTube_1','68px','76px','#glucoseSolution',valueSet_1);
	
	
	var molishDroped=false;
	$("#molisch_dropperWraper_1").draggable({containment:"#canvasBox",//Conc. H2SO4 drag and drop 
		revert:function(){
			if(!molishDroped){
				$("#molisch_dropperWraper_1").animate({
					left:'492px',
					top:'120px'		
				});
			}
		},
		start:function(){
			$("#molisch_dropperWraper_1").css({
				'z-index':'10'
			});
			$("#molischH2SO4Drop").show();
		},
		stop:function(){
			$("#molisch_dropperWraper_1").css({
				'z-index':'15'
			});
		}
	});
	$("#molisch_dropperWraper_1").draggable('disable');
	$("#molischH2SO4Drop").droppable({accept:"#molisch_dropperWraper_1",
		drop:function(){
			dropedCount++;
			molishDroped=true;
			$("#molischH2SO4Drop").hide();
			$("#molisch_dropperWraper_1").draggable('disable');
			$("#molisch_dropperWraper_1").css({'z-index':'4'});
			$("#molisch_dropperWraper_1").css({
				top:'-19px',
				left:'381px'
			});
			$("#drop").css({'z-index':'4'});
			$("#drop_1").css({'z-index':'4'});
			dropsFall('389px','98px','115px');
			$(testTubeID+" .solutionFlow").animate({
				'height':'124px'
			},1500,function(){
				$(testTubeID+' .redVioletRing').animate({
					'height':'53px',
					'top':'111px'
				},1500);
				$(testTubeID+' .tubeSolutions').animate({
					'top':parseInt($(testTubeID+' .tubeSolutions').css('top'))-30+"px",
					'height':parseInt($(testTubeID+' .tubeSolutions').css('height'))+30+"px"
				},1500);
				$(testTubeID+" .solutionFlow").animate({
					'height':'0px',
					'top':'123px'
				});
				$(testTubeID+" .molisch").animate({
					'height':'20px',
					'top':'70px'
				},1500);
				$(testTubeID+' #triangleMask').animate({'top':'70px','border-top-width':'22px'},1500,function(){
					$("#molisch_dropperWraper_1").animate({
						top:'120px',
						left:'492px'
					},function(){
						molishDroped=false;
						$("#molisch_droperSolution_1").animate({
							'top':'65px',
							'border-top-width':'55px',
							'border-left-width':'4px',
							'border-right-width':'4px',
							'left':'7px'
						},500);
						$("#molischH2SO4").animate({
							'top':parseInt($("#molischH2SO4").css('top'))+5+"px",
							'height':parseInt($("#molischH2SO4").css('height'))-5+"px",
							'border-top-left-radius': parseInt($("#molischH2SO4").css('border-top-left-radius'))-8+"px",
							'border-top-right-radius': parseInt($("#molischH2SO4").css('border-top-left-radius'))-8+"px"
						},500);
						$(testTubeID).css({
							'-ms-transform': 'rotate(0deg)',
							'-webkit-transform': 'rotate(0deg)',
							'transform': 'rotate(0deg)',
							'z-index':'0'
						});
						$(testTubeID).draggable('disable');
						$(testTubeID+' #triangleMask').css({'border-top-width':'0px'});
						$("#tempBG").hide();
						$(testTubeID).animate({
							'left':tLeft,
							'top':tTop							
						},500,function(){
							if(testTubeID=='#testTube_4'){
								inferenceMsg=molischsTxt[2];
								$("#Inference").show();
							}
							switch(testTubeID){
								case '#testTube_1':
										droped=false;
										molischsDragDrop('#testTube_2','130px');
										if (tubeDisabled) {
											$("#testTube_2").draggable('enable');
										}
										break;
								case '#testTube_2':	
										droped=false;
										molischsDragDrop('#testTube_3','198px');
										if (tubeDisabled) {
											$("#testTube_3").draggable('enable');
										}
										break;
								case '#testTube_3':
										droped=false;
										molischsDragDrop('#testTube_4','264px');
										if (tubeDisabled) {
											$("#testTube_4").draggable('enable');
										}
										break;
							}
						});
						
					});
				});
			});
			
			$('#molisch_droperSolution_1').animate({
				'top':'118px',
				'border-top-width':'0px',
				'border-left-width':'2px',
				'border-right-width':'2px',
				'left':'9px'
			},1900);
			setTimeout(function(){dropsFall('389px','98px','115px');},600);
			setTimeout(function(){dropsFall('389px','98px','115px');},1200);
			$(tubeSolutionID).animate({
				'top':parseInt($(tubeSolutionID).css('top'))-30+"px",
				'height':parseInt($(tubeSolutionID).css('height'))+30+"px"
			},1900);
			$('#'+$(tubeSolutionID).next().attr('id')).animate({
				'top':parseInt($(tubeSolutionID).next().css('top'))-30+"px"
			},1900);
		}
	});
	resetExperiment();
}