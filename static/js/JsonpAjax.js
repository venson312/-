$(function(){
//褰撻敭鐩橀敭琚澗寮€鏃跺彂閫丄jax鑾峰彇鏁版嵁
		$('#text').keyup(function(){
			var keywords = $(this).val();
			if (keywords=='') { $('#word').hide(); return };
			$.ajax({
				url: 'http://suggestion.baidu.com/su?wd=' + keywords,
				dataType: 'jsonp',
				jsonp: 'cb', //鍥炶皟鍑芥暟鐨勫弬鏁板悕(閿€�)key
				// jsonpCallback: 'fun', //鍥炶皟鍑芥暟鍚�(鍊�) value
				beforeSend:function(){
					$('#word').append('<div>姝ｅ湪鍔犺浇銆傘€傘€�</div>');
				},
				success:function(data){
					$('#word').empty().show();
					if (data.s=='')
					{
						$('#word').append('<div class="error">Not find  "' + keywords + '"</div>');
					}
					$.each(data.s, function(){
						$('#word').append('<div class="click_work">'+ this +'</div>');
					})
				},
				error:function(){
					$('#word').empty().show();
					$('#word').append('<div class="click_work">Fail "' + keywords + '"</div>');
				}
			})
		})
//鐐瑰嚮鎼滅储鏁版嵁澶嶅埗缁欐悳绱㈡
		$(document).on('click','.click_work',function(){
			var word = $(this).text();
			$('#text').val(word);
			$('#word').hide();
			// $('#texe').trigger('click');瑙﹀彂鎼滅储浜嬩欢
		})

	})