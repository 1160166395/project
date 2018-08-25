require(['config'],function(){
    require(['jquery','common'],function($){
        var cart = {
            content:'.content',
            clearBtn:'.clearAll',
            total:'.total',
            all:'.all',
            init(){
                this.content = $(this.content);
                this.clearBtn = $(this.clearBtn);
                this.total = $(this.total);
                this.all = $(this.all);
                var data = Cookie.get('goodlist');
                this.data = $.parseJSON(data);
                this.render();
                //增加商品
                this.content.on('click','.add',(e)=>{
                    var item = $(e.target);
                    this.find(item,'add');
                })
                //减少商品数量
                this.content.on('click','.del',(e)=>{
                    var item = $(e.target);
                    this.find(item,'del');
                })
                //删除商品
                this.content.on('click','.clear',(e)=>{
                    var item = $(e.target);
                    this.find(item,'clear');
                })
                //清空购物车
                this.clearBtn.on('click',(e)=>{
                   this.clearAll();
                })
                //全选
                this.all.on('click',function(){
                    $(':checkbox').prop('checked',this.checked)
                })
                //自动全选
                this.content.on('click',':checkbox',()=>{
                    this.checkedAll();
                })
                //选中删除
                $('.checkedClear').on('click',()=>{
                    $('.content :checkbox').filter(':checked').each((idx,item)=>{
                        this.find($(item),'clear')
                    })
                })
                //商品跳转
                this.content.on('click','img,.name',(e)=>{
                    location.href = 'details.html?'+$(e.target).closest('li').attr('data-name');
                })
                
            },
            //渲染
            render(){
                this.content.html('');
                var html = '';
                var total = 0;
                $.each(this.data,(idx,item)=>{
                    html += `<li class="clearfix" data-name=${item.id}>
                        <div><input type="checkbox" class="check" /></div>
                        <div><a href=""><img src=${item.imgurl} alt="" /></a></div>
                        <div class="name">${item.name}</div>
                        <div>
                        <p>颜色：<span class="color">${item.color}</span></p>
                        <p>尺码：<span class="size">${item.size}</span></p>
                        </div>
                        <div>${item.sale}</div>
                        <div>
                            <span class="del">-</span>
                            <input type="text" value=${item.qty} />
                            <span class="add">+</span>
                        </div>
                        <div class="red">${(item.sale*item.qty).toFixed(2)}</div>
                        <div>
                            <p>加入收藏夹</p>
                            <p class="clear">删除</p>
                        </div>
                    </li>`
                total += item.sale*item.qty;
                })
                this.content.html(html);
                this.total.text(total.toFixed(2));
            },
            //加数量
            add(idx){
                this.data[idx].qty++;
            },
            //减数量
            del(idx){
                if(this.data[idx].qty==1){
                    return;
                }
                this.data[idx].qty--;
            },
            //清除一个商品
            clear(idx){
                this.data.splice(idx,1);
            },
            //找到对应商品
            find(ite,type){
                var index;
                $.each(this.data,(idx,item)=>{
                    var currentLi = ite.closest('li');
                    if(item.id === currentLi.attr('data-name') && item.color === currentLi.find('.color').text() && item.size === currentLi.find('.size').text()){
                        index = idx;
                    }
                });
                switch (type){
                    case 'add':
                        this.add(index);
                        break;
                    case 'del':
                        this.del(index);
                        break;
                    case 'clear':
                        this.clear(index);
                        break;
                }
                Cookie.set('goodlist',JSON.stringify(this.data));
                this.render();
            },
            //清空购物车
            clearAll(){
                Cookie.remove('goodlist');
                this.content.html('');
            },
            //自动全选
            checkedAll(){
                $checkbox = $('.content :checkbox');
                var len = $checkbox.filter(':checked').length;
                this.all.prop('checked',$checkbox.length === len);
            }
        }
        cart.init();
    });
});