<?php
header('Content-Type:text/html; charset=UTF-8');
$type=isset($_GET['type'])?$_GET['type']:null;
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
$conn->set_charset('utf-8');
// $sql = "select * from data ORDER BY  rand() LIMIT 3";
$sql = "select * from goods where type = '$type'";
//获取查询结果
$result = $conn->query($sql);
// var_dump($result);
// $row = $result->fetch_assoc();
$row = $result->fetch_all(MYSQLI_ASSOC);
//释放查询结果集，避免资源浪费
$result->close();
//把结果输出到前台
echo json_encode($row,320);

// 关闭数据库，避免资源浪费
$conn->close();
?>