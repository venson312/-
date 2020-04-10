
function initFavorite(){
	var userId=$("#userId").html();
	if(userId==""||userId==null){
		var user=workspace['user'];
		if(user!=undefined){
			userId=workspace['user']['userId'];
		}
	}
	window.location.reload();
}