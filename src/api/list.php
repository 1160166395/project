<?php
// 引入connect.php
include 'connect.php';
header('Content-Type:text/html; charset=UTF-8');
$type=isset($_GET['type'])?$_GET['type']:null;
// $sql = "select * from data ORDER BY  rand() LIMIT 3";
if($type != 'spt'&&$type != 'nvx'&&$type != 'out'&&$type != 'nanx'&&$type != 'kids'&&$type != 'bao'){
    $sql = "select * from goods";
}else{
    $sql = "select * from goods where type = '$type'";
}
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
