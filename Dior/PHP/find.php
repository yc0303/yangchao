<?php
	header("Content-type:text/html;charset=utf-8");
	//接收数据
	$phone = $_GET['phone'];
	//从数据库中查询
	$conn = mysql_connect("localhost","root","root");
	if(!$conn){
		die("连接失败".mysql_error());
		//响应
	}else{
		//选择数据库
		mysql_select_db("register",$conn);
		//执行SQL语句
		$sqlstr = "select * from registes where phone = '$phone'";
		$result = mysql_query($sqlstr,$conn);
		//关闭数据库
		mysql_close($conn);
		if(mysql_num_rows($result)==0){
			//响应
			echo 0;
		}else{
			echo 1;
		}
	}
?>