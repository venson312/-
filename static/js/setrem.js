var pixclPatio = 1 / window.devicePixelRatio;
document.write('<meta name="viewport" content="width=device-width,initial-scale=' + pixclPatio + ',minimum-scale=' +
	pixclPatio + ',maximum-scale=' + pixclPatio + ',user-scalable=no" />');
var html = document.getElementsByTagName('html')[0];
var pageWidth = html.getBoundingClientRect().width;
html.style.fontSize = pageWidth / 50 + 'px';
console.log(pageWidth);


