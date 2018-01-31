function generateData() {
    var ret = '';
    var now = (new Date()).toString();
    for (var i = 0; i < 20; i++) {
        ret += '<div class="list-item">' + now + ': ' + (i + 1) + '</div>';
    }
    return ret;
}

function addContent($root, position) {
    var $scroller = $('#scroller');

    // 记录当前容器滚动条位置和高度
    var currentScroll = $scroller.scrollTop();
    var currentHeight = $root.height();

    // 添加内容到主容器
    var handleFunction = {
        top: 'prepend',
        bottom: 'append'
    }[position] || 'append';
    $root[handleFunction](generateData());

    if (position == 'bottom') {
        return;
    }
    // 更新滚动条位置
    // 要考虑可替换元素的尺寸
    var newContentHeight = $root.height() - currentHeight;
    $scroller.scrollTop(newContentHeight + currentScroll);
}

$(function() {
    var $root = $('#root');

    $root.append(generateData());

    $('#topLoader').on('click', function() {
        setTimeout(function() {
            addContent($root, 'top');
        }, 2000);
    });

    $('#bottomLoader').on('click', function() {
        addContent($root, 'bottom');
    });
});