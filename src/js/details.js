require(['config'],function(){
    require(['jquery','common'],function($){
        $('#pageHeader').load('../html/header.html',function(){
            checkedli();
        });
        $('#pageFooter').load('../html/footer.html',function(){
            //保障图片路径正确
            $('#ygguid img,#footer img').each(function(idx,item){
                var imgurl =($(this).prop('src')).slice(31);
                imgurl = '../'+imgurl;
                $(this).prop('src',imgurl);
            })
        });
        
    });
});