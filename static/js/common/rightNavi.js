$(function(){
	initFavorite();
	
});

function delwodshouc(goodsId) {
	var userId=$("#userId").html();
	if(userId==""||userId==null){
		var user=workspace['user'];
		if(user!=undefined){
			userId=workspace['user']['userId'];
		}
	}
	//alert(userId);
	//alert(goodsId);
	$.ajax({
			url:"../../service/goodsRest/goods/delete/favorite",
			type:"get",
			data:{userId:userId,goodsId:goodsId},
			dataType:"json",
			success:function(result){
				initFavorite();
			}
	})
}

function initFavorite(){
	//$('#favoriteWrap div.favoriteContent ul').html("");
	$('#favoriteWrap').hover(function(){showObject('favoriteWrap');},function(){hiddenObject('favoriteWrap');});
	$('#favoriteIcon').hover(function(){showObject('favoriteWrap');},function(){hiddenObject('favoriteWrap');});
	var userId=$("#userId").html();
	if(userId==""||userId==null){
		var user=workspace['user'];
		if(user!=undefined){
			userId=workspace['user']['userId'];
		}
	}
	if($("#current_user_center").html()!="请登录"){
		$.get("../../service/goodsRest/goods/find/favorite", {
			userId:userId,
			pno:1,
			pageSize:3
		},function(data){
			$('#favoriteWrap div.favoriteContent ul').html("");
			$('div.favoriteNumber').text(data.total);
			var rows = data.rows;
			var $tmpl = $('#favoriteTemplate')
			if(rows.length < 1){
				$('#favoriteWrap div.favoriteContent ul').append($('<li>').html('客官您还没有收藏任务宝贝，赶紧去收藏吧'));
				$('#favoriteWrap div.favoriteMore').hide();
			}
			if(data.total <= 3){
				$('#favoriteWrap div.favoriteMore').hide();
			}
			for(var i in rows){
				var row = rows[i];
				//alert(userId);
				//alert($tmpl.jqote(row));
				$('#favoriteWrap div.favoriteContent ul').append($tmpl.jqote(row));

			}
		}, 'json');
	}else{
		$('#favoriteWrap div.favoriteContent ul').html("");
		$('div.favoriteNumber').text(0);
		$('#favoriteWrap div.favoriteContent ul').append($('<li>').html('客官您尚未登录，请点击我<a style="color:red" href="../../html/login/login.html">登录</a>'));
		$('#favoriteWrap div.favoriteMore').hide();
		
	}
}