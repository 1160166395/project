require(['config'],function(){
    require(['jquery','common','zadzoom'],function($){
        $('#pageHeader').load('../html/header.html',function(){
            //二级导航栏效果
            checkedli();
            //更新小购物车
            update();
            //小购物车删除
            delet()
        });
        $('#pageFooter').load('../html/footer.html',function(){
            //保障图片路径正确
            $('#ygguid img,#footer img').each(function(idx,item){
                var imgurl =($(this).prop('src')).slice(31);
                imgurl = '../'+imgurl;
                $(this).prop('src',imgurl);
            })
        });
        var details ={
            color:'.col',
            size:'.siz',
            num:'.number input',
            nav:'#buy_nav',
            go:'#goTop',
            //初始化
            init(){
                var params = location.search.slice(1);
                this.params = params;
                $.ajax({
                    url:'../api/details.php',
                    data:'id='+this.params,
                    success:function(data){
                        data = $.parseJSON(data);
                        details.data = data;
                        details.render();
                        //放大镜
                        $('.goodspic').zadzoom({width:480,height:480});
                    }
                })
                //悬浮的商品选择
                this.nav = $(this.nav);
                this.go = $(this.go);
                window.onscroll = ()=>{
                    if(scrollY>200){
                        this.nav.css('display','block');
                        this.go.css('display','block');
                    }else{
                        this.nav.css('display','none');
                        this.go.css('display','none')
                    }
                }
                
            },
            //渲染
            render(){
                var obj = this.data[0];
                this.name = obj.name;
                this.id = obj.id;
                this.sale = obj.sale;
                //获得颜色图片路径
                var color = obj.color.match(/[{|,].+?:/g);
                color = color.map(function(item,idx){
                    return item.slice(1,-1);
                });
                var colorUrl = obj.color.match(/".+?"/g);
                colorUrl = colorUrl.map(function(item,idx){
                    return `<a><img data-color=${color[idx]} src=${item} /></a>`
                }).join('');
                // 获得尺寸数组
                var size_ = obj.size.slice(1,-1).split(',');
                size = size_.map(function(item){
                    return `<span>${item}</span>`
                }).join('');

                var html = `
                <div class="curLct">
                    你当前位置：
                    <a href="../index.html">首页</a> > 
                    <a href="list.html">全部分类</a> > 
                    <a href="list.html?spt">运动</a> > 
                    ${obj.name}
                </div>
                <div class="goodsImg fl">
                    <div class="goodspic"><img src=${obj.img} data-big=${obj.img} /></div>
                    <div class="pic-list">
                        <ul class="clearfix">
                            <li class="hover"><img src=${obj.img} data-big=${obj.img} alt="" /></li>
                            <li><img src=${obj.img} data-big=${obj.img} alt="" /></li>
                            <li><img src=${obj.img} data-big=${obj.img} alt="" /></li>
                            <li><img src=${obj.img} data-big=${obj.img} alt="" /></li>
                            <li><img src=${obj.img} data-big=${obj.img} alt="" /></li>
                            <li><img src=${obj.img} data-big=${obj.img} alt="" /></li>
                            <li><img src=${obj.img} data-big=${obj.img} alt="" /></li>
                        </ul>
                    </div>
                </div>
                <div class="goodsCon fl">
                    <h1>${obj.name}</h1>
                    <p><a href="#" class="more">更多The north face乐斯菲斯商品>></a></p>
                    <p class="price">
                        <span>¥${obj.sale}</span>
                        <del>¥${obj.price}</del>
                        <strong>不支持使用优惠券</strong>
                    </p>
                    <div class="time">
                        
                    </div>
                    <div class="pjia clearfix">
                        <div class="left fl">商品评价：<i></i><span class="red">10.0分</span><span class="blue">已有3人评价</span></div>
                        <div class="right fr">在线咨询</div>
                    </div>
                    <div class="gooddetail">
                        <p class="color"><span>颜色</span>${colorUrl}</p>
                        <p class="size">尺码${size}</p>
                        <p class="form"><span>尺码对照表>></span></p>
                        <p class="num">
                            <span class="nums">数量</span>
                            <span class="del"></span>
                            <span class="number"><input type="text" value='1'/></span>
                            <span class="add"></span>
                            已选择<span class="col red">${color[0]}</span>
                            <span class="siz red">${size_[0]}</span>
                        </p>
                        <div class="gobuy clearfix">
                            <p class="buyNow red fl">立即购买</p>
                            <p class="cart fl">加入购物车</p>
                            <p class="syis fl"><span>扫一扫</span><span>加入购物车</span></p>
                        </div>
                        <div class="erweima">
                            <p>下载优购客户端</p>
                            <img src="../img/qrcode.png" alt="" />
                            <p>更多手机专享优惠</p>
                        </div>
                    </div>
                    <p class="shopName">本商品由<span>品牌商</span>直接发货</p>
                    <div class="promise clearfix">
                        <h5>承诺服务</h5>
                        <ul class="fl">
                            <li>正品保证</li>
                            <li>10天退换货</li>
                            <li>10天补差价</li>
                        </ul>

                    </div>
                </div>
                <div class="look fr">
                    <div class="look_ht">
                        <i></i>
                        <span>看了又看</span>
                    </div>
                    <div class="look_good">
                        <ul class="look_con">
                            <li><a>
                            <img src="../img/bao1.jpg" alt="" />
                            <p><span class="fl">包包包</span><span class="fr">¥189</span></p>
                            </a></li>
                            <li><a>
                            <img src="../img/bao1.jpg" alt="" />
                            <p><span class="fl">包包包</span><span class="fr">¥189</span></p>
                            </a></li>
                            <li><a>
                            <img src="../img/bao1.jpg" alt="" />
                            <p><span class="fl">包包包</span><span class="fr">¥189</span></p>
                            </a></li>
                        </ul>
                        <div class="btn clearfix">
                            <div class="prev"></div>
                            <div class="next"></div>
                        </div>
                    </div>
                </div>`;
                var htmls = `<span class="col red">${color[0]}</span>
                            <span class="siz red">${size_[0]}</span>`
                $('.num-nav').html($('.num-nav').html()+htmls);
                $('.size-nav').html($('.size-nav').html()+size)
                $('.good').html(html);
                //倒计时
                var starttime = new Date("2018/9/30");
                showTime();
                var timer = setInterval(showTime, 1000);
                function showTime() {
                    var nowtime = new Date();
                    var time = starttime - nowtime;
                    if(time<=0){
                        clearInterval(timer);
                        $('.time').css('display','none');
                    }
                    var day = parseInt(time / 1000 / 60 / 60 / 24);
                    var hour = parseInt(time / 1000 / 60 / 60 % 24);
                    var minute = parseInt(time / 1000 / 60 % 60);
                    var seconds = parseInt(time / 1000 % 60);
                    $('.time').html(`还剩<span class="red">${day}</span>天<span class="red">${hour}</span>小时<span class="red">${minute}</span>分钟<span class="red">${seconds}</span>秒`);
                }
                $('.color').children().eq(1).addClass('active');
                $('.size').children().eq(0).addClass('active');
                $('.size-nav').children().eq(0).addClass('active');
                details.clicks();
            },
            //各类点击事件
            clicks(){
                details.color = $(details.color);
                details.size = $(details.size);
                //颜色尺寸
                $color = $('.color');
                $size = $('.size');
                $sizeNav = $('.size-nav');
                $color.on('click','a',function(e){
                    $color.children('a').removeClass('active');
                    $(e.target).closest('a').addClass('active');
                    $('.col').text($(e.target).attr('data-color'));
                })
                $size.on('click','span',function(e){
                    $size.children('span').removeClass('active');
                    $(e.target).addClass('active');
                    $sizeNav.children('span').removeClass('active');
                    $sizeNav.children('span').eq($(e.target).index()).addClass('active');
                    $('.siz').text($(e.target).text());
                })
                //尺寸同步
                $sizeNav.on('click','span',function(e){
                    $sizeNav.children('span').removeClass('active');
                    $(e.target).addClass('active');
                    $size.children('span').removeClass('active');
                    $size.children('span').eq($(e.target).index()).addClass('active');
                    $('.siz').text($(e.target).text());
                })
                //加减
                details.num = $(details.num)
                $('.add').on('click',function(){
                    var _num = details.num.val();
                    _num++;
                    details.num.val(_num);
                })
                $('.del').on('click',function(){
                    var _num = details.num.val();
                    if(_num>1){
                        _num--;
                        details.num.val(_num);
                    }
                })
                //展示图片
                $showImg = $('.goodspic img');
                $('.pic-list').on('click','img',function(e){
                    $(e.target).closest('ul').children('li').removeClass('hover');
                    $(e.target).closest('li').addClass('hover');
                    $showImg.attr({
                        src:$(this).attr('src'),
                        'data-big':$(this).attr('data-big')
                    });
                })
                //加入购物车
                $('.buyNow').on('click',()=>{
                    this.addCart();
                    location.href = 'cart.html';
                })
                $('.cart').on('click',()=>{
                    this.addCart();
                    //更新小购物车
                    update();
                })
            },
            //加入cookie
            addCart(){
                var goodsdata = [];
                var gooddata = {};
                gooddata.imgurl = $('.color').children('.active').children('img').attr('src');
                gooddata.name   = this.name;
                gooddata.id     = this.id;
                gooddata.sale   = this.sale;
                gooddata.color   = this.color.eq(0).text();
                gooddata.qty    = this.num.val();
                gooddata.size   = this.size.eq(0).text();
                if(Cookie.get('goodlist') == '[]' || Cookie.get('goodlist') == ''){
                    goodsdata.push(gooddata);
                    goodsdata = JSON.stringify(goodsdata);
                    Cookie.set('goodlist',goodsdata);
                }else{
                    var gooddetail = Cookie.get('goodlist');
                    gooddetail = JSON.parse(gooddetail);
                    gooddetail.forEach(function(item,idx){
                       if(item.id === gooddata.id&&item.color===gooddata.color&&item.size===gooddata.size){
                        gooddata.qty = item.qty*1 + gooddata.qty*1;
                        gooddetail.splice(idx,1)
                        return;
                        }
                    })  
                    gooddetail.push(gooddata);
                    gooddetail = JSON.stringify(gooddetail);
                    Cookie.set('goodlist',gooddetail);     
                }
            }
        }    
        details.init();
    });
});