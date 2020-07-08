
$("li").append("<dt><input type='button' value='加入购物车' onclick='add(this)'></dt>")
//判断本地存储中是否有保存数据的名称。没有则添加一个
if(localStorage.getItem("arr")==null){
	localStorage.setItem("arr",JSON.stringify([]))
}
//添加购物车 将商品信息添加到本地存储中
window.add=function(obj){
	var arr=JSON.parse(localStorage.getItem("arr"))
price=$(obj).parent().prev().prev().html()
name=$(obj).parent().prev().html()
picBig=$(obj).parent().prev().prev().prev().prev()[0].src
picMin=$(obj).parent().prev().prev().prev()[0].src
arr.push({price:price,name:name,picB:picBig,picM:picMin})
 var ca=JSON.stringify(arr)
localStorage.setItem("arr",ca)
}

//本地存储中购物车数据加载到页面
window.addCar=function(){	
	var car=JSON.parse(localStorage.getItem("arr"))
	for(var i=0;i<car.length;i++){
		$("tbody").append("<tr><td ><input type='checkbox' class='change' onchange='change()'></td><td><img src="+car[i].picB+"><p>"+car[i].name+"</p></td><td>"+car[i].price+"</td><td><input type='button' value='-'><span>1</span><input type='button' value='+'></td><td>"+car[i].price+"</td><td><input type='button' value='删除' onclick='del(this)'></td></tr>")
	}
	change()
}
//单行操作删除
window.del=function(obj){
	var t=$(obj).parent().prev().prev().prev().prev().children().first()[0].src
	var car=JSON.parse(localStorage.getItem("arr"))
	for(var i=0;i<car.length;i++){
		if(car[i].picB==t){
			car.splice(i,1)			
			localStorage.setItem("arr",JSON.stringify(car))
			$(obj).parent().parent().remove()
		}
	}
	change()
}
//选中所有的商品
window.changeAll=function(obj){	
	$(".change").prop("checked",obj.checked)
	change()
}
//选中选项框，显示选中商品数量及需要消费金额
window.change=function(){
	var car=JSON.parse(localStorage.getItem("arr"))
	var m=0;
	var count=0;
	for(var i=0;i<car.length;i++){
		if($(".change").get(i).checked){
		//	console.log($(".change").get(i))
			count++
			m+=parseFloat($($(".change").get(i)).parent().next().next().next().next().html())
		}
		if(count==car.length){
			$("#changeAll").prop("checked",true)
		}else{
			$("#changeAll").prop("checked",false)			
		}
	}
	$("#goods").html(count)
	$("#pay").html(m)
}
//删除选中的商品
window.delAll=function(){
	var car=JSON.parse(localStorage.getItem("arr"))
	for(var i=car.length-1;i>=0;i--){
		if($(".change").get(i).checked){
			var t=$($(".change").get(i)).parent().next().children().first()[0].src
			for(var i=0;i<car.length;i++){
				if(car[i].picB==t){
				car.splice(i,1)	
				}
			}
		$($(".change").get(i)).parent().parent().remove()		
		}
	}
	localStorage.setItem("arr",JSON.stringify(car))
	change()
}

require('./car.css')
require('./homepage.css')