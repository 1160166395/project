// tab.js是一个按照规范编写的模块，索引引入时得到返回值
require(['config'],function(){
    require(['jquery','common','zadzoom'],function($){
        $('#pageHeader').load('html/header.html',function(){
            //二级导航栏效果
            checkedli();
            //更新小购物车
            update();
            //小购物车删除
            delet();
            //保证小购物车中图片路径正确
            $('.smallCart img').each(function(idx,item){
                $(item).attr('src',$(item).attr('src').slice(3))
            })
        });
        $('#pageFooter').load('html/footer.html');
        $('.carouls').Carousels({
            ele:'.carouls',
            img:['img/carouls1.jpg','img/carouls2.jpg','img/carouls3.jpg'],
            width:990,
            height:480,
            button:false,
        })
    });
});