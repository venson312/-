var ProductService = (function() {
	  
	function ProductService() {}
	
	function processResult(data, callback) {
		if(data.code == 1 && data.data) {
			if(callback && typeof callback === "function") {
				callback(data.data);
			}
		}else {
			console.log(data.message);
		}
	}
	ProductService.loadProduct = function(productId,callback) {
		$.getJSON("/service/product/" + productId,function(data) {
			if(data.data.state == 1){
				processResult(data, callback);
			}else{
				$('body').html('<h1 style="text-align:center;font-size:100px;color:red;">该商品已下架</h1>'); 
			}
		});
	};
	ProductService.loadStyle = function(styleId,callback) {
		$.getJSON("/service/custom/style/" + styleId,function(data) {
			processResult(data, callback);
		});
	};
	ProductService.loadBrandDealer = function(dealerId,callback) {
		$.getJSON("/service/brandsRest/brandDealerInfoService/" + dealerId,function(data) {
			if(callback && typeof callback === "function") {
				callback(data);
			}
		});
	};
	ProductService.loadFabric = function(fabricId,callback) {
		$.getJSON("/service/product/fabricInfo/" + fabricId,function(data) {
			processResult(data, callback);
		});
	};
	ProductService.loadCustomContent = function(customContentId,callback) {
		$.getJSON("/service/custom/content/" + customContentId,function(data) {
			processResult(data, callback);
		});
	};
	ProductService.loadMultiAccents = function(accentIds,callback) {
		
		$.ajax({
		      url:"/service/custom/accent/multiIds",
		      traditional: true,
		      data:{
		            ids: accentIds 
		      },
		      dataType:'json',
		      success:function(data) {
		    	  processResult(data, callback);
		      }
		});
	};
	ProductService.loadCustomShopCity = function(callback) {
		$.getJSON("/service/customRest/customShopService/citys",function(data) {
			if(callback && typeof callback === "function") {
				callback(data);
			};
		});
	};
	ProductService.loadUserAddress = function(callback) {
		$.getJSON("/service/addressRest/user/address/findAddress",function(data) {
			if(callback && typeof callback === "function") {
				callback(data);
			};
		});
	};
	ProductService.loadCheckBody = function(userId, callback) {
		$.getJSON("/service/checkBodyRest/checkBodyService/"+userId,function(data) {
			if(callback && typeof callback === "function") {
				callback(data);
			};
		});
	};
	ProductService.loadShopCheckBodyByCriteria = function(userId, criteria,callback) {
		$.getJSON("/service/checkBodyRest/checkBodyService/"+userId,{criteria : criteria},function(data) {
			if(callback && typeof callback === "function") {
				callback(data);
			};
		});
	};
	ProductService.loadCheckBodyById = function(id,callback) {
		$.ajax({
		      type:'POST',
			  url:"/service/checkBodyRest/checkBodyService/findCheckBody",
		      data:{measurebodyId:id},
		      dataType:'json',
		      success:function(data) {
		    	  callback(data);
		      }
		});
		
	};
	ProductService.addOrder = function(order,callback) {
		$.ajax({
		      type:'POST',
			  url:"/service/order",
		      data:order,
		      dataType:'json',
		      contentType:'json',
		      success:function(data) {
		    	  processResult(data, callback);
		      }
		});
	};
	ProductService.loadOrder = function(orderId,callback) {
		$.getJSON("/service/order/" + orderId,function(data) {
			processResult(data, callback);
		});
	};
	ProductService.getAliPaySign = function(orderId,callback) {
		$.getJSON("/service/order/sign/" + orderId,function(data) {
			processResult(data, callback);
		});
	};
	ProductService.addAppointment = function(appointment, callback) {
		$.ajax({
		      type:'POST',
			  url:"/service/appointment-order",
		      data:appointment,
		      dataType:'json',
		      contentType:'json',
		      success:function(data) {
		    	  processResult(data, callback);
		      }
		});
	};
	ProductService.loadClothesTypeChildren = function(parentClothesTypeId,callback) {
		$.getJSON("/service/product/clothesType/children/" + parentClothesTypeId,function(data) {
			processResult(data, callback);
		});
	};
	ProductService.synloadClothesTypeChildren = function(parentClothesTypeId) {
		var clothesType = null;
		$.ajax({
			type:'get',
			url:'/service/product/clothesType/children/'+parentClothesTypeId,
			async:false,
			dataType:'json',
			success:function(data) {
				if(data.code == 1 && data.data) {
					clothesType = data.data;
				}
			}
		});
		return clothesType;
	};
	ProductService.loadBrands = function(clothesTypeId,callback) {
		$.getJSON("/service/product/brand/" + clothesTypeId,function(data) {
			processResult(data, callback);
		});
	};
	
	ProductService.loadStandardSize = function(standardSizeId,callback) {
		$.get('/service/brandsRest/brand/size/find/size',{sizeId:standardSizeId},function(data){
			callback(data);
		}, 'json');
	};
	ProductService.loadMeasure = function(measureId,callback) {
		$.getJSON("/service/custom/measure/" + measureId,function(data) {
			processResult(data, callback);
		});
	};
	return ProductService;
})();