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
                // 获取大图url
                var imgurl = $minImg.attr('data-big');
                $bigzoom.empty();
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
(function($){
    jQuery.prototype.Carousels = function(options){
        function Carousel(options){
            let defaults = {
                ele:'',//必填
                width:810,
                height:320,
                img:[],//必填
                index:1,
                page:true,//分页
                button:true,
                type:'horizontal',//水平horizontal，垂直vertical，淡入淡出fade
                seamless:true,//是否无缝滚动,
                duration:3000,//轮播间隔时间
            }
            this.opt = Object.assign({},defaults,options);
            
            this.len = this.opt.img.length;
            this.init();
        }
        //初始化
        Carousel.prototype.init = function(){
            opt = this.opt;
            this.ele = document.querySelector(opt.ele);
            this.ele.classList.add('lx-carousel');
            this.ele.style.width = opt.width +'px';
            this.ele.style.height = opt.height +'px';
            //生成轮播
            let ul = document.createElement('ul');
            ul.className = opt.type;
            ul.innerHTML = opt.img.map(function(url){
                return `<li><img src=${url}></li>`;
            }).join('');
            this.ele.appendChild(ul);
            ul.style.left = -opt.width +'px';
            this.ul = ul;
            //无缝
            lastImg = document.createElement('img');
            firstImg = document.createElement('img');
            lastImg.src = opt.img[0];
            firstImg.src = opt.img[this.len-1];
            lastLi = document.createElement('li');
            lastLi.appendChild(lastImg);
            ul.appendChild(lastLi);
            firstLi = document.createElement('li');
            firstLi.appendChild(firstImg);
            ul.insertBefore(firstLi, ul.children[0]);
            this.len = this.len+2;
            //
            if(opt.type === 'horizontal'){
                ul.style.width = opt.width*this.len +'px';
            }else if(opt.type === 'fade'){
                ul.style.width = opt.width +'px';
                ul.style.height = opt.height +'px';
            }
            //自动轮播
            this.timer = setInterval(this.autoPlay.bind(this),opt.duration)
            //移入暂停
            this.ele.onmouseover = ()=>{
                this.stop();
            }
            //移出播放
            this.ele.onmouseout = ()=>{
                this.timer = setInterval(this.autoPlay.bind(this),opt.duration)
            }
            //分页
            if(opt.page){
                this.page = document.createElement('div');
                this.page.className = 'page';
                for(let i=0;i<this.len-2;i++){
                    let span = document.createElement('span');
                    span.innerText = i+1;
                    if(i===opt.index-1){
                        span.className = 'active';
                    }
                    this.page.appendChild(span);
                }
                this.ele.appendChild(this.page);
            }
            //button按钮
            if(opt.button){
                let btnPrev = document.createElement('span');
                btnPrev.className = 'btn-prev';
                btnPrev.innerHTML = '&lt;';
                let btnNext = document.createElement('span');
                btnNext.className = 'btn-next';
                btnNext.innerHTML = '&gt;';
                this.ele.appendChild(btnPrev);
                this.ele.appendChild(btnNext);
            }
            this.ele.onclick = (e)=>{
                //page切换
                if(e.target.parentNode.className === 'page'){

                    opt.index = e.target.innerText;
                    console.log(opt.index)
                    this.play();
                }
                //btn上下
                if(e.target.className === 'btn-prev'){
                    opt.index--;
                    this.play();
                }
                if(e.target.className === 'btn-next'){
                    opt.index++;
                    this.play();
                }

            }
        }
        //自动播放
        Carousel.prototype.autoPlay = function(){
            this.opt.index++;
            this.play();
        }
        //播放
        Carousel.prototype.play = function(){
            let opt = this.opt;
            if(opt.index>this.len-1){
                this.ul.style.left = -opt.width +'px';
                opt.index = 2;
            }else if(opt.index<0){
                this.ul.style.left = -opt.width*(this.len-2) +'px';
                opt.index = this.len-3;
            }
            if(opt.type === 'horizontal'){
                animate(this.ul,{left:-opt.width*opt.index})
            }else if(opt.type === 'vertical'){
                animate(this.ul,{top:-opt.height*opt.index})
            }else if(opt.type === 'vertical'){
                for(let i=0;i<this.len;i++){
                    animate(this.ul.children(i),{opacity:0})
                }
                animate(this.ul.children(opt.index),{opacity:1})
            }
            //分页
            for(let i=0;i<this.len-2;i++){
                this.page.children[i].classList.remove('active');
                if(opt.index === this.len-1){
                    this.page.children[0].classList.add('active');
                }else if(opt.index === 0){
                    this.page.children[this.len-3].classList.add('active');
                }else if(opt.index-1===i){
                    this.page.children[i].classList.add('active');
                }
                
            }
        }
        //停止
        Carousel.prototype.stop = function(){
            clearInterval(this.timer);
        }
        new Carousel(options);
    }
    
})(jQuery);