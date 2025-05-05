//------------Function for movement of drops----------------//
var clrDrop;
function dropsFall(dLeft,dTop,animTo){
	$("#drop").css({
		left:dLeft,
		top:dTop
	})
	$("#drop").css({display:"block"});
	$("#drop").animate({
		top:animTo
	},function(){
		$("#drop").css({display:"none"});
	});
	clrDrop=setTimeout(function(){
		$("#drop_1").css({
			left:dLeft,
			top:dTop
		})
		$("#drop_1").css({display:"block"});
		$("#drop_1").animate({
			top:animTo
		},function(){
			$("#drop_1").css({display:"none"});
		});
	},200)
}
var angle=0;
var turningRight=true;
var clrTimeOutTube;
function testTubeShaking(ID){//console.log(counter);
	$(ID).css({
		'-ms-transform': 'rotate('+angle+'deg)',
		'-webkit-transform': 'rotate('+angle+'deg)',
		'transform': 'rotate('+angle+'deg)',
	});
	if(turningRight)
		angle++;
	else{
		angle--;
	}
	if(angle==10){
		turningRight=false;
	}
	if(angle==-10){
		turningRight=true;
	}
	clrTimeOutTube=setTimeout(function(){testTubeShaking(ID)},10);
}
function changeImgSrc(elemID,imgName){
	setTimeout(function(){
		$(elemID).attr('src',simPath+"images/"+imgName);
		$(elemID).animate({"opacity":"0.6"});
	},300);
}
function opacityChange(elemID,opacity,timePeriod){
	$(elemID).animate({
		'opacity':opacity
	},timePeriod);
}
var dropedCount=0;
var valueSet_1,valueSet_2,valueSet_3,valueSet_4;
var droped,droperInintLeft;
var clrDfall_1,clrDfall_2,clrDfall_3;
function dragDrop(dragElement,dropArea,droperLeft,dropLeft,tubeSolution,waterValue){//Dropper drag and drop
	//------------------- Drag and drop of dropper------------------
	//console.log(parseInt($(tubeSolution).css('top'))-30+"px");
	droperInintLeft=$(dragElement).css('left');
	$(dragElement).draggable({containment:"#canvasBox",
		revert:function(){
			if(!droped){
				$(dragElement).animate({
					left:droperInintLeft,
					top:'120px'		
				});
			}
		},
		start:function(){
			$(dragElement).css({
				'z-index':'10'
			});
			$(dropArea).show();
		},
		stop:function(){
			$(dragElement).css({
				'z-index':'0'
			});
		}
	});
	//$("#dropperWraper").draggable('disable');
	$(dropArea).droppable({accept:dragElement,
		drop:function(){
			dropedCount++;
			$(dropArea).hide();
			droped=true;
			$(dragElement).css({
				top:'5px',
				left:droperLeft
			});
			$(dragElement).draggable('disable');
			clrDfall_1=dropsFall(dropLeft,'123px','265px');
			if(testIndex==1){
				$("#"+$(tubeSolution).parent().attr('id')).find('#molisch').animate({'top':'95px','height':'43px','opacity':'1'},1900);
			}
			if(testIndex==0){
				changeImgSrc('#'+$(tubeSolution).prev().attr('id'),"carbohydrates_1.png");
			}
			if(testIndex==1 && dropedCount==4){
				molischsDragDrop('#testTube_1','63px');
				if (tubeDisabled) {
					$("#testTube_1").draggable('enable');
				}
				
			}
			$("#"+$(dragElement+' div:first-child').attr('id')).animate({
				'top':'118px',
				'border-top-width':'0px',
				'border-left-width':'2px',
				'border-right-width':'2px',
				'left':'9px'
			},1900);
			clrDfall_2=setTimeout(function(){dropsFall(dropLeft,'123px',parseInt($(tubeSolution).css('top'))+110+"px")},600);
			clrDfall_3=setTimeout(function(){dropsFall(dropLeft,'123px',parseInt($(tubeSolution).css('top'))+110+"px")},1200);
			//$("#testTube_1").find('#molisch').css('width','15')
			
			$(tubeSolution).animate({
				'top':parseInt($(tubeSolution).css('top'))-30+"px",
				'height':parseInt($(tubeSolution).css('height'))+30+"px"
			},1900,function(){
				$(dragElement).animate({
					left:droperInintLeft,
					top:'120px'					
				},function(){
					
					if(dropedCount==4){
						$(dragElement).draggable('disable');
						if(testIndex==0){
							testTubeDragDrop('#testTube_1','63px');
							//$('#testTube_1').draggable('enable');
						}else if(testIndex==1){
							$('#testTube_1').draggable('enable');
							molischsDragDrop('#testTube_1','63px'); console.log(dropedCount+" cvvvvvvvvvvvvvv "+testIndex);
						}
						dropedCount=0;
					}
					$("#"+$(dragElement+' div:first-child').attr('id')).animate({
						'top':'65px',
						'border-top-width':'55px',
						'border-left-width':'4px',
						'border-right-width':'4px',
						'left':'7px'
					},500);
				$("#"+$(dragElement).next().attr('id')).animate({
						'top':waterValue[0],
						'height':waterValue[1],
						'border-top-left-radius': waterValue[2],
						'border-top-right-radius': waterValue[2]
					},500,function(){
					if(testIndex==1 && dropArea=='#dropAreaTube_4'){
						$(".drop").attr('src',simPath+"images/drop.png");
					}
						$(dragElement).draggable('enable');
						if (dropArea=='#dropAreaTube_4') {
							$(dragElement).draggable('disable');
						}
						switch(dropArea){
							case '#dropAreaTube_1':
									droped=false;
									dragDrop(dragElement,'#dropAreaTube_2','135px','143px','#lactoseSolution',valueSet_2);
									break;
							case '#dropAreaTube_2':	
									droped=false;
									dragDrop(dragElement,'#dropAreaTube_3','202px','210px','#sucroseSolution',valueSet_3);
									break;
							case '#dropAreaTube_3':
									droped=false;
									dragDrop(dragElement,'#dropAreaTube_4','269px','277px','#starchSolution',valueSet_4);
									break;
						}
					});
				});
				droped=false;
			});
		}
		
	});
	
}
function testTubeDragDrop(tTubeID,tubeLeft){console.log(tTubeID);
	
	$(tTubeID).draggable({containment:"#canvasBox",
		revert:function(){
			if(!droped){
				$(tTubeID).css({'z-index':'0'});
				$(tTubeID).animate({
					left:tubeLeft,
					top:'126px'					
				});	
			}
		},
		start:function(){
			$(tTubeID).css({
				'z-index':'10'
			});
		},
		stop:function(){
			$(tTubeID).css({
				'z-index':'0'
			});
		}
	});
	if (!$("#fehlings_dropperWraper_1").data('ui-draggable')) {
		$(tTubeID).draggable('enable');
	}
	//$(tTubeID).draggable('disable');
	$("#testTubeDropArea").droppable({accept:tTubeID,
		drop:function(){
			dropedCount++;
			droped=true;
			$(tTubeID).draggable('disable');
			$(tTubeID).css({
				top:'16px',
				left:'365px'
			});
			testTubeShaking(tTubeID);
			opacityChange("#"+$(tTubeID+' img:first-child').attr('id'),0,4000);
			setTimeout(function(){
				clearTimeout(clrTimeOutTube);
				$(tTubeID).css({
					'-ms-transform': 'rotate(0deg)',
					'-webkit-transform': 'rotate(0deg)',
					'transform': 'rotate(0deg)',
				});
				$(tTubeID).animate({
					left:tubeLeft,
					top:'126px'					
				},function(){
					droped=false;
					if(dropedCount==4&&testIndex==0){
						$("#Inference").show();
					}
					$(tTubeID).draggable('disable');
					switch(tTubeID){
						case '#testTube_1':
								testTubeDragDrop('#testTube_2','130px');
								break;
						case '#testTube_2':	
								testTubeDragDrop('#testTube_3','198px');
								break;
						case '#testTube_3':
								testTubeDragDrop('#testTube_4','264px');
								opacityChange("#starchSolution",0.6,4500);
								break;
					}
				});
			},4000);
		}
	});
	
}
var tubeDisabled=false;
function solubilityTest(){

	$('.cabohydrate').show();
	$('#Solubility_molischsArea').show();
	$('#solubilityWrap').show();
	
	droped=false;
	$("#glucoseTxt").html(solubilityTxt[0]);
	$("#lactoseTxt").html(solubilityTxt[1]);
	$("#sucroseTxt").html(solubilityTxt[2]);
	$("#starchTxt").html(solubilityTxt[3]);
	$("#bottleTxt").html(solubilityTxt[4]);
	inferenceMsg=solubilityTxt[5];
	$('.tubeSolutions').css({
		'height':'0px',
		'top':'160px',
		'opacity':'0.2'
	});
	function resetExperiment(){
		dropedCount=0;
		droperInintLeft='442px'
		$("#dropperWraper").stop();
		$("#dropperWraper").draggable('enable');
		$(".cabohydrate").css({
			'opacity':'1'
		});
		$(".cabohydrate").attr('src',simPath+"images/carbohydrates.png");
		$("#water").css({
			'border-radius':'20px 20px 7px 7px',
			'height':'95px',
			'top':'207px'
		});
		$("#water").css({
			'top':'207px',
			'height':'95px',
			'border-radius':'20px 20px 7px 7px'
		});
		$("#dropperWraper").css({
			'left':'442px',
			'top':'120px'
		})
		$(".cabohydrate").stop();
		$(".cabohydrate").css({'opacity':'1'});
		if ($("#testTube_1").data('ui-draggable')) {
			$("#testTube_1").draggable('disable');
			tubeDisabled=true;
		}
	}
	
	valueSet_1=['212px','90px','12px'];
	valueSet_2=['217px','85px','4px'];
	valueSet_3=['222px','80px','0px'];
	valueSet_4=['227px','75px','0px'];
	dragDrop('#dropperWraper','#dropAreaTube_1','68px','76px','#glucoseSolution',valueSet_1);
	
	resetExperiment();
}