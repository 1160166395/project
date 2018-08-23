// tab.js是一个按照规范编写的模块，索引引入时得到返回值
require(['config'],function(){
    require(['jquery','common'],function($){
        var $phones = $('#phones');
        var $password = $('#password');
        var $yzm = $('#yzm');
        var $passwords = $('#passwords');
        var $yzm = $('#yzm')
        var $_yzm = $('._yzm');
        var one = false;
        var two = false;
        var three = false;
        var four = false;
        //号码验证
        $phones.on('blur',function(){
            var _phones = $phones.val()
            if(!/^1[3-9]\d{9}$/.test(_phones)){
                $(".warn").css("display","block");
                $phones.parent().css("margin-bottom",0);
                one = false;
            }else{
                $(".warn").css("display","none");
                $phones.parent().css("margin-bottom",'28px');
                one = true;
            }
        })
        //密码验证
        $password.on("blur",function(){
            var _password = $password.val();
            if(_password === ''){
                $(".warnpsw").css("display","block");
                $password.parent().css("margin-bottom",0);
                $(".pswstyle").css("display","none");
                two = false;
            }else if(!/^\S{6,25}$/.test(_password)){
                $(".pswstyle").css("display","block");
                $password.parent().css("margin-bottom",0);
                $(".warnpsw").css("display","none");
                two = false;
            }else{
                $password.parent().css("margin-bottom","28px");
                $(".pswstyle").css("display","none");
                $(".warnpsw").css("display","none");
                two = true;
            }
        })
        $passwords.on("blur",function(){
            var _password = $password.val();
            var _passwords = $passwords.val();
            if(_passwords === ''){
                $(".warnpsws").css("display","block");
                $passwords.parent().css("margin-bottom",0);
                $(".pswstyles").css("display","none");
                three = false;
            }else if(_password != _passwords){
                $(".pswstyles").css("display","block");
                $passwords.parent().css("margin-bottom",0);
                $(".warnpsws").css("display","none");
                three = false;
            }else{
                $passwords.parent().css("margin-bottom","28px");
                $(".warnpsws").css("display","none");
                $(".pswstyles").css("display","none");
                three = true;
            } 
        })
        //验证码检测
        function create(){
            var arr = ['A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z','a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','q','r','s','t','u','v','w','x','y','z','0','1','2','3','4','5','6','7','8','9'];
            var str = '';
            for(var i = 0 ; i < 4 ; i ++ ){
                str += arr[randomNumber(0,arr.length-1)];}
            $_yzm.text(str);          
        }
        create();
        $_yzm.on('click',function(e){
            e.preventDefault();
            create();
        })
        //验证码验证
        $yzm.on('blur',function(){
            var yzmval = $yzm.val().toLowerCase();
            var _yzmval = $_yzm.text().toLowerCase();
            if(yzmval === ''){
                $(".warnyzm").css("display","block");
                $yzm.parent().css("margin-bottom",0);
                $(".warnyzms").css("display","none");
                four = false;
            }else if(yzmval != _yzmval){
                $(".warnyzm").css("display","none");
                $yzm.parent().css("margin-bottom",0);
                $(".warnyzms").css("display","block");
                four = false;
            }else{
                $(".warnyzm").css("display","none");
                $yzm.parent().css("margin-bottom",'28px');
                $(".warnyzms").css("display","none");
                four = true;
            }
        })
        var $sub = $("#sub");
        var $warns = $('.warns');
        var $agree = $('#agree');
        $sub.on('click',function(){
            var username = $phones.val();
            var password = $password.val();
            if($agree.prop('checked')&&one&&two&&three&&four){
                console.log(1)
                $.ajax({
                    type:'post',
                    url:'../api/logon.php',
                    data:"username="+username+'&password='+password,
                    success:function(msg){
                        alert(msg)
                    }
                })
            }
        })
    });
});