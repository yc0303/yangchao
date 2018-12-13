<?php
	header("Content-type:text/html;charset=utf-8");
	//接受前端数据
	$phone = $_POST['phone'];
	$email = $_POST['email'];
	$pass = $_POST['pass'];
	//连接数据库
	$conn = mysql_connect('localhost','root','root');
	if(!$conn){
		die("连接失败".mysql_error());
	}else{
		//选择数据库
		mysql_select_db("register",$conn);
		//执行sql语句
		$sqlstr = "insert into registes(phone,email,pass)
		values('$phone','$email','$pass')";
		$result = mysql_query($sqlstr,$conn);
		//关闭数据库
		mysql_close($conn);
		if($result==1){
			echo 0;
		}else{
			echo 1;
		}
	}
?>