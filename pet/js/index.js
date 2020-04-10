// JavaScript Document
var i=2;
function LCbanner()
{
	var img=document.getElementById("LC-bannerimg");
	img.src="img/lc-2"+i+".jpg";
	i++;
	if(i==6)
	i=2;
}
var LCbanner=window.setInterval(LCbanner,2000);



