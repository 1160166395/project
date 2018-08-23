// tab.js是一个按照规范编写的模块，索引引入时得到返回值
require(['config'],function(){
    require(['jquery','common'],function($){
        var $username = $('#username');
        var $password = $('#password');
        var $sub = $("#sub");
        var $warn = $(".warn");
        var $warnpsw = $(".warnpsw");
        var $err = $(".err");
        var one = false;
        var two = false;
        $username.on('blur',function(){
            var _username = $username.val();
            if(_username === ''){
                $warn.css('display','block');
                $err.css('display','none');
                one = false;
                $username.parent().css("margin-bottom",0);
            }else{
                $warn.css('display','none');
                $err.css('display','none');
                one = true;
                $username.parent().css("margin-bottom",'28px');
            }
        })
        $password.on('blur',function(){
            var _password = $password.val();
            if(_password === ''){
                $warnpsw.css('display','block');
                two = false;
                $password.parent().css("margin-bottom",0);
            }else{
                $warnpsw.css('display','none');
                two = true;
                $password.parent().css("margin-bottom",'28px');
            }
        })
        $sub.on('click',function(){
            var username = $username.val();
            var password = $password.val();
            if(one&&two){
                $.ajax({
                    type:'post',
                    url:'../api/login.php',
                    data:"username="+username+'&password='+password,
                    success:function(msg){
                        if(msg == 'yes'){
                            location.href = '../index.html';
                        }else{
                            $err.css('display','block');
                        }
                    }
                })
            }
        })
    });
});