require(['config'],function(){
    require(['jquery','common'],function($){
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
        var goodlist ={
            ele:'.productes',
            order:'.paixu .left',
            total:'.total',
            go:'#goTop',
            //初始化
            init(){
                this.ele = $(this.ele);
                this.order = $(this.order);
                this.total = $(this.total);
                var params = location.search;
                this.params = params.slice(1);

                //动态生成数据
                $.ajax({
                    url:'../api/list.php',
                    data:'type='+ this.params,
                    success:function(data){
                        data = JSON.parse(data);
                        //
                        goodlist.data = data;
                        goodlist.total.text(data.length);
                        data.forEach(function(item,idx){
                            goodlist.data[idx].count = (item.sale/item.price);
                        });
                        goodlist.render();
                        //ajax异步加载，在此渲染懒加载保证有数据
                    }
                })
                
                //点击事件
                this.order.on('click','.tt',(e)=>{
                    $(e.target).parent().children().removeClass('active');
                    $(e.target).addClass('active');
                    if($(e.target).hasClass('tt_04')||$(e.target).hasClass('tt_05')){
                        $(e.target).toggleClass('actives');
                        if($(e.target).hasClass('actives')){
                            this.orderdown($(e.target).attr('data-name'));
                            return;
                        }
                    }
                    this.orderup($(e.target).attr('data-name'));
                })
                //懒加载
                $(window).on('scroll', ()=>{//监听滚动事件
                    this.checkShow();
                })
                //商品跳转
                this.ele.on('click','img,.name',(e)=>{
                    location.href = 'details.html?'+$(e.target).closest('li').attr('data-name');
                })
                //悬浮的商品选择
                this.go = $(this.go);
                window.onscroll = ()=>{
                    if(scrollY>200){
                        this.go.css('display','block');
                    }else{
                        this.go.css('display','none')
                    }
                }
               
            },
            //渲染
            render(){
                this.ele.html('');console.log(this.data)
                var htmls = '';
                this.data.forEach(function(item){
                    var html =`<li data-name=${item.id}>
                        <div class="top"><img  data-src=${item.img} /></div>
                        <div class="bottom">
                            <p class="time">限时抢¥${item.sale}</p>
                            <p class="name">${item.name}</p>
                            <p class="prices"><span class="sale">¥${item.sale}</span><del class="price">¥${item.price}</del></p>
                        </div>
                    </li>`;
                    htmls += html;
                })
                goodlist.ele.html(htmls);
                //重新渲染后懒加载一次
                this.checkShow();
            },
            //排序从大到小
            orderup(kid){
                if(kid === 'time'){
                    this.data = this.data.sort(function(a,b){
                        if(a[kid] < b[kid]) return 1;
                        if(a[kid] > b[kid]) return -1;
                        return 0;
                    })
                }else{
                    this.data = this.data.sort(function(a,b){
                        return (b[kid] - a[kid]);
                    })
                }
                this.render();
            },
            //排序从小到大
            orderdown(kid){
                this.data = this.data.sort(function(a,b){
                    return (a[kid] - b[kid]);
                })
                this.render();
            },
            checkShow(){//检查元素是否在可视范围内
                $('img').each((idx,item)=>{//遍历每一个元素
                    var $cur = $(item);
                    if($cur.data('isloaded')){;return;}//判断是否已加载
                    if (this.isShow($cur)) {
                      setTimeout(()=>{
                        this.showImg($cur);
                        },300)//设置时间是为了更好的看出效果
                    };
                });
            },
            //显示图片
            showImg($el){
                $el.attr('src', $el.attr('data-src'));
                $el.data('isloaded',true);
            },
            //判断是否显示
            isShow($el){
              var winH = $(window).height(),//获取窗口高度
                    scrollH = $(window).scrollTop(),//获取窗口滚动高度
                    top = $el.offset().top;//获取元素距离窗口顶部偏移高度
              if(top < scrollH + winH){
                  return true;//在可视范围
                }else{
                  return false;//不在可视范围
                }
              }
        }
        goodlist.init();
        
    });
});