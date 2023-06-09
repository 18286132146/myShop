define(function(require, exports, module) {
	var cap_tpl = 
		'<div class="ui-letter-cap"></div>'+
		'<div class="ui-letter-box">'+
		'	<div class="ui-letter">'+
		'		<ul>'+
				'{@each LIST as item,i}'+
				'<li>${item}</li>'+
				'{@/each}'+
		'		</ul>'+
		'	</div>'+
		'</div>';
	var isLoaded = false, dataArray, timeOut, trackClick = false;
	var scrollTops = [];//所有标题距离页面顶端的距离
	var panel, capEle, letter, letterCap;
	var touchEvent = {
		start: YT.touch() ? 'touchstart' : 'mousedown',
		move: YT.touch() ? 'touchmove' : 'mousemove',
		end: YT.touch() ? 'touchend' : 'mouseup'
	};
	var me = {
		init : function(ele) {
			if(!isLoaded){
				seajs.use('assets/css/func/letter.css',function(){
					isLoaded = true;
					me.init(ele)
				});
				return;
			}
			dataArray = [ "#", "A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P",
					"Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z" ];
			var html = YT.template(cap_tpl, {
				LIST : dataArray
			});
			var layer = document.createElement("div");
			ele.append(layer);
			panel = ele;
			capEle = $(layer);
			capEle.html(html);
			letter = capEle.find('.ui-letter');
			letterCap = capEle.find('.ui-letter-cap');
			me.initEvent();
		},
		initEvent : function(){
			var dom = capEle[0];
			dom.addEventListener(touchEvent.start,YT.bind(me.start, this),false);
			dom.addEventListener(touchEvent.move,YT.bind(me.move, this),false);
			dom.addEventListener(touchEvent.end,YT.bind(me.end, this),false);
		},
		start : function(e){
			trackClick = true;
			letter.find('ul').addClass('current');
			var cap = me.getCurrentSelect(e);
			if(!Fw.isEmpty(cap)){
				letterCap.text(cap).show();
				me.setPoint(cap);
			}
		},
		move : function(e){
			if(!trackClick){//如果没有触发start则不执行(适配pc)
				return;
			}
			e.preventDefault();
			var cap = me.getCurrentSelect(e);
			if(!YT.isEmpty(cap)){
				letterCap.text(cap).show();
				me.setPoint(cap);
			}
		},
		end : function(e){
			trackClick = false;
			letter.find('ul').removeClass('current');
			if(timeOut){
				clearTimeout(timeOut);
			}
			timeOut = setTimeout(function(){
				letterCap.hide();
			},500);
		},
		getCurrentSelect : function(e){
			var clientY = 0;
			if(YT.touch()){
				var touch = e.changedTouches ? e.changedTouches[0] : e;
				clientY = touch.clientY
			}else{
				clientY = e.clientY;
			}
			var top = letter.position().top;
			var lineheight = letter.find('ul li').height();
			var index = Math.floor(( clientY- top) / lineheight);
			return dataArray[index];
		},
		setPoint : function(cap) {
			var flg = panel.find('[data-cap=' + cap + ']');
			if (flg.position()) {
				var flgTop = flg.position().top;
				if(flgTop == 0){
					return;
				}
				if(YT.touch()){
					$('#mainBody').animate({scrollTop: flgTop+'px'}, 0);
				}else{
					$('html,body').animate({scrollTop: flgTop+'px'}, 0);
				}
			}
		},
		initStickyCap : function(ele){
			var caps = ele.find('[data-cap]');
			var capsList = ele.find('[data-capList]');
			//caps.eq(0).addClass('ui-letter-fixed');
			caps.each(function(i,n){
				scrollTops[i] = $(n).offset().top;
			});
			var capH = caps.innerHeight();
			var firstTop = scrollTops[0];
			$(window).scroll(function(){
				if(ele.is(':visible')){
					var t = document.documentElement.scrollTop || document.body.scrollTop; //获取滚动条的位置
					var len = scrollTops.length;
					var caps = ele.find('[data-cap]');
					for(var i = 0; i < len; i++){
						if(i<len-1){
							var h = scrollTops[i];
							var hN = scrollTops[i+1];
							if(t < firstTop){
								caps.removeClass('ui-letter-fixed');
								capsList.eq(0).removeClass('ui-letter-padding');
								return false;
							}
							if((t <= hN - capH)){
								capsList.eq(0).removeClass('ui-letter-padding');
								caps.removeClass('ui-letter-fixed');
								caps.eq(i).addClass('ui-letter-fixed');
								if(i == 0){
									caps.eq(0).next().addClass("ui-letter-padding");
								}
								return false;
							}
						}
					}
					
				}
			});
		}
	}
	module.exports = {
		init : me.init,
		initStickyCap : me.initStickyCap
	}
});