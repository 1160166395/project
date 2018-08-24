<?php
// 引入connect.php
include 'connect.php';
$user=isset($_POST['username'])?$_POST['username']:null;
$passw=isset($_POST['password'])?$_POST['password']:null;
// $sql = "select * from data ORDER BY  rand() LIMIT 3";
$sql = "select * from username where username = '$user'";
//获取查询结果
$result = $conn->query($sql);
// var_dump($result) ;
$row = $result->fetch_all(MYSQLI_ASSOC);
//释放查询结果集，避免资源浪费
$result->close();
//把结果输出到前台
if($row){
    echo "用户已存在";
}else{
    echo "注册成功";
    $sql = "INSERT INTO username (username, password)
VALUES ('$user', '$passw')";
    $conn->query($sql);
    // echo $res;
}

// 关闭数据库，避免资源浪费
$conn->close();
?>