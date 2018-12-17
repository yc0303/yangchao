function Slider(boxDom,width,height,imgs,btnColor,
				btnHighColor,btnSize,isCircle,timeSpace){
	this.boxDom = boxDom
	this.width = width;
	this.height = height;
	this.imgs = imgs;//要播放的图片数组
	
	this.btnColor = btnColor; //按钮的原始颜色
	this.btnHighColor = btnHighColor;//按钮的高亮颜色
	this.btnSize = btnSize;//按钮的大小
	this.isCircle = isCircle;//按钮是否为圆的
	
	this.currIndex = 0;
	this.timeSpace = timeSpace;
	this.myTimer = null;
	
	this.createUI = function(){
		this.boxDom.style.overflow="hidden";
		for(let i=0;i<this.imgs.length;i++){
			let imgDom = document.createElement("img");
			imgDom.src = this.imgs[i];
			imgDom.style.cssText = "position:absolute;top:0px;";
			if(i==0){
				imgDom.style.left = "0px";
			}else{
				imgDom.style.left = this.width+"px";
			}
			imgDom.style.width = this.width+"px";
			imgDom.style.height = this.height+"px";
			this.boxDom.appendChild(imgDom);
		}
		
		let ulDom = document.createElement("ul");
		ulDom.style.cssText = "position:absolute;list-style:none;right:50px;bottom:10px;z-index:1;";
		this.boxDom.appendChild(ulDom);
		
		for(let i=0;i<this.imgs.length;i++){
			let liDom = document.createElement("li");
			liDom.style.cssText="margin-right:20px;float:left;";
			
			liDom.style.width = this.btnSize+"px";
			liDom.style.height = this.btnSize+"px";
			if(this.isCircle){
				liDom.style.borderRadius="50%";
			}
			if(i==0){
				liDom.style.backgroundColor = this.btnHighColor;			
			}else{
				liDom.style.backgroundColor = this.btnColor;			
			}
			ulDom.appendChild(liDom);
		}
	}	
	//添加事件
	this.addEvent = function(){
		let that = this;	
		this.boxDom.onmouseover = function(){
			that.stop();
		}
		this.boxDom.onmouseout = function(){
			that.autoPlay();
		};
		let lis = this.boxDom.lastElementChild.children;
		for(var i=0;i<lis.length;i++){
			lis[i].setAttribute("index",i);
			lis[i].onclick = function(){
				that.goImg(parseInt(this.getAttribute("index")));
			};
		}
	}
	//1、自动播放
	this.autoPlay = function(){	
		if(this.myTimer!=null){
			return;
		}
		this.myTimer = setInterval(()=>{
			//1、改变数据（图片序号）
			let outIndex = this.currIndex;//要出去的那张。
			this.currIndex=this.currIndex+1;
			//2、边界处理
			if(this.currIndex>this.imgs.length-1 || this.currIndex<0){
				this.currIndex = 0;
			}
			//3、改变外观
			this.showImg(outIndex,this.currIndex);
		},this.timeSpace);	
	}
	//2、停止
	this.stop=function(){
		if(this.myTimer!=null){
			window.clearInterval(this.myTimer);
			this.myTimer = null;
		}
	}
	//3、跳转指定的图片
	this.goImg=function(transIndex){//2
		//1、改变数据（图片序号）
		let outIndex = this.currIndex;
		this.currIndex=transIndex;//2
		//2、边界处理
		if(this.currIndex>this.imgs.length-1 || this.currIndex<0){
			this.currIndex = 0;
		}
		//3、改变外观
		this.showImg(outIndex,this.currIndex);
	}
	//参数：
	this.showImg=function(outIndex,inIndex){
		//3、改变外观
		//1)、改图片
		let imgs = this.boxDom.children;
		imgs[inIndex].style.left = this.width+"px";
		//让inIndex滑入
		linearMove03(imgs[inIndex],"left",this.width,0,300);
		//让outIndex滑出
		linearMove03(imgs[outIndex],"left",0,-1*this.width,300);
		//2)、改豆豆
		let lis = this.boxDom.lastElementChild.children;
		for(let i=0;i<lis.length;i++){
			lis[i].style.backgroundColor = this.btnColor;
		}
		lis[this.currIndex].style.backgroundColor = this.btnHighColor;
	}
	this.createUI();
	this.addEvent();
}

window.onload = function(){
	let s2 = new Slider(
			$("#box2"),
			1439,
			616,
			["img/1.jpg","img/2.jpg","img/3.jpg","img/4.jpg","img/5.jpg","img/6.jpg"],
			"#cccccc",
			"#494949",
			6,
			true,
			2000
	);
	s2.autoPlay();
}
//	地区
	$("#diqu").onclick = function(){
		if($("#sel").style.display == "none"){
			$("#sel").style.display = "block";	
		}else{
			$("#sel").style.display = "none";
		}
	}

//	关闭目录
	$("#guanbi").onclick = function(){
		if($("#cate").style.display == "none"){
			$("#dian").style.display = "block";	
		}else{
			$("#cate").style.display = "none";
		}
	}
	
	$("#dian").onclick = function(){
			$("#cate").style.display = "block";	
	}
	
//  显示购物车页面	
	$("#xianxing").onclick=function(){
		if($("#gouwu").style.display=="none"){
			$("#gouwu").style.display = "block";
		}else{
			$("#gouwu").style.display = "none";
		}
	}
//  点击叉号 关闭购物车页面
	$("#zouni").onclick = function(){
		$("#gouwu").style.display = "none"
	}
	
//	购物车联动
	$("#gou01").onclick = function(){
		if($("#wu01").style.display = "block"){
			$("#wu02").style.display = "none";
			$("#wu03").style.display = "none";
		}
	}
	$("#gou02").onclick = function(){
		if($("#wu02").style.display = "block"){
			$("#wu01").style.display = "none";
			$("#wu03").style.display = "none";
		}
	}
	$("#gou03").onclick = function(){
		if($("#wu03").style.display = "block"){
			$("#wu01").style.display = "none";
			$("#wu02").style.display = "none";
		}
	}
	
//女士商品隐藏
	$("#AA").onclick = function(){
		$("#subor-1").style.display="block";
	}
	$("#aa").onclick = function(){
		$("#subor-1").style.display="none";
	}
	
//女士商品列表隐藏
	$("#CC").onclick = function(){
		$("#List").style.display = "block";
	}
	$("#bb").onclick = function(){
		$("#List").style.display = "none";
	}
