// tab.js是一个按照规范编写的模块，索引引入时得到返回值
require(['config'],function(){
    require(['jquery','common'],function($){
        $('#pageHeader').load('html/header.html');
        $('#pageFooter').load('html/footer.html');
    });
});