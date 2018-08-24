// tab.js是一个按照规范编写的模块，索引引入时得到返回值
require(['config'],function(){
    require(['jquery','common','zadzoom'],function($){
        $('#pageHeader').load('html/header.html',function(){
            checkedli();
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