












//http://www.effectgames.com/demos/canvascycle/tools.js
(function() {
	// Browser detection
	var u = navigator.userAgent;
	var webkit = !!u.match(/webkit/i);
	var chrome = !!u.match(/Chrome/);
	var safari = !!u.match(/Safari/) && !chrome;
	var ie = !!u.match(/MSIE/);
	var ie6 = ie && !!u.match(/MSIE\s+6/);
	var ie7 = ie && !!u.match(/MSIE\s+7/);
	var ie8 = ie && !!u.match(/MSIE\s+8/);
	var moz = !safari && !ie;
	var op = !!window.opera;
	var mac = !!u.match(/Mac/i);
	var ff = !!u.match(/(Firefox|Minefield)/);
	var iphone = !!u.match(/iPhone/);
	var ipad = !!u.match(/iPad/);
	var snow = !!u.match(/Mac\s+OS\s+X\s+10\D[6789]/);
	var titanium = safari && !!u.match(/Titanium/);
	var android = !!u.match(/android/i);
	
	var ver = 0;
	if (ff && u.match(/Firefox\D+(\d+(\.\d+)?)/)) {
		ver = parseFloat( RegExp.$1 );
	}
	else if (safari && u.match(/Version\D(\d+(\.\d+)?)/)) {
		ver = parseFloat( RegExp.$1 );
	}
	else if (chrome && u.match(/Chrome\D(\d+(\.\d+)?)/)) {
		ver = parseFloat( RegExp.$1 );
	}
	else if (ie && u.match(/MSIE\D+(\d+(\.\d+)?)/)) {
		ver = parseFloat( RegExp.$1 );
	}
	else if (op && u.match(/Opera\D+(\d+(\.\d+)?)/)) {
		ver = parseFloat( RegExp.$1 );
	}
	
	window.ua = {
		webkit: webkit,
		safari: safari,
		ie: ie,
		ie8: ie8,
		ie7: ie7,
		ie6: ie6,
		moz: moz,
		op: op,
		mac: mac,
		ff: ff,
		chrome: chrome,
		iphone: iphone,
		ipad: ipad,
		snow: snow,
		titanium: titanium,
		android: android,
		mobile: iphone || ipad || android,
		ver: ver
	};
})();