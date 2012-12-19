function $(s) {
    var d = document.querySelectorAll(s);
    return (d.length == 1) ? d[0] : d;
}

function setPvNum(t){
    var val = (t + '').split('');
    
    var nums = $('.num');
    var coms = $('.com');
    
    var l = val.length;
    var k = nums.length;
    var j = coms.length;

    (l > 3) ? (coms[j-1]).style.top = 0 : (coms[j-1]).style.top = '';
    (l > 6) ? (coms[j-2]).style.top = 0 : (coms[j-2]).style.top = '';

    for(var i = l, m = k; i > 0; i--, m--){
        var newNum = parseInt(val[i-1], 10);
        var newTop = '-' + (newNum * 90) + 'px';
        (nums[m-1]).style.top = newTop;
    }
    for(var i = k - l; i > 0; i--){
        (nums[i-1]).style.top = '';
    }
}

function a(t){ 
    var c = (t + '').length;
    return parseInt(Math.random()*Math.pow(10,Math.random()*c)) + 1; 
} 


window.getPvCount = function() {
    var c = a(100000000);
    var cmd = document.querySelector('#console');
    cmd.innerHTML += c + '\r\n';
    cmd.scrollTop = cmd.scrollHeight;
    if(c) setPvNum(c);
    else setPvNum(0);
    
    setTimeout(window.getPvCount, 3000);
};
window.getPvCount();
