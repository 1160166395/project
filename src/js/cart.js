require(['config'],function(){
    require(['jquery','common'],function($){
        var cart = {
            content:'.content',
            init(){
                this.content = $(this.content);
                var data = Cookie.get('goodlist');
                this.data = $.parseJSON(data);
                $.each(this.data,(idx,item)=>{
                    this.render(idx,item);
                })
                
            },
            render(idx,item){
                var html = `<li class="clearfix">
                        <div><input type="checkbox" class="check" /></div>
                        <div><a href=""><img src=${item.imgurl} alt="" /></a></div>
                        <div>${item.name}</div>
                        <div>
                        <p><span>颜色：</span>${item.color}</p>
                        <p><span>尺码：</span>${item.size}</p>
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
                            <p>删除</p>
                        </div>
                    </li>`
                this.content.html(this.content.html()+html);
            }
        }
        cart.init();
    });
});