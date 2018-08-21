//保证$安全性
;(function($){
    //增加原型方法
    jQuery.prototype.zadzoom = function(options){
        //遍历所有
        this.each(function(){
            //默认属性
            var defaults = {
                width:400,
                height:300,
                position:'right',
                gap:15

            }
            var opt = $.extend({},defaults,options);
            //小框
            var $min = $(this).addClass('zad-zoom');
            var $minImg = $min.children('img');
            //大框
            var imgurl = $minImg.attr('data-big');
            var $bigzoom = $('<div/>').addClass('zad-bigzoom').appendTo('body');
            var $bigImg;
            //位置
            var bigLeft,bigTop;
            switch(opt.position){
                case 'left':
                    bigLeft = $min.offset().left - opt.width - opt.gap;
                    bigTop = $min.offset().top;
                    break;
                case 'right':
                    bigLeft = $min.offset().left + $min.outerWidth() + opt.gap;
                    bigTop = $min.offset().top;
                    break;
                case 'top':
                    bigLeft = $min.offset().left;
                    bigTop = $min.offset().top - $min.outerHeight() - opt.gap;
                    break;
                case 'bottom':
                    bigLeft = $min.offset().left;
                    bigTop = $min.offset().top + $min.outerHeight() + opt.gap;
                    break; 
            }
            $bigzoom.css({
                width:opt.width,
                height:opt.height,
                left:bigLeft,
                top:bigTop
            })
            //创建放大镜
            var $zoom = $('<div/>').addClass('zoom').appendTo($min);
            //放大倍数
            var ratio;
            //移入移出
            $min.on("mouseover",function(){
                $bigzoom.show();
                $zoom.show();
                $bigImg  = $('<img/>').attr("src",imgurl).appendTo($bigzoom);
                //保证图片加载完成
                var img = new Image();
                img.src = imgurl;
                img.onload=function(){
                    ratio = $bigImg.outerWidth()/$minImg.outerWidth(); 

                    $zoom.css({
                    width:opt.width/ratio,
                    height:opt.height/ratio
                })  
                }
                
            }).on('mouseout',function(){
                $bigzoom.hide();
                $zoom.hide();
            })
            //move
            .on('mousemove',function(e){
                var left = e.pageX - $zoom.outerWidth()*0.5 - $min.offset().left;
                var top = e.pageY - $zoom.outerHeight()*0.5 - $min.offset().top;
                //边界
                if(left<0){
                    left=0;
                }else if(left>$min.outerWidth()-$zoom.outerWidth()){
                    left = $min.outerWidth()-$zoom.outerWidth()
                }
                if(top<0){
                    top=0;
                }else if(top>$min.outerHeight()-$zoom.outerHeight()){
                    top = $min.outerHeight()-$zoom.outerHeight()
                }
                $zoom.css({
                    left:left,
                    top:top
                });
                $bigImg.css({
                    left:-left*ratio,
                    top:-top*ratio
                })


            })
        })
       //支持链式调用
       return this;
    }
})(jQuery);
