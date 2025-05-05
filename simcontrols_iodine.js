function iodineTest(){
    var droperInitPos;
	var droperDisabled=false;
	var colorCode;
	$("#iodineWrapArea").show();
	$("#iodine_bottleTxt").html(iodineTxt[0]);
	inferenceMsg=iodineTxt[1];
	function resetExperiment(){
		colorCode='rgba(200, 209, 29, 0.77)'
		$("#benedictsSolu").css({
			'background-color':'#0C97F4'
		});
		$(".tubeSolutions_1").css({
			'top':'130px',
			'height':'30px',
			'background-color':'#FFF',
			'opacity':'0.2'
		});
		$("#iodine_starch").css({'opacity':'0.6'});
		$("#iodine_bottleTxt").css({'font-size':'15px','height':'30px'});
		$("#iodine_droperSolution").css({'border-color': '#9f4137 transparent transparent transparent'});
		$(".drop").attr('src',simPath+"images/dropBrown.png");
		$("#iodine_dropperWraper").draggable('enable');
		
	}
	benedictsDragDrop('#iodine_dropperWraper','#dropAreaTube_1','68px','76px','#iodine_glucose',valueSet_1);
	resetExperiment();
function benedictsDragDrop(dragElement,dropArea,droperLeft,dropLeft,tubeSolution,waterValue){//Dropper drag and drop
	$(dragElement).draggable({containment:"#canvasBox",
		revert:function(){
			if(!droped){
				$(dragElement).animate({
					left:droperInitPos,
					top:'120px'		
				});
			}
		},
		start:function(){
			droperInitPos=$(dragElement).css('left');
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
			$("#"+$(dragElement+' div:first-child').attr('id')).animate({
				'top':'118px',
				'border-top-width':'0px',
				'border-left-width':'2px',
				'border-right-width':'2px',
				'left':'9px'
			},600);
			$(tubeSolution).animate({
				'top':parseInt($(tubeSolution).css('top'))-7+"px",
				'height':parseInt($(tubeSolution).css('height'))+7+"px",
				'background-color':colorCode,
				'opacity':'0.8'
			},600,function(){
				$(dragElement).animate({
					left:droperInitPos,
					top:'120px'					
				},function(){
					
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
						$(dragElement).draggable('enable');
						if(dropArea=='#dropAreaTube_4'&&dragElement=='#iodine_dropperWraper'){
							//$("#nextButton").show();
							$(dragElement).draggable('disable');
							$("#Inference").show();
						}
						switch(dropArea){
							case '#dropAreaTube_1':
									droped=false;
									benedictsDragDrop(dragElement,'#dropAreaTube_2','135px','143px','#iodine_lactose',valueSet_2);
									break;
							case '#dropAreaTube_2':	
									droped=false;
									benedictsDragDrop(dragElement,'#dropAreaTube_3','202px','210px','#iodine_sucrose',valueSet_3);
									break;
							case '#dropAreaTube_3':
									droped=false;
									colorCode='rgba(24, 13, 232, 0.772549)'
									benedictsDragDrop(dragElement,'#dropAreaTube_4','269px','277px','#iodine_starch',valueSet_4);
									break;
						}
					});
				});
				droped=false;
			});
		}
		
	});
	
}
}