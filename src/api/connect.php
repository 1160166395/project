<?php
//链接数据库
$servername = "localhost";
$username = "root";
$password = "";
$dbname = "yougou";
//创建链接
$conn = new mysqli($servername,$username,$password,$dbname);
//判断链接是否成功
if($conn->connect_error){
    die('链接失败：'.$conn->connect_error);
}
$conn->set_charset('utf8');
?>