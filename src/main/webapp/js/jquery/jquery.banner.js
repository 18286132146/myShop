;(function($){
    $.fn.extend({
        bwslider:function(m,t,n,b){
            var e=0;
            var isDragging = false;
            var thiss=this;
            var bodyw= $(".js_nr_list").width();
            var list_a ="current";
            var init_h=this.children("li").height();

            var nr_list_box = thiss.find(".js_nr_list");
            var d_list_box = $(".js_zyzb_nr_an");

            if(init_h>0){
                this.height(init_h);
            }

            var num= nr_list_box.children().length;  //变换图片数量
            if(num<2){
                return;
            }
            
            var list="";
			for(var i=1;i<=num;i++){
				if(i==1){
					list=list+"<span class='current'></span>";
				}else{
					list=list+"<span></span>";
				}
				
			}
			d_list_box.html(list);
            
            

            function eqjs(j){
                nr_list_box.children().css({"z-index":3,"opacity":0});
                nr_list_box.children().eq(j).css("z-index",4);
                var _h = nr_list_box.children().eq(j).height();
                nr_list_box.css("height",_h+"px");
                nr_list_box.children().eq(j).animate({opacity:1},"slow");
                d_list_box.children().removeClass(list_a);
                d_list_box.children().eq(j).addClass(list_a);

                if(t=="slide"){
                    nr_list_box.children().css({"z-index":3,"opacity":1,"left":"100%"});
                    nr_list_box.children().eq(j).css("left",0);
                }

                e=j;
            }

            function eqslide(j){
                var k=j-1;
                if(k<0){
                    k=num-1;
                }
                nr_list_box.children().eq(k).animate({left:-bodyw},"slow",function(){$(this).css("left","100%");});
                nr_list_box.children().eq(j).animate({left:0},"slow");
                d_list_box.children().removeClass(list_a);
                d_list_box.children().eq(j).addClass(list_a);
                e=j;
            }
            function eqslide_last(j){
                var k_last=j+1;
                if(k_last>num-1){
                    k_last=0;
                }
                nr_list_box.children().eq(j).css("left",-bodyw);
                nr_list_box.children().eq(k_last).animate({left:"100%"},"slow");
                nr_list_box.children().eq(j).animate({left:0},"slow");
                d_list_box.children().removeClass(list_a);
                d_list_box.children().eq(j).addClass(list_a);
                e=j;
            }

            //初始化图片
            eqjs(0);
/*
            nr_list_box.children().on("touchstart",function(){
            	 isDragging = false;
            	 
            	if(!isDragging){
            		 if(t=="fade"){
                         clearInterval(fade);
                     }else{
                    	 clearInterval(slide);
                     }
            	}
            }).on("touchend",function(){
            	if(isDragging){
            		return;
            	}
            	 if(t=="fade"){
                     fade=setInterval(bwfade,m*1000);
                 }else{
                     slide=setInterval(bwslide,m*1000);
                 }
            	 
            });*/
            
            //左滑
            nr_list_box.children().on("swipeleft",function(){
            	isDragging = true;
            	//初始化
            	if(isDragging){
            		if($(this).is(":animated")){
                		return;
                	}
                	
                    e=e+1;
                    if(e>num-1){
                        e=0;
                    }

                    if(t=="fade"){

                        clearInterval(fade);
                        eqjs(e);
                        fade=setInterval(bwfade,m*1000);

                    }else{

                        clearInterval(slide);
                        eqslide(e);
                        slide=setInterval(bwslide,m*1000);
                    }
            	}
            });
            //右滑
            nr_list_box.children().on("swiperight",function(){
            	isDragging = true;
            	if(isDragging){
            	if($(this).is(":animated")){
            		return;
            	}
            	
                e=e-1;
                if(e<0){
                    e=num-1;
                }

                if(t=="fade"){

                    clearInterval(fade);
                    eqjs(e);
                    fade=setInterval(bwfade,m*1000);

                }else{

                    clearInterval(slide);
                    eqslide_last(e);
                    slide=setInterval(bwslide,m*1000);

                }
            	}
            });


            //自动变换函数
            function bwfade(){
                e=e+1;
                if(e>num-1){
                    e=0;
                }
                eqjs(e);
            }
            function bwslide(){
                e=e+1;
                if(e>num-1){
                    e=0;
                }
                eqslide(e);
            }
            function bwslide_last(){
                e=e-1;
                if(e<0){
                    e=num-1;
                }
                eqslide_last(e);
            }

            if(t=="fade"){
                var fade=setInterval(bwfade,m*1000);
            }else{
                var slide=setInterval(bwslide,m*1000);
            }
        }
    });
})(jQuery);