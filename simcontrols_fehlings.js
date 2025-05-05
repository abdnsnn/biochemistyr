function fehlingsTest(){
    var droperInitPos;
	var droperDisabled=false;
	var soluColor='#0C97F4';
	$("#fehlingsWrapArea").show();
	$("#fehlingsA_bottleTxt").html(fehlingsTxt[0]);
	$("#fehlingsB_bottleTxt").html(fehlingsTxt[1]);
	inferenceMsg=solubilityTxt[5];
	$(".drop").attr('src',simPath+"images/drop_blue.png");
	function resetExperiment(){
		$("#fehlingsA").css({
			'background-color':'#0C97F4'
		});
		$(".tubeSolutions_1").css({
			'top':'130px',
			'height':'30px',
			'background-color':'#FFF',
			'opacity':'0.2'
		});
		$("#fehlings_starch").css({'opacity':'0.6'});		
		$("#fehlings_dropperWraper").draggable('enable');
		if ($("#fehlings_dropperWraper_1").data('ui-draggable')) {
			$("#fehlings_dropperWraper_1").draggable('disable');
			droperDisabled=true;
		}
		//$("#molisch_dropperWraper_1").draggable('enable');
	}
	fehlingsDragDrop('#fehlings_dropperWraper','#dropAreaTube_1','68px','76px','#fehlings_glucose',valueSet_1);
	resetExperiment();
function fehlingsDragDrop(dragElement,dropArea,droperLeft,dropLeft,tubeSolution,waterValue){//Dropper drag and drop
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
			},1900);
			clrDfall_2=setTimeout(function(){dropsFall(dropLeft,'123px',parseInt($(tubeSolution).css('top'))+110+"px")},600);
			clrDfall_3=setTimeout(function(){dropsFall(dropLeft,'123px',parseInt($(tubeSolution).css('top'))+110+"px")},1200);
			$(tubeSolution).animate({
				'top':parseInt($(tubeSolution).css('top'))-20+"px",
				'height':parseInt($(tubeSolution).css('height'))+20+"px",
				'opacity':'1',
				'background-color':soluColor
				
			},1900,function(){
				$(dragElement).animate({
					left:droperInitPos,
					top:'120px'					
				},function(){
					
					if(dropedCount==4){
						$(dragElement).draggable('disable');
						if (droperDisabled) {
							$("#fehlings_dropperWraper_1").draggable('enable');
						}
						$(".drop").attr('src',simPath+"images/drop.png");
						fehlingsDragDrop('#fehlings_dropperWraper_1','#dropAreaTube_1','68px','76px','#fehlings_glucose',valueSet_1);
						soluColor='#060da8';
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
						$(dragElement).draggable('enable');
						if(dropArea=='#dropAreaTube_4'&&dragElement=='#fehlings_dropperWraper_1'){
							$("#nextButton").show();
						}
						switch(dropArea){
							case '#dropAreaTube_1':
									droped=false;
									fehlingsDragDrop(dragElement,'#dropAreaTube_2','135px','143px','#fehlings_lactose',valueSet_2);
									break;
							case '#dropAreaTube_2':	
									droped=false;
									fehlingsDragDrop(dragElement,'#dropAreaTube_3','202px','210px','#fehlings_sucrose',valueSet_3);
									break;
							case '#dropAreaTube_3':
									droped=false;
									fehlingsDragDrop(dragElement,'#dropAreaTube_4','269px','277px','#fehlings_starch',valueSet_4);
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